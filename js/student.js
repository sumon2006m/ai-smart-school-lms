async function loadCourses(){
  const data=await getData(API_COURSES);
  document.getElementById("courseBox").innerHTML=
  data.map(c=>`<div class="card">${c.subject}</div>`).join("");
}
