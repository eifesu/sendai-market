import { Icon } from '@iconify/react';
import { NavLink } from './NavLink';
import { PiChatCenteredTextDuotone, PiCurrencyCircleDollarDuotone, PiDiceFiveDuotone } from 'react-icons/pi';

export default function BottomNavigation() {
    return (
        <div className="p-4 bg-secondary font-semibold flex justify-around items-center w-full border-b border-b-zinc-800">
            <NavLink href="/">
                <PiCurrencyCircleDollarDuotone fontSize={24} />
                <p className='text-xs font-bold text-white'>Market</p>
            </NavLink>
            <NavLink href="/" disabled>
                <PiDiceFiveDuotone fontSize={24} />
                <p className='text-xs font-bold text-white'>Casino</p>
            </NavLink>
            <NavLink href="/" disabled>
                <PiChatCenteredTextDuotone fontSize={24} />
                <p className='text-xs font-bold text-white'>Lounge</p>
            </NavLink>
        </div>
    )
}