import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GRAPHQL_URI } from '@env';

// Load environment variables
//dotenv.config();

const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_URI,//"http://192.168.252.13:8080/graphql/", // Access the URI from the .env file
    }),
    cache: new InMemoryCache(),
});

export default client;
