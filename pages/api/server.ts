import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";

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
});

export default startServerAndCreateNextHandler(server, {
  context: async (_req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return {};
  },
});
