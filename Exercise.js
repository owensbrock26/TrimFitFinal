import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Exercise({ route, navigation }) {
    const { workout } = route.params;
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{workout.name}</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
          {/* Add your workout details here */}
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Exercise;




/*

"react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-1107416661606980~9855155085",
    "ios_app_id": "ca-app-pub-1107416661606980~7807576241"
  }


*/