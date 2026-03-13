import { View, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';



export default function Page() {

  const [nota, setNota] = useState('');

  async function salvarNota() {

  if (nota.trim() === '') {
    Alert.alert('Escreva uma nota primeiro');
    return;
  }



  Alert.alert('Nota guardada com sucesso!');
}


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nota do louvor</Text>

      <TextInput
        placeholder="Escreva uma nota..."
        value={nota}
        onChangeText={setNota}
        style={styles.input}
        multiline
      />

      <Pressable style={styles.botao} onPress={salvarNota}>
        <Text style={styles.textoBotao}>💾 Guardar nota</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 15
  },
  botao: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 6
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
});
