'use client'

import { useEffect, useState } from 'react'

import StoreModal from '@/components/modals/store-modal'
function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [isMounted])

    if (!isMounted) {
        return null
    }
    return (
        <div>
            <StoreModal />
        </div>
    )
}

export default ModalProvider
