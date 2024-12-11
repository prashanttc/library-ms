import { useMutation } from "react-query";
import { Formdata } from "../../type";
import { toast } from "sonner";
import axios from "axios";;

const ApiUri = import.meta.env.VITE_API_URI;

export const UseCreateUser = () => {
    const CreateMyUserRequest = async (formData: Formdata) => {
        try {
            const response = await axios.post(`${ApiUri}api/user/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message =
                error.response?.data?.message || "An error has occurred";
            toast.error(message);
            throw new Error(message);
        }
    };

    const { mutateAsync: CreateUser, isLoading, isError  } = useMutation(CreateMyUserRequest);
    return {
        CreateUser,
        isError,
       isLoading,
    };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginuser = ()=>{
   const LoginUserRequest = async(formData:Formdata)=>{
       try{
        const response = await axios.post(`${ApiUri}api/user/login`, formData,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
           })
           return response.data
        
       }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       catch(error :any){
        const message =
        error.response?.data?.message || "An error has occurred";
    toast.error(message);
    throw new Error(message);
       }
   };
   const{mutateAsync:Loginuser , isLoading , isError} = useMutation(LoginUserRequest);
   return{
    Loginuser,
    isLoading,
    isError
   }
}
