export default async function getBills(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_IMG}/api/bills`)

    if(!response.ok){
        throw new Error("Failed to fetch bills")
    }

    return await response.json()
}
