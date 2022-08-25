import "./App.css";

// Import React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Apollo Client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// Import Pages
import {
  LandingPage,
  LogInPage,
  TrackingPage,
  ProductPage,
  APIPage,
} from "./pages";

const apiEndpoint = `https://thyme-grocery.herokuapp.com/graphql`;

// const devEndpoint = `http://localhost:3001/graphql`;

// Initialize Client Object
const client = new ApolloClient({
  uri: apiEndpoint,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query users {
        _id
        username
        email
        zipcode
      }
    `,
  })
  .then((result) => console.log(result));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/api" element={<APIPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
