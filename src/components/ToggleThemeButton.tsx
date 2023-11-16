import { ThemeContext } from "@/context/ThemeContext";
import { Loader2, Moon, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <button
      className="border border-violet-500/20 p-1 rounded-xl dark:text-white"
      onClick={toggleTheme}
    >
      {isClient ? (
        theme === "dark" ? (
          <Sun />
        ) : (
          <Moon />
        )
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </button>
  );
}
