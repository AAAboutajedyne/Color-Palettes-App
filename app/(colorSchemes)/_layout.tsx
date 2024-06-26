import { Stack } from "expo-router";
import colorPaletteStore from "@/stores/color-palette.store";

export default function Layout() {
  return (
    <colorPaletteStore.Provider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="color-palette-modal" options={{ 
          title: "Add new palette",
          presentation: "modal",
        }} />
      </Stack>
    </colorPaletteStore.Provider>
  );
}
