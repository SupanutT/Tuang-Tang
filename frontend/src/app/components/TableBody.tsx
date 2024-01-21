import TableData from "./TableData";

interface Bill {
	[key: string]: any
}

export default function TableBody( {data}: { data: Bill[]}) {

	const datas = [
		{ No: '1', Menu: 'pizza', Quantity: 2, Price: 400, Me: true, friend_1: false },
		{ No: '2', Menu: 'french fries', Quantity: 1, Price: 138, Me: true, friend_1: true },
		{ No: '3', Menu: 'coke', Quantity: 2, Price: 80, Me: true, friend_1: false },
		{ No: '4', Menu: 'burger', Quantity: 4, Price: 800, Me: true, friend_1: true },
		{ No: '5', Menu: 'pizza2', Quantity: 2, Price: 200, Me: true, friend_1: false },
		{ No: '6', Menu: 'pizza3', Quantity: 2, Price: 200, Me: true, friend_1: false },
	]

    return (
		data.map((item)=>{
			return <TableData item={item} />
		})
	 );
}
