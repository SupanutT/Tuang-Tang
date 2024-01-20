export default function OtherBillDetailPage( {params}: { params: {nid:string}}){
    return (
        <main className="mt-[80px] px-[10px]">
            <div className="text-md">
                OtherBill ID {params.nid}
            </div>
        </main>
    );
}
