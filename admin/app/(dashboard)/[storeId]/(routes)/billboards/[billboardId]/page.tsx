import React from 'react'
import prismadb from '@/lib/prismadb'

const BillBoardpage = async ({
    params
}: { params: { billboardId: string } }) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return (
        <div>
            This is a form for Billboard
        </div>
    )
}

export default BillBoardpage
