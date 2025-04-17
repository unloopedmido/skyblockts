import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import Navbar from "./components/navbar";
import Home from "./routes";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
);