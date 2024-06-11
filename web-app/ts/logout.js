console.log("WOOOOOOOOOOOOOOOOOW");
function logout(){
    console.log("ayo im in");
    const sessionToken = getCookie('some-auth');

    console.log(sessionToken);

    const data = {
        "session_token": sessionToken
    };

    const headers = {'Content-Type':'application/json'
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
    }


    console.log(data);
    
    fetch(`http://localhost:1001/auth/logout`, {
        // mode: 'no-cors',
        method: "POST",
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data),
    
    })
    .then(res => {
        window.location.replace("index.html");
     
    })
    .catch(error => {
        console.error('Error: ', error);
    });
    
    
}
