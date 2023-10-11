import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

type Calendar = {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
};

type DateItem = {
  date: string;
  calendars: Calendar[];
};

const getAllDaysWithinSixMonths = () => {
  const datesList: string[] = [];
  let currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() - 1);

  for (let i = 0; i < 3; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      datesList.push(date.toISOString().slice(0, 10));
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return datesList;
};

const sixMonthsDates = getAllDaysWithinSixMonths();

let dates: DateItem[] = sixMonthsDates.map((date) => ({
  date,
  calendars: [],
}));

// console.log(dates);

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
    getAll: [Date!]!
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
    getAll(_: any) {
      return dates;
    },
    getDate(_: any, { date }: any) {
      const target = dates.find((data) => data.date === date);

      if (!target) {
        const newDate: DateItem = { date, calendars: [] };
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
    addCalendar(_: any, { date, id, title, start, end, description }: any) {
      const targetDate: DateItem = dates.find((data) => data.date === date)!;
      const originalCalendars = targetDate.calendars;
      const newCalendar = { id, title, start, end, description };

      dates[dates.indexOf(targetDate)].calendars = [
        ...originalCalendars,
        newCalendar,
      ];
      return newCalendar;
    },
    removeCalendar(_: any, { date, id }: any) {
      const targetDate: DateItem = dates.find((data) => data.date === date)!;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export default startServerAndCreateNextHandler(server);
