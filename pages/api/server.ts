import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://sijinni:ddui2008@cluster1.qtpjdc7.mongodb.net/timeplifey?retryWrites=true&w=majority";

const typeDefs = `#graphql
  type Calendar {
    id: ID!
    title: String!
    start: String!
    end: String!
    description: String!
  }
  type Date {
    date: String!
    calendars: [Calendar!]!
  }
  type Query {
    getDate(date: String!): Date!
  }
  type Mutation {
    addCalendar(
      date: String!
      id: ID!
      title: String!
      start: String!
      end: String!
      description: String!
    ): Boolean!
    removeCalendar(date: String!, id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    async getDate(_: any, { date }: any) {
      console.log("HD");
      const client = await MongoClient.connect(URI);
      const db = client.db();
      const datesCollection = db.collection("dates_data");

      const targetDate = await datesCollection.findOne({ date });

      if (targetDate == null) {
        const newDate = {
          date,
          calendars: [],
        };

        await datesCollection.insertOne(newDate);
        client.close();

        return newDate;
      }

      client.close();

      return targetDate;
    },
  },
  Mutation: {
    async addCalendar(
      _: any,
      { date, id, title, start, end, description }: any
    ) {
      const client = await MongoClient.connect(URI);
      const db = client.db();
      const datesCollection = db.collection("dates_data");

      await datesCollection.findOneAndUpdate(
        { date },
        { $push: { calendars: { id, title, start, end, description } as any } }
      );

      client.close();

      return true;
    },
    async removeCalendar(_: any, { date, id }: any) {
      const client = await MongoClient.connect(URI);
      const db = client.db();
      const datesCollection = db.collection("dates_data");

      await datesCollection.findOneAndUpdate(
        { date },
        { $pull: { calendars: { id } as any } }
      );

      client.close();

      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  await fn(req, res);
};

export default allowCors(
  startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({ req, res }),
  })
);
