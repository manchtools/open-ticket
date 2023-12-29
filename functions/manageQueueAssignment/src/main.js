import { Client, Teams } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.API_KEY).setSelfSigned();

    const teams = new Teams(client)
const {userId,queueId, membershipId} = JSON.parse(req.body)

if(req.method === "GET"){
 if(!queueId){
    return res.send("Please provide queueId", 400)
  }
  try{

    const team = await teams.listMemberships(queueId)
    return res.json(team)
  }catch(e){
    error(e)
    return res.send("There was an error",500)
  }
}

if(req.method === "POST"){
  if(!userId || !queueId){
    return res.send("Please provide userId and queueId", 400)
  }
  try{
      await teams.createMembership(queueId,[],undefined,userId)
  }catch(e){
    error(e)
    return res.send("There was an error",500)
  }
}
if(req.method === "DELETE"){
  if(!membershipId || !queueId){
    return res.send("Please provide membershipId and queueId", 400)
  }
  try{
      await teams.deleteMembershipMembership(queueId,membershipId)
  }catch(e){
    error(e)
    return res.send("There was an error",500)
  }
}
return res.send("Success",200)
}


