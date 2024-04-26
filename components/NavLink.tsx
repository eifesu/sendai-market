"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLink({ href, children, disabled }: { href: string; children: React.ReactNode; disabled?: boolean }) {
    const pathName = usePathname();
    return (
        <Link href={href} className={cn(
            "flex flex-col items-center justify-center p-2 rounded-md px-4",
            pathName === href ? "text-green-600 bg-zinc-700 " : "text-white",
            disabled && "opacity-25 pointer-events-none text-muted-foreground"
        )}>
            {children}
        </Link>
    );
}
