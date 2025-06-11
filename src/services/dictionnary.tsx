import { Sign } from "@/types/LessonInterface";
import axios from "axios";

<<<<<<< HEAD
export const getSignsRequest = async (): Promise<Sign[]>  => {
=======
export const getSigns = async (): Promise<Sign[]>  => {
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
      return [];
    }
};

<<<<<<< HEAD
export const getSignRequest = async (word: string): Promise<Sign | null>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
=======
export const getSign = async (word: string): Promise<Sign | null>  => {
    try {
        console.log(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data;
    } catch (e) {
        console.log(e.toJSON())
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        return null;
    }
}

<<<<<<< HEAD
export const getSignImageRequest = async (word: string): Promise<string>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data[0].mediaUrl;
    } catch (e) {
        console.error(e.toJSON())
=======
export const getSignImage = async (word: string): Promise<string>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/signs/search/" + word)
        return response.data.mediaUrl;
    } catch (e) {
        console.log(e.toJSON())
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        return "";
    }
}