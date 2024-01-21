export default function TableData( { item }: { item: Record<string,any> } ) {

    return (
		<tr className="flex">
			{
				Object.keys(item).map((key) => {
					switch (key) {
						case("No"): {
							return <td key={key} className="py-[15px] w-[50px] pl-[15px] bg-black opacity-50 text-white hover:opacity-30">
							{`${item[key]}`}
							</td>
						}case("Menu"):{
							return <td key={key} className="py-[15px] w-[200px] pl-[15px] bg-black opacity-50 text-white hover:opacity-30">
							{`${item[key]}`}
							</td>
						}case("Quantity"):{
							return <td key={key} className="py-[15px] w-[100px] pl-[15px] bg-black opacity-50 text-white hover:opacity-30">
							{`${item[key]}`}
							</td>
						}case("Price"):{
							return <td key={key} className="py-[15px] w-[100px] pl-[15px] bg-black opacity-50 text-white hover:opacity-30">
							{`${item[key]}`}
							</td>
						}default: {
							return <td key={key} className="py-[15px] w-[100px] pl-[15px] bg-black opacity-50 text-white hover:opacity-30">
							{`${item[key]}`}
							</td>
						}
					}
				}

				)
			}
		</tr>
	 );
}
