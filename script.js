// Sample initial inventory data
let inventory = [
    { name: 'Resistor', quantity: 1000 },
    { name: 'Capacitor', quantity: 500 },
    { name: 'Transistor', quantity: 200 },
    { name: 'Diode', quantity: 300 },
];

// Sample consumption log data
let consumptionLog = [];

// DOM elements
const inventoryBody = document.getElementById('inventoryBody');
const partNameSelect = document.getElementById('partName');
const consumptionForm = document.getElementById('consumptionForm');
const logBody = document.getElementById('logBody');
const addPartBtn = document.getElementById('addPartBtn');

// Populate inventory table and part name select
function updateInventoryTable() {
    inventoryBody.innerHTML = '';
    partNameSelect.innerHTML = '';

    inventory.forEach((item, index) => {
        const row = inventoryBody.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="editPart(${index})">Edit</button>
                <button onclick="deletePart(${index})">Delete</button>
            </td>
        `;

        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        partNameSelect.appendChild(option);
    });
}

// Update consumption log table
function updateConsumptionLog() {
    logBody.innerHTML = '';

    consumptionLog.forEach((entry, index) => {
        const row = logBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.partName}</td>
            <td>${entry.partNumber}</td>
            <td>${entry.quantity}</td>
            <td>${entry.employeeName}</td>
            <td>${entry.date}</td>
            <td>${entry.remarks}</td>
        `;
    });
}

// Handle form submission
consumptionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const partName = document.getElementById('partName').value;
    const partNumber = document.getElementById('partNumber').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const employeeName = document.getElementById('employeeName').value;
    const date = document.getElementById('date').value;
    const remarks = document.getElementById('remarks').value;

    // Update inventory
    const inventoryItem = inventory.find(item => item.name === partName);
    if (inventoryItem && inventoryItem.quantity >= quantity) {
        inventoryItem.quantity -= quantity;

        // Add to consumption log
        consumptionLog.push({
            partName,
            partNumber,
            quantity,
            employeeName,
            date,
            remarks
        });

        // Update tables
        updateInventoryTable();
        updateConsumptionLog();

        // Reset form
        consumptionForm.reset();
    } else {
        alert('Not enough parts in inventory!');
    }
});

// Add new part
addPartBtn.addEventListener('click', function() {
    const newPartName = prompt('Enter new part name:');
    const newPartQuantity = parseInt(prompt('Enter initial quantity:'));

    if (newPartName && !isNaN(newPartQuantity)) {
        inventory.push({ name: newPartName, quantity: newPartQuantity });
        updateInventoryTable();
    }
});

// Edit part
function editPart(index) {
    const item = inventory[index];
    const newName = prompt('Enter new name:', item.name);
    const newQuantity = parseInt(prompt('Enter new quantity:', item.quantity));

    if (newName && !isNaN(newQuantity)) {
        item.name = newName;
        item.quantity = newQuantity;
        updateInventoryTable();
    }
}

// Delete part
function deletePart(index) {
    if (confirm('Are you sure you want to delete this part?')) {
        inventory.splice(index, 1);
        updateInventoryTable();
    }
}

// Initialize tables
updateInventoryTable();
updateConsumptionLog();