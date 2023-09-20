'use client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'


import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { CategoryColumn, columns } from './columns'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface CategoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient = ({ data }: CategoryClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Categories (${data.length})`}
                    description='Manage your Categories here'
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new/`)} >
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='label' data={data} columns={columns} />

            <Heading
                title='API'
                description='Manage Categories API '
            />

            <ApiList entityName='categories' entityIdName='{categoryId}' />
        </>

    )
}

export default CategoryClient
