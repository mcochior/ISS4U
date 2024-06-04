console.log("WOOOOOOOOOOOOOOOOOW");
function logout(){
    console.log("ayo im in");
    const sessionToken = getCookie('some-auth');

    const data = {
        "sessionToken": sessionToken
    };
    
    fetch(`http://localhost:1001/auth/logout`, {
        // mode: 'no-cors',
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data),
    
    })
    .then(res => {
        window.location.replace("index.html");
     
    })
    .catch(error => {
        console.error('Error: ', error);
    });
    
    
}
