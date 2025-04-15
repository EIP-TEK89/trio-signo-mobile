import Block from '@/components/Block';
import { getSign } from '@/services/dictionnary';
import { Sign } from '@/types/LessonInterface';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const options = {
  tabBarButton: () => null,
};

export default function SignScreen() {
    const { word } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [sign, setSign] = useState<Sign | undefined>(undefined); // Adjust the type according to your data structure
    useEffect(() => {
        const loadSign = async () => {
            const response = await getSign(word as string);
            if (response === null) {
              router.back();
              return;
            }
            setSign(response[0]);
            setLoading(false);
        }
        loadSign();
    }, []);

    if (loading){
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
      }

    return (
      <View>
        <Image source={{uri: sign?.mediaUrl}}  style={{ width: 200, height: 200 }}/>
        <Text>{word}</Text>
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
