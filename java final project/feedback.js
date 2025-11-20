// Handle form submission
document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rating: document.getElementById("rating").value,
    message: document.getElementById("message").value
  };

  try {
    let response = await fetch("http://localhost:8080/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("✅ Feedback submitted successfully!");
      document.getElementById("feedbackForm").reset();
      loadFeedback(); // refresh list
    } else {
      alert("❌ Error submitting feedback.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Could not connect to server. Is backend running?");
  }
});

// Load all feedback
// async function loadFeedback() {
//   try {
//     let response = await fetch("http://localhost:8080/feedback");
//     if (!response.ok) throw new Error("Failed to fetch feedback");

//     let feedbacks = await response.json();
//     const list = document.getElementById("feedbackList");
//     list.innerHTML = "";

//     feedbacks.forEach(fb => {
//       let li = document.createElement("li");
//       li.style.background = "white";
//       li.style.padding = "15px";
//       li.style.margin = "10px 0";
//       li.style.borderRadius = "8px";
//       li.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
//       li.innerHTML = `<strong>${fb.name}</strong> (⭐ ${fb.rating}) <br>${fb.message}`;
//       list.appendChild(li);
//     });
//   } catch (error) {
//     console.error("Error loading feedback:", error);
//   }
// }
// Load all feedback
async function loadFeedback() {
  try {
    let response = await fetch("http://localhost:8080/feedback");
    if (!response.ok) throw new Error("Failed to fetch feedback");

    let feedbacks = await response.json();
    const tableBody = document.getElementById("feedbackTableBody");
    tableBody.innerHTML = "";

    feedbacks.forEach(fb => {
      let row = document.createElement("tr");

      row.innerHTML = `
        <td style="padding:10px; border:1px solid #ccc;">${fb.name}</td>
        <td style="padding:10px; border:1px solid #ccc;">${fb.email}</td>
        <td style="padding:10px; border:1px solid #ccc; text-align:center;">⭐ ${fb.rating}</td>
        <td style="padding:10px; border:1px solid #ccc;">${fb.message}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading feedback:", error);
  }
}


// Load feedbacks on page load
window.onload = loadFeedback;