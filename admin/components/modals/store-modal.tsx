'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from '@/hooks/use-store-modal'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'



const formSchema = z.object({
    name: z.string().min(1, 'Required')
})

function StoreModal() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', values)

            window.location.assign(`/${response.data.id}`)

        } catch (error) {
            toast.error('Something went wrong')
        }
        finally {
            setLoading(false)
        }

    }
    const { isOpen, onOpen, onClose } = useStoreModal();

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='E-commerce'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center justify-end w-full pt-6 space-x-2'>
                                <Button
                                    variant='outline'
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel</Button>
                                <Button disabled={loading} type='submit'>Continue</Button>
                            </div>

                        </form>
                    </Form>

                </div>
            </div>


        </Modal>
    )
}

export default StoreModal
