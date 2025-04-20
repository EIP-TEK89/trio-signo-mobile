import Block from '@/components/Block';
import PlayLesson from '@/components/Lessons/PlayLesson';
import { getLessonRequest } from '@/services/lessons';
import { Lesson, LessonWithExercises, Sign } from '@/types/LessonInterface';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LessonScreen() {
    const { lesson } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [lessonWithExercises, setLessonWithExercises] = useState<LessonWithExercises | undefined>(undefined);

    useEffect(() => {
        const loadSign = async () => {
            const response = await getLessonRequest(lesson as string);
            if (response === null) {
              router.back();
              return;
            }
            setLessonWithExercises(response);
            setLoading(false);
        }
        loadSign();
    }, []);

    if (loading){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </View>
        );
      }

    return (
      <View className='w-full h-full'>
        <PlayLesson lesson={lessonWithExercises}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
