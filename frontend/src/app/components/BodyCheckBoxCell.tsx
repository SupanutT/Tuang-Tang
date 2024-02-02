import { useBillContext } from "./Table";

export default function BodyCheckBoxCell( {
    isChecked,
    width,
    id
}: {
    isChecked: boolean,
    width: string,
    id: string
}) {
    const handleCheckboxChange = useBillContext().handleCheckboxChange;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('Checkbox Clicked in BodyCheckBoxCell');
        handleCheckboxChange(id, event.target.checked);
    }

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 flex justify-center`} style={{ width: width}}>
            <input type="checkbox" checked={isChecked} id={id} onChange={handleChange}/>
        </td>
    );
}
