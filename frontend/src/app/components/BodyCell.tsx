import { useState, useEffect } from "react";
import { useBillContext } from "./Table";

export default function BodyCell( { value, width, left, id }: { value: any, width: string, left: boolean, id: string} ){

    const center = !left? "text-center": "pl-[15px]"

    const [ editedCell, setEditCell ] = useState(value)
    const [ enterPressed, setEnterPressed ] = useState(false);

    const handleEditCell = useBillContext().handleEditCell


    const handleBlur = (e: React.ChangeEvent<HTMLTableCellElement>) => {
        if(!enterPressed){
            setEditCell(e.currentTarget.innerText)
            handleEditCell(id, e.currentTarget.innerText)
        }
        setEnterPressed(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
        if(e.key === "Enter"){
            e.preventDefault();
            setEnterPressed(true);
            e.currentTarget.blur();
        }
    }

    useEffect(() => {
        setEditCell(value);
    }, [value]);

    return (
        <td className={`py-[15px] bg-black opacity-50 text-white hover:opacity-30 ${center}`}
            style={{ width: width}}
            contentEditable={true}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{ __html: editedCell}}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            >
        </td>
    );
}


// onBlur={handleBlur}
//             onKeyDown={handleKeyPress}
