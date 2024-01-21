'use client'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useReducer, useState } from "react";

interface Bill {
	[key: string]: any
}

export default function Table(){

	const billReducer = ( billColumn: Bill[], action: {type: string, friendName: string}):Bill[] => {
        switch(action.type) {
            case 'add': {
                return billColumn.map(item => ({
					...item,
					[action.friendName]: false
				}))
            }
            default: {
                return billColumn
            }
        }
    }

	const data = [
		{ No: '1', Menu: 'pizza', Quantity: 2, Price: 400, Me: true, friend_1: false },
		{ No: '2', Menu: 'french fries', Quantity: 1, Price: 138, Me: true, friend_1: true },
		{ No: '3', Menu: 'coke', Quantity: 2, Price: 80, Me: true, friend_1: false },
		{ No: '4', Menu: 'burger', Quantity: 4, Price: 800, Me: true, friend_1: true },
		{ No: '5', Menu: 'pizza2', Quantity: 2, Price: 200, Me: true, friend_1: false },
		{ No: '6', Menu: 'pizza3', Quantity: 2, Price: 200, Me: true, friend_1: false },
	]

    const [ datas, dispatch ] = useReducer(billReducer, data);
    const [ newFriend, setNewFriend ] = useState('');

	function addNewFriend() {
        if( newFriend.trim() !== ''){
			dispatch({ type: 'add', friendName: newFriend });
			setNewFriend('');
        }
    }

    return (
        <div className='absolute top-[20%] left-[5%]'>
	        <table className="shadow-black">
		        <thead>
					<TableHead data={datas}/>
		        </thead>
				<tbody>
					<TableBody data={datas}/>
				</tbody>
	        </table>


				<div className="flex items-center border-b border-teal-500 py-2 px-3">
    				<input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-10% py-2 px-2 leading-tight focus:outline-none " type="text" placeholder="Jane Doe" aria-label="Full name" value={newFriend} onChange={(e)=>{
						setNewFriend(e.target.value)
					}}/>
    				<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-5 rounded" type="button" onClick={()=>addNewFriend()} >
      					Submit
 					</button>
  				</div>


        </div>
    );
}

//<form action={`${process.env.NEXT_PUBLIC_BACKEND_API}`} method="POST" className='w-full max-w-sm bg-white rounded-lg'></form>
