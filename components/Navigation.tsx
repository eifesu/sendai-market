'use client'
import { Icon } from '@iconify/react';
import { useState } from "react";

export default function Navigation() {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className="p-4 font-semibold flex justify-between items-center w-full border-b border-b-zinc-800">
            <p className='text-sm'>Home</p>
            <Icon icon="material-symbols:menu" fontSize={20} onClick={() => setIsOpened(!isOpened)} />
        </div>
    )
}