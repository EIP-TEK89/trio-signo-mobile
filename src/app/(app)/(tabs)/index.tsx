import { useAuth } from "@/context/AuthContext";
import { getLessonsRequest } from "@/services/lessons";
import { Lesson } from "@/types/LessonInterface";
import Block from "@components/Block";
import CourseButton from "@components/CourseButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const { onLogout } = useAuth();

      useEffect(() => {
        const loadLessons = async () => {
            const response = await getLessonsRequest();
            setLessons(response);
        }
        loadLessons();
        setLoading(false);
      }, []);

    if (loading) {
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
    }
    return (
        <Block style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity onPress={onLogout} className="cross-button">
                        <Image source={require(`@assets/icons/cross-button.png`)} style={styles.icon} alt="cross-Image" className="icon" />
                    </TouchableOpacity>
                    <View className="icon-container">
                        <Image source={require(`@assets/icons/life.png`)} alt="Life" style={styles.icon} className="icon" />
                        <Text className="text">5</Text>
                    </View>
                </View>
            <ScrollView  contentContainerStyle={styles.scrollView}>
            {lessons.map((lesson) => (
                <CourseButton key={lesson.id} title={lesson.title} onPress={() => router.push(`/courses`)} />
            ))}
            </ScrollView>
        </Block>
    );
}

const styles =  StyleSheet.create({
    header : {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        color: 'white',
        justifyContent: 'space-between',
        padding: 10,
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    scrollView: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    icon: {
        width: 30,
        height: 30,
      },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});