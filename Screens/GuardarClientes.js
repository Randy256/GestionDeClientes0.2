import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function GuardarClientes({ route, navigation }) {

  const { guardarNuevo, cliente, esEdicion } = route.params || {};

  const [cedula, setCedula] = useState(cliente ? cliente.cedula : '');
  const [Nombres, setNombres] = useState(cliente ? cliente.nombres : '');
  const [Apellidos, setApellidos] = useState(cliente ? cliente.apellidos: '');
  const [fechaNacimiento, setFechaNacimiento] = useState(cliente ? cliente.fechanac : '');
  const [sexo, setSexo] = useState(cliente ? cliente.sexo : '');

  useEffect(() => {
    if (cliente) {
      setCedula(cliente.cedula);
      setNombres(cliente.nombres);
      setApellidos(cliente.apellidos);
      setFechaNacimiento(cliente.fechanac);
      setSexo(cliente.sexo);
    }
  }, [cliente]);

  const guardar = () => {
    if (!cedula || !Nombres) return null;
    const nuevoCliente = {
      cedula: esEdicion && cliente ? cliente.cedula : cedula,
      nombres: Nombres,
      apellidos: Apellidos,
      fechanac: fechaNacimiento,
      sexo: sexo,
    };
    guardarNuevo(nuevoCliente);

    Alert.alert(
      esEdicion ? 'Datos Actualizados' : 'Datos Almacenados', 
      `
        Cedula: ${esEdicion && cliente ? cliente.cedula : cedula}
        Nombres: ${Nombres}
        Apellidos: ${Apellidos}
        Fecha Nacimiento: ${fechaNacimiento}
        sexo: ${sexo}
      `
    );


    if (!esEdicion) {
      setCedula('');
      setNombres('');
      setApellidos('');
      setFechaNacimiento('');
      setSexo('');
    }

    navigation.goBack();
  };



  return (

    <View style={styles.contenedor}>

      <Text style={styles.label}>
        {esEdicion ? 'Editar Datos del Cliente' : 'Registros De Datos Del Cliente'}
      </Text>

      <Text style={styles.label}>Cedula:</Text>
      <TextInput
        style={styles.input}
        value={cedula}
        onChangeText={setCedula}
        placeholder="Ej: 365-130995-0002H"
        editable={!esEdicion}
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

      <Button title={esEdicion ? 'Actualizar' : 'Guardar'} 
      onPress={guardar}/>

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