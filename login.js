import { signInWithEmailAndPassword   ,  GoogleAuthProvider ,   GithubAuthProvider,updatePassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const loginbtn2 = document.querySelector("#login-btn2");
const email = document.querySelector("#login-email");
const password = document.querySelector("#login-password");
const authgoogle = document.querySelector("#auth-google")
const authgithub = document.querySelector("#auth-github")


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



// LOGIN WITH GOOGLE
const provider = new GoogleAuthProvider();


authgoogle.addEventListener("click" , ()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    const user = result.user;
    console.log(user);
    window.location = "home.html"
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}) 



// LOGIN WITH GITHUB
// const githubprovider = new GithubAuthProvider();

// authgithub.addEventListener("click" , ()=>{
//   signInWithPopup(auth, githubprovider)
//   .then((result) => {
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     console.log(token);
//     const user = result.user;
//     console.log(user);
//     window.location = "home.html"
//   }).catch((error) => {
//     const errorCode = error.code;
//     console.log(errorCode);
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GithubAuthProvider.credentialFromError(error);
//   });

// })


// LOGIN WITH TWITTER
// const TwitterAuthProviderprovider = new TwitterAuthProvider();