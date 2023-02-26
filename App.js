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
          durationMS: 350,
          topLColour: topLeftColours[0],
          topRColour: topRightColours[0],
          bottomLColour: bottomLeftColours[0],
          bottomRColour: bottomRightColours[0],
          startEnabled: true,
          simonCombo: [],
          userCombo: [],
          currentRound: 1,
          btnDisabled: false,
          buttonColour: 'blue',
      };
  }
  
  // called when difficulty buttons are pressed, determines how many random numbers are put into the game array
  start = (diff) => {
    let tempCombo = [];
    let tempGameLength = 0;
    this.setState({
      btnDisabled: true,
    })
    if(diff == 1){

      tempGameLength = 5;

      console.log('start easy');
      for(let i = 0; i < tempGameLength; i++){
        let simonNum = Math.floor(Math.random() * 500 % 4);
        tempCombo = [...tempCombo , simonNum];
      }

      this.setState({
        simonCombo: tempCombo,
      });

    } else if (diff == 2){

      tempGameLength = 10;

      console.log('start hard');
      for(let i = 0; i < tempGameLength; i++){
        let simonNum = Math.floor(Math.random() * 500 % 4);
        tempCombo = [...tempCombo , simonNum];
      }

      this.setState({
        simonCombo: tempCombo,
      });
    }

      setTimeout(() => { // any delay at all somehow is enough time to let an array be set?????
        console.log(this.state.simonCombo);
        this.scheduler(this.state.currentRound);
      });


  }

  // makes the specified button "blink"
  scheduler = (count) => {
    // sets a temporary array so blinks can be incremented
    for (let i = 0; i < count; i++){
      tempArray[i] = this.state.simonCombo[i];
    }

    //handles the blink loop
    if (count >= 0) {
        // blink and callback the next blink (recursion)
        this.blink(this.scheduler.bind(this, --count), tempArray[tempArray.length - (count + 1)]);
    } else {
        this.setState({ btnDisabled: false });
    }
  }

  //makes the specifiec button blink
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
  // TODO: process userCombo input and compare to simonCombo with a for loop using userCombo.length, initiate next round with an
  //incrementing int (while < simoncombo.length?)
  btnPressed = (num) => {
    console.log("pressed" + num);
    let matching = true;
    this.setState({
      userCombo: [...this.state.userCombo, num],
    })
    setTimeout(() => {

      // compares the two arrays to see if they're the same
      if (this.state.userCombo.length < this.state.simonCombo.length){
        for(let i = 0; i < this.state.userCombo.length; i++){
          matching = matching && (this.state.userCombo[i] == this.state.simonCombo[i]);
          console.log(this.state.userCombo[i] + " " + this.state.simonCombo[i]);
        }

      console.log(matching);
      if(matching && (this.state.currentRound == this.state.userCombo.length)){
        this.setState({
          currentRound: this.state.currentRound + 1,
          userCombo: [],
        })
        this.scheduler(this.state.currentRound);
      }

      }
    });

    
  }

  render(){
  return (
    <View style={styles.container}>

      {/* tester text box to display array */}
      <Text>{this.state.simonCombo}</Text>

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
