import { useEffect, useState } from "react";
import Block from "../Block";
import { Text, View } from "react-native";
import Title from "../Title";
import { startLesson } from "@/services/lessons";
import { LessonProgress } from "@/types/LessonInterface";
import { router } from "expo-router";

const PlayLesson: React.FC<string> = (lessonId) => {
    const [loading, setLoading] = useState(true);
    const [LessonProgress, setLessonProgress] = useState<LessonProgress>();
    const [signsImages, setSignsImages] = useState<string[]>([]);
    const [responded, setResponded] = useState(false);

    useEffect(() => {
        const runLesson = async () => {
            const result = await startLesson(lessonId);
            if (result !== null)
                setLessonProgress(result);
            else
                router.back();
            setLoading(false);
        };
        runLesson();
    }, []);

    if (loading) {
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
      }

    return (
      <Block >
          <View>
          </View>
      </Block>
    );
}