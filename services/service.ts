export const RegisterUsers = async (email: string, password: string) => {
    try {
        const response = await fetch("/api/register",{
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        return data
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}