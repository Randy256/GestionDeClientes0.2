import { Alert, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GuardarClientes from './GuardarClientes';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { TextInput } from 'react-native';

import { collection, getFirestore, query, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';

const db=getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {

  const [clientes, setClientes] = useState([]);

  const [busqueda, setBusqueda] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    LeerDatos();
  }, []);

  useEffect(() => {
    if (busqueda.trim() === '') {
      setClientesFiltrados(clientes);
    } else {
      const texto = busqueda.toLowerCase();
      setClientesFiltrados(
        clientes.filter(c =>
          (c.cedula && c.cedula.toLowerCase().includes(texto)) ||
          (c.nombres && c.nombres.toLowerCase().includes(texto)) ||
          (c.apellidos && c.apellidos.toLowerCase().includes(texto)) ||
          (c.fechanac && c.fechanac.toLowerCase().includes(texto)) ||
          (c.sexo && c.sexo.toLowerCase().includes(texto))
        )
      );
    }
  }, [busqueda, clientes]);

  const guardarNuevo = async(nuevo) => {
    await setDoc(doc(db, "clientes", nuevo.cedula), nuevo);
  };

  useEffect(() =>{
    LeerDatos();
  }), [clientes];

  const LeerDatos = async() => {
    const q = query(collection(db, "clientes"));
    const queryShapshot = await getDocs(q);
    const d = [];
    queryShapshot.forEach((doc) => {
      const datosBD = doc.data();
      d.push(datosBD);
    });
    setClientes(d);
  }

  const Editar = (cliente) => {
    const guardarNuevo = async(nuevo) => {
      const id = cliente ? cliente.cedula : nuevo.cedula;
      await setDoc(doc(db, "clientes", id), nuevo);
      Alert.alert('Datos Actualizados', `
          Cedula: ${nuevo.cedula}
          Nombres: ${nuevo.nombres}
          Apellidos: ${nuevo.apellidos}
          Fecha Nacimiento: ${nuevo.fechanac}
          sexo: ${nuevo.sexo}
        `);
      LeerDatos();
    };
    navigation.navigate('GuardarClientes', { guardarNuevo, cliente, esEdicion: true });
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
          onPress: async () => {
            await deleteDoc(doc(db, "clientes", cedula));
            Alert.alert('Cliente eliminado');
          }
        },
      ],
      { cancelable: true }
    );
  }

  return (

    <View style={styles.container}>

      <View style={{ position: 'relative', marginBottom: 15 }}>
        <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#999',
          borderRadius: 5,
          padding: 8,
          paddingRight: 40,
          width: '100%',
          backgroundColor: '#fff',
        }}
        placeholder="Buscar cliente por cualquier dato..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <TouchableOpacity 
        style={{
        position: 'absolute',
        right: 10,
        top: 10,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }} 
      >
        <FontAwesome5 name="search" size={24} color="green" />
      </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => navigation.navigate('GuardarClientes', { guardarNuevo })}
      >
        <AntDesign name="adduser" size={24} color="green" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Lista de Clientes</Text>
      {clientesFiltrados.length === 0 ? (
        <Text style={styles.mensaje}>No hay clientes registrados.</Text>
      ) : (
        <ScrollView style={styles.lista}>
          {clientesFiltrados.map((i, index) => (
            <View key={index} style={styles.card}>
              <MaterialCommunityIcons name="delete-forever" size={24} color="green" 
              onPress={() => eliminar(i.cedula)} /> 
              <Entypo name="edit" size={24} color="green" 
              onPress={() => Editar(i)} />
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