import { Client, Databases, Permission, Role } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

    const databases = new Databases(client)

if(req.headers["x-appwrite-event"].includes(".create")){
  try{
    await databases.updateDocument("main","replies",req.body.$id,{createdBy:req.headers["x-appwrite-user-id"]},[Permission.read(Role.user(req.headers["x-appwrite-user-id"]))])
  }catch(e){
    error(e)
  }
}
return res.empty()
}
