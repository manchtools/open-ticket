import { loadTranslations } from '$lib/translations/translations';

export const load = async ({ url, data }) => {
	const { pathname } = url;

	const initLocale = 'en';

	await loadTranslations(initLocale, pathname);
	return data;
};
