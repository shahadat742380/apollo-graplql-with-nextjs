import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    id
    first_name
    last_name
    email
    password
  }
}
`;

