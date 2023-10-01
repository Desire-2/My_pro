// Assuming you have an element with the ID 'provinceContainer' in your HTML
const provinceContainer = document.getElementById("provinceContainer");

// Function to create buttons for provinces
function createProvinceButtons(data) {
  for (const region in data) {
    const regionButton = document.createElement("button");
    regionButton.textContent = region;
    regionButton.addEventListener("click", () => {
      displayDistricts(data[region]);
    });
    provinceContainer.appendChild(regionButton);
  }
}

// Function to display districts for a selected province
function displayDistricts(provinceData) {
  const districtContainer = document.getElementById("districtContainer");
  districtContainer.innerHTML = "";

  for (const district in provinceData) {
    const districtButton = document.createElement("button");
    districtButton.textContent = district;
    districtButton.addEventListener("click", () => {
      displaySectors(provinceData[district]);
    });
    districtContainer.appendChild(districtButton);
  }
}

// Function to display sectors for a selected district
function displaySectors(districtData) {
  const sectorContainer = document.getElementById("sectorContainer");
  sectorContainer.innerHTML = "";

  for (const sector in districtData) {
    const sectorButton = document.createElement("button");
    sectorButton.textContent = sector;
    sectorButton.addEventListener("click", () => {
      displayCells(districtData[sector]);
    });
    sectorContainer.appendChild(sectorButton);
  }
}

// Function to display cells for a selected sector
function displayCells(sectorData) {
  const cellContainer = document.getElementById("cellContainer");
  cellContainer.innerHTML = "";

  for (const cell in sectorData) {
    const cellButton = document.createElement("button");
    cellButton.textContent = cell;
    cellButton.addEventListener("click", () => {
      displayVillages(sectorData[cell]);
    });
    cellContainer.appendChild(cellButton);
  }
}

// Function to display villages and houses for a selected cell
function displayVillages(cellData) {
  const villageContainer = document.getElementById("villageContainer");
  villageContainer.innerHTML = "";

  for (const village in cellData) {
    const villageButton = document.createElement("button");
    villageButton.textContent = village;
    villageButton.addEventListener("click", () => {
      // Implement logic to display houses for the selected village
      // You can use cellData[village] to access the list of houses in the village
    });
    villageContainer.appendChild(villageButton);
  }
}

// Load data from data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    createProvinceButtons(data);
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
