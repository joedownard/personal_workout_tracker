import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '5%',
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
    fontSize: 56,
    paddingTop: 60,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  exerciseName: {
    textAlign: 'left',
    fontSize: 16,
    width: '33%',
    paddingRight: 5,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  exerciseWeightText: {
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 35,
    width: 70,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  exerciseSetsText: {
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 5,
    width: 55,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  exerciseItemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  exerciseItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  exerciseTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  daySelectorContainer: {
    paddingTop: 70,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  daySelector: {
    flex: 1,
  },
  daySelectorTextContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  daySelectorPressable: {
    textAlign: 'left',
    width: '18%',
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  incrementButtonText: {
    paddingLeft: 15,
    fontSize: 34,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
});
