// Get references to the containers
const provinceContainer = document.getElementById("provinceContainer");
const districtContainer = document.getElementById("districtContainer");
const sectorContainer = document.getElementById("sectorContainer");
const cellContainer = document.getElementById("cellContainer");
const villageContainer = document.getElementById("villageContainer");

// Function to fetch and display regions
function displayRegions(url, container, nextContainer, regionType) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear the current container
            container.innerHTML = "";

            // Create buttons for each region
            data.forEach(region => {
                const button = document.createElement("button");
                button.textContent = region.name;
                button.addEventListener("click", () => {
                    const nextUrl = `https://www.opensource.agaseke.tech/rwanda-region-api?${regionType}=${region.name}`;
                    displayRegions(nextUrl, nextContainer, null, regionType);
                });
                container.appendChild(button);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Display the initial provinces
const initialUrl = "https://www.opensource.agaseke.tech/rwanda-region-api";
displayRegions(initialUrl, provinceContainer, districtContainer, "province");
