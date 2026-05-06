window.onload=()=>{
  const saved=localStorage.getItem("user");
  if(saved){
    currentUser=JSON.parse(saved);
    updateUI();
    showScreen("dashboard");
  }
};

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function show(id){
  showScreen(id);
}

function updateUI(){
  document.getElementById("userName").innerText=currentUser.name;
  document.getElementById("schoolName").innerText=currentUser.school_name;
  document.getElementById("userClass").innerText=currentUser.class;
  document.getElementById("userMobile").innerText=currentUser.mobile;
}

function openAdmin(){
  if(currentUser.role!=="admin"){
    alert("Not admin");
    return;
  }
  showScreen("adminPanel");
}
