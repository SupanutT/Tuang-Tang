import TableData from "./TableData";


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

interface DividerData {
	_id: string;
	menu: string;
	quantity: number;
	price: number;
	dividers: string[];
  }

  interface ProcessedBillItem {
	_id: string;
	menu: string;
	quantity: number;
	price: number;
	[key: string]: boolean | string | number;
  }

export default function TableBody( { bill }: { bill: Bill }) {

	const processBillItems = (data: {
		owner_name: string;
		all_dividers: string[];
		billItems: DividerData[];
	  }): ProcessedBillItem[] => {
		const { owner_name, all_dividers, billItems } = data;

		return billItems.map(({ dividers, ...rest }) => {
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

	  const billItems: ProcessedBillItem[] = processBillItems(bill);

	//   console.log(billItems)


    return (
		billItems.map((item, index)=>{
			return <TableData key={index+1} item={item} num={index+1}/>
		})
	 );
}
{}
