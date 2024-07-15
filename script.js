document.addEventListener('DOMContentLoaded', () => {
    const sparePartsForm = document.getElementById('sparePartsForm');
    const recordsTableBody = document.querySelector('#recordsTable tbody');
    const totalSparePartsDisplay = document.getElementById('totalSpareParts');
    let totalSpareParts = 100; // Initial total spare parts count

    sparePartsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const partName = document.getElementById('partName').value;
        const partNumber = document.getElementById('partNumber').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const dateUsed = document.getElementById('dateUsed').value;
        const employeeName = document.getElementById('employeeName').value;

        if (quantity > totalSpareParts) {
            alert(`Not enough spare parts available (${totalSpareParts} available)`);
            return;
        }

        addRecord(partName, partNumber, quantity, dateUsed, employeeName);
        updateTotalSpareParts(quantity);
        sparePartsForm.reset();
    });

    function addRecord(partName, partNumber, quantity, dateUsed, employeeName) {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${partName}</td>
            <td>${partNumber}</td>
            <td>${quantity}</td>
            <td>${dateUsed}</td>
            <td>${employeeName}</td>
            <td><button class="delete">Delete</button></td>
        `;

        newRow.querySelector('.delete').addEventListener('click', function() {
            updateTotalSpareParts(-quantity); // Subtract deleted record's quantity from total
            recordsTableBody.removeChild(newRow);
        });

        recordsTableBody.appendChild(newRow);
    }

    function updateTotalSpareParts(quantity) {
        totalSpareParts -= quantity;
        totalSparePartsDisplay.textContent = totalSpareParts;
    }
});


