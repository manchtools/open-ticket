import { Client, Databases} from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

  const databases = new Databases(client)
  const {$id,name, email,registration, phone } = req.body


  
    log(`Updating user: ${email}`)
    await databases.updateDocument("main","users",$id,{name,email,registration,phone})
    try{
      await databases.updateDocument("main","agents",$id,{name,email,registration,phone})
    }catch(e){
      if(e.code === 404){
        log("User not agent, skipping agent update ")  
      }
    }

  return res.empty()
}