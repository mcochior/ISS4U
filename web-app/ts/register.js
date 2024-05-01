export async function register(email, username, password){
    const paragraph = document.getElementById(id);

    try {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        const text = data[0].email;
        paragraph.textContent = text;
    } catch (error) {
        console.log('ERROR:', error);
    }
}