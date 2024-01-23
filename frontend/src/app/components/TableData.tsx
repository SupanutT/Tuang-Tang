import BodyCell from "./BodyCell";
import BodyCheckBoxCell from "./BodyCheckBoxCell";

export default function TableData( { item, num }: { item: Record<string,any>, num: number } ) {

    return (
		<tr className="flex">
			{
				Object.keys(item).map((key) => {
					switch (key) {
						case("_id"): {
							return <BodyCell key={`${key}_${num}`} value={`${num}`} width="50px" left={true}/>
						}case("menu"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="200px" left={true}/>
						}case("quantity"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100px" left={false}/>
						}case("price"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100px" left={false}/>
						}default: {
							return <BodyCheckBoxCell key={`${key}_${num}`} isChecked={item[key]} width="100px" id={`${key}_${num}`}/>
						}
					}
				})
			}
		</tr>
	 );
}
