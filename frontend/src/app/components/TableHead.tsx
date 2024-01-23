import HeadCell from "./HeadCell"

export default function TableHead( { dividers }: { dividers: string[] }){

    const headColumn = [ 'No', 'Menu', 'Quantity', 'Price', 'Me', ...dividers ]
    return (
        <tr className="flex">
            {
                headColumn.map((col, index)=>{
                    return <HeadCell key={index} value={col} id={index}/>
                })
            }
        </tr>
    );
}
