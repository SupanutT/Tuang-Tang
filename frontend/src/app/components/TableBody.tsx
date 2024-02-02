import TableData from "./TableData";
import { BillItem } from "../../../interfaces";

export default function TableBody({
	owner_name,
	all_billItems,
	all_dividers,
}: {
	owner_name: string,
	all_billItems: BillItem[],
	all_dividers: string[],
}) {
	// console.log(all_billItems)
	const processBillItems = () => {
		return all_billItems.map(({ dividers, _id, menu, quantity, price }) => {
			const dividersMap: { [key: string]: boolean } = {};

			all_dividers.forEach((divider) => {
				dividersMap[divider as string] = dividers.includes(divider);
			});

			const owner = dividers.includes(owner_name)

			return {
				_id: _id,
				menu: menu,
				quantity: quantity,
				price: price,
				[owner_name]: owner,
				...dividersMap,
			};
		});
	};
	// console.log(processBillItems())


	return (
		processBillItems().map((item, index) => {
			return <TableData key={index + 1} item={item} num={index + 1} />
		})
	);
}
