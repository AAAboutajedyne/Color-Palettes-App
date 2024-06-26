import React from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import ColorBox from '@/components/ColorBox';
import { Stack, useLocalSearchParams } from 'expo-router';
import { PaletteName, ColorDesc } from '@/models/color-palette.model';
import colorPaletteStore from '@/stores/color-palette.store';

const ColorPaletteDetails = () => {
  const { paletteName } = useLocalSearchParams()
  console.log("paletteName: ", paletteName);
  const colorsOf = colorPaletteStore.useStoreState(state => state.colorsOf);
  const paletteColors = colorsOf(paletteName as PaletteName)
  
  return (<>
    <Stack.Screen options={{
      title: paletteName?.toString()
    }}
    />
    <FlatList
      style={styles.container}
      data={paletteColors}
      keyExtractor={item => item.hexCode}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      // ListHeaderComponent={<Text style={styles.heading}>Solarized</Text>}
    />
  </>);
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 20,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPaletteDetails;