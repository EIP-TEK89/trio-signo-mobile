import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import WhiteOkIcon from "@assets/Home/whiteOk.svg";
import WhiteStarIcon from "@assets/Home/whiteStar.svg";

export enum LessonStatus{
    ToStart = 0,
    Played = 1,
    Finished = 2
}
interface LessonButtonProps extends TouchableOpacityProps {
    status: LessonStatus;
    position: number;
}

const LessonButton: React.FC<LessonButtonProps> = ({status, position, ...props}) => {
    const active = status !== LessonStatus.ToStart
    const buttonColor = active ? "bg-duoGreen" : "bg-mutedForeground"
    const shadowColor = active ? "bg-darkenedDuoGreen" : "bg-mutedForeground" 

    return (
    <View className="w-[20%] aspect-[18/17] items-center">
        <View 
        className={`absolute top-[10%] w-[90%] aspect-[18/17] rounded-full shadow-md ${shadowColor}`}/>
        <TouchableOpacity
            {...props}
            className={`w-[90%] aspect-[18/17] rounded-full items-center justify-center ${buttonColor}`}
        >
            {status === LessonStatus.Finished && <WhiteOkIcon />}
            {status === LessonStatus.ToStart && <WhiteStarIcon />}
        </TouchableOpacity>
    </View>
    );
}

export default LessonButton;