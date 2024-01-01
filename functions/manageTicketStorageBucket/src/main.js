import { Client, Storage } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY)
    .setSelfSigned();

  const storage = new Storage(client);

  await storage.deleteBucket(req.body.$id, req.body.$id);

  return res.empty();
};
