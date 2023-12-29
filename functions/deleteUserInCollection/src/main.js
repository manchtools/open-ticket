import { Client, Databases} from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

  const databases = new Databases(client)
  const {$id,email} = req.body

  log(`Deleting user: ${email}`)
  await databases.deleteDocument("main","users",$id)
   try{
      await databases.deleteDocument("main","agents",$id)
    }catch(e){
      if(e.code === 404){
        log("User not agent, no object to delete")  
      }
    }
  return res.empty()
}