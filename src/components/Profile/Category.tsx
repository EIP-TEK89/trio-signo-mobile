import { TouchableOpacity } from "react-native";
import Text from "../Ui/Text";
import AppView from "../Ui/AppView";

interface CategoryProps {
    title: string;
    objects: [string, () => void][];
}

const Category: React.FC<CategoryProps> = ({title, objects}) => {
    return (
                <AppView className="flex-1 mb-7">
                  <Text className="text-xl font-black mb-2">{title}</Text>
                  <AppView className="flex-1 rounded-2xl border-2 border-duoGreen">
                        {objects.map(([name, action], index) => (
                            <AppView key={index} className="flex-1 rounded-2xl">
                                <TouchableOpacity onPress={action} className="justify-center p-4">
                                    <Text className="text-lg">{name}</Text>
                                </TouchableOpacity>
                                {index < objects.length - 1 && <AppView className="w-[100%] border-t-2 border-duoGreen"/>}
                            </AppView>
                        ))}
                  </AppView>
                </AppView>
    );
}

export default Category;