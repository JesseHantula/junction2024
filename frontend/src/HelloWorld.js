import React from 'react';
import { View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
    query HelloQuery($name: String!) {
        hello(name: $name)
    }
`;

const HelloWorld = () => {
    const { loading, error, data } = useQuery(HELLO_QUERY, {
        variables: { name: "Expo" },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{data.hello}</Text>
        </View>
    );
};

export default HelloWorld;