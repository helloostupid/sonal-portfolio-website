import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import Home from "@/pages/Home";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}
