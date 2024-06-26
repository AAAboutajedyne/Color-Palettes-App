# Color Palettes App (Training/Course Material)
This is a companion repo for the "Introduction to React Native / Expo" course. This application is built from scratch throughout the course.
## About project
Color Palettes is a React native mobile application to manage color palettes using:
  - Expo features: Expo Router (File-based routing), Expo SDK, Expo dev client

  - React Navigation: to customize passing data between screens
    - [USED_ALONGSIDE] Expo Router.

  - Easy-peasy: for State management, easy and similar to Pinia (in Vue ecosystem)
    - [ALTERNATIVE_TO] React-redux

  - Vercel SWR: React Hooks for data fetching, which provides a Built-in cache (stale-while-revalidate strategy), request deduplication, remote mutation, ... 
    - [USED_ALONGSIDE] natvie Fetch API

  - TypeScript: for type-safety
  
### Features
- Fetch color palettes from an API using native Fetch + useSWR/useSWRImmutable Vercel hooks
- Store fetched data in a redux store using Easy-peasy
- List all fetch color palettes
- Pull down to refresh: uses Vercel SWR mutation API
- Push "Add new palette" modal
- Handle form inputs inside the modal
- Merge new added palette with fetched palettes, and add them to redux store
- Define computed properties in store (paletteNames, first5ColorsOf, ...) to derive state with great performance benefits
- and more ...

## Setup
1. Install dependencies:
```bash
> npm install
```
2. Since the app is using a developement build (expo-dev-client), you need to [build the app locally](https://docs.expo.dev/guides/local-app-development/) or use [EAS (Expo Application Services) build](https://docs.expo.dev/build/introduction/) 
```bash
# build app loacally
  > npm run android[ | ios]
  ##Or 
  > npx expo run:android[ | ios]
# EAS build ([REQUIREMENT] eas command needs to be installed, eas account is required)
> eas build --platform android[ | ios]
```

3. Start the dev server & launch the app
```bash
> npm run start
#Or 
> expo start --android[ | ios]
```

4. Scan QR code or press 'a'/'i' to start Android emulator / iOS simulator

## Credits:
Thanks to:
  - [React Native](https://reactnative.dev/docs/components-and-apis),
  - [Expo](https://docs.expo.dev/versions/latest/),
  - [Kadi Kraman](https://github.com/kadikraman) for her courses on FrontEndMasters/Egghead and Materials for this project,
  - [Easy-peasy v6](https://easy-peasy.dev/),
  - [Vercel SWR](https://swr.vercel.app/docs/api),
  

<br/>

---
<p align="right">Written with Love ❤️</p>