const API_URL = "আপনার_গুগল_স্ক্রিপ্ট_ইউআরএল_এখানে_বসান";

// ডাটা নিয়ে আসার জন্য (GET)
async function fetchData(action) {
    try {
        const response = await fetch(`${API_URL}?action=${action}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ডাটা পাঠানোর জন্য (POST)
async function postData(payload) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        return await response.text();
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
