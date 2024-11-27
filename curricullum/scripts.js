const searchInput = document.getElementById('searchInput');
const tables = document.querySelectorAll('.data_Table');

searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();

    tables.forEach(function(table) {
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
            const cells = rows[i].getElementsByTagName('td')[0]; // Selecting the first column (index 0)
    
            if (cells) {
                const cellText = cells.textContent.toLowerCase();
                const row = rows[i];
    
                if (cellText.includes(searchText)) {
                    row.style.display = ''; // Show the row if it contains the search text
                } else {
                    row.style.display = 'none'; // Hide the row if it doesn't match the search
                }
            }
        }
    });
    
});
