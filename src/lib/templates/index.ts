import type { Language } from '$lib/types';
import cpp from './cpp';
import cs from './csharp';
import dart from './dart';
import gleam from './gleam';
import go from './go';
import java from './java';
import js from './javascript';
import kt from './kotlin';
import py from './python';
import rb from './ruby';

export default {
	cpp,
	cs,
	dart,
	gleam,
	go,
	java,
	js,
	kt,
	py,
	rb
} as Record<Language, string>;
