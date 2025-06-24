import AppView from "./AppView";
import AppText from "./AppText";
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing} from 'react-native-reanimated';

const Loading: React.FC = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <AppView className="flex-1 justify-center items-center">
        <Animated.View
          className="w-[50px] h-[50px] rounded-full border-[5px] border-t-duoGreen   mb-5"
          style={animatedStyle}
        />
        <AppText className="text-white">Chargement...</AppText>
    </AppView>
  );
};

export default Loading;

