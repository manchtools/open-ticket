import { Client, Storage,Databases, Permission,Role} from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

  const storage = new Storage(client)
  const databases = new Databases(client)
  log(req)
 if(req.headers["x-appwrite-event"].includes(".create")){
  const ticket = await databases.getDocument("main","tickets",req.body.$id)
  await storage.createBucket(req.body.$id,req.body.$id,[
    Permission.write(Role.label("agent")),
    Permission.read(Role.label("agent")),
    Permission.read(Role.user(req.headers["x-appwrite-user-id"])),
    Permission.create(Role.user(req.headers["x-appwrite-user-id"]))
  ])
 }


 if(req.headers["x-appwrite-event"].includes(".delete")){
   await storage.deleteBucket(req.body.$id,req.body.$id)
 }
  return res.empty()
}