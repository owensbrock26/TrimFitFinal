
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



/*

const MyBannerAdComponent = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log('Advert loaded')}
        onAdFailedToLoad={(error) => console.error('Advert failed to load: ', error)}
      />
    </View>
  );
};

*/