import { Client, Databases, Users} from 'node-appwrite';

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

  const databases = new Databases(client)
  const users = new Users(client)
  const {userId } = req.body


try{
        const {name,email,registration,phone} = await users.get(userId)
        await databases.createDocument("main","agents",userId,{name,email,registration,phone})
      }catch(e){
        error("Could not create agent")
        error(e)
      }
  return res.empty()
}