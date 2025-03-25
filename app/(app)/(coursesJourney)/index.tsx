import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen</Text>
            <CustomButton title="Go to Courses" onPress={() => router.replace('/courses')} />
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});