import React from 'react'
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';

interface ApiAlertProps {
    title: string;
    description: string;
    variant: 'public' | 'admin';
}



const textMap: Record<ApiAlertProps['variant'], string> = {
    public: 'Public',
    admin: 'Admin'

}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
    public: 'secondary',
    admin: 'destructive'
}

const ApiAlert = ({
    title,
    description,
    variant = 'public'
}: ApiAlertProps) => {

    return (
        <Alert>
            <Server className='h-4 w-4' />
            <AlertTitle className='flex item-center gap-x-2' >
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
        </Alert>
    )
}

export default ApiAlert
