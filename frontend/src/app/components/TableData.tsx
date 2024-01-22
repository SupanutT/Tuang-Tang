import BodyCell from "./BodyCell";
import BodyCheckBoxCell from "./BodyCheckBoxCell";

export default function TableData( { item, num }: { item: Record<string,any>, num: number } ) {

    return (
		<tr className="flex">
			{
				Object.keys(item).map((key) => {
					switch (key) {
						case("_id"): {
							return <BodyCell key={`${key}_${num}`} value={`${num}`} width="50" left={true}/>
						}case("menu"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="200" left={true}/>
						}case("quantity"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100" left={false}/>
						}case("price"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100" left={false}/>
						}default: {
							return <BodyCheckBoxCell key={`${key}_${num}`} isChecked={item[key]} width="100" id={`${key}_${num}`}/>
						}
					}
				}

				)
			}
		</tr>
	 );
}
