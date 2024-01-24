export default function HeadCell( { value, id, width }: { value: string, id: string, width: string } ){

    return (
        <th style={{ width }} className={`py-[15px] bg-[#edc077] text-white text-center`} id={id}>
            {value}
        </th>
    );
}
