
function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires = Thu, 01 Jan 1970 00:00:01 GMT;';
}

const sessionToken = getCookie('some-auth');

const data = {
    "sessionToken": sessionToken
};

fetch(`http://localhost:1001/auth/logout`, {
    // mode: 'no-cors',
    method: "POST",
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(data),

})
.then(res => {
    if (res.status < 400){
        window.location.replace("index.html");
    }
    // bruh = res;
    // window.location.replace("logged_in_page.html");



})
.catch(error => {
    console.error('Error: ', error);
});

