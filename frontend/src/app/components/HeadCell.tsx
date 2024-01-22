    export default function HeadCell( { value, width }: { value: string, width: string } ){
        return (
            <th className={`py-[15px] w-[${width}px] bg-[#edc077] text-white text-center`}>
                {value}
            </th>
        );
    }
