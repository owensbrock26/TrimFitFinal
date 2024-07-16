import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const ScanBarcode = ({ onBarcodeScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);


  useEffect(() => {
    console.log('Barcode:', barcode);  // Log the barcode variable
  
    if (barcode) {
      console.log('Making API request...');  // Log before making the API request
  
      axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(response => {
          console.log('API response:', response);  // Log the entire API response
  
          const { product } = response.data;
          if (product) {
            const { product_name, serving_quantity, nutriments } = product;
            if (nutriments) {
              const proteins = Math.round(nutriments['proteins_serving'] || nutriments['proteins_100g']);
              const energy = Math.round(nutriments['energy-kcal_serving'] || nutriments['energy-kcal_100g']);  // Get energy in kilocalories
              const fats = Math.round(nutriments['fat_serving'] || nutriments['fat_100g']);
              const sugars = Math.round(nutriments['sugars_serving'] || nutriments['sugars_100g']);
              const carbohydrates = Math.round(nutriments['carbohydrates_serving'] || nutriments['carbohydrates_100g']);
            
              // Call the onBarcodeScanned callback with the nutritional information as parameters
              onBarcodeScanned({
                productName: product_name,
                servingQuantity: serving_quantity,
                proteins,
                energy,
                fats,
                sugars,
                carbohydrates
              });
            } else {
              console.log('No nutritional data available for this product');
            }
          } else {
            console.log('No product data available for this barcode');
          }
        })
        .catch(error => {
          console.error('API request error:', error);  // Log any errors that occur during the API request
        })
        .finally(() => {
          console.log('API request completed');  // Log when the API request is completed, regardless of whether it was successful or not
        });
    }
  }, [barcode]);
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
  };

  if (hasPermission === null) {
    return <Text></Text>;
  }
  if (hasPermission === false) {
    return <Text></Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default ScanBarcode;




/*

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const ScanBarcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log('Barcode:', barcode);  // Log the barcode variable
  
    if (barcode) {
      console.log('Making API request...');  // Log before making the API request
  
      axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(response => {
          console.log('API response:', response);  // Log the entire API response
  
          const { product } = response.data;
          if (product) {
            const { product_name, serving_quantity, nutriments } = product;
            if (nutriments) {
              const proteins = Math.round(nutriments['proteins_serving'] || nutriments['proteins_100g']);
              const energy = Math.round(nutriments['energy-kcal_serving'] || nutriments['energy-kcal_100g']);  // Get energy in kilocalories
              const fats = Math.round(nutriments['fat_serving'] || nutriments['fat_100g']);
              const sugars = Math.round(nutriments['sugars_serving'] || nutriments['sugars_100g']);
              const carbohydrates = Math.round(nutriments['carbohydrates_serving'] || nutriments['carbohydrates_100g']);
            
              // Navigate to the CustomRecipe screen with the nutritional information as parameters
              navigation.navigate('CustomRecipe', {
                productName: product_name,
                servingQuantity: serving_quantity,
                proteins,
                energy,
                fats,
                sugars,
                carbohydrates,
              });
            } else {
              console.log('No nutritional data available for this product');
            }
          } else {
            console.log('No product data available for this barcode');
          }
        })
        .catch(error => {
          console.error('API request error:', error);  // Log any errors that occur during the API request
        })
        .finally(() => {
          console.log('API request completed');  // Log when the API request is completed, regardless of whether it was successful or not
        });
    }
  }, [barcode]);
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default ScanBarcode;



*/

