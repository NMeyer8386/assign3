import React, { Component } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

// needs to be called globally because state variables SUCK
let tempArray = [];

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
        // responsible for the rendering of the button: callback for button press
          <TouchableOpacity
              disabled={this.props.btnDisabled}
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
          durationMS: 350,
          topLColour: topLeftColours[0],
          topRColour: topRightColours[0],
          bottomLColour: bottomLeftColours[0],
          bottomRColour: bottomRightColours[0],
          startEnabled: true,
          simonCombo: [],
          userCombo: [],
          currentRound: 1,
          btnDisabled: true,
          isRunning: false,
          buttonColour: 'blue',
      };
  }
  
  // called when difficulty buttons are pressed, determines how many random numbers are put into the game array
  /*  
  TODO: Figure out why the game breaks when playing hard after winning easy
  FIX: tempArray was never being cleared when start buttons were pressed
  */
  start = (diff) => {
    let tempCombo = [];
    let tempGameLength = 0;
    tempArray = [];
    this.setState({
      isRunning: true,
      btnDisabled: true,
      userCombo: [],
      simonCombo: [],
      currentRound: 1,
    });

    // difficulty 1 is a game length of 5
    if(diff == 1){

      tempGameLength = 5;

      console.log('start easy');
      for(let i = 0; i < tempGameLength; i++){
        let simonNum = Math.floor(Math.random() * 500 % 4);
        tempCombo = [...tempCombo , simonNum];
      }

      this.setState({
        simonCombo: tempCombo,
        durationMS: 250,
      });

    // difficulty 2 is a game length of 10
    } else if (diff == 2){

      tempGameLength = 10;

      console.log('start hard');
      for(let i = 0; i < tempGameLength; i++){
        let simonNum = Math.floor(Math.random() * 500 % 4);
        tempCombo = [...tempCombo , simonNum];
      }

      this.setState({
        simonCombo: tempCombo,
        durationMS: 200
      });
    }
    // any delay at all somehow is enough time to let an array be set?????
    // set a longer delay because of how the buttons flash 
      setTimeout(() => { 
        this.scheduler(this.state.currentRound);
      }, 100);


  }

  // makes the specified button "blink" (stolen from Stephen)
  scheduler = (count) => {
    this.setState({
      btnDisabled: true,
    })
    // sets a temporary array so blinks can be incremented
    for (let i = 0; i < count; i++){
      tempArray[i] = this.state.simonCombo[i];
    }

    //handles the blink loop
    if (count >= 0) {
        // blink and callback the next blink (recursion)
        this.blink(this.scheduler.bind(this, --count), tempArray[tempArray.length - (count + 1)]);
    } else if (count <= 2){
      this.setState({
        btnDisabled: false,
      })
    }
  }

  // makes the specifiec button blink
  blink(callback, button) {
      setTimeout(() => {
        
          // turn the light "on" (after a second)
            switch(button){
          case 0:
            this.setState({topLColour: topLeftColours[1]})
            break;
          case 1:
            this.setState({topRColour: topRightColours[1]})
            break;
          case 2:
            this.setState({bottomLColour: bottomLeftColours[1]})
            break;
          case 3:
            this.setState({bottomRColour: bottomRightColours[1]})
            break;
          }

          setTimeout(() => {
              // turn the light off after one second
              this.setState({ 
                topLColour: topLeftColours[0],
                topRColour: topRightColours[0],
                bottomLColour: bottomLeftColours[0],
                bottomRColour: bottomRightColours[0],
              });
              if (callback) callback(); // call the next scheduled event.
          }, this.state.durationMS);
      }, this.state.durationMS);
  }

  // called when the simon buttons are pressed. The "response"
  /*
  TODO: process userCombo input and compare to simonCombo with a for loop using userCombo.length, initiate next round with an
  incrementing int (while < simoncombo.length?)
  */
  btnPressed = (num) => {
    let matching = true;
    this.setState({
      userCombo: [...this.state.userCombo, num],
    })
    setTimeout(() => {

      // compares the two arrays to see if they're the same
      if (this.state.isRunning && (this.state.userCombo.length <= this.state.simonCombo.length)){
        for(let i = 0; i < this.state.userCombo.length; i++){
          matching = matching && (this.state.userCombo[i] == this.state.simonCombo[i]);
          // console.log(this.state.userCombo[i] + " " + this.state.simonCombo[i]);
        }
      }

      //outputs win alert
      if(matching && (this.state.userCombo.length == this.state.simonCombo.length)){
        Alert.alert("You win!");
        this.setState({
          btnDisabled: true,
          isRunning: false,
        })
      }

      //progress to the next round
      if(matching && (this.state.currentRound == this.state.userCombo.length) && this.state.isRunning){
        this.setState({
          currentRound: this.state.currentRound + 1,
          userCombo: [],
        })
        this.scheduler(this.state.currentRound);
      }

      //outputs loss alert
      if(!matching){
        Alert.alert("You lose!");
        this.setState({
          btnDisabled: true,
          isRunning: false,
        })
      }
    });

    
  }

  render(){
  return (
    <View style={styles.container}>

      {/* tester text box to display array */}
      {/* <Text>{this.state.simonCombo}</Text> */}

      {/* top half of funny buttons */}
      <View style={styles.topHalf}>
        <Light style={styles.topLeft} color={this.state.topLColour} num={0} callback={this.btnPressed} btnDisabled={this.state.btnDisabled}/>
        <Light style={styles.topRight} color={this.state.topRColour} num={1} callback={this.btnPressed} btnDisabled={this.state.btnDisabled}/>
      </View>

      {/* bottom half of funny buttons */}
      <View style={styles.bottomHalf}>
        <Light style={styles.bottomLeft} color={this.state.bottomLColour} num={2} callback={this.btnPressed} btnDisabled={this.state.btnDisabled}/>
        <Light style={styles.bottomRight} color={this.state.bottomRColour} num={3} callback={this.btnPressed} btnDisabled={this.state.btnDisabled}/>  
      </View>

      {/* 
      Difficulty buttons control how many rounds the player goes through
      They also cause the simon buttons to light up for testing purposes
      */}
      <View style={styles.rowContainer}>

        {/* while the game is running, buttons disappear!! */}
        {!this.state.isRunning &&
        <Pressable 
        style={[styles.startButton, {backgroundColor: 'blue'}]}
        onPress={() => [this.start(1), 
          this.setState({
            topLColour: topLeftColours[1],
            topRColour: topRightColours[1],
            bottomLColour: bottomLeftColours[1],
            bottomRColour: bottomRightColours[1],
          }),
        setTimeout(() => {
          this.setState({
            topLColour: topLeftColours[0],
            topRColour: topRightColours[0],
            bottomLColour: bottomLeftColours[0],
            bottomRColour: bottomRightColours[0],
          })
        }, 100),]}>
          <Text style={styles.btnText}>Start Easy</Text>
        </Pressable>
        }
        {!this.state.isRunning &&
        <Pressable 
        style={[styles.startButton, {backgroundColor: 'red'}]}
        onPress={() => [this.start(2), 
          this.setState({
            topLColour: topLeftColours[1],
            topRColour: topRightColours[1],
            bottomLColour: bottomLeftColours[1],
            bottomRColour: bottomRightColours[1],
          }),
        setTimeout(() => {
          this.setState({
            topLColour: topLeftColours[0],
            topRColour: topRightColours[0],
            bottomLColour: bottomLeftColours[0],
            bottomRColour: bottomRightColours[0],
          })
        }, 100),]}
          >
          <Text style={styles.btnText}>Start Hard</Text>
        </Pressable>
  }
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
    },

  rowContainer: {
    flexDirection: 'row',
    },

  landingTextBox: {
    paddingTop: 100,
    paddingBottom: 50,
    margin: 10,
    width: '60%',
  },

  landingText: {
    fontSize: 20,    
    textAlign: 'center',
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
