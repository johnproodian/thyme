import "./App.css";

// Import React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

// Import setContext for using middleware with ApolloServer--so we can send tokens as header
import { setContext } from "@apollo/client/link/context";

// Import Pages
import {
  LandingPage,
  LogInPage,
  TrackingPage,
  ProductPage,
  APIPage,
  StoreSearchPage,
} from "./pages";

// const apiEndpoint = `https://thyme-grocery.herokuapp.com/graphql`;

// // Initialize Client Object
// const client = new ApolloClient({
//   uri: apiEndpoint,
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Initialize Client Object
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Authentication state...

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/store" element={<StoreSearchPage />} />
          <Route path="/api" element={<APIPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
