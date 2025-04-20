import Block from '@/components/Block';
import { getSignRequest } from '@/services/dictionnary';
import { Sign } from '@/types/LessonInterface';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SignScreen() {
    const { sign } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [signDisplayed, setSignDisplayed] = useState<Sign | undefined>(undefined);

    useEffect(() => {
        const loadSign = async () => {
            const response = await getSignRequest(sign as string);
            if (response === null) {
              router.back();
              return;
            }
            setSignDisplayed(response[0]);
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
        <Image source={{uri: signDisplayed?.mediaUrl}}  style={{ width: 200, height: 200 }}/>
        <Text>{sign}</Text>
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
