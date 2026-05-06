async function loadUsers(){
  const users=await getData(API_USERS);
  document.getElementById("adminBox").innerHTML=
  users.map(u=>`<div class="card">${u.name} - ${u.role}</div>`).join("");
}
