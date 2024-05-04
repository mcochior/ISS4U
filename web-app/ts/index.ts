export async function change_text(id: string): Promise<void> {
    const paragraph = document.getElementById(id);

    try {
        const response = await fetch('http://localhost:1001/users');
        const data = await response.json();
        const text = data[0].email;
        paragraph.textContent = text;
    } catch (error) {
        console.log('ERROR:', error);
    }
}