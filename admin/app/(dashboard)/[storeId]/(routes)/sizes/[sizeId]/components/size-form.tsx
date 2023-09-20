'use client'

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client";
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

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null;
}





const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a Size" : "Add new Size"
    const toastMessage = initialData ? "Size updated" : "Size created"
    const action = initialData ? "Save changes" : "Create "



    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })
    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, data)

            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }


    const OnDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size deleted")
        } catch (error) {
            toast.error("Make sur you removed all Products using Size first")
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
                                            placeholder="Size"
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

export default SizeForm

