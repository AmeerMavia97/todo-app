import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth , db  } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, deleteDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const div = document.querySelector("#container2")
const submit = document.querySelector("#submit")
let description = document.querySelector('#description')
const usernames = document.querySelector("#names")

let uid;
// IF USER IS NOT LOGIN SO RUN THIS FUNCTION
onAuthStateChanged(auth, async (user) => {
  if (user) {
     uid = user.uid;
    console.log(uid);
    const q = query(collection(db, "user"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q) 
    querySnapshot.forEach((item) => {
      console.log(item.data().uid);
      console.log(item.data().name); 
      usernames.innerHTML = item.data().name
  });
  } else {
    window.location = "./login.html"
  }
});

// LOGOUT USER
const logout = document.querySelector("#logout-btn")
logout.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location = "./login.html"
  }).catch((error) => {
    console.log(error);

  });
})



  let arr = [];


function printdata() {
  div.innerHTML = '';
  arr.map((item) => {
    div.innerHTML += `
  <div class="bg-[#0b172a] mt-9 pt-1 pb-3 rounded-lg mr-[28%] ml-[28%]">
     <div class="flex justify-between">
        <h1 class="text-white mt-3 ml-3" ><span class="font-bold text-sky-300" >ITEM : </span>${item.description}</h1>
        <div class="mt-3 mr-3">
           <button id= "update"><i class="text-sky-300 mr-3 fa-solid fa-pen-to-square"></i></button>
           <button id="delete"><i class=" text-sky-300 fa-solid fa-trash"></i></button>
         </div>
     </div>
  </div>`
  });


  const delvalue = document.querySelectorAll("#delete")
  const editvalue = document.querySelectorAll('#update')

  // DELETE  VALUE FOR FIRESTO RE
  delvalue.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      // console.log('delete called', arr[index]);
      await deleteDoc(doc(db, "usersdetails", arr[index].docId))
        .then(() => {
          arr.splice(index, 1)
          printdata();
        });
    })
  });

  // EDIT VALUE FOR FIRE STORE
  editvalue.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      console.log('update', arr[index]);
      const editss = prompt("enter your updatetodo")
      await updateDoc(doc(db, 'usersdetails', arr[index].docId), {
        description: editss
      });
      arr[index].description = editss;
      printdata();
    })
  });
}





// CLOUD FIRESTORE
// GET  FIRESTORE DOCUMMENT AND PRINT HOME>HTML

      async function getDataFromFirestore() {
        arr.length = 0;
        const q = query(collection(db, "usersdetails"), orderBy("postDate", "desc") , );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          arr.push({ ...doc.data(), docId: doc.id })
        });
        console.log(arr);
        printdata()
      }
      
      getDataFromFirestore();

// ADD Document IN FIRESTORE


submit.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const objdata =
    {
      description: description.value,
      userid: auth.currentUser.uid,
      postDate: Timestamp.fromDate(new Date()),
    }
    const docRef = await addDoc(collection(db, "usersdetails"), objdata);
    console.log("Document written with ID: ", docRef.id);
    objdata.docId = docRef.id;
    arr = [objdata, ...arr]
    printdata()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
