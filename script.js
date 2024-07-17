// Sample initial inventory data
const inventory = [
    { name: 'Resistor', quantity: 1000 },
    { name: 'Capacitor', quantity: 500 },
    { name: 'Transistor', quantity: 200 },
    { name: 'Diode', quantity: 300 },
];

// Sample consumption log data
const consumptionLog = [];

// DOM elements
const inventoryBody = document.getElementById('inventoryBody');
const partNameSelect = document.getElementById('partName');
const consumptionForm = document.getElementById('consumptionForm');
const logBody = document.getElementById('logBody');

// Populate inventory table and part name select
function updateInventoryTable() {
    inventoryBody.innerHTML = '';
    partNameSelect.innerHTML = '';

    inventory.forEach(item => {
        const row = inventoryBody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;

        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        partNameSelect.appendChild(option);
    });
}

// Update consumption log table
function updateConsumptionLog() {
    logBody.innerHTML = '';

    consumptionLog.forEach(entry => {
        const row = logBody.insertRow();
        row.insertCell(0).textContent = entry.serialNo;
        row.insertCell(1).textContent = entry.partName;
        row.insertCell(2).textContent = entry.partNumber;
        row.insertCell(3).textContent = entry.quantity;
        row.insertCell(4).textContent = entry.employeeName;
        row.insertCell(5).textContent = entry.date;
        row.insertCell(6).textContent = entry.remarks;
    });
}

// Handle form submission
consumptionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const serialNo = document.getElementById('serialNo').value;
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
            serialNo,
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

// Initialize tables
updateInventoryTable();
updateConsumptionLog();