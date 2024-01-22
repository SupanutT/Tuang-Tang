import TableData from "./TableData";

interface Bill {
	[key: string]: any
}

export default function TableBody( {data}: { data: Bill[]}) {

    return (
		data.map((item)=>{
			return <TableData item={item} />
		})
	 );
}
