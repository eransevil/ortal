import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';

// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState('Initializing AR...');

const InitialScene = props => {
  const [rotation, setRotation] = useState([-70, 0, 0]);
  const [position, setPosition] = useState([0, -3, -5]);
  let data = props.sceneNavigator.viroAppProps;
  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require('./assets/wood.jpg'),
    },
  });

  //move object on drag
  const moveObject = newposition => {
    setPosition(newposition)
    console.log('newposition', newposition);
  };

  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let newRotation = [
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ];
      setRotation(newRotation)
      console.log('curr rotation', rotation);
      console.log('rotationFactor', rotationFactor);
      console.log('rotateState', rotateState);
    }
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {data.object === 'firePlace1' ? (
        <Viro3DObject
          source={require('./assets/firePlace1/13110_Fireplace_v2_l3.obj')}
          position={position}
          scale={ [0.015, 0.015, 0.015]  }
          rotation={/* [-70, 0, 0] */ rotation}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
        />
      ) : (
        <Viro3DObject
          source={require('./assets/firePlace2/ojaq.obj')}
          position={position}
          scale={[0.015, 0.015, 0.015]  }
          rotation={/* [0, 90, 0] */ rotation}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  const [objectForDispaly, setObjectForDispaly] = useState('firePlace1');

  const ChangeObject = () => {
    console.log('objectForDispaly', objectForDispaly);
    if (objectForDispaly === 'firePlace1')
      return setObjectForDispaly('firePlace2');
    setObjectForDispaly('firePlace1');
  };

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        viroAppProps={{object: objectForDispaly}}
        styles={{flex: 1}}
      />
      <View style={styles.controlsView}>
        <TouchableOpacity onPress={ChangeObject}>
          <Text style={styles.text}>Switce FirePlace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// }

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  controlsView: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    margin: 15,
    backgroundColor: '#003FF7',
    color: 'white',
    padding: 12,
    fontWeight: 'bold',
    borderRadius: 50,
  },
});
