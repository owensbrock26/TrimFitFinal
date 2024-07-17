import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import CFBhome from ".assets/images/CFBhome.jpg";

// Define ad unit IDs for iOS and Android
const iosAdUnitId = 'ca-app-pub-1107416661606980/4342546320';
const androidAdUnitId = 'ca-app-pub-1107416661606980/1413130658';

// Select ad unit ID based on the platform
const adUnitId = __DEV__ ? TestIds.BANNER : Platform.select({
  ios: iosAdUnitId,
  android: androidAdUnitId,
});

const MyBannerAdComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={CFBhome} // Replace 'your_image_url_here' with your image URL
        style={StyleSheet.absoluteFill} // This makes the image fill the parent View
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log('Advert loaded')}
        onAdFailedToLoad={(error) => console.error('Advert failed to load: ', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%', // Set the width to match the ad size or parent width
    height: 50, // Adjust the height based on the ad size
    position: 'relative', // This enables absolute positioning for children
  },
});

export default MyBannerAdComponent;



/*


import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Define ad unit IDs for iOS and Android
const iosAdUnitId = 'ca-app-pub-1107416661606980/4342546320';
const androidAdUnitId = 'ca-app-pub-1107416661606980/1413130658';

// Select ad unit ID based on the platform
const adUnitId = __DEV__ ? TestIds.BANNER : Platform.select({
  ios: iosAdUnitId,
  android: androidAdUnitId,
});

const MyBannerAdComponent = () => {
  return (
    <View style={styles.container}>
      <BannerAd
  unitId={adUnitId}
  size={BannerAdSize.BANNER} // Changed from FULL_BANNER to BANNER
  requestOptions={{
    requestNonPersonalizedAdsOnly: true,
  }}
  onAdLoaded={() => console.log('Advert loaded')}
  onAdFailedToLoad={(error) => console.error('Advert failed to load: ', error)}
/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyBannerAdComponent;

*/