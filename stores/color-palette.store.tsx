import React from "react";
import { action, Action, computed, Computed, createContextStore, thunk, Thunk } from "easy-peasy"
import { ColorDesc, ColorPalette, PaletteName } from "@/models/color-palette.model";

const SOLARIZED = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

/** Easy-peasy solution */
interface ColorPaletteStoreModel {
  colorPalettesByName: Map<PaletteName, { colors: ColorDesc[], addedAt: number }>;
  
  paletteNames: Computed<ColorPaletteStoreModel, PaletteName[]>;
  colorsOf: Computed<ColorPaletteStoreModel, (_: PaletteName) => ColorDesc[]>;
  first5ColorsOf: Computed<ColorPaletteStoreModel, (_: PaletteName) => ColorDesc[]>;
  mergeColorPalettes: Action<ColorPaletteStoreModel, ColorPalette[]>;
  // updateColorPalettes: Action<ColorPaletteStoreModel, ColorPalette[]>;
  // fetchColorPalettes: Thunk<ColorPaletteStoreModel>;
}

const colorPaletteStore = createContextStore<ColorPaletteStoreModel>({
  //-- state ------------
  colorPalettesByName: new Map([
    ["Solarized", { colors: SOLARIZED, addedAt: Date.now() }],
  ]),

  //-- getters / computed ------------
  paletteNames: computed(state => {
    // return Array.from(state.colorPalettesByName.keys())
    const paletteNames: {value: string, addedAt: number}[] = [];
    state.colorPalettesByName.forEach(({ addedAt }, key) => {
      paletteNames.push({ value: key, addedAt })
    })

    return paletteNames
      .sort((a, b) => b.addedAt - a.addedAt)
      .map(item => item.value);
  }),
  colorsOf: computed(state => {
    return (paletteName: PaletteName) => 
      state.colorPalettesByName.get(paletteName)?.colors ?? [];
  }),
  first5ColorsOf: computed(state => {
    return (paletteName: PaletteName) => 
      state.colorsOf(paletteName)?.slice(0, 5) ?? [];
  }),
  

  //-- actions --------------
  mergeColorPalettes: action((state, colorPalettes: ColorPalette[]) => {
    console.log("[colorPaletteStore] mergeColorPalettes called with: ", colorPalettes, colorPalettes.length)
    // const colorPalettesByName = new Map<PaletteName, ColorDesc[]>();
    colorPalettes.forEach(item => {
      if(!state.colorPalettesByName.has(item.paletteName)) {
        state.colorPalettesByName.set(item.paletteName, { 
          colors: item.colors,
          addedAt: Date.now()
        })
      }
    });
    return { ...state };
  }, { immer: false }),

  // updateColorPalettes: action((state, colorPalettes: ColorPalette[]) => {
  //   console.log("[colorPaletteStore] updateColorPalettes called with: ", colorPalettes, colorPalettes.length)
  //   const colorPalettesByName = new Map<PaletteName, { colors: ColorDesc[], addedAt: number }>();
  //   colorPalettes.forEach(item => {
  //     colorPalettesByName.set(item.paletteName, { 
  //       colors: item.colors,
  //       addedAt: Date.now()
  //     })
  //   });
  //   return { ...state, colorPalettesByName }
  // }, { immer: false }),


  //-- thunks / effects --------------
  // fetchColorPalettes: thunk(async (actions) => {

  //   actions.updateColorPalettes()
  // })

});

export default colorPaletteStore;

/* Context API solution
function ContextAPISolution() {
// const ColorPaletteContext = React.createContext(undefined);

// export function useColorPalette() {
//   const context = React.useContext(ColorPaletteContext)
//   if (!context) {
//     throw new Error(`useColorPalette must be used within a ColorPaletteProvider`)
//   }
//   return context
// }

// export function ColorPaletteProvider(props) {
//   const value = {
//     paletteTypes,
//     ColorPaletteByType,
//   }

//   return (
//     <ColorPaletteContext.Provider value={value} {...props} />
//   )
// }

}
*/