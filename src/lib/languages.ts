import type { Language } from './types';
import templates from './templates';

export const languages = ['cs', 'dart', 'gleam', 'go', 'js', 'kt', 'py', 'rb', 'cpp'] as const;

export function toHumanString(language: Language): string {
	if (language === 'cs') return 'C#';
	if (language === 'cpp') return 'C++';
	if (language === 'js') return 'JavaScript';
	// if (language === 'kt') return 'Kotlin';
	if (language === 'py') return 'Python';
	if (language === 'rb') return 'Ruby';
	return language[0].toUpperCase() + language.slice(1);
}

export function languageTemplate(language: Language): string | undefined {
	return templates[language];
}
