"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"


export type ProductColumn = {
    id: string
    name: string
    isFeatured: boolean
    isArchived: boolean
    price: string
    category: string
    color: string
    size: string
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isfeatured",
        header: "Featured",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "Size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: row.original.color }}
                />


            </div>

        )
    },
    {
        id: "action",
        cell: ({ row }) => <CellAction data={row.original} />
    }

]
