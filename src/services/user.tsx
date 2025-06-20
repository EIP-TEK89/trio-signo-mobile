import { User } from "@/types/UserInterface";
import axios from "axios";

export const getUserRequest = async (): Promise<User | null> => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/users/me")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return null
    }
}