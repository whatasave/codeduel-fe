import type { Language } from '$lib/types';
import cpp from './cpp';
import java from './java';
import python from './python';
import javascript from './javascript';
import csharp from './csharp';

export default { cpp, java, python, javascript, csharp } as Record<Language, string>;
