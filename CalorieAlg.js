const calculateNutrition = (totalCalories) => {
    const protein = Math.round(totalCalories * 0.07); // 0.7% of total calories
    const carbs = Math.round(totalCalories / 7.27272727);
    const fats = Math.round(totalCalories / 23.5294118);
    const sugar = Math.round(totalCalories / 40);
  
    return { totalCalories, protein, carbs, fats, sugar };
  };
  
  export default calculateNutrition;



  /*


{
  "expo": {
    "name": "TrimFit",
    "slug": "TrimFitFinal",
    "version": "1.0.7",
    "orientation": "portrait",
    "icon": "./assets/images/FinalAppIcon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/FinalAppIcon.png",
      "resizeMode": "contain",
      "backgroundColor": "#232526"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.owensbrcok26.TrimFitProduction"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/FinalAppIcon.png",
        "backgroundColor": "#232526"
      },
      "permissions": [
        "android.permission.CAMERA"
      ],
      "package": "com.owensbrcok26.TrimFitProduction"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-barcode-scanner",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera to scan food barcodes check our privacy policy for more information",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ],
      "react-native-google-mobile-ads"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "9f640de3-5467-46f3-9fee-4d74a7cf79e5"
      }
    }
  },
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-1107416661606980~9855155085",
    "ios_app_id": "ca-app-pub-1107416661606980~7807576241"
  }
}



  */