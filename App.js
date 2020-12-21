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

  updateSets = () => {
    getObject('@day_count').then((r) => {
      let dayDifference = 0;
      if (r == null) {
        storeObject('@day_count', 0).then(() =>
          console.log('Started tracking date.'),
        );
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
  };

  textOnPress = (value) => {
    let updated_array = this.state.setsComplete;
    if (updated_array[value] === 'black') {
      updated_array[value] = 'green';
    } else {
      updated_array[value] = 'black';
    }
    this.setState(updated_array);
  };

  textStyle = (value) => {
    return {
      textAlign: 'center',
      top: '25%',
      fontSize: 72,
      color: this.state.setsComplete[value],
      fontStyle: 'normal',
    };
  };

  onDoneButtonPress = () => {
    this.setState({
      dayDifference: this.state.dayDifference + 1,
      setsComplete: ['black', 'black', 'black', 'black', 'black'],
    });
    storeObject('@day_count', this.state.dayDifference + 1);
    this.updateSets();
  };

  onResetButtonPress = () => {
    this.setState({
      dayDifference: 0,
      setsComplete: ['black', 'black', 'black', 'black', 'black'],
    });
    storeObject('@day_count', 0);
    this.updateSets();
  };

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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10%',
        paddingLeft: '38%',
        paddingRight: '10%',
      },
      buttonText: {
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
        textAlign: 'center',
        top: '25%',
        fontSize: 56,
        paddingBottom: 25,
        fontWeight: 'bold',
        fontStyle: 'normal',
      },
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
              <Pressable onPress={() => this.textOnPress(0)}>
                <Text style={this.textStyle(0)}>{this.state.sets[0]}</Text>
              </Pressable>
              <Pressable onPress={() => this.textOnPress(1)}>
                <Text style={this.textStyle(1)}>{this.state.sets[1]}</Text>
              </Pressable>
              <Pressable onPress={() => this.textOnPress(2)}>
                <Text style={this.textStyle(2)}>{this.state.sets[2]}</Text>
              </Pressable>
              <Pressable onPress={() => this.textOnPress(3)}>
                <Text style={this.textStyle(3)}>{this.state.sets[3]}</Text>
              </Pressable>
              <Pressable onPress={() => this.textOnPress(4)}>
                <Text style={this.textStyle(4)}>{this.state.sets[4]}</Text>
              </Pressable>
            </View>

            <View style={styles.doneButton}>
              <Pressable onPress={() => this.onResetButtonPress()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Reset</Text>
                </View>
              </Pressable>
            </View>

            <View style={styles.doneButton}>
              <Pressable onPress={() => this.onDoneButtonPress()}>
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

const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export default App;
