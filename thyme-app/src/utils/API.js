import { gql } from "@apollo/client";

// const apiEndpoint = `https://thyme-grocery.herokuapp.com/graphql`;

export default {
  query: {
    GET_USERS: gql`
      query users {
        users {
          _id
          username
          email
          zipCode
        }
      }
    `,
  },
  mutation: {
    ADD_USER: gql`
      mutation addUser(
        $username: String!
        $email: String!
        $password: String!
        $zipCode: String
      ) {
        addUser(
          username: $username
          email: $email
          password: $password
          zipCode: $zipCode
        ) {
          token
          user {
            _id
            username
          }
        }
      }
    `,
    LOG_IN: gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          user {
            _id
            username
          }
        }
      }
    `,
  },
};
