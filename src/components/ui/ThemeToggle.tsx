import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:scale-110 group overflow-hidden"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />

      {/* Moon stars for dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0">
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-75" />
        </div>
      )}

      {/* Main icon with smooth transitions */}
      <div className="relative z-10 transition-all duration-500 transform">
        {theme === "light" ? (
          // Sun icon for dark mode
          <svg
            className="w-6 h-6 text-yellow-600 drop-shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          // Moon icon for light mode
          <svg
            className="w-6 h-6 text-blue-400 drop-shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
          </svg>
        )}
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
    </button>
  );
}
