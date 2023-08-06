export async function load({ locals, cookies }) {
	locals.pb.authStore.clear();
	cookies.delete('pb_auth');
	return { success: true };
}
