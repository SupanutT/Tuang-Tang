export default function MyBillDetailPage( {params}: { params: {nid:string}}){
    return (
        <main className="mt-[80px] px-[10px]">
            <div className="text-md">
                MyBill ID {params.nid}
            </div>
            <div id="container">
	            <table className="border-collapse w-[800px]">
		            <thead>
			            <tr>
				            <th>Column 1</th>
				            <th>Column 2</th>
				            <th>Column 3</th>
				            <th>Column 4</th>
				            <th>Column 5</th>
			            </tr>
		            </thead>
		            <tbody>
			            <tr>
				            <td>Cell 1</td>
				            <td>Cell 2</td>
				            <td>Cell 3</td>
				            <td>Cell 4</td>
				            <td>Cell 5</td>
			            </tr>
			            <tr>
				            <td>Cell 1</td>
				            <td>Cell 2</td>
				            <td>Cell 3</td>
				            <td>Cell 4</td>
				            <td>Cell 5</td>
			            </tr>
			            <tr>
				            <td>Cell 1</td>
				            <td>Cell 2</td>
				            <td>Cell 3</td>
				            <td>Cell 4</td>
				            <td>Cell 5</td>
			            </tr>
			            <tr>
				            <td>Cell 1</td>
				            <td>Cell 2</td>
				            <td>Cell 3</td>
				            <td>Cell 4</td>
				            <td>Cell 5</td>
			            </tr>
			            <tr>
				            <td>Cell 1</td>
				            <td>Cell 2</td>
				            <td>Cell 3</td>
				            <td>Cell 4</td>
				            <td>Cell 5</td>
			            </tr>
		            </tbody>
	            </table>
            </div>
        </main>
    );
}
