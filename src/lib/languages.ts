import type { Language } from "./types";

export const languages = [
    "python",
    "javascript",
    "java",
    "csharp",
    "cpp"
] as const;

export function toHumanString(language: Language): string {
    if (language === "csharp") return "C#";
    if (language === "cpp") return "C++";
    return language[0].toUpperCase() + language.slice(1);
}