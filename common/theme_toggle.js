function switchTheme(theme) {
    const themeLink = document.getElementById("theme-css");
    if (theme === "modern") {
      themeLink.href = "/themes/modern.css";
    } else if (theme === "retro") {
      themeLink.href = "/themes/retro.css";
    }
  }
  