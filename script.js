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
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
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
  
  // Event Listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  