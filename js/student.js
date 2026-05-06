// ১. কোর্স লোড করা
async function loadCourses() {
    const courseBox = document.getElementById("courseBox");
    courseBox.innerHTML = "⏳ লোড হচ্ছে...";
    
    const courses = await getData(API_COURSES);
    
    if (courses.length === 0) {
        courseBox.innerHTML = "কোনো কোর্স পাওয়া যায়নি।";
        return;
    }

    courseBox.innerHTML = courses.map(course => `
        <div class="card">
            <h4>📚 ${course.title}</h4>
            <p>${course.description}</p>
            <button onclick="window.open('${course.link}', '_blank')">ভিডিও দেখুন</button>
        </div>
    `).join('');
}

// ২. কুইজ লোড করা
async function loadQuizzes() {
    const quizBox = document.getElementById("quizBox");
    quizBox.innerHTML = "⏳ কুইজ লোড হচ্ছে...";
    
    const questions = await getData(API_QUIZ);
    
    if (questions.length === 0) {
        quizBox.innerHTML = "বর্তমানে কোনো কুইজ নেই।";
        return;
    }

    quizBox.innerHTML = `<h3>🧠 কুইজ শুরু করো</h3>`;
    questions.forEach((q, index) => {
        quizBox.innerHTML += `
            <div class="card" style="text-align: left;">
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <label><input type="radio" name="q${index}" value="a"> ${q.a}</label><br>
                <label><input type="radio" name="q${index}" value="b"> ${q.b}</label><br>
                <label><input type="radio" name="q${index}" value="c"> ${q.c}</label><br>
                <label><input type="radio" name="q${index}" value="d"> ${q.d}</label>
            </div>
        `;
    });
    
    quizBox.innerHTML += `<button onclick="submitQuiz()">স্কোর জমা দিন</button>`;
}

// ৩. লিডারবোর্ড বা র‍্যাঙ্ক লোড করা
async function loadLeaderboard() {
    const leadBox = document.getElementById("leadBox");
    leadBox.innerHTML = "⏳ র‍্যাঙ্ক চেক করা হচ্ছে...";
    
    const ranks = await getData(API_LEADERBOARD);
    
    // স্কোর অনুযায়ী সাজানো (Descending order)
    ranks.sort((a, b) => b.score - a.score);

    let html = `<h3>🏆 সেরা ফলাফল</h3><table border="1" style="width:100%; border-collapse: collapse;">
                <tr><th>র‍্যাঙ্ক</th><th>নাম</th><th>স্কোর</th></tr>`;
    
    ranks.forEach((r, index) => {
        html += `<tr>
                    <td>${index + 1}</td>
                    <td>${r.name}</td>
                    <td>${r.score}</td>
                </tr>`;
    });
    
    html += `</table><br><button onclick="showScreen('dashboard')">ফিরে যান</button>`;
    leadBox.innerHTML = html;
}
