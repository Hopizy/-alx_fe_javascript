const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
setInterval(syncWithServer, 30000); // fetch every 30 seconds
async function syncWithServer() {
    try {
      const response = await fetch(SERVER_URL);
      const serverPosts = await response.json();
  
      const serverQuotes = serverPosts.map(post => ({
        text: post.body,
        category: post.title
      }));
  
      const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
      const newQuotes = serverQuotes.filter(serverQuote =>
        !localQuotes.some(localQuote => localQuote.text === serverQuote.text)
      );
  
      if (newQuotes.length > 0) {
        const merged = [...localQuotes, ...newQuotes];
        localStorage.setItem("quotes", JSON.stringify(merged));
        quotes = merged;
        populateCategories();
        notifyUser(`${newQuotes.length} new quotes were synced from server.`);
      }
  
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
}
function notifyUser(message) {
    const bar = document.getElementById("notificationBar");
    bar.textContent = message;
    bar.style.display = "block";
  
    setTimeout(() => {
      bar.style.display = "none";
    }, 5000);
  }
  
  
// Quote data structure
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do or do not. There is no try.", category: "Wisdom" }
  ];
  
  // Select DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  
  // Show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>Category: ${quote.category}</em>`;
  }
  
  // Add a new quote from form inputs
  function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories(); // refresh dropdown with new category
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
      }
      function populateCategories() {
        // Get unique categories
        const categories = [...new Set(quotes.map(q => q.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categoryFilter.appendChild(option);
        });
      
        // Restore last selected filter
        const lastFilter = localStorage.getItem("selectedCategory");
        if (lastFilter) {
          categoryFilter.value = lastFilter;
          filterQuotes(); // apply filter on load
        }
      }
      
      function filterQuotes() {
        const selected = categoryFilter.value;
        localStorage.setItem("selectedCategory", selected);
      const filteredQuotes = selected === "all"
          ? quotes
          : quotes.filter(q => q.category === selected);
      
        if (filteredQuotes.length === 0) {
          quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
          return;
        }
      
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>Category: ${randomQuote.category}</em>`;
        sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
      }
      
      function createAddQuoteForm() {
        const formDiv = document.createElement("div");
      
        const inputText = document.createElement("input");
        inputText.id = "newQuoteText";
        inputText.placeholder = "Enter a new quote";
      
        const inputCategory = document.createElement("input");
        inputCategory.id = "newQuoteCategory";
        inputCategory.placeholder = "Enter quote category";
      
        const addButton = document.createElement("button");
        addButton.textContent = "Add Quote";
        addButton.onclick = addQuote;
      
        formDiv.append(inputText, inputCategory, addButton);
        document.body.appendChild(formDiv);
      }
      
  }
  let quotes = [];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Load from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Initial seed
    quotes = [
      { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Do or do not. There is no try.", category: "Wisdom" }
    ];
    saveQuotes();
  }
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>Category: ${quote.category}</em>`;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    newQuoteText.value = "";
    newQuoteCategory.value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Export to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load & set up
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);

  // Show last viewed quote if available
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const lastQuote = JSON.parse(last);
    quoteDisplay.innerHTML = `<p>"${lastQuote.text}"</p><em>Category: ${lastQuote.category}</em>`;
  }
  document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
    populateCategories();
    newQuoteBtn.addEventListener("click", filterQuotes);
    addQuoteBtn.addEventListener("click", addQuote);
  
    const last = sessionStorage.getItem("lastQuote");
    if (last && categoryFilter.value === "all") {
      const lastQuote = JSON.parse(last);
      quoteDisplay.innerHTML = `<p>"${lastQuote.text}"</p><em>Category: ${lastQuote.category}</em>`;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();                // local quotes from storage
    populateCategories();        // setup filter
    syncWithServer();            // initial fetch
    setInterval(syncWithServer, 30000); // periodic sync
  
    newQuoteBtn.addEventListener("click", filterQuotes);
    addQuoteBtn.addEventListener("click", addQuote);
  });
  
});

  // Event Listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  