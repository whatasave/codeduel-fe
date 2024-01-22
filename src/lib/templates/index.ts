import type { Language } from "$lib/types";
import cpp from "./cpp"
import java from "./java"
import python from "./python"
import javascript from "./javascript"

export default { cpp, java, python, javascript } as Record<Language, string>;