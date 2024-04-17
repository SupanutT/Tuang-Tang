export default async function userRegister({
    name,
    username,
    email,
    password,
}: {
    name: string
    username: string
    email: string
    password: string
}) {
    const formData = { name: name, username: username, email: email, password: password }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData })
        })
        const user = await response.json();

        return user
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error during register:', error);
        throw new Error("Failed to register");
    }
}
