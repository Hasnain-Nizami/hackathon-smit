import{auth,createUserWithEmailAndPassword,doc, setDoc,db } from "./firebaseconfig.js";

let signup = document.getElementById("signup")

const create = ()=>{
    let firstname = document.getElementById("firstname")
    let lastname = document.getElementById("lastname")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let repeatpassword = document.getElementById("repeatpassword")
    
    if(!firstname.value || !lastname.value || !email.value || !password.value || !repeatpassword.value ){
        Swal.fire('Fill all input fields')
    }


    let userdata = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: repeatpassword.value,
        profilepic:""
    }

    createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
        .then( async(userCredential) => {
          const user = userCredential.user.uid;
          const cityRef = doc(db, 'users', user);
          
          await setDoc(cityRef, userdata)
          console.log(cityRef);
            alert("create account")
         
        })
        .catch((error) => {
          const errorMessage = error.code;
        console.log(errorMessage);
        if(errorMessage == "auth/weak-password"){
           Swal.fire('Weak password')
        }else if(errorMessage == "auth/invalid-email"){
          Swal.fire('wrong email')
        }
         
        });


      firstname.value = ""
      lastname.value = ""
      email.value = ""
      password.value = ""
      repeatpassword.value = ""

    
}

signup.addEventListener("click",create)

