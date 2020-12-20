/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import {useState, Component} from 'react';

const App: () => React$Node = () => {
  return <PullupPage />;
};

class PullupPage extends Component {
  constructor() {
    super();
    this.state = {
      sets: [5, 4, 3, 2, 1],
      setsComplete: ['black', 'black', 'black', 'black', 'black'],
      dayDifference: 0,
    };
    this.updateSets();
  }

  updateSets() {
    getObject().then((r) => {
      let dayDifference = 0;
      if (r == null) {
        storeObject(0).then(() => console.log('Started tracking date.'));
      } else {
        dayDifference = r;
      }
      this.setState({
        dayDifference: dayDifference,
      });

      this.setState({
        sets: [
          Math.floor(dayDifference / 5) + 5,
          Math.floor((dayDifference + 1) / 5) + 4,
          Math.floor((dayDifference + 2) / 5) + 3,
          Math.floor((dayDifference + 3) / 5) + 2,
          Math.floor((dayDifference + 4) / 5) + 1,
        ],
      });
    });
  }

  render() {
    const styles = {
      buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
      },
      button: {
        backgroundColor: '#000000',
        borderWidth: 20,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
      },
      doneButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '10%',
        paddingLeft: '38%',
        paddingRight: '10%',
      },
      buttonText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 20,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 0.04,
        textTransform: 'uppercase',
        color: '#FFFFFF',
      },
      container: {
        position: 'relative',
      },
      titleText: {
        left: '34%',
        top: '25%',
        fontSize: 56,
        paddingBottom: 25,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
      },
    };

    const textOnPress = (value) => {
      let updated_array = this.state.setsComplete;
      if (updated_array[value] === 'black') {
        updated_array[value] = 'green';
      } else {
        updated_array[value] = 'black';
      }
      this.setState(updated_array);
    };

    const onDonePress = () => {};

    const textStyle = (value) => {
      return {
        left: '47%',
        top: '25%',
        fontSize: 56,
        color: this.state.setsComplete[value],
        fontFamily: 'Roboto',
        fontStyle: 'normal',
      };
    };

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.titleText}>
                Day {this.state.dayDifference}
              </Text>
            </View>
            <View style={styles.container}>
              <Pressable onPress={() => textOnPress(0)}>
                <Text style={textStyle(0)}>{this.state.sets[0]}</Text>
              </Pressable>
              <Pressable onPress={() => textOnPress(1)}>
                <Text style={textStyle(1)}>{this.state.sets[1]}</Text>
              </Pressable>
              <Pressable onPress={() => textOnPress(2)}>
                <Text style={textStyle(2)}>{this.state.sets[2]}</Text>
              </Pressable>
              <Pressable onPress={() => textOnPress(3)}>
                <Text style={textStyle(3)}>{this.state.sets[3]}</Text>
              </Pressable>
              <Pressable onPress={() => textOnPress(4)}>
                <Text style={textStyle(4)}>{this.state.sets[4]}</Text>
              </Pressable>
            </View>
            <View style={styles.doneButton}>
              <Pressable
                onPress={() => {
                  this.setState({
                    dayDifference: this.state.dayDifference + 1,
                    setsComplete: ['black', 'black', 'black', 'black', 'black'],
                  });
                  console.log(this.state.dayDifference);
                  storeObject(this.state.dayDifference + 1);
                  this.updateSets();
                }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.buttonsView}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Program</Text>
              </View>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Pullups</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const storeObject = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@days_completed', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@days_completed');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export default App;
