
import TopMenuHomePage from "./components/TopMenuHomePage";
import Image from "next/image";

export default function Home() {


	return (
		<main className="text-center">
			<TopMenuHomePage />
			<div className="bg-[url('/img/piggybank.png')] h-[600px] w-full mt-[50px] px-[90px] py-[75px] bg-contain bg-fixed ">
				<div className="h-full w-1/2 flex items-center">
					<Image src={'/img/logo.png'} alt='logo' width={0} layout='responsive' height={0} className='w-full h-auto' />
				</div>
			</div>
			<h1>Hello Welcome</h1>
		</main>
	);
}
