import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";  // <-- Import for error handling
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing the individual page components and other utilities/components.
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import MealDetails from './pages/MealDetails';
import SearchForm from './pages/SearchForm';
import Success from './pages/Congratulations';

import { RecipeProvider } from './utils/GlobalState';


const SERVER_URI ='http://localhost:3001/graphql' || process.env.REACT_APP_GRAPHQL_ENDPOINT ;

const httpLink = createHttpLink({
  uri: SERVER_URI
});


// Middleware to authenticate requests by attaching a JWT token.
const authLink = setContext((_, { headers }) => {
  // Retrieve the JWT token from local storage.
  const token = localStorage.getItem('id_token');
  // Return the modified headers.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error handling for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Initialize the Apollo client with the specified link (errorLink, authLink, and httpLink in sequence) and cache implementations.
const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),  // <-- Updated to include error handling
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Provide the Apollo client to the rest of the app.
    <ApolloProvider client={client}>
      {/* Set up routing for the app */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* RecipeProvider gives nested components access to recipe-related functionalities and state */}
          <RecipeProvider>
            {/* Header and Footer components are always visible, regardless of the route */}
            <Header />
            <div className="container-fluid">
              {/* Define the routing structure */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<SearchForm />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:username" element={<Profile />} />
                <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
                <Route path="/recipe/:idMeal" element={<MealDetails />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </div>
            <Footer />
          </RecipeProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

// Export the main App component to be used in index.js.
export default App;
