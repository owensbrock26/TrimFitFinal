import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from "react-native";
import Weightlifting from './Weightlifting';
import Workouts from './assets/images/Workouts.png';
import MealPlannerIMG from './assets/images/MealPlannerIMG.png';
import MealPlanner from './MealPlanner';
import WeightTracker from "./WeightTracker";
import WeightTrackerIMG from './assets/images/WeightTrackerIMG.png';
import SettingsIMG from './assets/images/SettingsIMG.png';
import MyBannerAdComponent from "./MyBannerAdComponent";
import Settings from "./Settings";

const Tools = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  if (selectedPage === 'Weightlifting') {
    return <Weightlifting setToolPage={setSelectedPage} />;
  }


/*
  if (selectedPage === 'MealPlanner') {
    return <MealPlanner setToolPage={setSelectedPage} />;
  }
*/

/*
  if (selectedPage === 'WeightTracker') {
    return <WeightTracker setToolPage={setSelectedPage} />;
  }
*/


  if (selectedPage === 'Settings') {
    return <Settings setToolPage={setSelectedPage} />;
  }




  const sections = ['Weightlifting', 'MealPlanner', 'WeightTracker', 'Settings', ];
  const sectionImages = [Workouts, MealPlannerIMG, WeightTrackerIMG, SettingsIMG, ];

  return (
    <View style={styles.container}>
      <View style={styles.bannerAd}>
      <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      {sections.map((section, index) => (
  <ImageBackground key={index} source={sectionImages[index]} style={styles.section}>
    {(index === 1 || index === 2) && ( // Adjusted this line
      <View style={styles.overlay}>
        <Text style={styles.comingSoon}>Coming Soon</Text>
      </View>
    )}
    <TouchableOpacity style={styles.touchable} onPress={() => setSelectedPage(section)} />
  </ImageBackground>
))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%', // Add padding on all 4 sides as a percentage of the screen
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    backgroundColor: '#17181a',
    paddingBottom: '3%',

    
  },
  section: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%', // Add space between each section
    borderRadius: 35, // Round the corners
    overflow: 'hidden', // Ensure the image doesn't spill out of the rounded corners

  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: "center", // Centers the ad horizontally
    marginTop: '2%', // Adjusts the space from the top
  },
});


export default Tools;



/* 
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from "react-native";
import Weightlifting from './Weightlifting';
import Workouts from './assets/Workouts.png';
import HealthGoalSoon from './assets/HealthGoalSoon.png';
import WaterPicSoon from './assets/WaterPicSoon.png';
import SleepingIMG  from './assets/SleepingIMG.png';

const Tools = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  if (selectedPage === 'Weightlifting') {
    return <Weightlifting setToolPage={setSelectedPage} />;
  }

  const sections = ['Weightlifting', 'SleepingIMG', 'WaterPicSoon', 'HealthGoalSoon'];
  const sectionImages = [Workouts, SleepingIMG, WaterPicSoon, HealthGoalSoon];

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <ImageBackground key={index} source={sectionImages[index]} style={styles.section}>
          {index !== 0 && (
            <View style={styles.overlay}>
              <Text style={styles.comingSoon}>Coming Soon</Text>
            </View>
          )}
          <TouchableOpacity style={styles.touchable} onPress={() => setSelectedPage(section)} />
        </ImageBackground>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%', // Add padding on all 4 sides as a percentage of the screen
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    backgroundColor: '#17181a',
  },
  section: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%', // Add space between each section
    borderRadius: 35, // Round the corners
    overflow: 'hidden', // Ensure the image doesn't spill out of the rounded corners
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default Tools;

*/



