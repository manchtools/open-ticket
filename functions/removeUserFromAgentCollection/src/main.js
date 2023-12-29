import { Client, Databases} from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

  const databases = new Databases(client)
  const { userId } = req.body


 
try{
        await databases.deleteDocument("main","agents",userId)
      }catch(e){
        error("Could not delete agent")
        error(e)
      }

  return res.empty()
}