// form validation
const myForm = document.querySelector('#my-form');
const namein = document.querySelector('#name');
const emailInput = document.querySelector('#emailID');
// const userList = document.querySelector('#users');


myForm.addEventListener('submit', onSubmit);



function onSubmit(e) {
  e.preventDefault();


  // instead of console add name and email to the localstorage

  // localStorage.setItem('name',namein.value);
  // localStorage.setItem('email',emailInput.value);


  // add name and email to localstorage as a object

  let userdetails =
  {
    name: namein.value,
    email: emailInput.value


  };
  // using this we can add only one user and when we add new user older will removed
  //  localStorage.setItem('userdetails',JSON.stringify(userdetails));

  // using uniqe id we can add multiple user older will nt removed
  //  localStorage.setItem(userdetails.email, JSON.stringify(userdetails));

  // push data on crud
  axios
  .post("https://crudcrud.com/api/58eaf34b940746f6b2af374f2a34d94f/appointmentdata",userdetails)
  .then((response)=>
        {
        console.log(response);
     ShowUser(response.data);
    
  })
  .catch(err=>console.log(err));
  
 
  }

// show user on screen
window.addEventListener("DOMContentLoaded", () => {
  // get appointment data from crud and show it on the screen
  axios.get("https://crudcrud.com/api/58eaf34b940746f6b2af374f2a34d94f/appointmentdata")
  .then((response)=>{
    console.log(response)
  for(var i=0;i<response.data.length;i++) {
    ShowUser(response.data[i])
  }
  })
  .catch((err)=>{
  console.log(err)
  })

})
function ShowUser(user) {

  //  when we create new user with same mail it will ceate new one instead of change older one
   if(localStorage.getItem(user.email)!==null)
   {
     removeUserFromScreen(user.email);
 }
  // // create new li on screen
  // const li = document.createElement('`<li id=${user.email}>');
  // li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));
  // userList.appendChild(li);
   const parentnode=document.getElementById('users');
   const childnode= `<li id=${user._id}> ${user.name} - ${user.email}
   <button onclick=deleteUser('${user._id}')> Delete User </button>
   <button onclick=edituser('${user.email}','${user.name}','${user._id}')> edit User </button>
</li>`
   parentnode.innerHTML=parentnode.innerHTML + childnode;
  // Clear fields
    namein.value = '';
   emailInput.value = '';
  }

  // delete user
function deleteUser(userId)
{
  
  // delete from crudd6387e56765e4a6b8fc8262571cb1e76
  axios.delete(`https://crudcrud.com/api/58eaf34b940746f6b2af374f2a34d94f/appointmentdata/${userId}`)
  .then((res)=>{
      console.log(res)
      removeUserFromScreen(userId);
  
  })
   
    .catch((err=>
      console.log(err)));



}

// edituser
function edituser(emailIDs,names,userid)
{

 
  

  document.getElementById('name').value = names;
 document.getElementById('emailID').value = emailIDs;
 
     deleteUser(userid); 
 

  
  }



  // remove user from onscreen
function removeUserFromScreen(userId){
  const parentNode = document.getElementById('users');
  const childNode = document.getElementById(userId);
if(childNode)
{
 parentNode.removeChild(childNode);
}
}

