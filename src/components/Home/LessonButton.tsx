import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import WhiteOkIcon from "@assets/CoursesJourney/Home/whiteOk.svg";
import WhiteStarIcon from "@assets/CoursesJourney/Home/whiteStar.svg";
import { useTheme } from "@/context/ThemeProvider";

interface LessonButtonProps extends TouchableOpacityProps {
    completed: boolean;
    position: number;
}

const LessonButton: React.FC<LessonButtonProps> = ({completed, position, ...props}) => {
    const theme = useTheme();
    const buttonColor = completed ? "bg-duoBlue" : "bg-mutedForeground"
    const shadowColor = completed ? "bg-darkenedDuoBlue" : "bg-mutedForeground" 

    return (
    <View className="w-[20%] aspect-[18/17] items-center">
        <View 
        className={`absolute top-[10%] w-[90%] aspect-[18/17] rounded-full shadow-md ${shadowColor}`}/>
        <TouchableOpacity
            {...props}
            className={`w-[90%] aspect-[18/17] rounded-full items-center justify-center ${buttonColor}`}
        >
            {completed ? <WhiteOkIcon /> : <WhiteStarIcon />}
        </TouchableOpacity>
    </View>
    );
}

export default LessonButton;