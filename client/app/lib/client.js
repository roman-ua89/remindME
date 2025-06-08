import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'YOUR_GRAPHQL_ENDPOINT', // Replace with your GraphQL API endpoint.  Use an environment variable!
        // You might need to add headers here for authentication (e.g., JWT)
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('token')}`
        // }
    }),
    cache: new InMemoryCache(),
    // Optional:  Configure cache options here (e.g., type policies).
});

export default client;
