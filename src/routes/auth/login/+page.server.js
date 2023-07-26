import { AppwriteService, AppwriteEndpoint, AppwriteProject } from '$lib/AppwriteService';
import { splitCookiesString, parseString, handleAppwriteError } from '$lib/helpers';
import { error } from '@sveltejs/kit';
export const actions = {
	login: async ({ request, cookies }) => {
		const data = Object.fromEntries(await request.formData());
		try {
			const response = await fetch(`${AppwriteEndpoint}/account/sessions/email`, {
				method: 'POST',
				headers: {
					'x-appwrite-project': AppwriteProject,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: data.email,
					password: data.password
				})
			});
			const json = await response.json();
			if (!response.ok) {
				throw error(response.status, response.statusText);
			}
			const cookiesArray = splitCookiesString(response.headers.get('set-cookie'));
			const cookiesParsed = cookiesArray.map((cookie) => parseString(cookie));
			for (const cookie of cookiesParsed) {
				cookies.set(cookie.name, cookie.value, {
					domain: cookie.domain,
					secure: cookie.secure,
					sameSite: 'Strict',
					path: '/',
					maxAge: cookie.maxAge,
					httpOnly: false,
					expires: cookie.expires
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
};
