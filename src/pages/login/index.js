import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import IText from '../../components/fields/IText';
import logo from '../../assets/icon_mark.png';

import { 
  styles,
  Container, 
  ViewAppName, 
  AppName,
  Body,
  Brand
} from './styles';
import { Color, ContainerForm, FormGroup } from '../../styles/global';

export default function Login({ navigation }) {
  const [ usuario, setUsuario ] = useState("");
  const [ senha, setSenha ] = useState("");

  function navigateToSettings() {
    navigation.navigate('Agente');
  }

  async function handleSubmit() {
    navigateToSettings();
  }

  return (
    <LinearGradient
      colors={[ Color.purple , Color.blue ]}
      style={{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
      }}
    >
      <Container>
        <Body>
          <Brand>
            <LinearGradient
              colors={[ Color.blue, Color.purple  ]}
              style={ styles.gradientBrand }
            >
              <Image source={ logo } style={{ width: 65, height: 80 }} />
            </LinearGradient>
          </Brand>

          <ViewAppName>
            <AppName>AAMT</AppName>
          </ViewAppName>

          <ContainerForm>
            <FormGroup>
              <IText 
                onChangeText={ text => setUsuario( text )}
                value={ usuario }
                placeholder="Usuário"
                autoCompleteType="username"
              />
            </FormGroup>
            <FormGroup>
              <IText 
                onChangeText={ text => setSenha( text )}
                value={ senha }
                placeholder="Senha"
                secureTextEntry={ true }
                autoCompleteType="password"
              />
            </FormGroup>

            <TouchableOpacity style={ styles.submitButton } onPress={ handleSubmit }>
              <Text style={ styles.textSubmit }>Entrar</Text>
            </TouchableOpacity>
          </ContainerForm>
        </Body>
        
        <View>
          <Text style={ styles.textVersion } >version dev.1.0</Text>
        </View>
        {/* <Button title="Navigate to Agent" onPress={ navigateToSettings } /> */}
      </Container>
    </LinearGradient>
  );
}
