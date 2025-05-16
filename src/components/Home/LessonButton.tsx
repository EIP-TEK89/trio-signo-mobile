import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import WhiteOkIcon from "@assets/CoursesJourney/Home/whiteOk.svg";
import WhiteStarIcon from "@assets/CoursesJourney/Home/whiteStar.svg";
import { useTheme } from "@/context/ThemeContext";

interface LessonButtonProps extends TouchableOpacityProps {
    completed: boolean;
    position: number;
}

const LessonButton: React.FC<LessonButtonProps> = ({completed, position, ...props}) => {
    const theme = useTheme();

    return (
    <View className="w-[20%] aspect-[18/17] items-center">
        <View 
        style={{backgroundColor: completed ? theme.colors.darkenedDuoBlue : theme.colors.mutedForeground}}
        className="absolute top-[10%] w-[90%] aspect-[18/17] bg-white rounded-full shadow-md"/>
        <TouchableOpacity
            {...props}
            style={{backgroundColor: completed ? theme.colors.duoBlue : theme.colors.mutedForeground}}
            className={"w-[90%] aspect-[18/17] rounded-full items-center justify-center"}
        >
            {completed ? <WhiteOkIcon /> : <WhiteStarIcon />}
        </TouchableOpacity>
    </View>
    );
}

export default LessonButton;