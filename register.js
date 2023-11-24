import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db, storage } from "./config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const names = document.querySelector("#name")
const lastname = document.querySelector("#lastname")
const email = document.querySelector("#email")
const country = document.querySelector("#country")
const password = document.querySelector("#password")
const registerbtn = document.querySelector("#btn")
const img = document.querySelector("#img")
const emailused = document.querySelector("#email-used")




registerbtn.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user)
      const file = img.files[0]
      const storageRef = ref(storage, names.value);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log(url);
           addDoc(collection(db, "user"), {
            name: names.value,
            email: email.value,
            uid: user.uid,
            posturl: url
            
          }).then((res) => {
            console.log(res);
            window.location = 'index.html'
        }).catch((error) => {
            console.log(error);
          });
      });

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      Swal.fire({
        title: errorCode,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

    })
  // email.value = "";
  // names.value = "";
  lastname.value = "";
  password.value = "";
  country.value = "";
});
})



// Swal.fire({
// position: 'top-end',
// icon: 'succ/\ess',
// title: 'REGISTER SUCCESSFULLY',
// showConfirmButton: false,
// timer: 1500
