import { Linking, Pressable } from "react-native";
import Text from "../Ui/Text";

const UserConditions: React.FC = () => {
    return (
        <Pressable onPress={() => Linking.openURL("https://triosigno.com/conditions")}>
            <Text className="text-center justify-center mt-3">
                En S&apos;incrivant a Triosigno, vous acceptez nos
                <Text className="font-black"> Termes</Text> et
                <Text className="font-black"> la Politique de Confidentialité</Text>.
            </Text>
        </Pressable>
    );
};

export default UserConditions;
