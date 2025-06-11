<<<<<<< HEAD
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import AppView from "./Ui/AppView";
import { View } from "react-native";
import { twMerge } from "tailwind-merge"; // facultatif si tu veux merger des classes proprement
import { useState } from "react";

interface CustomTextInputProps extends TextInputProps {
  type?: "default" | "password";
  className?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  type = "default",
  className,
  ...props
}) => {
  return (
    <AppView className="w-4/5 items-center mb-4">
      <TextInput
        {...props}
        placeholderTextColor="#8A9299"
        className={twMerge(
          "w-full h-12 bg-white/10 rounded-xl px-4 py-3 text-[#CFD8DC] border border-transparent text-base",
          className
        )}
      />
      {type === "password" && (
        <TouchableOpacity className="absolute right-4 top-1/2 -translate-y-2">
          <Text className="text-[#45B6FE] text-xs font-medium">OUBLIÉ ?</Text>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

export default CustomTextInput;
=======
import { StyleSheet, Text, TextInput, TextInputProps, Touchable, TouchableOpacity, View } from "react-native";
import Block from "./Block";

interface CustomTextInputProps extends TextInputProps {
  type?: 'default' | 'password';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ type = 'default', ...props}) => {

  return (
    <Block style={styles.inputContainer}>
      <TextInput
          {...props}
          placeholderTextColor="#8A9299"
          style={StyleSheet.flatten([styles.input, props.style])}
    />
    {type === 'default' ||
    <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>OUBLIÉ ?</Text>
    </TouchableOpacity>}
    </Block>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: '#CFD8DC',
      borderWidth: 1,
      borderColor: 'transparent',
      fontSize: 16,
    },
    forgotButton: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    forgotText: {
      color: '#45B6FE',
      fontSize: 12,
      fontWeight: '500',
    },
  });
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
