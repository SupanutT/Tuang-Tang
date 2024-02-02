import BodyCell from "./BodyCell";
import BodyCheckBoxCell from "./BodyCheckBoxCell";
import BodyNumberCell from "./BodyNumberCell";

export default function TableData({
	item,
	num,
}: {
	item: Record<string,any>,
	num: number,
}) {
    return (
		<tr className="flex">
			{
				Object.keys(item).map((key) => {
					switch (key) {
						case("_id"): {
							return <BodyNumberCell key={`${key}_${num}`} value={`${num}`} width="50px" id={`${key}_${num}`}/>
						}case("menu"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="200px" left={true} id={`${key}_${num}`}/>
						}case("quantity"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100px" left={false} id={`${key}_${num}`}/>
						}case("price"):{
							return <BodyCell key={`${key}_${num}`} value={item[key]} width="100px" left={false} id={`${key}_${num}`}/>
						}default: {
							return <BodyCheckBoxCell
										key={`${key}_${num}`}
										isChecked={item[key]}
										width="100px"
										id={`${key}_${num}`}
									/>
						}
					}
				})
			}
		</tr>
	 );
}
