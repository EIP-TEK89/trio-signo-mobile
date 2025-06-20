import { TouchableOpacity } from "react-native";
import AppText from "../Ui/AppText";
import AppView from "../Ui/AppView";

interface CategoryProps {
    title: string;
    objects: [string, () => void][];
}

const Category: React.FC<CategoryProps> = ({title, objects}) => {
    return (
                <AppView className="flex-1 mb-6">
                  <AppText className="text-xl font-bold color-gray-500">{title}</AppText>
                  <AppView className="flex-1 rounded-2xl border-2 border-duoBlue">
                        {objects.map(([name, action], index) => (
                            <AppView key={index} className="flex-1 rounded-2xl">
                                <TouchableOpacity onPress={action} className="justify-center p-3">
                                    <AppText className="text-xl font-bold">{name}</AppText>
                                </TouchableOpacity>
                                {index < objects.length - 1 && <AppView className="w-[100%] border-t-2 border-duoBlue"/>}
                            </AppView>
                        ))}
                  </AppView>
                </AppView>
    );
}

export default Category;