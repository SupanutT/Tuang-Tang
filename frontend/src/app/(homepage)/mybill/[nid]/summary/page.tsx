import BillSummary from "@/app/components/BillSummary";
export default function SummaryPage() {

    return (
        <div className="mt-[50px] w-[100%] flex justify-center flex-column text-center bg-gradient-to-tr from-sky-500 to-orange-300 h-[100vh]">
            <BillSummary />
        </div>
    );

}
