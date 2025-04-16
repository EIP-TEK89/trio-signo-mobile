import { Sign } from "@/types/LessonInterface";
import axios from "axios";

export const getSignsRequest = async (): Promise<Sign[]>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
      return [];
    }
};

export const getSignRequest = async (word: string): Promise<Sign | null>  => {
    try {
        console.log(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data;
    } catch (e) {
        console.log(e.toJSON())
        return null;
    }
}

export const getSignImageRequest = async (word: string): Promise<string>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data.mediaUrl;
    } catch (e) {
        console.log(e.toJSON())
        return "";
    }
}