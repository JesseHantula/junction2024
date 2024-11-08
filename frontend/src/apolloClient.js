import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://10.87.2.169:8000/graphql/',
    }),
    cache: new InMemoryCache(),
});

export default client;