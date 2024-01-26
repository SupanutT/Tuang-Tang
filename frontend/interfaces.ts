export interface Bill {
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
};

export interface BillItem {
	_id: string
	menu: string,
	price: number
	quantity: number,
	dividers: string[]
};
