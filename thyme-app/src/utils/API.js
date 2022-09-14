import { gql } from "@apollo/client";

// const apiEndpoint = `https://thyme-grocery.herokuapp.com/graphql`;

export default {
  query: {
    GET_USERS: gql`
      query users {
        users {
          _id
          email
          storeID
        }
      }
    `,
  },
  mutation: {
    ADD_USER: gql`
      mutation addUser(
        $email: String!
        $password: String!
        $storeID: String
      ) {
        addUser(
          email: $email
          password: $password
          storeID: $storeID
        ) {
          token
          user {
            _id
            email
          }
        }
      }
    `,
    LOG_IN: gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            email
          }
        }
      }
    `,
  },
};
