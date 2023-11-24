import {updatePassword  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

// const auth = getAuth(app);
const btn = document.querySelector("#btn")


// function getASecureRandomPassword(){

// }

const password = document.querySelector("#password").value;
const confirmpass = document.querySelector("#confirmpass").value;
// btn.addEventListener("click" , (e)=>{
//     e.preventDefault();
   

//     if(password === confirmpass){
//         const newPassword = getASecureRandomPassword();
//         updatePassword(user, newPassword)
//         .then(() => {
//             console.log("hello");
//           }).catch((error) => {
//             console.log(error);

//           });
//     }else{
//         Swal.fire({
//             icon: 'error',
//             title: 'PASSWORD NOT SAME',
//             text: "PASSWORD NOT SAME",
//             footer: '<a href="">Why do I have this issue?</a>'
//           })
//     }
// })







const user = auth.currentUser;


btn.addEventListener("submit" ,( )=>{
  const newPassword = getASecureRandomPassword();
  updatePassword(user, newPassword).then(() => {
  // Update successful.log
console.log(newPassword);
}).catch((error) => {
  // An error ocurred
  Swal.fire({
    icon: 'error',
    title: 'PASSWORD NOT SAME',
    text: "PASSWORD NOT SAME",
    footer: '<a href="">Why do I have this issue?</a>'
  })
  // ...
});

})