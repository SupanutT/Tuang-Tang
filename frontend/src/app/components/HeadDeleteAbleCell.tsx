import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function HeadDeleteAbleCell({
    value,
    id,
    width,
    onDeleteHeadClicked
}: {
    value: string,
    id: string,
    width: string
    onDeleteHeadClicked: (position: string) => void
} ){

    function handleClick(){
        onDeleteHeadClicked(id);
    }

    return (
        <th style={{ width }} className='flex flex-row-reverse py-[15px] bg-[#edc077] text-white text-center' id={id}>
            <div className='absolute top-0 translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={handleClick}>
                <RemoveCircleIcon sx={{ fontSize: 20 }}/>
            </div>
            <div className='w-full'>
                {value}
            </div>
        </th>

    );
}
