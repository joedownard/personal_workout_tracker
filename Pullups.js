import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, Text, View} from 'react-native';
import styles from './Styles';
import {storeObject, getObject} from './DataStorage';

export default function Pullups(props) {
  const [constructorRun, setConstructorRun] = useState(false);
  const [days, setDays] = useState(0);
  const [sets, setSets] = useState([5, 4, 3, 2, 1]);
  const [setsStyle, setSetsStyle] = useState([
    'black',
    'black',
    'black',
    'black',
    'black',
  ]);

  if (!constructorRun) {
    setConstructorRun(true);
    updateSets();
  }

  function updateSets() {
    getObject('@day_count').then((r) => {
      if (r == null) {
        storeObject('@day_count', 0).then(() =>
          console.log('Started tracking date.'),
        );
      } else {
        setDays(r);
      }

      setSets([
        Math.floor(r / 5) + 5,
        Math.floor((r + 1) / 5) + 4,
        Math.floor((r + 2) / 5) + 3,
        Math.floor((r + 3) / 5) + 2,
        Math.floor((r + 4) / 5) + 1,
      ]);
    });
  }

  function textOnPress(value) {
    let updated_array = {...setsStyle};
    if (updated_array[value] === 'black') {
      updated_array[value] = 'green';
    } else {
      updated_array[value] = 'black';
    }
    setSetsStyle(updated_array);
  }

  function textStyle(value) {
    return {
      textAlign: 'center',
      top: '25%',
      fontSize: 72,
      color: setsStyle[value],
      fontStyle: 'normal',
    };
  }

  function onDoneButtonPress() {
    setDays(days + 1);
    setSetsStyle(['black', 'black', 'black', 'black', 'black']);
    storeObject('@day_count', days + 1).then(() =>
      console.log('Incremented days.'),
    );
    updateSets();
  }

  function onResetButtonPress() {
    setDays(0);
    setSetsStyle(['black', 'black', 'black', 'black', 'black']);
    storeObject('@day_count', 0).then(() => console.log('Reset days.'));
    updateSets();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View>
          <Text style={styles.titleText}>Day {days}</Text>
        </View>

        <View style={styles.container}>
          <Pressable onPress={() => textOnPress(0)}>
            <Text style={textStyle(0)}>{sets[0]}</Text>
          </Pressable>
          <Pressable onPress={() => textOnPress(1)}>
            <Text style={textStyle(1)}>{sets[1]}</Text>
          </Pressable>
          <Pressable onPress={() => textOnPress(2)}>
            <Text style={textStyle(2)}>{sets[2]}</Text>
          </Pressable>
          <Pressable onPress={() => textOnPress(3)}>
            <Text style={textStyle(3)}>{sets[3]}</Text>
          </Pressable>
          <Pressable onPress={() => textOnPress(4)}>
            <Text style={textStyle(4)}>{sets[4]}</Text>
          </Pressable>
        </View>

        <View style={styles.doneButton}>
          <Pressable onPress={() => onResetButtonPress()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Reset</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.doneButton}>
          <Pressable onPress={() => onDoneButtonPress()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Done</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
