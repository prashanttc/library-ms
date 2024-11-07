import { useMutation } from "react-query";
import {Formdata} from "../../type"


const ApiUri = import.meta.env.VITE_API_URI;

export const UseCreateUser = () => {
    const CreateMyUserRequest = async (formData: Formdata) => {
        const response = await fetch(`${ApiUri}api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error("failed to create user")
        }
    }
    
    const {mutateAsync: CreateUser , isLoading ,isSuccess, isError} = useMutation(CreateMyUserRequest); 
    return {
        CreateUser, isLoading , isError, isSuccess
    }
}
