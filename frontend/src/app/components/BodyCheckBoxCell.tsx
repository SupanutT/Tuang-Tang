export default function BodyCheckBoxCell( { isChecked, width, id }: { isChecked: boolean, width: string, id: string } ) {

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 flex justify-center`} style={{ width: width}}>
            <input type="checkbox" defaultChecked={isChecked} id={id} />
        </td>
    );
}
