import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, Text, View} from 'react-native';
import styles from './Styles';
import {storeObject, getObject} from './DataStorage';

function constructExerciseItem() {
  return (
    <View style={styles.exerciseItem}>
      <Text>test</Text>
    </View>
  );
}

export default function Program(props) {
  const [constructorRun, setConstructorRun] = useState(false);
  const [day, setDay] = useState(0);
  const [exercises, setExercises] = useState([
    [
      {
        exerciseName: 'Squat',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 80,
      },
      {
        exerciseName: 'Close-Grip BP',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 60,
      },
      {
        exerciseName: 'DB Incline Press',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 22,
      },
      {
        exerciseName: 'DB Lat Raise',
        exerciseSets: 3,
        exerciseReps: 12,
        exerciseWeight: 10,
      },
      {
        exerciseName: 'Calf Raise Leg Press',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 150,
      },
    ],
    [
      {
        exerciseName: 'Deadlift',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 115,
      },
      {
        exerciseName: 'DB Pullover',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 28,
      },
      {
        exerciseName: 'DB Rear Delt Raise',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 10,
      },
      {
        exerciseName: 'Standing BB Curl',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 37.5,
      },
      {
        exerciseName: 'DB Forearm Curl',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 8,
      },
    ],
    [
      {
        exerciseName: 'Military Press',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 50,
      },
      {
        exerciseName: 'Goblet Squat',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 34,
      },
      {
        exerciseName: 'OH DB Tricep Ext',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 10,
      },
      {
        exerciseName: 'Machine Chest Press',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 50,
      },
      {
        exerciseName: 'Ab Machine',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 27.5,
      },
    ],
    [
      {
        exerciseName: 'Lat Pulldown',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 73,
      },
      {
        exerciseName: 'Diverging Seated Row',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 52,
      },
      {
        exerciseName: 'Lying Leg Curl',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 54,
      },
      {
        exerciseName: 'Incline DB Press',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 16,
      },
      {
        exerciseName: 'Calf Raise Leg Press',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 150,
      },
    ],
    [
      {
        exerciseName: 'Bench Press',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 65,
      },
      {
        exerciseName: 'Lat Raise Inc Bench',
        exerciseSets: 3,
        exerciseReps: 8,
        exerciseWeight: 10,
      },
      {
        exerciseName: 'Leg Extension',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 67.5,
      },
      {
        exerciseName: 'Rope Tricep Pulldown',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 22.5,
      },
      {
        exerciseName: 'DB Forearm Curl',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 8,
      },
    ],
    [
      {
        exerciseName: 'Pendlay Row',
        exerciseSets: 3,
        exerciseReps: 6,
        exerciseWeight: 55,
      },
      {
        exerciseName: 'Romanian Deadlift',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 75,
      },
      {
        exerciseName: 'Straight Arm Pulldown',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 22.5,
      },
      {
        exerciseName: 'Cable Curl',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 25,
      },
      {
        exerciseName: 'Ab Machine',
        exerciseSets: 3,
        exerciseReps: 10,
        exerciseWeight: 27.5,
      },
    ],
  ]);

  if (!constructorRun) {
    setConstructorRun(true);
    getObject('@exercises').then((r) => {
      if (r != null) {
        setExercises(r);
      }
    });
  }

  function onModifyReps(itemNum, change) {
    let modifiedExercises = {...exercises};
    modifiedExercises[day][itemNum].exerciseReps += change;
    setExercises(modifiedExercises);

    storeObject('@exercises', exercises);
  }

  function onModifyWeight(itemNum, change) {
    let modifiedExercises = {...exercises};
    modifiedExercises[day][itemNum].exerciseWeight += change;
    setExercises(modifiedExercises);

    storeObject('@exercises', exercises);
  }

  function ConstructExerciseItem(props) {
    const exercise = props.exercise;
    return (
      <View style={styles.exerciseItemContainer}>
        <View style={styles.exerciseItem}>
          <View style={styles.exerciseTextContainer}>
            <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
            <Text style={styles.exerciseSetsText}>
              {exercise.exerciseSets} x {exercise.exerciseReps}
            </Text>
            <View>
              <Pressable onPress={() => onModifyReps(props.num, 1)}>
                <Text style={styles.incrementButtonText}>+</Text>
              </Pressable>
              <Pressable onPress={() => onModifyReps(props.num, -1)}>
                <Text style={styles.incrementButtonText}>-</Text>
              </Pressable>
            </View>
            <Text style={styles.exerciseWeightText}>
              {exercise.exerciseWeight}
            </Text>
            <View>
              <Pressable onPress={() => onModifyWeight(props.num, 1)}>
                <Text style={styles.incrementButtonText}>+</Text>
              </Pressable>
              <Pressable onPress={() => onModifyWeight(props.num, -1)}>
                <Text style={styles.incrementButtonText}>-</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.daySelectorContainer}>
          <View style={styles.daySelector}>
            <View style={styles.daySelectorTextContainer}>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(0)}>
                <Text style={styles.daySelectorText}>1</Text>
              </Pressable>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(1)}>
                <Text style={styles.daySelectorText}>2</Text>
              </Pressable>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(2)}>
                <Text style={styles.daySelectorText}>3</Text>
              </Pressable>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(3)}>
                <Text style={styles.daySelectorText}>4</Text>
              </Pressable>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(4)}>
                <Text style={styles.daySelectorText}>5</Text>
              </Pressable>
              <Pressable
                style={styles.daySelectorPressable}
                onPress={() => setDay(5)}>
                <Text style={styles.daySelectorText}>6</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <ConstructExerciseItem exercise={exercises[day][0]} num={0} />
        <ConstructExerciseItem exercise={exercises[day][1]} num={1} />
        <ConstructExerciseItem exercise={exercises[day][2]} num={2} />
        <ConstructExerciseItem exercise={exercises[day][3]} num={3} />
        <ConstructExerciseItem exercise={exercises[day][4]} num={4} />
      </ScrollView>
    </>
  );
}
