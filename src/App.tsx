import { ThemeProvider } from "./contexts/ThemeContext";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./components/views/Homepage.view";
import { Terminal } from "./components/views/Terminal.view";

function App() {
  return (
    <ThemeProvider>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terminal" element={<Terminal />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
