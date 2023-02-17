import React, { Component } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bWidth = 5;
const wHRadius = 150;

class Light extends Component {
  constructor(props) {
      super(props);
  };

  render() {
      return (
          <TouchableOpacity
              style={[this.props.style, {backgroundColor: this.props.color}]}
          />
      );
  }
}

export default class App extends Component {
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
  render(){
  return (
    <View style={styles.container}>

      {/* top half of funny buttons */}
      <View style={styles.topHalf}>
        <Light style={styles.topLeft} color={this.state.topLeftColor}/>
        <Light style={styles.topRight} color={this.state.topRightColor}/>
      </View>

      {/* bottom half of funny buttons */}
      <View style={styles.bottomHalf}>
        <Light style={styles.bottomLeft} color={this.state.bottomLeftColor}/>
        <Light style={styles.bottomRight} color={this.state.bottomRightColor}/>  
      </View>

      {/* start button */}
      <View>

      </View>

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
