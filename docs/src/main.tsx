import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { createRoot } from "react-dom/client";
import Navbar from "./components/navbar";
import About from "./routes/about";
import Home from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}/>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
);