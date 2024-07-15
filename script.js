document.addEventListener('DOMContentLoaded', () => {
    const sparePartsForm = document.getElementById('sparePartsForm');
    const recordsTableBody = document.querySelector('#recordsTable tbody');

    sparePartsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const partName = document.getElementById('partName').value;
        const partNumber = document.getElementById('partNumber').value;
        const quantity = document.getElementById('quantity').value;
        const dateUsed = document.getElementById('dateUsed').value;

        addRecord(partName, partNumber, quantity, dateUsed);
        sparePartsForm.reset();
    });

    function addRecord(partName, partNumber, quantity, dateUsed) {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${partName}</td>
            <td>${partNumber}</td>
            <td>${quantity}</td>
            <td>${dateUsed}</td>
            <td><button class="delete">Delete</button></td>
        `;

        newRow.querySelector('.delete').addEventListener('click', function() {
            recordsTableBody.removeChild(newRow);
        });

        recordsTableBody.appendChild(newRow);
    }
});

