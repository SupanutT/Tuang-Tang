export default function BodyCell( { value, width, left }: { value: any, width: string, left: boolean } ){

    const center = !left? "text-center": "pl-[15px]"

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 ${center}`} style={{ width: width}}>
            {`${value}`}
        </td>
    );
}
