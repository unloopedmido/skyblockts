(function () {
    const theme = localStorage.getItem("theme") || "dark"; // default to dark
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
})();