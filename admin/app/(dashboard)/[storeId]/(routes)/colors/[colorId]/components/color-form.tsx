'use client'

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";



import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";

const formSchema = z.object({
    name: z.string().min(1, "Required"),
    value: z.string().min(1, "Required"),

})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData: Color | null;
}





const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Color" : "Create Color"
    const description = initialData ? "Edit a Color" : "Add new Color"
    const toastMessage = initialData ? "Color updated" : "Color created"
    const action = initialData ? "Save changes" : "Create "



    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })
    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)

            }
            router.refresh();
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }


    const OnDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("color deleted")
        } catch (error) {
            toast.error("Make sur you removed all Products using color first")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={OnDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (<Button
                    disabled={loading}
                    variant={"destructive"}
                    size={"sm"}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>)}
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Color"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Value"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        className="ml-auto"
                    >
                        {action}
                    </Button>
                </form>
            </Form>


        </>

    )
}

export default ColorForm

