'use client'


import React from 'react'
import { useParams } from 'next/navigation'

import useOrigin from '@/hooks/use-origin'
import ApiAlert from '@/components/ui/api-alert'

interface ApiListProps {
    entityName: string
    entityIdName: string
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <div>
            <ApiAlert
                title='GET'
                variant='public'
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title='GET'
                variant='public'
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
            <ApiAlert
                title='POST'
                variant='admin'
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title='PATCH'
                variant='admin'
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
            <ApiAlert
                title='DELETE'
                variant='admin'
                description={`${baseUrl}/${entityName}/${entityIdName}`}
            />
        </div>
    )
}

export default ApiList
