'use client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'


import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { ColorColumn, columns } from './columns'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface ColorClientProps {
    data: ColorColumn[]
}

const ColorClient = ({ data }: ColorClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Colors (${data.length})`}
                    description='Manage a Color here'
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new/`)} >
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='name' data={data} columns={columns} />

            <Heading
                title='API'
                description='Manage Colors API '
            />

            <ApiList entityName='colors' entityIdName='{colorId}' />



        </>

    )
}

export default ColorClient
