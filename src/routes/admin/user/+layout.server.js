import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';

export async function load() {
	const form = await superValidate(formSchema);
	return {
		form: { newUser: form }
	};
}
