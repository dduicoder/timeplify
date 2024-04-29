import { gql } from "@apollo/client";

export const GET_DATE = gql`
  query getDate($date: String!) {
    getDate(date: $date) {
      calendars {
        id
        title
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
    $title: String!
    $start: String!
    $end: String!
    $description: String!
  ) {
    addCalendar(
      date: $date
      id: $id
      title: $title
      start: $start
      end: $end
      description: $description
    )
  }
`;

export const REMOVE_CALENDAR = gql`
  mutation removeCalendar($date: String!, $id: ID!) {
    removeCalendar(date: $date, id: $id)
  }
`;

export const UPDATE_CALENDAR = gql`
  mutation updateCalendar(
    $date: String!
    $id: ID!
    $title: String!
    $start: String!
    $end: String!
    $description: String!
  ) {
    updateCalendar(
      date: $date
      id: $id
      title: $title
      start: $start
      end: $end
      description: $description
    )
  }
`;
