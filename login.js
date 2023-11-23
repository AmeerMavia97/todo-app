import { signInWithEmailAndPassword ,updatePassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const loginbtn2 = document.querySelector("#login-btn2");
const email = document.querySelector("#login-email");
const password = document.querySelector("#login-password");

loginbtn2.addEventListener("submit", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value , password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = "./home.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorCode,
        footer: '<a href="">Why do I have this issue?</a>'
      })
  });

})


const forgetpass = document.querySelector("#forget-pass")


forgetpass.addEventListener("click" , (e)=>{
    e.preventDefault();
    window.location="./forgetpass.html"    
})