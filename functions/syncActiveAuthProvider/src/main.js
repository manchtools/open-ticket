import fetch from 'node-fetch';
import https from 'https';
import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const authData = await fetch(
    `${process.env.ENDPOINT}/account/sessions/email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': 'console',
      },
      body: JSON.stringify({
        email: process.env.CONSOLE_USER,
        password: process.env.CONSOLE_PASSWORD,
      }),
      agent: httpsAgent,
    }
  );
  const cookies = authData.headers.get('x-fallback-cookies');

  const project = await fetch(`${process.env.ENDPOINT}/projects/open-ticket`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': 'console',
      'X-Fallback-Cookies': cookies,
    },
    agent: httpsAgent,
  });
  const projectData = await project.json();
  const provider = projectData.providers;
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY)
    .setSelfSigned();

  const databases = new Databases(client);

  for (const { key, name, enabled } of provider) {
    try {
      await databases.getDocument('main', 'authProvider', key);
      await databases.updateDocument('main', 'authProvider', key, {
        enabled: enabled,
      });
    } catch (e) {
      error(e);
      const res = await databases.createDocument('main', 'authProvider', key, {
        name: name,
        key: key,
        enabled: enabled,
      });
      log(res);
    }
  }
  await fetch(`${process.env.ENDPOINT}/account/sessions/current`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': 'console',
      'X-Fallback-Cookies': cookies,
    },
    agent: httpsAgent,
  });

  return res.empty();
};
