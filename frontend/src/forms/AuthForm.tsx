import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { AuthformSchema } from "@/lib/utils"
import CustomInput from "@/components/CustomInput"
import { UseCreateUser } from "@/api/UserApi"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react";

const AuthForm = ({ type }: { type: string }) => {
    const Navigate = useNavigate()
    const { CreateUser , isLoading} = UseCreateUser()
    const formSchema = AuthformSchema;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        CreateUser(values);
        Navigate("/")
    }
    return (

        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
            <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-blue-900 text-center hidden md:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                        }}
                    ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className=" flex flex-col items-center">
                        <div className="text-center">
                            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                                Student {type === "sign-in" ? "login" : "sign-up"}
                            </h1>
                            <p className="text-[12px] text-gray-500">
                                Hey enter your details to {type === "sign-in" ? "login into your account" : "create a account"}
                            </p>
                        </div>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs flex flex-col gap-4">

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        {type === "sign-up" && <>
                                            <CustomInput control={form.control} name="name" placeholder="enter your name here" label="name" />
                                            <CustomInput control={form.control} name="phone" placeholder="enter your name here" label="phone" />
                                        </>}
                                        <CustomInput control={form.control} name="email" placeholder="enter your name here" label="email" />
                                        <CustomInput control={form.control} name="password" placeholder="***********" label="password" />

                                        <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit" disabled={isLoading}>
                                           {isLoading?<Loader2 className="h-4 w-4 animate-spin"/>:
                                           <>
                                            {type === "sign-up" && <>
                                                <svg
                                                    className="w-6 h-6 -ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    strokeLinecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                            </>}
                                            <span className="ml-3">{type === "sign-in" ? "Login" : "Sign-up"}</span>
                                           </>
                                           }
                                        </button>
                                    </form>
                                </Form>

                                <p className="mt-6 text-xs text-gray-600 text-center flex gap-1 justify-center">
                                    {type === "sign-in" ? "dont have a account?" : "already have a account?"}
                                    {type === "sign-in" ? (
                                        <Link to="/sign-up" className="text-blue-500 font-semibold">Sign-Up</Link>
                                    ) : (<Link to="/login" className="text-blue-500 font-semibold">Sign-In</Link>)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm


