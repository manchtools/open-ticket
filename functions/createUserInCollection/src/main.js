import { Client, Databases, Permission, Role } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY)
    .setSelfSigned();

  const databases = new Databases(client);
  const { $id, name, email, registration, phone, userId } = req.body;

  log(`Creating user: ${email}`);
  await databases.createDocument(
    'main',
    'users',
    $id,
    { name, email, registration, phone },
    [Permission.read(Role.user($id))]
  );

  return res.empty();
};
