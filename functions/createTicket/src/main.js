import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY)
    .setSelfSigned();
  const databases = new Databases(client);
  const storage = new Storage(client);
  const { subject, body } = JSON.parse(req.body);

  const ticket = await databases.createDocument(
    'main',
    'tickets',
    `T-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${Math.floor(
      Math.random() * 999999999
    )}`,
    {
      subject,
      body,
      createdBy: req.headers['x-appwrite-user-id'],
    },
    [Permission.read(Role.user(req.headers['x-appwrite-user-id']))]
  );
  await storage.createBucket(ticket.$id, ticket.$id, [
    Permission.write(Role.team('agent')),
    Permission.read(Role.team('agent')),
    Permission.read(Role.user(req.headers['x-appwrite-user-id'])),
    Permission.create(Role.user(req.headers['x-appwrite-user-id'])),
  ]);

  return res.json(ticket);
};
