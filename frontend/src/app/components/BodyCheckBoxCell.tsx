export default function BodyCheckBoxCell( { isChecked, width, id }: { isChecked: boolean, width: string, id: string } ) {
    return (
        <td className={`py-[15px] w-[${width}px]  bg-black opacity-50 text-white hover:opacity-30 flex justify-center`}>
            <input type="checkbox" checked={isChecked} id={id} />
        </td>
    );
}
