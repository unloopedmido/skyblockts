import { cn } from "@/lib/utils";
import { useLocation } from "react-router";
import {
    GithubIcon,
    MenuIcon,
    MoonIcon,
    SunIcon,
    TwitterIcon,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
    const location = useLocation();
    const pages = [
        { title: "Home", href: "/", mobile: true },
        { title: "About", href: "/about", mobile: false },
        { title: "Docs", href: "/docs", mobile: false },
        { title: "Guides", href: "/guides", mobile: false },
    ];
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <header
            suppressHydrationWarning
            className="fixed flex justify-between items-center py-3 backdrop-blur-lg px-6 lg:px-20 bg-black/5 dark:bg-white/5 w-screen"
        >
            <div className="flex gap-x-6 items-center">
                <a href="/" className="text-black dark:text-white font-extrabold text-lg">
                    Skyblock<span className="text-blue-500">TS</span>
                </a>
                <nav className="hidden md:flex gap-x-6 text-muted-foreground font-semibold">
                    {pages.map((page) => (
                        <a
                            className={cn(
                                "text-sm hover:text-black dark:hover:text-white transition-colors",
                                location.pathname === page.href && "text-black dark:text-white",
                            )}
                            key={page.href}
                            href={page.href}
                        >
                            {page.title}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="hidden md:flex gap-x-2 items-center">
                <a
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                    href="https://github.com/unloopedmido/skyblockts"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubIcon className="text-black dark:text-white" />
                </a>
                <a
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                    href="https://twitter.com/nonlooped"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon className="text-black dark:text-white" fill="currentColor" />
                </a>
                <Button onClick={toggleTheme} variant="ghost" size="icon">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</Button>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden" variant="ghost" size="icon">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-y-2 px-2 py-4 text-muted-foreground">
                        {pages.map((page) => (
                            <a
                                className={cn(
                                    "text-xl w-full text-center",
                                    location.pathname === page.href && "text-black dark:text-white",
                                )}
                                key={page.href}
                                href={page.href}
                            >
                                {page.title}
                            </a>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}