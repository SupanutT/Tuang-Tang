import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function BodyNumberCell( { value, width, id, onDeleteMenuClicked }: { value: any, width: string, id: string, onDeleteMenuClicked: (position: string)=> void } ){

    const [backgoundHover, setBackgoundHover] = useState(false);
    const [deleteHover ,setDeleteHover] = useState(false);

    function handleDeleteClick(){
        onDeleteMenuClicked(id);
    }

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 `} style={{ width: width}} onMouseOver={()=>setBackgoundHover(true)} onMouseOut={()=>setBackgoundHover(false)}>
             {(backgoundHover||deleteHover) && (
                <div className='absolute -translate-x-full cursor-pointer' onMouseOver={()=>setDeleteHover(true)} onMouseOut={()=>setDeleteHover(false)} onClick={()=>handleDeleteClick()}>
                    <RemoveCircleIcon sx={{ color: 'red' }} />
                </div>
            )}
            <div className='pl-[15px]'>
                {`${value}`}
            </div>
        </td>
    );
}
