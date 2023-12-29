import { Client, Databases, Permission, Role, Teams } from 'node-appwrite';

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
    const teams = new Teams(client)
if(req.headers["x-appwrite-event"].includes(".create")){
  try{
    await teams.create(req.body.$id,req.body.name)
  }catch(e){
    error(e)
  }
}
if(req.headers["x-appwrite-event"].includes(".delete")){
  try{
    await teams.delete(req.body.$id)
  }catch(e){
    error(e)
  }
}
return res.empty()
}
