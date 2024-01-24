import TableData from "./TableData";

interface BillItem {
	[key: string]: any
}

interface Bill {
	_id: string,
	name: string,
	date: string,
	image: {
		filename: string,
		url: string
	},
	owner_name: string,
	all_dividers: string[]
	billItems: {
		_id: string
		menu: string,
		price: number
		quantity: number,
		dividers: string[]
	}[]
}

interface ProcessedBillItem {
	[key: string]: boolean | string | number;
}

export default function TableBody({
	owner_name,
	all_billItems,
	all_dividers,
	onCheckboxChange,
}: {
	owner_name: string,
	all_billItems: BillItem[],
	all_dividers: string[],
	onCheckboxChange: (position: string, isChecked: boolean) => void
}) {

	const processBillItems = ()=>{
		return all_billItems.map(({ dividers, ...rest }) => {
		const dividersMap: { [key: string]: boolean } = {};

		all_dividers.forEach((divider) => {
			dividersMap[divider as string] = dividers.includes(divider);
		});

		const owner = dividers.includes(owner_name)

		return {
			...rest,
			me: owner,
			...dividersMap,
		};
		});
	};

	return (
		processBillItems().map((item, index)=>{
			return <TableData key={index+1} item={item} num={index+1} onCheckboxChange={onCheckboxChange}/>
		})
	);
}
