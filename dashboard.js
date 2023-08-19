import { auth, onAuthStateChanged, signOut, doc, db, getDoc, collection, addDoc, setDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, storage, ref, getDownloadURL, uploadBytesResumable } from "./firebaseconfig.js"


let activeUser;
let activeUserId;
let username;


window.addEventListener("load", loadpost);

async function loadpost() {
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach(async (docs) => {
        const { text, placeholder, userID, time, name } = docs.data();
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const email = docSnap.data().email
        postfun(name, text, email, time, docs.id, placeholder);
    });
}

let name = document.getElementById("name")
name.addEventListener("click",()=>{
    window.location.replace("./profile.html")
})

onAuthStateChanged(auth, (user) => {

    if (user) {
        const uid = user.uid;
        activeUser = user
        const callback = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);


            if (docSnap.exists()) {
                activeUser = docSnap.data()
                activeUserId = docSnap.id
                username = `${activeUser.firstname} ${activeUser.lastname}`
                name.innerHTML = username

            } else {

                console.log("No such document!");
            }

        }
        callback()

    } else {
        window.location.replace("./login.html")
    }

});
let placeholder = document.getElementById("placeholder")
let postText = document.getElementById("postText")
const post = document.getElementById("post")

post.addEventListener("click", createpost);

async function createpost() {

    const obj = {
        name: `${username}`,
        userID: `${activeUserId}`,
        email: `${activeUser.email}`,
        text: `${postText.value}`,
        placeholder: `${placeholder.value}`,
        time: serverTimestamp(),
    }


    const response = await addDoc(collection(db, "post"), obj);

    const docRef = doc(db, "post", response.id); // Changed "posts" to "post"
    const docSnap = await getDoc(docRef);

    postfun(
        username,
        postText.value,
        activeUser.email,
        docSnap.data().time,
        response.id,
        placeholder.value,
    );

}
let parent = document.getElementById("parent")
function postfun(username, text, email, time, id, placeholder) {
    console.log(id);
    let div = document.createElement("div");
    div.innerHTML = `<div id="${id}" class="postblog shadow p-3 mb-3 bg-white rounded">
  <div class="postflex">
      <img src="./assets/channels4_profile.jpg" alt="">
      <div class="postname">
          <h3>${placeholder}</h3>
          <p>${username} - ${time.toDate().toLocaleString()}</p>
      </div>
  </div>
  <div>
      <p style="font-family: sans-serif;">${text}</p>
  </div>
  <div class="updatebtn">
      <button onclick="del(this)">Delete</button>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edt(this)">Edit</button>
  </div>
</div>`
    parent.prepend(div);

}
///////////////////////////////logout///////////////////////////
let logout = document.getElementById("logout")

logout.addEventListener("click", () => {

    signOut(auth).then(() => {
        window.location.replace("./login.html")
    }).catch((error) => {
        // An error happened.
    });
})

async function del(elem) {
    let parent = elem.parentNode.parentNode
    await deleteDoc(doc(db, "post", parent.id));
    parent.remove()
}
window.del = del
let edtplace = document.getElementById("edtplace")
let edtinp = document.getElementById("edtinp")


async function edt(elem) {
    let placeholder = elem.parentNode.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild
    let text = elem.parentNode.previousElementSibling.firstElementChild
    let post = elem.parentNode.parentNode

    let update = document.getElementById("update")
    
    edtplace.value = text.innerHTML
    edtinp.value = placeholder.innerHTML
    update.addEventListener("click", async () => {

        const washingtonRef = doc(db, "post", post.id);
        await updateDoc(washingtonRef, {
            placeholder: edtinp.value,
            text: edtplace.value, 

        });
        location.reload()


    })


}
window.edt = edt





