'use client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'


import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { ProductColumn, columns } from './columns'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient = ({ data }: ProductClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Products (${data.length})`}
                    description='Manage your product here'
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new/`)} >
                    <Plus className='mr-2 h-4 w-4' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='label' data={data} columns={columns} />

            <Heading
                title='API'
                description='Manage Product API '
            />

            <ApiList entityName='products' entityIdName='{productId}' />



        </>

    )
}

export default ProductClient
