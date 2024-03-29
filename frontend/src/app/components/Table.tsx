'use client'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useReducer, useState, useContext, createContext } from "react";
import Link from "next/link";
import { Bill } from "../../../interfaces";
import { BillItem } from "../../../interfaces";
import { setBill } from "@/redux/features/billSlice";
import BillSummary from "./BillSummary";
import putBill from "@/libs/putBill";
import SaveBillButton from "./SaveBillButton";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";

interface BillFunctions {
	handleCheckboxChange: (position: string, isChecked: boolean) => void,
	handleDeleteDivider: (position: string) => void,
	handleDeleteMenu: (position: string) => void,
	handleEditCell: (position: string, text: string) => void
}

const BillContext = createContext<BillFunctions | null>(null);

export const useBillContext = () => {
	const context = useContext(BillContext);
	if (!context) {
		throw new Error('useBillContext must be used within a BillProvider');
	}
	return context;
};


export default function Table({ data }: { data: Bill }) {
	console.log('Table component rendered');

	const billItemReducer = (
		billItems: BillItem[],
		action: {
			type: string,
			rowCell: {
				menu: string,
				quantity: number,
				price: number,
				position: string,
				isChecked: boolean,
				text: string | number
			}
		}
	) => {
		switch (action.type) {
			case ('addMenu'): {
				return [
					...billItems,
					{
						_id: (billItems.length + 1).toString(),
						menu: action.rowCell.menu,
						quantity: action.rowCell.quantity,
						price: action.rowCell.price,
						dividers: []
					}
				];
			}
			case ('editCheckbox'): {
				let [column, row]: string[] = action.rowCell.position.split("_");
				const newBillItems = [...billItems];
				const editBillItem: BillItem = { ...newBillItems[Number(row) - 1] };

				if (action.rowCell.isChecked) {
					editBillItem.dividers.push(column);
				} else {
					editBillItem.dividers = editBillItem.dividers.filter((item: string) => item != column);
				}
				newBillItems[Number(row) - 1] = editBillItem;
				// console.log(newBillItems)
				// console.log(`[${Date.now()}] Updated billItems:`, newBillItems);
				return newBillItems;
			}
			case ('deleteDivider'): {
				let deletedDivider = action.rowCell.position.split("_")[0];
				const newBillItems = [...billItems].map((billItem) => {
					billItem.dividers = billItem.dividers.filter((divider: string) => divider != deletedDivider)
					return billItem
				});
				// console.log(newBillItems)
				return newBillItems
			}
			case ('deleteMenu'): {
				const newBillItems = [...billItems].filter((billItem, index) => index != Number(action.rowCell.position.split("_")[2]) - 1)
				// console.log(newBillItems)
				return newBillItems
			}
			case ('editMenu'): {
				type BillItemPosition = "menu" | "quantity" | "price";
				let text: string | number = action.rowCell.text;
				const position: BillItemPosition = action.rowCell.position.split("_")[0] as BillItemPosition;
				if (!(position === 'menu')) {
					text = Number(text) as number
				}
				const newBillItems = [...billItems]
				const editBillItem = { ...newBillItems[Number(action.rowCell.position.split("_")[1]) - 1], [position]: text }

				newBillItems[Number(action.rowCell.position.split("_")[1]) - 1] = editBillItem;
				// console.log(newBillItems)
				return newBillItems
			}
			default: {
				return billItems;
			}
		}
	}

	const dividerReducer = (all_dividers: string[], action: { type: string, divider: string }) => {
		switch (action.type) {
			case ("addDivider"): {
				return [...all_dividers, action.divider];
			}
			case ("deleteDivider"): {
				return all_dividers.filter((divider: string) => divider != action.divider);
			}
			default: {
				return all_dividers;
			}
		}
	}

	const [all_dividers, dispatchDivider] = useReducer(dividerReducer, data.all_dividers)
	const [billItems, dispatchBillItem] = useReducer(billItemReducer, data.billItems)
	const [newDivider, setNewDivider] = useState('');
	const [newMenu, setNewMenu] = useState({
		menu: '',
		quantity: '',
		price: ''
	})

	function addNewDivider() {
		if (newDivider.trim() !== '') {
			dispatchDivider({ type: 'addDivider', divider: newDivider });
			setNewDivider('');
		}
	}

	function addNewMenu() {
		if (newMenu.menu.trim() !== '' && Number(newMenu.quantity) > 0 && Number(newMenu.price) > 0) {
			dispatchBillItem({
				type: 'addMenu',
				rowCell: {
					menu: newMenu.menu,
					quantity: Number(newMenu.quantity),
					price: Number(newMenu.price),
					position: '',
					isChecked: false,
					text: ''
				}
			})
			setNewMenu({
				menu: '',
				quantity: '',
				price: ''
			})
		}
	}

	function handleCheckboxChange(position: string, isChecked: boolean) {

		dispatchBillItem({
			type: 'editCheckbox',
			rowCell: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: isChecked,
				text: ''
			}
		})


	}

	function handleDeleteDivider(position: string) {
		dispatchDivider({
			type: 'deleteDivider',
			divider: position.split("_")[0]
		});

		dispatchBillItem({
			type: 'deleteDivider',
			rowCell: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: false,
				text: ''
			}
		});
	}

	function handleDeleteMenu(position: string) {
		dispatchBillItem({
			type: 'deleteMenu',
			rowCell: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: false,
				text: ''
			}
		})

	}

	function handleEditCell(position: string, text: string) {
		dispatchBillItem({
			type: 'editMenu',
			rowCell: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: false,
				text: text
			}
		})
	}

	// const dispatch = useDispatch<AppDispatch>();
	// const handleSave = () => {
	// 	const updatedBill: Bill = {
	// 		_id: data._id,
	// 		name: data.name,
	// 		date: data.date,
	// 		image: data.image,
	// 		owner_name: data.owner_name,
	// 		all_dividers: all_dividers,
	// 		billItems: billItems
	// 	}
	// 	dispatch(setBill(updatedBill));


	// }

	const allFunctions = {
		handleCheckboxChange: handleCheckboxChange,
		handleDeleteDivider: handleDeleteDivider,
		handleDeleteMenu: handleDeleteMenu,
		handleEditCell: handleEditCell
	}

	return (
		<BillContext.Provider value={allFunctions}>
			<div className='mt-[30px] ml-[40px]'>
				<table className="shadow-black ">

					<thead>
						<TableHead owner_name={data.owner_name} dividers={all_dividers} />
					</thead>

					<tbody>
						<TableBody owner_name={data.owner_name} all_dividers={all_dividers} all_billItems={billItems} />
					</tbody>


					<tbody className="flex items-center border-b border-teal-500 py-3 bg-black ">
						<tr>
							<td>
								<input className="appearance-none bg-transparent border-none w-[200px] text-white ml-[50px] py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="New Menu" value={newMenu.menu} onChange={(e) => {
									setNewMenu((prev) => ({
										...prev,
										menu: e.target.value
									}))
								}} />

							</td>
						</tr>

						<tr>
							<td>
								<input className="appearance-none bg-transparent border-none w-[90px] text-white py-2 px-2 leading-tight text-center focus:outline-none " type="text" placeholder="Quantity" value={newMenu.quantity} onChange={(e) => {
									setNewMenu((prev) => ({
										...prev,
										quantity: e.target.value
									}))
								}} />

							</td>
						</tr>

						<tr>
							<td>
								<input className="appearance-none bg-transparent border-none w-[90px] text-white py-2 px-2 leading-tight text-center focus:outline-none " type="text" placeholder="Price" value={newMenu.price} onChange={(e) => {
									setNewMenu((prev) => ({
										...prev,
										price: e.target.value
									}))
								}} />

							</td>
						</tr>
						<tr className="w-full flex flex-row-reverse mr-3">
							<td>
								<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-2 	 rounded " type="button" onClick={() => addNewMenu()} >
									Add Menu
								</button>

							</td>
						</tr>

					</tbody>

					<tbody>
						<tr>
							<td>
								<div className="flex items-center border-b border-teal-500 py-2 px-3 bg-white opacity-50">
									<input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-10% py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="New Divider" value={newDivider} onChange={(e) => {
										setNewDivider(e.target.value);
									}} />
									<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-2 rounded" type="button" onClick={() => addNewDivider()} >
										Add Divider
									</button>
								</div>

							</td>

						</tr>
					</tbody>



				</table>
				<SaveBillButton data={{
					_id: data._id,
					name: data.name,
					date: data.date,
					image: data.image,
					owner_name: data.owner_name,
					all_dividers: all_dividers,
					billItems: billItems
				}} />

				<BillSummary all_dividers={all_dividers} billItems={billItems} owner_name={data.owner_name} />

			</div>
		</BillContext.Provider>
	);
}

//<form action={`${process.env.NEXT_PUBLIC_BACKEND_API}`} method="POST" className='w-full max-w-sm bg-white rounded-lg'></form>
