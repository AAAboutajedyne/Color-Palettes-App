import MyText from "@/components/MyText";
import { Link } from "expo-router";
import { useCallback } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Home() {
  return (<>
    {/* <Redirect href="/(colorSchemes)/" /> */}
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        <Text style={{color: "crimson"}}>Welcom</Text>e{' '}
        <Text style={{color: "orange"}}>to</Text>{' '}
        Col<Text style={{color: "pink"}}>or</Text>{' '}
        <Text style={{color: "chocolate"}}>palettes</Text>{' '}
        <Text style={{color: "purple"}}>Ap</Text>p.
      </Text>
      <Link href="/(colorSchemes)/">
        👉 <Text style={styles.link}>Getting started</Text>
      </Link>
    </View>
  </>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcomeText: {
    color: '',
    fontSize: 24,
  },

  link: {
    fontSize: 17,
    textDecorationLine: "underline"
  }
})