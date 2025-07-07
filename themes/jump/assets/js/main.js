// Activities Table Sorting
document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('activitiesTable');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const sortableHeaders = table.querySelectorAll('th.sortable');
    
    // Track current sort state
    let currentSort = { column: null, direction: 'none' };
    
    // Sort the table by a given column
    function sortTable(column, direction) {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            if (column === 'performedAt') {
                aVal = new Date(a.dataset.performedAt);
                bVal = new Date(b.dataset.performedAt);
            } else if (column === 'rating') {
                aVal = parseInt(a.dataset.rating) || 0;
                bVal = parseInt(b.dataset.rating) || 0;
            }
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        // Clear tbody and append sorted rows
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
        
        // Update sort state
        currentSort = { column, direction };
        updateSortClasses();
    }
    
    // Update visual indicators for sorting
    function updateSortClasses() {
        sortableHeaders.forEach(header => {
            const column = header.dataset.sort;
            
            if (column === currentSort.column) {
                header.classList.add('active-sort');
            } else {
                header.classList.remove('active-sort');
            }
        });
    }
    
    // Add click handlers to sortable headers
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            
            let newDirection;
            if (currentSort.column !== column || currentSort.direction === 'desc') {
                newDirection = 'asc';
            } else {
                newDirection = 'desc';
            }
            
            sortTable(column, newDirection);
        });
        
        // Add cursor pointer style
        header.style.cursor = 'pointer';
    });
    
    // Initial sort by default column (performedAt)
    const defaultSort = table.dataset.defaultSort || 'performedAt';
    sortTable(defaultSort, 'asc');
});
