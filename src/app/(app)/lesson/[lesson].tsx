import LessonComplete from '@/components/Lessons/LessonComplete';
import PlayLesson from '@/components/Lessons/PlayLesson';
import AppView from '@/components/Ui/AppView';
import { getLessonRequest } from '@/services/lessons';
import { Lesson, LessonProgress, LessonWithExercises, Sign } from '@/types/LessonInterface';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const { lesson } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [lessonWithExercises, setLessonWithExercises] = useState<LessonWithExercises | undefined>(undefined);
    const [lessonResult, setLessonResult] = useState<LessonProgress | null>(null);

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

    const lessonCompleted = (lessonProgress : LessonProgress) => {
        setLessonResult(lessonProgress);

    }

    if (loading){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Chargement...</Text>
          </View>
        );
      }

    return (
      <SafeAreaView className='flex-1 bg-background'> 
      <AppView className='flex-1'>
        {lessonResult === null ? <PlayLesson lesson={lessonWithExercises} onComplete={lessonCompleted}/> : <LessonComplete lesson={lessonWithExercises} lessonProgress={lessonResult}/>}
      </AppView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
