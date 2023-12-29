import { Client, Account, Functions, Databases } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://10.20.50.103/v1').setProject('open-ticket'); // Replace with your project ID

export const account = new Account(client);
export const functions = new Functions(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
