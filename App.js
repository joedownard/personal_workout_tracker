import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useState, Component} from 'react';

import styles from './Styles';
import Pullups from './Pullups';
import Program from './Program';

const App: () => React$Node = () => {
  const [currentPage, setCurrentPage] = useState('Pullups');

  return (
    <>
      {currentPage === 'Pullups' && <Pullups />}
      {currentPage === 'Program' && <Program />}
      <View style={styles.buttonsView}>
        <Pressable
          onPress={() => {
            setCurrentPage('Program');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Program</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setCurrentPage('Pullups');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Pullups</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default App;
