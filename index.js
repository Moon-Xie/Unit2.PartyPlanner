
const COHORT = '/2109-CPU-RM-WEB-PT';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${COHORT}/events`;
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
  console.log(state.parties)
}

// Render parties to the DOM
function renderParties(parties) {
  partyList.innerHTML = "";
  parties.forEach((party) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div id=${party.id}>
      <p><strong>${party.name}</strong> - at ${party.date} </p><br>
      <p>Location: ${party.location}</p><br>
      <p>Describtion: ${party.description}</p><br>
      <button onclick="deleteParty('${party.id}')">Delete</button>
      </div>
    `;
    partyList.appendChild(listItem);
  });
}

// Add a new party
partyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newParty = {
    name: document.getElementById("name").value,
    date: `${document.getElementById("date").value}T${document.getElementById("time").value}Z`,
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
  fetchParties();
});

// Delete a party
async function deleteParty(partyId) {
  // Find the party element in the DOM
  const deleteItem = document.getElementById(partyId);
  //remove the data from the UI
  deleteItem.remove();
}

//render function
function render(){
  // Initial fetch
  fetchParties();

}

render();
