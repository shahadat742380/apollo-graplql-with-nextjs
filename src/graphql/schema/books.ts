import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetAllBooks {
    getAllBooks {
      id
      author_name
      title
      year
    }
  }
`;

