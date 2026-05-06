let currentUser = null;

// পেজ লোড হলে চেক করবে ইউজার আগে থেকে লগইন করা কি না
window.onload = () => {
    const saved = localStorage.getItem("user");
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUI();
        showScreen("dashboard");
    }
    // স্কুল লিস্ট ড্রপডাউনে বসানো (Demo)
    const schoolSelect = document.getElementById("schoolId");
    const schools = ["Model High School", "City Academy", "Ideal School"];
    schools.forEach(school => {
        let opt = document.createElement("option");
        opt.value = school;
        opt.innerText = school;
        schoolSelect.appendChild(opt);
    });
};

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function show(id) {
    showScreen(id);
    // এখানে চাইলে আরও ডেটা লোড করার লজিক দিতে পারেন
}

function updateUI() {
    if(!currentUser) return;
    document.getElementById("userName").innerText = currentUser.name;
    document.getElementById("schoolName").innerText = currentUser.school_name;
    document.getElementById("userClass").innerText = currentUser.class;
    document.getElementById("userMobile").innerText = currentUser.mobile;
}

// লগইন ফাংশন
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const school = document.getElementById("schoolId").value;

    if(user === "admin" && pass === "1234") {
        currentUser = {
            name: "Rahim Uddin",
            school_name: school,
            class: "Class 10",
            mobile: "01700000000",
            role: "admin"
        };
        localStorage.setItem("user", JSON.stringify(currentUser));
        updateUI();
        showScreen("dashboard");
    } else {
        document.getElementById("msg").innerText = "ভুল ইউজার বা পাসওয়ার্ড!";
    }
}

function openAdmin() {
    if (currentUser?.role !== "admin") {
        alert("আপনার অ্যাডমিন পারমিশন নেই!");
        return;
    }
    showScreen("adminPanel");
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}
