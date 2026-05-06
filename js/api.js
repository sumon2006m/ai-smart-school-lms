// আপনার দেওয়া কনস্ট্যান্টগুলো
const API_BASE = "https://script.google.com/macros/s/AKfycbwqt1dTVecuz1Z7bQqsi7XrgbtVTvNHvRuXGCxAn_5DE-Dl9x-uAT06By4FDqFrTTAb/exec";

const API_USERS = API_BASE + "?action=users";
const API_COURSES = API_BASE + "?action=courses";
const API_QUIZ = API_BASE + "?action=quiz";
const API_LEADERBOARD = API_BASE + "?action=leaderboard";
const API_LOGS = API_BASE + "?action=logs";

// জেনেরিক ডাটা ফেচার ফাংশন
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
}

// ডাটা সেভ করার জন্য (POST Method)
async function sendData(payload) {
    try {
        // গুগল স্ক্রিপ্টে POST অনেক সময় রিডাইরেক্ট করে, তাই 'no-cors' বা 
        // সঠিক মেথড হ্যান্ডলিং প্রয়োজন হতে পারে।
        const response = await fetch(API_BASE, {
            method: "POST",
            mode: "no-cors", // গুগল অ্যাপস স্ক্রিপ্টের জন্য জরুরি
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return "Sent"; 
    } catch (error) {
        console.error("API Post Error:", error);
    }
}
