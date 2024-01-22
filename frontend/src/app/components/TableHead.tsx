import HeadCell from "./HeadCell"

export default function TableHead( { dividers }: { dividers: string[] }){

    const headColumn = [ 'No', 'Menu', 'Quantity', 'Price', 'Me', ...dividers ]

    // console.log(headColumn)
    return (
        <tr className="flex">
            {
                headColumn.map((col)=>{
                    switch(col){
                        case('No'):{
                            return <HeadCell key={headColumn.indexOf(col)} value={col} width="50"/>
                        }case('Menu'):{
                            return <HeadCell key={headColumn.indexOf(col)} value={col} width="200"/>
                        }default: {
                            return <HeadCell key={headColumn.indexOf(col)} value={col} width="100"/>
                        }
                    }
                })
            }
        </tr>
    );
}
