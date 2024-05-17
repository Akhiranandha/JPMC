const url = "http://localhost:4321"
var token
const loginUser = async () =>{
    var cred={
        uname : document.getElementById("username").value,
        pass : document.getElementById("password").value
    }
    var data = await fetch(`${url}/login`,{method:"POST",body:JSON.stringify(cred)})
    var ds=await data.json()
    token=ds.token
    if(data.ok){
        document.write(`<a onclick="getProfile()">Go to profile<a/>`)
    }
}
const getProfile = async ()=>{
    console.log(token)
    var data = await fetch(`${url}/profile`,{method:"POST",
    headers: new Headers({'Authorization':`Token ${token}`})})
}

// const url = "http://localhost:4321";
// const loginUser = async () => {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const credentials = { uname: username, pass: password };

//     try {
//         const response = await fetch(`${url}/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(credentials)
//         });

//         if (response.ok) {
//             const token = await response.text();
//             console.log("Token:", token);
//             // Handle token (e.g., store in local storage, redirect to profile page)
//         } else {
//             console.error("Failed to login:", response.status);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };

// document.getElementById("loginForm").addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission
//     loginUser();
// });
