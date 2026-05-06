let currentUser = null;

// পেজ লোড হলে প্রাথমিক কাজগুলো সম্পন্ন করা
window.onload = async () => {
    // ১. লোকাল স্টোরেজ থেকে ইউজার চেক
    const saved = localStorage.getItem("user");
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUI();
        showScreen("dashboard");
    }

    // ২. গুগল শীট থেকে স্কুলের লিস্ট নিয়ে এসে ড্রপডাউনে বসানো
    const schoolSelect = document.getElementById("schoolId");
    try {
        const users = await getData(API_USERS);
        // ইউনিক স্কুল লিস্ট বের করা (যদি শীটে স্কুল আইডি/নাম থাকে)
        const uniqueSchools = [...new Set(users.map(u => u.school_id))];
        
        schoolSelect.innerHTML = ""; // আগের ডেমো ডাটা ক্লিয়ার করা
        uniqueSchools.forEach(school => {
            let opt = document.createElement("option");
            opt.value = school;
            opt.innerText = school;
            schoolSelect.appendChild(opt);
        });
    } catch (e) {
        console.error("স্কুল লিস্ট লোড করতে সমস্যা হয়েছে:", e);
    }
};

// স্ক্রিন পরিবর্তনের মূল ফাংশন
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active");
    }
}

// নেভিগেশন এবং ডেটা লোডিং হ্যান্ডলার
async function show(id) {
    showScreen(id);
    
    // নির্দিষ্ট স্ক্রিন অনুযায়ী ডেটা লোড করা (student.js থেকে কল হবে)
    if (id === 'courses') {
        if (typeof loadCourses === "function") await loadCourses();
    } else if (id === 'quiz') {
        if (typeof loadQuizzes === "function") await loadQuizzes();
    } else if (id === 'leaderboard') {
        if (typeof loadLeaderboard === "function") await loadLeaderboard();
    }
}

// ইউজার ড্যাশবোর্ড আপডেট
function updateUI() {
    if (!currentUser) return;
    document.getElementById("userName").innerText = currentUser.name || "N/A";
    document.getElementById("schoolName").innerText = currentUser.school_name || currentUser.school_id || "N/A";
    document.getElementById("userClass").innerText = currentUser.class || "N/A";
    document.getElementById("userMobile").innerText = currentUser.mobile || "N/A";
}

// গুগল শীট ভিত্তিক ডাইনামিক লগইন
async function login() {
    const school = document.getElementById("schoolId").value;
    const userInp = document.getElementById("username").value;
    const passInp = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!userInp || !passInp) {
        msg.innerText = "⚠️ ইউজারনেম এবং পাসওয়ার্ড দিন!";
        return;
    }

    msg.innerText = "⏳ যাচাই করা হচ্ছে...";

    try {
        const users = await getData(API_USERS); // api.js থেকে ডাটা আনা
        
        const foundUser = users.find(u => 
            u.username == userInp && 
            u.password == passInp && 
            u.school_id == school
        );

        if (foundUser) {
            currentUser = foundUser;
            localStorage.setItem("user", JSON.stringify(currentUser));
            updateUI();
            showScreen("dashboard");
            msg.innerText = "";
        } else {
            msg.innerText = "❌ ভুল তথ্য দেওয়া হয়েছে!";
        }
    } catch (error) {
        msg.innerText = "🚀 সার্ভার ত্রুটি! আবার চেষ্টা করুন।";
    }
}

// অ্যাডমিন প্যানেল সিকিউরিটি চেক
function openAdmin() {
    if (currentUser?.role?.toLowerCase() !== "admin") {
        alert("আপনার অ্যাডমিন পারমিশন নেই!");
        return;
    }
    showScreen("adminPanel");
    // এখানে চাইলে admin.js থেকে অ্যাডমিন ডেটা লোড করার ফাংশন কল করতে পারেন
}

// লগআউট এবং সেশন ক্লিয়ার
function logout() {
    if (confirm("আপনি কি নিশ্চিতভাবে লগআউট করতে চান?")) {
        localStorage.removeItem("user");
        currentUser = null;
        location.reload(); // পেজ রিলোড দিয়ে প্রাথমিক অবস্থায় ফিরে যাওয়া
    }
}
