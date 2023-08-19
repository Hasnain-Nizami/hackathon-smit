import {signOut,auth} from "./firebaseconfig.js"
let logout = document.getElementById("logout")

logout.addEventListener("click", () => {

    signOut(auth).then(() => {
        window.location.replace("./login.html")
    }).catch((error) => {
        // An error happened.
    });
})