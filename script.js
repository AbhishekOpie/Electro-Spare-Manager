document.addEventListener('DOMContentLoaded', () => {
    const inventoryTable = document.getElementById('inventoryTable');
    const consumptionTable = document.getElementById('consumptionTable');
    const sparePartsForm = document.getElementById('sparePartsForm');

    // Example inventory data (replace with dynamic data)
    const inventoryData = [
        { partName: 'Part A', partNumber: 'P001', availableQuantity: 100 },
        { partName: 'Part B', partNumber: 'P002', availableQuantity: 50 }
    ];

    // Populate initial inventory table
    populateInventoryTable();

    // Event listener for adding consumption record
    sparePartsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form values
        const serialNo = document.getElementById('serialNo').value;
        const partName = document.getElementById('partName').value;
        const partNumber = document.getElementById('partNumber').value;
        const quantityUsed = parseInt(document.getElementById('quantityUsed').value);
        const employeeName = document.getElementById('employeeName').value;
        const dateUsed = document.getElementById('dateUsed').value;
        const remark = document.getElementById('remark').value;

        // Validate quantity used
        if (quantityUsed <= 0) {
            alert('Please enter a valid quantity used.');
            return;
        }

        // Add consumption record to table
        addConsumptionRecord(serialNo, partName, partNumber, quantityUsed, employeeName, dateUsed, remark);

        // Update inventory
        updateInventory(partNumber, quantityUsed);

        // Reset form
        sparePartsForm.reset();
    });

    // Function to populate initial inventory table
    function populateInventoryTable() {
        inventoryData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.partName}</td>
                <td>${item.partNumber}</td>
                <td>${item.availableQuantity}</td>
            `;
            inventoryTable.querySelector('tbody').appendChild(row);
        });
    }

    // Function to add consumption record to table
    function addConsumptionRecord(serialNo, partName, partNumber, quantityUsed, employeeName, dateUsed, remark) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${serialNo}</td>
            <td>${partName}</td>
            <td>${partNumber}</td>
            <td>${quantityUsed}</td>
            <td>${employeeName}</td>
            <td>${dateUsed}</td>
            <td>${remark}</td>
            <td><button class="delete">Delete</button></td>
        `;
        
        row.querySelector('.delete').addEventListener('click', function() {
            // Restore inventory when record is deleted
            const currentQuantity = parseInt(row.children[3].textContent);
            updateInventory(partNumber, -currentQuantity);
            row.parentNode.removeChild(row);
        });

        consumptionTable.querySelector('tbody').appendChild(row);
    }

    // Function to update inventory
    function updateInventory(partNumber, quantityUsed) {
        const inventoryRows = inventoryTable.querySelectorAll('tbody tr');
        inventoryRows.forEach(row => {
            if (row.children[1].textContent === partNumber) {
                const currentQuantity = parseInt(row.children[2].textContent);
                row.children[2].textContent = currentQuantity - quantityUsed;
            }
        });
    }
});



