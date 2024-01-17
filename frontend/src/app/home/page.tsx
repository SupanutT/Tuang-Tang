import BillCard from "../components/BillCard";

export default function Home(){
    return (
        <main className="mt-[50px]">
            <div className="flex flex-row justify-evenly content-evenly flex-wrap gap-x-5">
                <BillCard billName="Izakaya" />
                <BillCard billName="Jae Oh" />
                <BillCard billName="Hea Moo" />
                <BillCard billName="Izakaya AV" />
                <BillCard billName="Izakaya AV2" />
            </div>
        </main>
    );
}
