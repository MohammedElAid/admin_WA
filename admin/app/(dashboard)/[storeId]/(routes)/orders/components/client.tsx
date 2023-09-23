'use client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Order } from '@prisma/client'


import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { OrderColumn, columns } from './columns'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient = ({ data }: OrderClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>

            <Heading
                title={`Orders (${data.length})`}
                description='Manage your order here'
            />

            <Separator />
            <DataTable searchKey='products' data={data} columns={columns} />

        </>

    )
}

export default OrderClient
