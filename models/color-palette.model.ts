export type PaletteName = string
export type ColorDesc = {colorName: string, hexCode: string}
export interface ColorPalette {
  id?: number,
  paletteName: string,
  colors: ColorDesc[]
}