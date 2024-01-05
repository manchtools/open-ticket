import { Client, Databases, Query } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setJWT(req.headers['x-appwrite-user-jwt']);
  const databases = new Databases(client);

  if (req.path === '/') {
    let queryArray = [Query.limit(15)];
    const {
      queue,
      agent,
      createdStart,
      createdEnd,
      updatedStart,
      updatedEnd,
      page,
      oderCreated,
      oderUpdated,
    } = req.query;
    if (queue) {
      queryArray.push(Query.equal('queue', queue));
    }
    if (agent) {
      if (agent === 'none') {
        queryArray.push(Query.isNull('agent'));
      } else {
        queryArray.push(Query.equal('agent', agent));
      }
    }
    if (page) {
      queryArray.push(Query.offset((page - 1) * 15));
    }
    if (oderCreated === 'asc') {
      queryArray.push(Query.orderAsc('$createdAt'));
    }
    if (oderCreated === 'desc' || !oderCreated) {
      queryArray.push(Query.orderDesc('$createdAt'));
    }
    if (oderUpdated === 'asc') {
      queryArray.push(Query.orderAsc('$updatedAt'));
    }
    if (oderUpdated === 'desc') {
      queryArray.push(Query.orderDesc('$updatedAt'));
    }
    log(queryArray);
    try {
      const tickets = await databases.listDocuments(
        'main',
        'tickets',
        queryArray
      );
      return res.json(tickets);
    } catch (e) {
      error(e);
    }
  } else {
    try {
      const ticket = await databases.getDocument(
        'main',
        'tickets',
        req.path.slice(1)
      );
      return res.json(ticket);
    } catch (e) {
      error(e);
    }
  }
};
