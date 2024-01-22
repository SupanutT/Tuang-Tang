
interface Bill {
	[key: string]: any
}

export default function TableHead( { data }: { data: Bill[]}){

    const headColumn = Object.keys(data[0])

    return (
        <tr className="flex">
            {
                headColumn.map((col)=>{
                    switch(col){
                        case('No'):{
                            return (
                                <th key={`${headColumn.indexOf(col)}`}className={`py-[15px] w-[50px] pl-[15px] bg-[#edc077] text-white text-left`}>
                                    {col}
                                </th>
                            );
                        }case('Menu'):{
                            return (
                                <th key={`${headColumn.indexOf(col)}`}className={`py-[15px] w-[200px] pl-[15px] bg-[#edc077] text-white text-left`}>
                                    {col}
                                </th>
                            );
                        }case('Quantity'):{
                            return (
                                <th key={`${headColumn.indexOf(col)}`}className={`py-[15px] w-[100px] pl-[15px] bg-[#edc077] text-white text-left`}>
                                    {col}
                                </th>
                            );
                        }case('Price'):{
                            return (
                                <th key={`${headColumn.indexOf(col)}`}className={`py-[15px] w-[100px] pl-[15px] bg-[#edc077] text-white text-left`}>
                                    {col}
                                </th>
                            );
                        }default: {
                            return (
                                <th key={`${headColumn.indexOf(col)}`}className={`py-[15px] w-[100px] pl-[15px] bg-[#edc077] text-white text-left`}>
                                    {col}
                                </th>
                            );
                        }
                    }
                })
            }
        </tr>
    );
}
