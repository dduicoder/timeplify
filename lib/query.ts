import { gql } from "@apollo/client";

export const GET_DATE = gql`
  query getDate($date: String!) {
    getDate(date: $date) {
      calendars {
        id
        text
        start
        end
        description
      }
    }
  }
`;

export const ADD_CALENDAR = gql`
  mutation addCalendar(
    $date: String!
    $id: ID!
    $text: String!
    $start: String!
    $end: String!
    $description: String!
  ) {
    addCalendar(
      date: $date
      id: $id
      text: $text
      start: $start
      end: $end
      description: $description
    ) {
      text
    }
  }
`;

export const REMOVE_CALENDAR = gql`
  mutation removeCalendar($date: String!, $id: ID!) {
    removeCalendar(date: $date, id: $id)
  }
`;
