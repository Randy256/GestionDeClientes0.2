import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuardarClientes from './Screens/GuardarClientes';
import ListarClientes from './Screens/ListarClientes';

export default function Navegacion() {

    const Stack = createNativeStackNavigator();
    function StackMenu() {
        return (
            <Stack.Navigator initialRouteName="GuardarClientes">
                <Stack.Screen name="GuardarClientes" component={GuardarClientes} />
                <Stack.Screen name="ListarClientes" component={ListarClientes} />
            </Stack.Navigator>
        );
    }

  return (
    <NavigationContainer>
        <StackMenu></StackMenu>
    </NavigationContainer>
  )
}
