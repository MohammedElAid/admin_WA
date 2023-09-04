
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import Navbar from '@/components/navbar'

export default async function RootLayout({
    children, params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth()


    if (!userId) {
        redirect('/signin')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    });
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
