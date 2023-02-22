import React, { Component } from 'react'
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// CSS styling variables so I can control multiple elements at once
const bWidth = 5;
const wHRadius = 150;

// Landing Text
const landingText = "Welcome to Simple Simon! Press the coloured buttons in the same sequence that they light up";

// Arrays for button colours: index 0 is default and index 1 is lighter for the game's call & response
const topLeftColours = ['#5BDF2B', '#84F16C'];
const topRightColours = ['#EC1919', '#ED6262'];
const bottomLeftColours = ['#EBD924', '#F1E66F'];
const bottomRightColours = ['#2B30F4', '#8083F6'];

// Touchable opacities for the simon buttons. Uses a callback to register presses and which button was pressed
class Light extends Component {
  constructor(props) {
      super(props);
      this.state = {
      onPress: props.callback,
      };
  };

  render() {
      return (
          <TouchableOpacity
              style={[this.props.style, {backgroundColor: this.props.color}]}
              num={this.props.num}
              onPress={() => {this.state.onPress(this.props.num)}}
          />
      );
  }
}

// The simon game itself. All game logic is handled here
class Simon extends Component {
  constructor(props) {
      super(props);
      this.state = {
          timesToBlink: 5,
          durationMS: 1000,
          topLColour: topLeftColours[0],
          topRColour: topRightColours[0],
          bottomLColour: bottomLeftColours[0],
          bottomRColour: bottomRightColours[0],
          startEnabled: true,
          simonCombo: [],
          userCombo: [],
          flaccidLength: 5,   //Easy difficulty
          hardLength: 10,     //Hard Difficulty
          btnDisabled: false,
          buttonColour: 'blue',
      };
  }
  
  // called when difficulty buttons are pressed, determines how many random numbers are put into the game array
  start = (diff) => {
    this.setState({
      btnDisabled: true,
    })
    if(diff == 1){
      console.log('start easy');
      for(let i = 0; i < this.state.flaccidLength; i++){
        let simonNum = Math.floor(Math.random() * 500 % 4);
        let simonCombo = [...simonCombo , simonNum];
        console.log(simonCombo);
        this.gameStart();
      }
    } else if (diff == 2){
      console.log('start hard');
      for(let i = 0; i < this.state.hardLength; i++){

      }
    }
  }

  //handles the blinking of the buttons. The "call"
  gameStart = () => {
    for(let i = 0; i <= this.state.simonCombo.length; i++){
      for(let j = 0; j <= i; j++){
        switch(this.state.simonCombo[i]){
          case 0:

          case 1:

          case 2:

          case 3:

          default:
        }
      }
    }
  }

  // makes the specified button "blink"
  blink = (button) => {

  }

  // called when the simon buttons are pressed. The "response"
  btnPressed = (num) => {
    console.log('pressed'+ num);
  }

  render(){
  return (
    <View style={styles.container}>

      {/* top half of funny buttons */}
      <View style={styles.topHalf}>
        <Light style={styles.topLeft} color={this.state.topLColour} num={0} callback={this.btnPressed}/>
        <Light style={styles.topRight} color={this.state.topRColour} num={1} callback={this.btnPressed}/>
      </View>

      {/* bottom half of funny buttons */}
      <View style={styles.bottomHalf}>
        <Light style={styles.bottomLeft} color={this.state.bottomLColour} num={2} callback={this.btnPressed}/>
        <Light style={styles.bottomRight} color={this.state.bottomRColour} num={3} callback={this.btnPressed}r/>  
      </View>

      {/* 
      Difficulty buttons control how many rounds the player goes through
      They also cause the simon buttons to light up for testing purposes
      */}
      <View style={styles.rowContainer}>
        <Pressable 
        style={[styles.startButton, {backgroundColor: this.state.btnDisabled?'grey':'blue'}]}
        disabled={this.state.btnDisabled}
        onPress={() => this.start(1)}
        onPressIn={() =>  
          this.setState({
            topLColour: topLeftColours[1],
            topRColour: topRightColours[1],
            bottomLColour: bottomLeftColours[1],
            bottomRColour: bottomRightColours[1],
          })}
        onPressOut={() => 
          this.setState({
            topLColour: topLeftColours[0],
            topRColour: topRightColours[0],
            bottomLColour: bottomLeftColours[0],
            bottomRColour: bottomRightColours[0],
          })}>
          <Text style={styles.btnText}>Start Easy</Text>
        </Pressable>

        <Pressable 
        style={[styles.startButton, {backgroundColor: this.state.btnDisabled?'grey':'red'}]}
        disabled={this.state.btnDisabled}
        onPressIn={() => [this.start(2), 
          this.setState({
            topLColour: topLeftColours[1],
            topRColour: topRightColours[1],
            bottomLColour: bottomLeftColours[1],
            bottomRColour: bottomRightColours[1],
          })]}
        onPressOut={() => 
          this.setState({
            topLColour: topLeftColours[0],
            topRColour: topRightColours[0],
            bottomLColour: bottomLeftColours[0],
            bottomRColour: bottomRightColours[0],
          })}>
          <Text style={styles.btnText}>Start Hard</Text>
        </Pressable>
      </View>
        
    </View>
  );
  }
}

// The rendiering of the app. Displays the landing text and calls the Simon class
export default class App extends Component {
  
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.landingTextBox}>
          <Text style={styles.landingText}>{landingText}</Text>
        </View>
        <Simon/>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    },

  rowContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'blue',
    },

  landingTextBox: {
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 50,
    margin: 10,
    width: '60%',
    borderWidth: 1,
    borderColor: 'red',
  },

  landingText: {
    fontSize: 20,
  },

  topLeft: {
    borderTopLeftRadius: wHRadius, //top left
    width: wHRadius,
    height: wHRadius,
    borderWidth: bWidth,
    borderRadius: 4,
  },
  
  topRight: {
    borderTopRightRadius: wHRadius, //top right
    width: wHRadius,
    height: wHRadius,
    borderWidth: bWidth,
    borderRadius: 4,
  },

  bottomLeft: {
    borderBottomLeftRadius: wHRadius, //bottom left
    width: wHRadius,
    height: wHRadius,
    borderWidth: bWidth,
    borderRadius: 4,
  },

  bottomRight: {
    borderBottomRightRadius: wHRadius, //bottom left
    width: wHRadius,
    height: wHRadius,
    borderWidth: bWidth,
    borderRadius: 4,
  },

  topHalf: {
    flexDirection: 'row',
  },

  bottomHalf: {
    flexDirection: 'row',
  },

  startButton: {
    backgroundColor: 'royalblue',
    borderColor: 'gray',
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding:10,
    marginTop: 100,
    alignItems: 'center',
    width: '30%',
  },

  btnText: {
      color: 'white',
      fontSize: 18,
    },

});
