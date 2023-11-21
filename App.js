import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import styled from "styled-components/native";
import TabelaAgenda from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react";

// variaveis utilitarias globais


const Header = styled.View`
width: 100%;
height: 70px;
background-color: #0d5fc0;
padding: 20px;
align-items: center;
justify-content: center;
`

const Title = styled.Text`
color: #fff;
font-size: 20px;
`;

const Button = styled.TouchableOpacity`
width: 100%;
height: 40px;
background-color: #0f70d2;
padding: 4px;
border-radius: 3px;
margin: 5px;
align-items: center;
`

const InputArea = styled.View`
width: 60%;
height: 100%;
background-color: #fff;
`

const Input = styled.TextInput`
width: 100%;
background-color: lightgray;
padding: 5px;
border-radius: 3px;
margin: 5px;
`

export default function App() {

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [telefoneBuscado, setTelefoneBuscado] = useState()
  const [success, setSuccess] = useState('')
  

  // useEffect(() => {
  //   if (nome.length == 0) {
  //     setTelefoneBuscado('')
  //   }
  // }, [nome, telefone])

  const armazenar = (nome, tel) => {
    if (nome && tel) {
      alert('Telefone adicionado com sucesso')
      setSuccess('Telefone adicionado')
      TabelaAgenda.setItem(nome, tel)
      setNome('')
      setTelefone('')
    } else {
      alert('preencha os campos')
    }
  }

  const buscar = async (nome) => {
    const res = await TabelaAgenda.getItem(nome)
    if (res) {
      alert(`telefone de ${nome} foi encontrado no banco de dados: ${res}`)
      setTelefoneBuscado(res)
      setNome('')
    } else {
      alert(`${nome} não foi encontrado no banco de dados`)
      setNome('')
    }
  }

  const remover = (nome) => {
    if (nome) {
      TabelaAgenda.removeItem(nome)
      alert(`${nome}, removido do banco de dados.`)
      setTelefoneBuscado('')
      setNome('')
      setTelefone('')
    } else {
      alert(`${nome} não existe no banco de dados`)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Title>Agenda do Ítalo Oliveira</Title>
      </Header>
      <InputArea>
        <Input placeholder='Nome' value={nome} onChangeText={(value) => setNome(value)}></Input>
        <Input placeholder='Telefone' value={telefone} onChangeText={(value) => setTelefone(value)} keyboardType='numeric'></Input>

        <Button onPress={() => { armazenar(nome, telefone) }} style={styles.btn}>
          <Text style={styles.textWhite}>Adicionar</Text>
        </Button>

        <Button onPress={() => { buscar(nome) }} style={styles.btn}>
          <Text style={styles.textWhite}>Buscar</Text>
        </Button>

        {/* <Text>{telefoneBuscado}</Text> */}

        <Button onPress={() => { remover(nome) }} style={styles.btn}>
          <Text style={styles.textWhite}>Remover</Text>
        </Button>

        {/* <Text style={styles.telefoneAdicionado}>{success}</Text> */}
      </InputArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: "center"
  },
  textWhite: {
    color: '#fff',
  },
  telefoneAdicionado: {
    marginTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    justifyContent: 'center'
  }
});
