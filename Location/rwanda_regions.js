// Function to create buttons
function createButtons(data, container, level, filter) {
    container.innerHTML = ""; // Clear existing buttons
  
    for (const name in data) {
      const button = document.createElement("button");
      button.textContent = name;
      button.addEventListener("click", () => {
        if (level === "Houses") {
          // Display houses when at the village level
          displayHouses(data[name]);
        } else {
          // Handle button click for this level
          const subLevel = data[name];
          createButtons(subLevel, container, name, filter);
        }
      });
  
      // Apply filter if specified
      if (filter === "Houses") {
        const houses = data[name];
        const houseCount = houses.length;
        button.textContent = `${name} (${houseCount} Houses)`;
      }
  
      container.appendChild(button);
    }
  }
  
  // Function to display houses
  function displayHouses(houses) {
    const houseContainer = document.getElementById("houseContainer");
    houseContainer.innerHTML = "";
  
    for (const house of houses) {
      const houseElement = document.createElement("div");
      houseElement.textContent = house;
      houseContainer.appendChild(houseElement);
    }
  }
  
  // Function to load data from data.json
  function loadData() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        const provinceContainer = document.getElementById("provinceContainer");
        createButtons(data, provinceContainer, "Rwanda");
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }
  
  // Handle search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    // Implement search logic here
    // You can filter and update the displayed buttons based on the search term
  });
  
  // Handle filter selection
  const filterSelect = document.getElementById("filterSelect");
  filterSelect.addEventListener("change", () => {
    const filterValue = filterSelect.value;
    const provinceContainer = document.getElementById("provinceContainer");
    createButtons(data, provinceContainer, "Rwanda", filterValue);
  });
  
  // Call the loadData function when the page loads
  loadData();
  