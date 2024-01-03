import { Client, Account, Functions, Databases, Storage } from 'appwrite';
import { env } from '$env/dynamic/public';

export const client = new Client();

client.setEndpoint(env.PUBLIC_APPWRITE_ENDPOINT).setProject(env.PUBLIC_APPWRITE_PROJECT); // Replace with your project ID

export const account = new Account(client);
export const functions = new Functions(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';
