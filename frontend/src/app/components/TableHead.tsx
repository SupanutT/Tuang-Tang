import HeadCell from "./HeadCell";
import HeadDeleteAbleCell from "./HeadDeleteAbleCell";

export default function TableHead( { owner_name, dividers }: { owner_name: string, dividers: string[] }){

    const headColumn = [ 'No', 'Menu', 'Quantity', 'Price', owner_name, ...dividers ]
    return (
        <tr className="flex">
            {
                headColumn.map((col, index)=>{
                    switch(col){
                        case('No'):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='50px'/>
                        }
                        case('Menu'):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='200px'/>
                        }
                        case('Quantity'):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='100px'/>
                        }
                        case('Price'):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='100px'/>
                        }
                        case(owner_name):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='100px'/>
                        }
                        default:{
                            return <HeadDeleteAbleCell key={index} value={col} id={`${col}_${index}`} width='100px'/>
                        }
                    }
                })
            }
        </tr>
    );
}
