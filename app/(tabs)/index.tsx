import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Platform, Text } from 'react-native';
import { View, type ViewProps } from 'react-native';

export default function HomeScreen() {
  const [flameCount, setFlameCount] = useState<number>(0);
  const [starCount, setStarCount] = useState<number>(0);
  const [heartCount, setHeartCount] = useState<number>(0);
  const [currentUnit, setCurrentUnit] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [currentChapterName, setCurrentChapterName] = useState<string>("Le bug réseau");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  return (
    <View style={styles.container}>
      <Link style={styles.stepContainer} href={"/(tabs)/courses"}>
        Chapitre {currentChapter}, Unité {currentUnit}
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    backgroundColor: 'purple',
    color: 'white',
    alignItems: 'center',
  },

});

