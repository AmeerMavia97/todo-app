import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js";


const names = document.querySelector("#name")
const lastname = document.querySelector("#lastname")
const email = document.querySelector("#email")
const country = document.querySelector("#country")
const password = document.querySelector("#password")
const registerbtn = document.querySelector("#btn")
const emailused = document.querySelector("#email-used")



registerbtn.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then( async (userCredential) => {
      const user = userCredential.user;
      console.log(user)
        const docRef = await addDoc(collection(db, "user"), {
        name: names.value,
        email: email.value,
        uid: user.uid,
      });
      console.log("Document written with ID: ", docRef.id  );
       
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



// Swal.fire({
  // position: 'top-end',
  // icon: 'succ/\ess',
  // title: 'REGISTER SUCCESSFULLY',
  // showConfirmButton: false,
  // timer: 1500






// let rightNow = new Date().getTime();
// console.log(rightNow);
// console.log('date' , rightNow);
// console.log('date' , rightNow.getDate());
// console.log('day' , rightNow.getDay());
// console.log('hours' , rightNow.getHours());
// console.log('minutes' , rightNow.getMinutes());
// console.log('seconds' , rightNow.getSeconds());
// console.log('millisecond' , rightNow.getMilliseconds());
// console.log('month' , rightNow.getMonth());
// console.log('full year' , rightNow.getFullYear());
// console.log('time' , rightNow.getTime());









// let today = new Date().getTime();
// let birthDate = new Date('july 12, 2006').getTime();
// let remainingMilliSeconds = today - birthDate;
// let remainingDays = remainingMilliSeconds / 1000 / 60 /60 / 24 / 7 / 4.5 / 12
// // / 60 / 60 / 24 / 7 / 4.5 / 12

// console.log('today===>' , today)
// console.log('birthDate ===>' , birthDate)
// console.log('remainingMilliSeconds ===>' , remainingMilliSeconds)
// console.log('remainingDays ===>', Math.ceil(remainingDays))



// const date = new Date('January 25, 2022');
// date.setHours(5);
// date.setMinutes(50);
// date.setSeconds(40)
// console.log(date);