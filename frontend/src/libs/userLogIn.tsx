export default async function userLogIn(userName: string, userPassword: string){

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                password: userPassword
            }),
        })

        return await response.json()

    } catch (error) {
        throw new Error("Failed to log in");
    }
}
