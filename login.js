import{signInWithEmailAndPassword,auth} from "./firebaseconfig.js" 


let loginemail = document.getElementById("loginemail")
let password = document.getElementById("password")
let login = document.getElementById("login")

const loginAccount = ()=>{
    let loginEmail = document.getElementById("loginEmail")
    let loginPassword = document.getElementById("loginPassword")
    if(loginemail.value == "" || password.value == ""){
        Swal.fire('fill all input field')
        return
    }
    signInWithEmailAndPassword(auth, loginemail.value, password.value)
    .then((userCredential) => {
     
      const user = userCredential.user;
      window.location.replace("./dashboard.html")
     
    })
    .catch((error) => {
      const errorMessage = error.code;
      if(errorMessage == "auth/invalid-email"){
        Swal.fire('invalid email')
      }else if(errorMessage == "auth/wrong-password"){
        Swal.fire('Wrong password')
      }else{
        Swal.fire('email and password wrong')
      }
    });
}
let sign = document.querySelector(".sign")
sign.addEventListener("click",()=>{
  window.location.replace("./index.html")
})

login.addEventListener("click",loginAccount)