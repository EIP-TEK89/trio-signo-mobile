import { Text, TouchableOpacity, View } from "react-native";

interface CategoryProps {
    title: string;
    objects: [string, () => void][];
}

const Category: React.FC<CategoryProps> = ({title, objects}) => {
    return (
        <View className="flex-1 items-center">
                <View className="w-[90%]">
                <View className="flex-1 pb-4">
                  <Text className="text-xl font-bold color-gray-500">{title}</Text>
                  <View className="flex-1 rounded-2xl border-2 border-gray-300">
                        {objects.map(([name, action], index) => (
                            <View key={index}>
                                <TouchableOpacity onPress={action} className="justify-center p-3">
                                    <Text className="text-xl font-bold">{name}</Text>
                                </TouchableOpacity>
                                {index < objects.length - 1 && <View className="w-[100%] border-t-2 border-gray-300"/>}
                            </View>
                        ))}
                  </View>
                </View>
            </View>
        </View>
    );
}

export default Category;