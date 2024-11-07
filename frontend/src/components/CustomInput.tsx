
import { Control, FieldPath } from "react-hook-form"
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { AuthformSchema } from "@/lib/utils"

const formSchema = AuthformSchema
type Props={
   control:Control<z.infer<typeof formSchema>>
    name:FieldPath<z.infer<typeof formSchema>>,
    placeholder:string,
    label:string,
}
const CustomInput = ({control , name , placeholder , label}:Props) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className=''>
        <FormLabel className=''>{label}</FormLabel>
        <div className=''>
            <FormControl>
                <Input placeholder={placeholder} className="w-full px-5 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                 {...field}/>
            </FormControl>
            <FormMessage className=''/>
        </div>
      </div>
    )}
/>
  )
}

export default CustomInput
