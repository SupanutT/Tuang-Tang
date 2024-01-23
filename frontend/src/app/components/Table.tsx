	'use client'
	import TableHead from "./TableHead";
	import TableBody from "./TableBody";
	import { useReducer, useState } from "react";


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
	export default function Table(){

		const billItemReducer = ( billItems: BillItem[], action: {type: string, newMenu: {
			menu:string, quantity: number, price: number
		}}) => {
			switch(action.type){
				case('addMenu'):{
					return [
						...billItems,
						{
							_id: billItems.length.toString(),
							menu: action.newMenu.menu,
							price: action.newMenu.price,
							quantity: action.newMenu.quantity,
							dividers: []
						}
					]
				}
				default: {
					return billItems
				}
			}
		}

		const dividerReducer = ( all_dividers: string[], action: {type: string, newDivider: string}) =>{
			switch(action.type){
				case("addDivider"):{
					return [...all_dividers, action.newDivider]
				}
				default: {
					return all_dividers
				}
			}
		}

		const data =
			{
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


		// const [ bill, setBill ] = useState( data );
		const [ all_dividers, dispatchDivider ] = useReducer( dividerReducer, data.all_dividers )
		const [ all_billItems, dispatchBillItem ] = useReducer( billItemReducer, data.billItems )
		const [ owner_name, setOwnerName ] = useState(data.owner_name)
		const [ newDivider, setNewDivider ] = useState('');
		const [ newMenu, setNewMenu ] = useState({
			menu: '',
			quantity: '',
			price: ''
		})

		function addNewDivider() {
			if (newDivider.trim() !== '') {
				dispatchDivider({ type: 'addDivider', newDivider });
				setNewDivider('');
			  }
		}

		function addNewMenu() {
			if(newMenu.menu.trim() !== '' && Number(newMenu.quantity) > 0 && Number(newMenu.price) > 0){
				dispatchBillItem({ type: 'addMenu', newMenu: {
					menu: newMenu.menu,
					quantity: Number(newMenu.quantity),
					price: Number(newMenu.price)
				}})
				setNewMenu({
					menu: '',
					quantity: '',
					price: ''
				})
			}
		}

		// const [ newMenu, setNewMenu ] = useState({
		// 	Menu: '',
		// 	Quantity: 0,
		// 	Price: 0
		// })

		return (
			<div className='absolute top-[20%] left-[5%]'>
				<table className="shadow-black">
					<thead>
						<TableHead dividers={all_dividers}/>
					</thead>
					<tbody>
						<TableBody owner_name={owner_name} all_dividers={all_dividers} all_billItems={all_billItems}/>
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
							Submit
						</button>
					</div>

					<div className="flex items-center border-b border-teal-500 py-2 px-3 bg-white opacity-50">
						<input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-10% py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="New Divider" value={newDivider} onChange={(e)=>{
							setNewDivider(e.target.value)
						}}/>
						<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-5 rounded" type="button" onClick={()=>addNewDivider()} >
							Submit
						</button>
					</div>


			</div>
		);
	}

	//<form action={`${process.env.NEXT_PUBLIC_BACKEND_API}`} method="POST" className='w-full max-w-sm bg-white rounded-lg'></form>
