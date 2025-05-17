const quoteList = document.querySelector(".quoteList");
const searchInput = document.querySelector(".searchInput");
const errorMessage = document.querySelector(".error");

let quotes = [];

async function fetchQuotes() {
  try {
    const response = await fetch("https://dummyjson.com/quotes");

    if (!response) {
      throw new Error("Failed to fetch quotes.");
    }

    const data = await response.json();
    quotes = data.quotes;
    displayQuotes(quotes);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

function displayQuotes(filteredQuotes) {
  quoteList.innerHTML = "";

  if (filteredQuotes.length === 0) {
    quoteList.innerHTML = "<p>No matching quotes found.</p>";
    return;
  }

  filteredQuotes.forEach((item) => {
    const div = document.createElement("div");
    div.className = "quote";
    div.textContent = item.quote;
    quoteList.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = quotes.filter((item) =>
    item.quote.toLowerCase().includes(query)
  );
  displayQuotes(filtered);
});

fetchQuotes();
