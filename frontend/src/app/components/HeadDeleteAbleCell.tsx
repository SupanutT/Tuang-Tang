import CancelIcon from '@mui/icons-material/Cancel';
import { useBillContext } from './Table';

export default function HeadDeleteAbleCell({
    value,
    id,
    width
}: {
    value: string,
    id: string,
    width: string
} ){

    const handleDeleteDivider = useBillContext().handleDeleteDivider;

    return (
        <th style={{ width }} className='flex flex-row-reverse py-[15px] bg-[#edc077] text-white text-center' id={id}>
            <div className='absolute top-0 translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={() => handleDeleteDivider(id)}>
                <CancelIcon sx={{ fontSize: 20 }}/>
            </div>
            <div className='w-full'>
                {value}
            </div>
        </th>

    );
}
