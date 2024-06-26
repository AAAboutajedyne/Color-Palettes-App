import { View, Text, StyleSheet, TextInput, Button, Alert, Switch, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { NavigationProp } from '@react-navigation/native'
import { ColorSchemesHomeRouteParams } from './index'
import ALL_COLORS from '@/constants/colors.data'
import { ColorDesc } from '@/models/color-palette.model'

export default function ColorPaletteModal() {
  const [name, setName] = useState("")
  const [selectedColors, setSelectedColors] = useState<ColorDesc[]>([])

  const navigation = useNavigation<NavigationProp<{index: ColorSchemesHomeRouteParams}>>()

  const handleSwitchValueChange = useCallback((isOn: boolean, currentColor: ColorDesc) => {
    if(isOn) {
      setSelectedColors(colors => [...colors, currentColor])
    } else {
      setSelectedColors(colors => colors.filter(aColor => aColor !== currentColor))
    }
  }, [])

  const handleSubmit = useCallback(() => { 
    if(!name) {
      Alert.alert("Please enter a name!")
      return;
    }

    if(selectedColors.length < 3) {
      Alert.alert("Please select at least 3 colors!")
      return;
    }

    navigation.navigate("index", {
      newColorPalette: {
        paletteName: name,
        colors: selectedColors
      }
    })
  }, [name, selectedColors])

  useEffect(() => {
    console.log("[ColorPaletteModal] selectedColors: ", selectedColors)
  }, [selectedColors])

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text>Name of your color palette:</Text>
        <TextInput value={name} onChangeText={setName} 
          placeholder="Palette name" style={styles.nameInput}
        />
      </View>
      <FlatList data={ALL_COLORS} keyExtractor={item => item.colorName} 
        style={styles.colorListContainer}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        renderItem={({item}) => (
          <View style={styles.colorListEntry}>
            <Text>{item.colorName}</Text>
            <Switch value={selectedColors.includes(item)}
              onValueChange={isOn => handleSwitchValueChange(isOn, item)} />
          </View>
        )}
      />
      <Button color="teal" title="Submit" onPress={handleSubmit} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 10,
    backgroundColor: "white",
  },
  nameContainer: {
    gap: 5
  },
  colorListContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  colorListEntry: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal:15,
    // borderColor: "red",
    // borderWidth: 2,
  },
  nameInput: {
    padding: 8 ,
    fontSize: 17,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5
  },
  separator: {
    width: "95%",
    height: 1,
    margin: "auto",
    borderWidth: .5,
    borderColor: "grey"
  }
})