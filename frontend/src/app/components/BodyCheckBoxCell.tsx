export default function BodyCheckBoxCell( {
    isChecked,
    width,
    id,
    onCheckboxChange
}: {
    isChecked: boolean,
    width: string,
    id: string,
    onCheckboxChange: (position: string, isChecked: boolean) => void
}) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Checkbox Clicked in BodyCheckBoxCell');
        onCheckboxChange(id, event.target.checked);
    }

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 flex justify-center`} style={{ width: width}}>
            <input type="checkbox" checked={isChecked} id={id} onChange={handleChange}/>
        </td>
    );
}
