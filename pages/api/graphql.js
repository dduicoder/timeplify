import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

let dates = [];

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
    ): Calendar!
    removeCalendar(date: String!, id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    getDate(_, { date }) {
      const target = dates.find((data) => data.date === date);

      if (!target) {
        const newDate = { date, calendars: [] };
        dates.push(newDate);
        dates.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return newDate;
      }

      return target;
    },
  },
  Mutation: {
    addCalendar(_, { date, id, title, start, end, description }) {
      const targetDate = dates.find((data) => data.date === date);
      const originalCalendars = targetDate.calendars;
      const newCalendar = { id, title, start, end, description };

      dates[dates.indexOf(targetDate)].calendars = [
        ...originalCalendars,
        newCalendar,
      ];
      return newCalendar;
    },
    removeCalendar(_, { date, id }) {
      const targetDate = dates.find((data) => data.date === date);
      const targetCalendar = targetDate.calendars.find(
        (calendar) => calendar.id === id
      );

      if (!targetCalendar) {
        return false;
      }

      const otherDates = dates.filter((data) => data.date !== date);

      dates = [
        ...otherDates,
        {
          date,
          calendars: targetDate.calendars.filter(
            (calendar) => calendar.id !== id
          ),
        },
      ];

      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
