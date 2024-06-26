import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { PaletteName, ColorDesc } from '@/models/color-palette.model'
import colorPaletteStore from '@/stores/color-palette.store'

export default function PalettePreview({ name }: { name: PaletteName }) {
  // const { ColorPaletteByType } = useColorPalette()
  // const someColors: ColorDesc[] = ColorPaletteByType.get(type).slice(0, 5)
  const someColors: ColorDesc[] = colorPaletteStore.useStoreState(state => state.first5ColorsOf(name))
  return (
    <View style={styles.container}>
      <Text style={styles.typeText}>{name}</Text>
      <FlatList
        style={styles.previewList}
        data={someColors}
        renderItem={({ item }) => (
          <View 
            key={item.colorName} 
            style={[styles.previewBox, { backgroundColor: item.hexCode }]} 
          />
        )}
        keyExtractor={(item) => item.colorName}
        horizontal={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  previewList: {
    //backgroundColor: 'white'
  },
  previewBox: {
    width: 50,
    height: 50,

    margin: 10,
  
    shadowColor: 'black',  
    shadowOffset: { width: 0, height: 1 }, //| [IOS]
    shadowOpacity: 0.3,                    //|
    shadowRadius: 1,                       //|
    elevation:  5,                         //| [ANDROID]
  }
})