let currentUser=null;

async function login(){
  const school=document.getElementById("schoolId").value;
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;

  const users=await getData(API_USERS);

  const user=users.find(u=>
    u.school_id==school &&
    u.username==username &&
    u.password==password
  );

  if(!user){
    document.getElementById("msg").innerText="❌ Login Failed";
    return;
  }

  currentUser=user;
  localStorage.setItem("user",JSON.stringify(user));

  updateUI();
  showScreen("dashboard");
}

function logout(){
  localStorage.removeItem("user");
  currentUser=null;
  showScreen("loginScreen");
}
