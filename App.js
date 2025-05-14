import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './Navegacion';
import ListarClientes from './Screens/ListarClientes';

export default function App({ Navigator }) {

  return (

    <Navegacion style={styles.container}></Navegacion>
    
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
