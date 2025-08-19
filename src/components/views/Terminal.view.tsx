import { useEffect, useMemo, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  PROFILE,
  EDUCATION_ITEMS,
  EXPERIENCE_ITEMS,
  PROJECTS,
  SKILL_BUBBLES,
} from "../../data/content";
import { asciiAnya, asciiArt, asciiText } from "../../data/asciiArt";

type HistoryEntry =
  | { id: string; kind: "input"; text: string }
  | { id: string; kind: "output"; lines: string[]; textClassName?: string };

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const Terminal = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const { theme, toggleTheme, setTheme } = useTheme();
  const [isExecuting, setIsExecuting] = useState(false);

  function scrollToBottom(behavior: ScrollBehavior = "auto") {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end", behavior });
    } else if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      });
    }
  }

  // Command specs for help and validation
  const COMMAND_SPECS = [
    { name: "help", description: "show this help" },
    { name: "home", description: "go back to the homepage" },
    { name: "about", description: "about me" },
    { name: "experience", description: "work experience" },
    { name: "education", description: "education" },
    { name: "skills", description: "technical skills" },
    { name: "projects", description: "list projects" },
    { name: "resume", description: "resume link" },
    { name: "contact", description: "how to reach me" },
    {
      name: "sendmail",
      description:
        'send email via Web3Forms: sendmail name="John Doe" email=john@doe.com message="Hello"',
    },
    { name: "theme", description: "toggle or set theme [light|dark]" },
    { name: "whoami", description: "print current user" },
    { name: "neofetch", description: "show fancy system/profile info" },
    { name: "matrix", description: "matrix rain (for fun)" },
    { name: "banner", description: "show the banner art" },
    { name: "anya", description: "Anyaaaaaa" },
    { name: "sudo", description: "try your luck" },
    { name: "clear", description: "clear the screen" },
  ] as const;

  const COMMAND_PREFIX = "wael's terminal@ wael-portfolio:~$";

  type CommandName = (typeof COMMAND_SPECS)[number]["name"];

  function formatHeader(title: string): string[] {
    const bar = "-".repeat(Math.max(8, title.length + 6));
    return [bar, `  ${title}`, bar];
  }

  function formatTimeline(
    items: { period: string; title: string; description: string }[]
  ): string[] {
    const lines: string[] = [];
    for (const item of items) {
      lines.push(`${item.period}  ${item.title}`);
      lines.push(`  ${item.description}`);
    }
    return lines;
  }

  function formatSkills(labels: string[]): string[] {
    const perLine = 3;
    const lines: string[] = ["Skills:"];
    for (let i = 0; i < labels.length; i += perLine) {
      const slice = labels.slice(i, i + perLine);
      lines.push(slice.map((s) => ` - ${s}`).join("\t"));
    }
    return lines;
  }

  function formatProjects(): string[] {
    const lines: string[] = [...formatHeader("Projects")];
    PROJECTS.forEach((p, idx) => {
      lines.push(`${idx + 1}. ${p.title}`);
      lines.push(`   ${p.description}`);
      if (p.tags?.length) lines.push(`   [${p.tags.join(", ")}]`);
      if (p.githubUrl) lines.push(`   repo: ${p.githubUrl}`);
    });
    return lines;
  }

  function formatAbout(): string[] {
    return [
      ...formatHeader("About"),
      `${PROFILE.name} — ${PROFILE.role}`,
      "",
      PROFILE.summaryOne,
      PROFILE.summaryTwo,
    ];
  }

  function formatHelp(): string[] {
    const maxLen = COMMAND_SPECS.reduce(
      (m, c) => Math.max(m, c.name.length),
      0
    );
    return [
      ...formatHeader("Available commands"),
      ...COMMAND_SPECS.map(
        (c) => ` - ${c.name.padEnd(maxLen)}:  ${c.description}`
      ),
    ];
  }

  function formatBanner(): string[] {
    const lines: string[] = [
      ...formatHeader("Banner"),
      ...asciiHeader.split("\n"),
      ...asciiBody.split("\n"),
    ];
    return lines;
  }

  function formatNeofetch(): string[] {
    const lines: string[] = [
      ...formatHeader("Neofetch"),
      `User: ${PROFILE.name}`,
      `Role: ${PROFILE.role}`,
      `Theme: ${theme}`,
      `Projects: ${PROJECTS.length}`,
      `Skills: ${SKILL_BUBBLES.length}`,
    ];
    return lines;
  }

  function formatMatrix(rows: number = 16, width: number = 48): string[] {
    const chars = "01";
    const lines: string[] = [...formatHeader("Matrix")];
    for (let r = 0; r < rows; r++) {
      let s = "";
      for (let c = 0; c < width; c++) {
        s += chars[Math.floor(Math.random() * chars.length)];
      }
      lines.push(s);
    }
    return lines;
  }

  function parseKeyValueArgs(args: string[]): {
    name?: string;
    email?: string;
    message?: string;
  } {
    const joined = args.join(" ");
    const result: { [k: string]: string } = {};
    const regex = /(name|email|message)=((?:"[^"]*")|(?:\S+))/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(joined)) !== null) {
      const key = match[1];
      let value = match[2];
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      result[key] = value;
    }
    return {
      name: result.name,
      email: result.email,
      message: result.message,
    };
  }

  async function sendMailFromTerminal(args: string[]): Promise<void> {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
      | string
      | undefined;
    const { name, email, message } = parseKeyValueArgs(args);

    const header = formatHeader("Send Mail");
    if (!accessKey) {
      setHistory((h) => [
        ...h,
        {
          id: generateId(),
          kind: "output",
          lines: [
            ...header,
            "Error: missing VITE_WEB3FORMS_ACCESS_KEY in env.",
          ],
        },
      ]);
      return;
    }
    if (!name || !email || !message) {
      setHistory((h) => [
        ...h,
        {
          id: generateId(),
          kind: "output",
          lines: [
            ...header,
            "Usage:",
            '  sendmail name="John Doe" email=john@doe.com message="Hello"',
          ],
        },
      ]);
      return;
    }

    // Initial status line
    setHistory((h) => [
      ...h,
      {
        id: generateId(),
        kind: "output",
        lines: [
          ...header,
          `From: ${name} <${email}>`,
          `Message: ${message}`,
          "Sending...",
        ],
      },
    ]);

    try {
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();
      if (data?.success) {
        setHistory((h) => [
          ...h,
          {
            id: generateId(),
            kind: "output",
            lines: ["Success: message sent."],
          },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          {
            id: generateId(),
            kind: "output",
            lines: [
              `Error: ${data?.message || "Unknown error from Web3Forms"}`,
            ],
          },
        ]);
      }
    } catch (_e) {
      setHistory((h) => [
        ...h,
        {
          id: generateId(),
          kind: "output",
          lines: ["Network error. Please try again."],
        },
      ]);
    }
  }

  function executeCommand(verb: CommandName, args: string[] = []): string[] {
    switch (verb) {
      case "help":
        return formatHelp();
      case "home":
        navigate("/");
        return ["Navigating to homepage..."];
      case "clear":
        setHistory([]);
        return [];
      case "theme": {
        const desired = (args[0] || "toggle").toLowerCase();
        if (desired === "light" || desired === "dark") {
          setTheme(desired as "light" | "dark");
          return [...formatHeader("Theme"), `Set theme to ${desired}.`];
        }
        toggleTheme();
        return [
          ...formatHeader("Theme"),
          `Toggled theme. Current: ${theme === "light" ? "dark" : "light"}.`,
          "Usage: theme [light|dark]",
        ];
      }
      case "whoami":
        return [...formatHeader("whoami"), PROFILE.name, PROFILE.role];
      case "neofetch":
        return formatNeofetch();
      case "matrix":
        return formatMatrix();
      case "banner":
        return formatBanner();
      case "anya":
        return [
          ...formatHeader("Anya"),
          ...asciiAnya.split("\n"),
          "\n\nSpy... Mission... Waku waku *-*",
          "https://www.youtube.com/watch?v=xinO1fkYVhk",
        ];
      case "sudo":
        return [
          ...formatHeader("sudo"),
          "Permission denied: this is a personal terminal.",
          "Hint: try 'help' or 'neofetch'.",
        ];
      case "about":
        return formatAbout();
      case "experience":
        return [
          ...formatHeader("Experience"),
          ...formatTimeline(EXPERIENCE_ITEMS),
        ];
      case "education":
        return [
          ...formatHeader("Education"),
          ...formatTimeline(EDUCATION_ITEMS),
        ];
      case "skills":
        return formatSkills(SKILL_BUBBLES.map((s) => s.label));
      case "projects":
        return formatProjects();
      case "resume":
        return [...formatHeader("Resume"), `${PROFILE.resumePath}`];
      case "contact":
        return [
          ...formatHeader("Contact"),
          "Use the Contact section on the homepage or DM via social links.",
        ];
      case "sendmail": {
        // Fire and forget; we add output entries as the async call progresses
        void sendMailFromTerminal(args);
        return [];
      }
      default:
        return [];
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom on new history entries
    scrollToBottom("smooth");
  }, [history]);

  useEffect(() => {
    if (!isExecuting) {
      inputRef.current?.focus();
    }
  }, [isExecuting]);

  useEffect(() => {
    // Keep scrolling while typed.js mutates the DOM during typing
    const node = containerRef.current;
    if (!node) return;
    const observer = new MutationObserver(() => {
      // Use instant scroll here to avoid stacking smooth animations on every DOM mutation
      scrollToBottom("auto");
    });
    observer.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, []);

  function handleSubmit(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, { id: generateId(), kind: "input", text: cmd }]);

    const [verb, ...args] = cmd.split(/\s+/);
    if (COMMAND_SPECS.some((c) => c.name === verb)) {
      const lines = executeCommand(verb as CommandName, args);
      if (verb === "clear") {
        setCurrentInput("");
        return;
      }
      if (lines.length) {
        setIsExecuting(true);
        const entry: HistoryEntry = {
          id: generateId(),
          kind: "output",
          lines,
        };
        if (verb === "anya") {
          entry.textClassName = "text-[8px] leading-[1] sm:text-[10px]";
        }
        setHistory((h) => [...h, entry]);
      }
    } else {
      setIsExecuting(true);
      setHistory((h) => [
        ...h,
        {
          id: generateId(),
          kind: "output",
          lines: [
            `Command not found: ${verb}. Type 'help' for a list of commands.`,
          ],
        },
      ]);
    }
    setCurrentInput("");
  }

  // Pad each line with NBSPs to the same width to prevent visual shifting when editors trim trailing spaces
  const headerLines = asciiText.split("\n");
  const headerMax = Math.max(...headerLines.map((l) => l.length));
  const asciiHeader = headerLines
    .map((l) => l.padEnd(headerMax, "\u00A0"))
    .join("\n");
  const asciiBody = asciiArt.replace(/^\n/, "");

  return (
    <section className="h-screen w-screen flex items-center justify-center p-6">
      <div className="h-full w-full rounded-md shadow-lg p-4 font-terminal flex flex-col overflow-hidden bg-white text-gray-900 border border-gray-200 dark:bg-black dark:text-purple-400 dark:border-gray-800 transition-colors duration-300">
        <div className="mb-4 shrink-0">
          <div className="flex flex-col items-center gap-2">
            <pre
              className="w-fit whitespace-pre overflow-x-auto overflow-y-hidden leading-[1] text-[10px] text-indigo-600 dark:text-purple-500 font-terminal"
              aria-label="ascii-banner"
            >
              {asciiHeader}
            </pre>
            <pre
              className="w-fit whitespace-pre overflow-x-auto leading-[1] text-[10px] text-indigo-600 dark:text-purple-500 font-terminal"
              aria-label="ascii-art"
            >
              {asciiBody}
            </pre>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-400 mt-10">
            <span className="text-indigo-600 dark:text-purple-300">
              Welcome you geek :D, I hope you enjoy your stay ^-^
            </span>{" "}
            Type{" "}
            <span className="text-indigo-600 dark:text-purple-300">help</span>{" "}
            to begin.
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2"
        >
          {history.map((entry) => (
            <div key={entry.id}>
              {entry.kind === "input" ? (
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    {COMMAND_PREFIX}
                  </span>{" "}
                  <span className="text-gray-900 dark:text-purple-400">
                    {entry.text}
                  </span>
                </div>
              ) : (
                <TypedBlock
                  lines={entry.lines}
                  className={entry.textClassName}
                  onStart={() => setIsExecuting(true)}
                  onDone={() => {
                    setIsExecuting(false);
                    scrollToBottom("smooth");
                  }}
                />
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {!isExecuting && (
          <div className="mt-3 flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {COMMAND_PREFIX}
            </span>
            <input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(currentInput);
                }
              }}
              aria-label="terminal-input"
              autoFocus
              className="flex-1 bg-transparent outline-none text-indigo-700 dark:text-purple-400 placeholder:text-gray-500 dark:placeholder:text-gray-500 font-terminal"
              placeholder="Type a command... (help)"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}

        <div className="mt-3 text-[10px] text-gray-600 dark:text-gray-500">
          Hint: try{" "}
          <span className="text-indigo-600 dark:text-purple-300">projects</span>
          , <span className="text-indigo-600 dark:text-purple-300">skills</span>
          , or{" "}
          <span className="text-indigo-600 dark:text-purple-300">about</span>.
        </div>
      </div>
    </section>
  );
};

function TypedBlock({
  lines,
  onDone,
  onStart,
  className,
}: {
  lines: string[];
  onDone?: () => void;
  onStart?: () => void;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const linesKey = useMemo(() => lines.join("\u0001"), [lines]);

  useEffect(() => {
    setIndex(0);
    setDone(false);
    setStarted(false);
  }, [linesKey]);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  useEffect(() => {
    if (!started && lines.length > 0) {
      setStarted(true);
      onStart?.();
    }
  }, [started, lines, onStart]);

  useEffect(() => {
    if (index >= lines.length && !done) {
      setDone(true);
    }
  }, [index, lines.length, done]);

  return (
    <div className={`text-indigo-700 dark:text-purple-300 ${className ?? ""}`}>
      {lines.slice(0, index).map((l, i) => (
        <div key={`static-${i}`}>{l}</div>
      ))}
      {index < lines.length ? (
        <ReactTyped
          strings={[lines[index]]}
          typeSpeed={2}
          onComplete={() => setIndex((i) => i + 1)}
        />
      ) : null}
    </div>
  );
}
