'use client'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useReducer, useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { Bill } from "../../../interfaces";
import { BillItem } from "../../../interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setBill } from "@/redux/features/billSlice";


export default function Table(){
	console.log('Table component rendered');

	const data = {
			_id: "sadkfhalkjdahasdfasdfasdf",
			name: "here moo",
			date: "21/10/2545",
			image: {
				url: "www.image.com",
				filename: "image name"
			},
			owner_name: "Jai",
			all_dividers: ['Ping', 'North', 'Pee'],
			billItems: [
				{ _id:"sdfsadfds1", menu: 'pizza', quantity: 2, price: 400, dividers: ['Ping', 'North'] },
				{ _id:"sdfsadfds2", menu: 'french fries', quantity: 1, price: 138, dividers: ['Ping'] },
				{ _id:"sdfsadfds3", menu: 'coke', quantity: 2, price: 80, dividers: ['Jai', 'Pee'] },
				{ _id:"sdfsadfds4", menu: 'chicken', quantity: 2, price: 250, dividers: ['Pee', 'North'] },
			]
	}

	const billItemReducer = (
		billItems: BillItem[],
		action: {
			type: string,
			Menu: {
				menu:string,
				quantity: number,
				price: number,
				position: string,
				isChecked: boolean
			}
		}
	) => {
		switch(action.type){
			case('addMenu'):{
				return [
					...billItems,
					{
						_id: (billItems.length + 1).toString(),
						menu: action.Menu.menu,
						quantity: action.Menu.quantity,
						price: action.Menu.price,
						dividers: []
					}
				];
			}
			case('editCheckbox'):{
				let [column, row]: string[] = action.Menu.position.split("_");
				const newBillItems = [...billItems];
				const editBillItem: BillItem =  { ...newBillItems[Number(row)-1] };

				if(action.Menu.isChecked){
					editBillItem.dividers.push(column);
				}else{
					editBillItem.dividers = editBillItem.dividers.filter((item: string) => item != column);
				}
				newBillItems[Number(row)-1] = editBillItem;
				// console.log(newBillItems)
				// console.log(`[${Date.now()}] Updated billItems:`, newBillItems);
				return newBillItems;
			}
			case('deleteDivider'):{
				let deletedDivider = action.Menu.position.split("_")[0];
				const newBillItems = [...billItems].map((billItem) => {
					billItem.dividers = billItem.dividers.filter((divider: string) => divider != deletedDivider)
					return billItem
				});
				console.log(newBillItems)
				return newBillItems
			}
			case('deleteMenu'):{
				return [...billItems].filter((billItem, index) => index != Number(action.Menu.position.split("_")[2]) - 1);
			}
			default: {
				return billItems;
			}
		}
	}

	const dividerReducer = ( all_dividers: string[], action: {type: string, divider: string}) =>{
		switch(action.type){
			case("addDivider"):{
				return [...all_dividers, action.divider];
			}
			case("deleteDivider"):{
				return all_dividers.filter((divider: string) => divider != action.divider);
			}
			default: {
				return all_dividers;
			}
		}
	}

	const [ all_dividers, dispatchDivider ] = useReducer( dividerReducer, data.all_dividers )
	const [ billItems, dispatchBillItem ] = useReducer( billItemReducer, data.billItems )
	const [ newDivider, setNewDivider ] = useState('');
	const [ newMenu, setNewMenu ] = useState({
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
		if(newMenu.menu.trim() !== '' && Number(newMenu.quantity) > 0 && Number(newMenu.price) > 0){
			dispatchBillItem({
				type: 'addMenu',
				Menu: {
					menu: newMenu.menu,
					quantity: Number(newMenu.quantity),
					price: Number(newMenu.price),
					position: '',
					isChecked: false
				}
			})
			setNewMenu({
				menu: '',
				quantity: '',
				price: ''
			})
		}
	}

	function handleCheckboxChange(position: string, isChecked: boolean){
		// console.log(`${position} ${isChecked}`)
		dispatchBillItem({
			type: 'editCheckbox',
			Menu: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: isChecked
			}
		})
	}

	function handleDeleteDivider(position: string){
		dispatchDivider({
			type: 'deleteDivider',
			divider: position.split("_")[0]
		});

		dispatchBillItem({
			type: 'deleteDivider',
			Menu: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: false
			}
		});
	}

	function handleDeleteMenu(position: string){
		dispatchBillItem({
			type: 'deleteMenu',
			Menu: {
				menu: '',
				quantity: 0,
				price: 0,
				position: position,
				isChecked: false
			}
		})
	}

	const dispatch = useDispatch<AppDispatch>();
	const handleSubmit = () => {
		const updatedBill: Bill = {
			_id: data._id,
			name: data.name,
			date: data.date,
			image: data.image,
			owner_name: data.owner_name,
			all_dividers: all_dividers,
			billItems: billItems
		}
		dispatch(setBill(updatedBill));
	}

	return (
		<div className='absolute top-[20%] left-[5%]'>
			<table className="shadow-black">
				<thead>
					<TableHead owner_name={data.owner_name} dividers={all_dividers} onDeleteHeadClicked={handleDeleteDivider}/>
				</thead>
				<tbody>
					<TableBody owner_name={data.owner_name} all_dividers={all_dividers} all_billItems={billItems} onCheckboxChange={handleCheckboxChange} onDeleteMenuClicked={handleDeleteMenu}/>
				</tbody>
			</table>

			<div className="flex items-center border-b border-teal-500 py-3 bg-black">
				<input className="appearance-none bg-transparent border-none w-[200px] text-white ml-[50px] py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="New Menu" value={newMenu.menu} onChange={(e)=>{
					setNewMenu((prev)=>({
						...prev,
						menu: e.target.value
					}))
				}}/>
				<input className="appearance-none bg-transparent border-none w-[100px] text-white py-2 px-2 leading-tight text-center focus:outline-none " type="text" placeholder="Quantity" value={newMenu.quantity} onChange={(e)=>{
					setNewMenu((prev)=>({
						...prev,
						quantity: e.target.value
					}))
				}}/>
				<input className="appearance-none bg-transparent border-none w-[100px] text-white py-2 px-2 leading-tight text-center focus:outline-none " type="text" placeholder="Price" value={newMenu.price} onChange={(e)=>{
					setNewMenu((prev)=>({
						...prev,
						price: e.target.value
					}))
				}}/>
				<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-5 rounded absolute right-3" type="button" onClick={()=>addNewMenu()} >
					Add Menu
				</button>
			</div>

			<div className="flex items-center border-b border-teal-500 py-2 px-3 bg-white opacity-50">
				<input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-10% py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="New Divider" value={newDivider} onChange={(e)=>{
					setNewDivider(e.target.value)
				}}/>
				<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-3 rounded" type="button" onClick={()=>addNewDivider()} >
					Add Divider
				</button>
			</div>

			<Link href={`/mybill/${data._id}/summary`} className="fixed bottom-8 right-8">
                <button type="button" className="h-[50px] bg-zinc-800 px-[20px] text-white rounded-lg" onClick={() => handleSubmit()}>
                    Submit
                </button>
            </Link>

		</div>
	);
}

//<form action={`${process.env.NEXT_PUBLIC_BACKEND_API}`} method="POST" className='w-full max-w-sm bg-white rounded-lg'></form>
