import { error } from '@sveltejs/kit';
import { Client, Databases } from 'appwrite';
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('open-ticket');
export function load({ params }) {
	return {
		title: 'Hello world!',
		content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
	};
}
