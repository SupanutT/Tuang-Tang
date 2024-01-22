'use client'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useReducer, useState } from "react";
import { deflate } from "zlib";

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


    const [ bill, setBill ] = useState( data );
    const [ newDivider, setNewDivider ] = useState('');
	// const [ newMenu, setNewMenu ] = useState({
	// 	Menu: '',
	// 	Quantity: 0,
	// 	Price: 0
	// })

	function addNewDivider() {
        if( newDivider.trim() !== ''){
			const all_new_dividers = bill.all_dividers;
			all_new_dividers.push(newDivider);
			setBill((prev)=>({
				...prev,
				all_dividers: all_new_dividers
			}))
			setNewDivider('');
        }
    }



    return (
        <div className='absolute top-[20%] left-[5%]'>
	        <table className="shadow-black">
		        <thead>
					<TableHead dividers={bill.all_dividers}/>
		        </thead>
				<tbody>
					<TableBody bill={bill}/>
				</tbody>
	        </table>


				<div className="flex items-center border-b border-teal-500 py-2 px-3">
    				<input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-10% py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="Jane Doe" aria-label="Full name" value={newDivider} onChange={(e)=>{
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
