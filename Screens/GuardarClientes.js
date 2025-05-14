import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function GuardarClientes({ route, navigation }) {

  const {guardarNuevo} = route.params;

  const [cedula, setCedula] = useState('');
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  
  const [clientes, setClientes] = useState([]);
  

  const nuevoCliente = {
    cedula: cedula,
    Nombres: Nombres,
    Apellidos: Apellidos,
    fechaNacimiento: fechaNacimiento,
    sexo: sexo,
  }

  guardarNuevo(nuevoCliente)
  Alert.alert('Dato almacenado correctamente');
  setCedula('');
  setNombres('');
  setApellidos('');
  setFechaNacimiento('');
  setSexo('');

  const guardar = () => {
    if (!cedula || !Nombres) return null;
    const nuevoCliente = {
      nuevacedula: cedula,
      nuevosnombres: Nombres,
      nuevosapellidos: Apellidos,
      nuevafechanac: fechaNacimiento,
      nuevosexo: sexo,
    }
  
    setClientes([nuevoCliente, ...clientes])
    Alert.alert('Datos Almacenados', `
        Cedula: ${cedula}
        Nombres: ${Nombres}
        Apellidos: ${Apellidos}
        Fecha Nacimiento: ${fechaNacimiento}
        sexo: ${sexo}
      `);
    setCedula('');
    setNombres('');
    setApellidos('');
    setFechaNacimiento('');
    setSexo('');

    navigation.goBack();
  };

  const eliminar = guardar.filter((clientes) => clientes!== nuevoCliente);
  console.log(eliminar)
    

  return (

    <View style={styles.contenedor}>
    
      <Text style={styles.label}>Registos De Datos Del Cliente</Text>
    
      <Text style={styles.label}>Cedula:</Text>
      <TextInput 
        style={styles.input}
        value={cedula}
        onChangeText={setCedula}
        placeholder="Ej: 365-130995-0002H"
      />
    
      <Text style={styles.label}>Nombres:</Text>
      <TextInput 
        style={styles.input}
        value={Nombres}
         onChangeText={setNombres}
        placeholder="Ej: Juan Carlos"
      />
          
      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={Apellidos}
        onChangeText={setApellidos}
        placeholder="Ej: Perez Lopez" 
      />
    
      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <TextInput 
        style={styles.input}
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        placeholder="YYYY-MM-DD"
      />
    
      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.Picker}>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
        >
          <Picker.Item label="Seleccione... " value="" />
          <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>
          
        <Button title="Guardar" onPress={guardar} />
    
    </View>
  );
}

const styles = StyleSheet.create({

  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2E7D32'
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    width: 300,
    height: 55,
  },
  Picker: {
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 5,
    marginBottom: 15,
    width: 300,
  },

});