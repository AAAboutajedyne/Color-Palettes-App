import React, { useCallback, useEffect, useMemo } from 'react'
import { View, TouchableOpacity, FlatList, RefreshControl, Pressable, Text, StyleSheet } from 'react-native'
import { Link, useRouter } from 'expo-router'
import PalettePreview from '@/components/PalettePreview';
import colorPaletteStore from '@/stores/color-palette.store';
import useFetchColorPalettes from '@/hooks/useFetchColorPalettes';
import { ColorPalette } from '@/models/color-palette.model';
import { RouteProp, useRoute } from '@react-navigation/native';

export type ColorSchemesHomeRouteParams = {
  newColorPalette: ColorPalette,
}

function useUpdateColorPalettesStore(colorPalettes: ColorPalette[]) {
  const mergeColorPalettes = colorPaletteStore.useStoreActions(actions => actions.mergeColorPalettes)

  useEffect(() => {
    console.log("useUpdateColorPalettesStore effect called: ", `(size= ${colorPalettes?.length ?? 0})`);
    if(colorPalettes && colorPalettes.length > 0) {
      mergeColorPalettes(colorPalettes)
    }
  }, [colorPalettes])
}

export default function ColorSchemesHome() {
  const { colorPalettes: fetchedColorPalettes, isFetching, refresh } = useFetchColorPalettes()
  const route = useRoute<RouteProp<{index: ColorSchemesHomeRouteParams}>>()
  const colorPalettes = useMemo(() => {
    console.log("[ColorSchemesHome] merging color palettes: ", fetchedColorPalettes?.length, route.params?.newColorPalette)
    return [
      ...(route.params.newColorPalette ? [route.params.newColorPalette] : []),
      ...(fetchedColorPalettes ?? [])
    ]
  }, [fetchedColorPalettes, route.params])
  
  useUpdateColorPalettesStore(colorPalettes);

  const paletteNames = colorPaletteStore.useStoreState(state => state.paletteNames)
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <FlatList
        data={paletteNames}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => router.navigate({
            pathname: "/color-palette-details",
            params: {
              paletteName: item,
            }
          })}>
            <PalettePreview name={item} />
          </TouchableOpacity>
        )}
        refreshing={isFetching}
        onRefresh={refresh}
        ListHeaderComponent={
          <Link href="./color-palette-modal" asChild>
            <Pressable>
              <Text style={styles.addColorSchemeText}>Add a color scheme</Text>
            </Pressable>
          </Link>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  addColorSchemeText: {
    color: "teal",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 15
  }
})

