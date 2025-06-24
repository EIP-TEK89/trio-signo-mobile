import LessonComplete from '@/components/Lessons/LessonComplete';
import PlayLesson from '@/components/Lessons/PlayLesson';
import AppView from '@/components/Ui/AppView';
import Loading from '@/components/Ui/Loading';
import { getLessonById } from '@/services/lessonsServices';
import { LessonProgress, LessonWithExercises } from '@/types/LessonInterface';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonScreen() {
    const { lesson } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [lessonWithExercises, setLessonWithExercises] = useState<LessonWithExercises | undefined>(undefined);
    const [lessonResult, setLessonResult] = useState<LessonProgress | null>(null);

    useEffect(() => {
        const loadSign = async () => {
            const response = await getLessonById(lesson as string);
            if (response === null) {
              router.back();
              return;
            }
            setLessonWithExercises(response);
            setLoading(false);
        }
        loadSign();
    }, [lesson]);

    const lessonCompleted = useCallback((lessonProgress : LessonProgress) => {
        setLessonResult(lessonProgress);
    }, [])

    if (loading){
        return (
          <Loading />
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

