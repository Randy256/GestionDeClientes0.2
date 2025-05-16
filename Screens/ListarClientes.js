import { Alert, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GuardarClientes from './GuardarClientes';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ListarClientes({ navigation }) {

  const [clientes, setClientes] = useState([]);

  const guardarNuevo = (nuevo) => {
    setClientes([nuevo, ...clientes])
  };

  const eliminar = (cedula) => {
    Alert.alert(
      'Confirmar eliminacion',
      '¿Estas seguro de que deseas eliminar este cliente?',
      [
        {
          text: 'cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setClientes(clientes.filter(cliente => cliente.cedula !== cedula));
            Alert.alert('Cliente eliminado');
          }
        },
      ],
      { cancelable: true }
    );
  }

  return (

    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => navigation.navigate('GuardarClientes', { guardarNuevo })}
      >
        <AntDesign name="adduser" size={24} color="green" />
      </TouchableOpacity>

      <Text style={styles.titulo}>ListarClientes</Text>
      {clientes.length === 0 ? (
        <Text style={styles.mensaje}>No hay clientes registrados.</Text>
      ) : (
        <ScrollView style={styles.lista}>
          {clientes.map((i, index) => (
            <View key={index} style={styles.card}>
              <MaterialCommunityIcons name="delete-forever" size={24} color="green" 
              onPress={() => eliminar(i.cedula)}   />
              <Text style={styles.label}>Cedula: <Text style={styles.valor}>{i.cedula}</Text> </Text>
              <Text style={styles.label}>Nombres: <Text style={styles.valor}>{i.nombres}</Text> </Text>
              <Text style={styles.label}>Apellidos: <Text style={styles.valor}>{i.apellidos}</Text> </Text>
              <Text style={styles.label}>Fecha de Nacimiento: <Text style={styles.valor}>{i.fechanac}</Text> </Text>
              <Text style={styles.label}>Sexo: <Text style={styles.valor}>{i.sexo}</Text> </Text>
            </View>
          ))}
        </ScrollView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  lista: {
    flex: 1
  },
  card: {
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2
  },
  label: {
    fontWeight: 'bold',
    color: '#1B5E20',
    fontSize: 16,
  },
  valor: {
    fontSize: 16,
    marginBottom: 6,
    color: '#2E7D32',
    fontWeight: '400',
  },
});