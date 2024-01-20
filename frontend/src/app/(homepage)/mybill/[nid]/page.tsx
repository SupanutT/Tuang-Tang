export default function MyBillDetailPage( {params}: { params: {nid:string}}){
    return (
        <main className="mt-[80px] px-[10px]">
            <div className="text-md">
                MyBill ID {params.nid}
            </div>
        </main>
    );
}
