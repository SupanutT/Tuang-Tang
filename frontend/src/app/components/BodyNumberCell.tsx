import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import { useBillContext } from './Table';

export default function BodyNumberCell({ value, width, id }: { value: any, width: string, id: string }) {

    const [backgoundHover, setBackgoundHover] = useState(false);
    const [deleteHover, setDeleteHover] = useState(false);

    const handleDeleteMenu = useBillContext().handleDeleteMenu;

    function handleDeleteClick() {
        handleDeleteMenu(id);
    }

    // console.log(value)

    return (
        <td className={`py-[15px] opacity-50 bg-black text-white hover:opacity-30`} style={{ width: width }} onMouseOver={() => setBackgoundHover(true)} onMouseOut={() => setBackgoundHover(false)}>
            {(backgoundHover || deleteHover) && (
                <div className='absolute -translate-x-full cursor-pointer' onMouseOver={() => setDeleteHover(true)} onMouseOut={() => setDeleteHover(false)} onClick={() => handleDeleteClick()}>
                    <RemoveCircleIcon sx={{ color: red[900] }} />
                </div>
            )}
            <div className='pl-[15px]'>
                {`${value}`}
            </div>
        </td>
    );
}
