import React, { Component } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bWidth = 5;
const wHRadius = 150;
const landingText = "Welcome to Simple Simon! Press the coloured buttons in the same sequence that they light up";

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
              onPress={() => {this.state.onPress()}}
          />
      );
  }
}

class Simon extends Component {
  constructor(props) {
      super(props);
      this.state = {
          timesToBlink: 5,
          durationMS: 1000,
          topLeftColor: 'limegreen',
          topRightColor: 'red',
          bottomLeftColor: 'yellow',
          bottomRightColor: 'blue',
          startEnabled: true,
      };
  }

  pressed = () => {
    console.log('pressed');
  }

  render(){
  return (
    <View style={styles.vertContainer}>

      {/* top half of funny buttons */}
      <View style={styles.topHalf}>
        <Light style={styles.topLeft} color={this.state.topLeftColor} callback={this.pressed}/>
        <Light style={styles.topRight} color={this.state.topRightColor} callback={this.pressed}/>
      </View>

      {/* bottom half of funny buttons */}
      <View style={styles.bottomHalf}>
        <Light style={styles.bottomLeft} color={this.state.bottomLeftColor} callback={this.pressed}/>
        <Light style={styles.bottomRight} color={this.state.bottomRightColor} callback={this.pressed}/>  
      </View>

    </View>
  );
  }
}

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    },

  vertContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'blue',
    },

  landingTextBox: {
    textAlign: 'center',
    padding: 10,
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

});
