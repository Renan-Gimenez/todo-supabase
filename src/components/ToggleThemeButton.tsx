import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

export default function ToggleThemeButton() {
    const { theme, toggleTheme }:any = useContext(ThemeContext);

    return(
        <button className="border border-violet-500/20 p-1 rounded-xl dark:text-white" onClick={toggleTheme}>
            {theme === 'dark'
                ? <Sun />
                : <Moon />
            }
        </button>
    );
}