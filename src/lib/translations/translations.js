import i18n from 'sveltekit-i18n';

const config = {
	loaders: [
		{
			locale: 'en',
			key: 'default',
			loader: async () => (await import('./en/default.json')).default
		},
		{
			locale: 'en',
			key: 'notifications',
			loader: async () => (await import('./en/notifications.json')).default
		},
		{
			locale: 'en',
			key: 'setup',
			url: '/user/setup',
			loader: async () => (await import('./en/userSetup.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
