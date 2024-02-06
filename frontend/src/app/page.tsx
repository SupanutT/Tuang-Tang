
import TopMenuHomePage from "./components/TopMenuHomePage";
import Image from "next/image";

export default function Home() {


	return (
		<main className="text-center mt-[70px]">
			<TopMenuHomePage />
			<div className="bg-gradient-to-tr from-yellow-200 to-blue-300 bg-h-[600px] w-full mt-[50px] px-[90px] py-[75px] flex flex-row items-center">
				<div className="h-full w-1/2 flex items-center">
					<Image src={'/img/logo.png'} alt='logo' width={0} layout='responsive' height={0} className='w-full h-auto' />
				</div>
				<div className="h-full w-1/2 flex items-center">
					<Image src={'/img/piggybank.png'} alt='logo' width={0} layout='responsive' height={0} className='w-full h-auto' />
				</div>
			</div>
			<div className="bg-gradient-to-br from-yellow-200 to-blue-300 w-full px-[90px] py-[75px] flex flex-row items-center mt-1 h-[600px]">
				<div className="h-full w-1/2 flex items-center">

				</div>
				<div className="flex h-full w-1/2 justify-center items-center">

					<div className="block text-left w-[75%]">
						<h1 className="font-mono text-emerald-700 text-5xl mb-3">What is Tuang-Tang</h1>
						<p className="text-md font-mono mt-5">
							Welcome to Tuang-Tang, your go-to solution for seamless bill splitting! Our project is designed to streamline the process of dividing expenses when dining out with friends.
						</p>

						<p className="text-md font-mono mt-3 ">
							With Tuang-Tang, you can effortlessly manage shared expenses by uploading a receipt image.
						</p>
					</div>

				</div>
			</div>

		</main>
	);
}
