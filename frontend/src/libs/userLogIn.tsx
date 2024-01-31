export default async function userLogIn(userName: string, userPassword: string) {

    try {
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
        const user = await response.json();
        const editedToken = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expiredDate: (user.expriedIn * 1000 + Date.now())
        }

        return user

    } catch (error) {
        throw new Error("Failed to log in");
    }
}
