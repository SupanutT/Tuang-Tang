import HeadCell from "./HeadCell";
import HeadDeleteAbleCell from "./HeadDeleteAbleCell";

export default function TableHead( { dividers, onDeleteHeadClicked }: { dividers: string[], onDeleteHeadClicked: (position: string) => void }){

    const headColumn = [ 'No', 'Menu', 'Quantity', 'Price', 'Me', ...dividers ]
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
                        case('Me'):{
                            return <HeadCell key={index} value={col} id={`${col}_${index}`} width='100px'/>
                        }
                        default:{
                            return <HeadDeleteAbleCell key={index} value={col} id={`${col}_${index}`} width='100px' onDeleteHeadClicked={onDeleteHeadClicked}/>
                        }
                    }
                })
            }
        </tr>
    );
}
