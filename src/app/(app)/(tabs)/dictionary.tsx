import { getSigns } from "@/services/dictionnary";
import { Sign } from "@/types/LessonInterface";
import Block from "@components/Block";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Dictionary() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSigns = async () => {
      const response = await getSigns();
      setSigns(response);
      setLoading(false);
    }
    loadSigns();
  }, []);

  if (loading){
    return (
      <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </Block>
    );
  }
  return (
    <Block>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
      {signs.map((letter, index) => (
        <TouchableOpacity key={index} style={{ margin: 10 }} onPress={() => router.push({pathname: '/(app)/[sign]', params: {word: letter.word}})}>
          <Text>{letter.word}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
})