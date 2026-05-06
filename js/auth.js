let currentUser = null;

async function login() {
  const school = document.getElementById("schoolId").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");
  const loginBtn = document.querySelector("button[onclick='login()']");

  if (!username || !password) {
    msg.innerText = "⚠️ ইউজারনেম এবং পাসওয়ার্ড দিন";
    return;
  }

  // বাটন ডিসেবল করা যাতে ইউজার বারবার ক্লিক না করে
  loginBtn.disabled = true;
  msg.innerText = "⏳ যাচাই করা হচ্ছে...";

  try {
    const users = await getData(API_USERS);
    
    const user = users.find(u => 
      u.school_id == school && 
      u.username == username && 
      u.password == password
    );

    if (!user) {
      msg.innerText = "❌ ভুল ইউজারনেম বা পাসওয়ার্ড!";
      loginBtn.disabled = false;
      return;
    }

    // সাকসেস
    currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));

    updateUI();
    showScreen("dashboard");
    msg.innerText = ""; // মেসেজ ক্লিয়ার করা
  } catch (error) {
    msg.innerText = "🚀 সার্ভার ত্রুটি! আবার চেষ্টা করুন।";
    console.error(error);
  } finally {
    loginBtn.disabled = false;
  }
}

function logout() {
  if (confirm("আপনি কি লগআউট করতে চান?")) {
    localStorage.removeItem("user");
    currentUser = null;
    showScreen("loginScreen");
    // পেজ রিলোড দিলে সব মেমোরি ক্লিন হয়ে যায়, যা নিরাপদ
    location.reload(); 
  }
}
