'use client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'


import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { BillboardColumn, columns } from './columns'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'


interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient = ({ data }: BillboardClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Billboards (${data.length})`}
                    description='Manage your billboard here'
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new/`)} >
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='label' data={data} columns={columns} />
        </>

    )
}

export default BillboardClient
