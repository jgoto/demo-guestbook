export async function submitContactForm(payload){
    const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/contact/send`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(payload)
    })
    
    const result = await response.json();
    
    if(!response.ok)
        throw new Error("Something went wrong");
    return result.message;
}