const COHORT = '/2109-CPU-RM-WEB-PT';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${COHORT}/recipes`;
const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

// === State ===

const state = {
    parties: [],
  };

// Fetch and display all parties
async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.parties = data.data
    renderParties(state.parties);
  } catch (error) {
    console.error("Error fetching parties:", error);
  }
}

// Render parties to the DOM
function renderParties(parties) {
  partyList.innerHTML = "";
  parties.forEach((party) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${party.name}</strong> - ${party.date} at ${party.time}<br>
      Location: ${party.location}<br>
      ${party.description}<br>
      <button onclick="deleteParty('${party.id}')">Delete</button>
    `;
    partyList.appendChild(listItem);
  });
}

// Add a new party
partyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newParty = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newParty),
    });
    if (response.ok) {
      fetchParties();
      partyForm.reset();
    } else {
      console.error("Error adding party:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding party:", error);
  }
});

// Delete a party
async function deleteParty(partyId) {
  try {
    const response = await fetch(`${API_URL}/${partyId}`, { method: "DELETE" });
    if (response.ok) {
      fetchParties();
    } else {
      console.error("Error deleting party:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting party:", error);
  }
}

// Initial fetch
fetchParties();