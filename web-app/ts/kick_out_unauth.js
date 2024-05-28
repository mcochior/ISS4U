function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', () => {
    const sessionToken = getCookie('some-auth');
    console.log(sessionToken);


    const headers = {'Content-Type':'application/json'
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
    }

    fetch(`http://localhost:1001/users/${sessionToken}`, {
        // mode: 'no-cors',
        method: "POST",
        headers: headers,
        credentials: 'include',
    })
    .then(res => {
        if (res.status == 403){
            window.location.replace("index.html");
        }
    })
    
    .catch(error => {
        console.error('Error: ', error);
    });

    console.log("end");
});