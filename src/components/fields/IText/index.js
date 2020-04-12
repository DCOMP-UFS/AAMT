import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Color } from '../../../styles/global';

function IText( props ) {
  return (
    <TextInput 
      style={ styles.input } 
      {...props} 
    />
  )
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    height: 45,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.border_input,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  }
});

export default IText;