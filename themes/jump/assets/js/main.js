// Activities Table Sorting and Filtering
document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("activitiesTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const sortableHeaders = table.querySelectorAll("th.sortable");
  const filterToggle = document.getElementById("filterToggle");
  const filterMenu = document.getElementById("filterMenu");
  const filterTags = document.getElementById("filterTags");
  const clearFilters = document.getElementById("clearFilters");

  // Track current sort state and filters
  let currentSort = { column: null, direction: "none" };
  let selectedTags = new Set();
  let allRows = [];

  // Initialize the table
  function initTable() {
    allRows = Array.from(tbody.querySelectorAll("tr"));
    populateTagFilters();

    // Initial sort by default column (performedAt)
    const defaultSort = table.dataset.defaultSort || "performedAt";
    sortTable(defaultSort, "asc");
  }

  // Extract all unique tags from the table rows
  function populateTagFilters() {
    const allTags = new Set();

    allRows.forEach(row => {
      const tags = row.dataset.tags;
      if (tags && tags.trim()) {
        tags.split(",").forEach(tag => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            allTags.add(trimmedTag);
          }
        });
      }
    });

    // Create checkbox for each tag
    filterTags.innerHTML = "";
    Array.from(allTags)
      .sort()
      .forEach(tag => {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "field";

        checkboxContainer.innerHTML = `
        <label class="checkbox">
          <input type="checkbox" value="${tag}" class="tag-filter">
          ${tag}
        </label>
      `;

        filterTags.appendChild(checkboxContainer);
      });

    // Add event listeners to checkboxes
    filterTags.querySelectorAll(".tag-filter").forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          selectedTags.add(this.value);
        } else {
          selectedTags.delete(this.value);
        }
        applyFilters();
      });
    });
  }

  // Apply tag filters to show/hide rows
  function applyFilters() {
    allRows.forEach(row => {
      if (selectedTags.size === 0) {
        // No filters selected, show all rows
        row.style.display = "";
      } else {
        // Check if row has any of the selected tags
        const rowTags = row.dataset.tags
          ? row.dataset.tags.split(",").map(t => t.trim())
          : [];
        const hasSelectedTag = rowTags.some(tag => selectedTags.has(tag));
        row.style.display = hasSelectedTag ? "" : "none";
      }
    });
  }

  // Sort the table by a given column
  function sortTable(column, direction) {
    const visibleRows = allRows.filter(row => row.style.display !== "none");

    visibleRows.sort((a, b) => {
      let aVal, bVal;

      if (column === "performedAt") {
        aVal = new Date(a.dataset.performedAt);
        bVal = new Date(b.dataset.performedAt);
      } else if (column === "rating") {
        aVal = parseInt(a.dataset.rating) || 0;
        bVal = parseInt(b.dataset.rating) || 0;
      }

      if (direction === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Clear tbody and append all rows (hidden ones first, then sorted visible ones)
    tbody.innerHTML = "";

    // Add hidden rows first
    allRows
      .filter(row => row.style.display === "none")
      .forEach(row => tbody.appendChild(row));

    // Add visible sorted rows
    visibleRows.forEach(row => tbody.appendChild(row));

    // Update sort state
    currentSort = { column, direction };
    updateSortClasses();
  }

  // Update visual indicators for sorting
  function updateSortClasses() {
    sortableHeaders.forEach(header => {
      const column = header.dataset.sort;

      if (column === currentSort.column) {
        header.classList.add("active-sort");
      } else {
        header.classList.remove("active-sort");
      }
    });
  }

  // Toggle filter menu
  filterToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    filterMenu.style.display =
      filterMenu.style.display === "none" ? "block" : "none";
  });

  // Close filter menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!filterMenu.contains(e.target) && e.target !== filterToggle) {
      filterMenu.style.display = "none";
    }
  });

  // Clear all filters
  clearFilters.addEventListener("click", function () {
    selectedTags.clear();
    filterTags.querySelectorAll(".tag-filter").forEach(checkbox => {
      checkbox.checked = false;
    });
    applyFilters();
  });

  // Add click handlers to sortable headers
  sortableHeaders.forEach(header => {
    header.addEventListener("click", function () {
      const column = this.dataset.sort;

      let newDirection;
      if (currentSort.column !== column || currentSort.direction === "desc") {
        newDirection = "asc";
      } else {
        newDirection = "desc";
      }

      sortTable(column, newDirection);
    });

    // Add cursor pointer style
    header.style.cursor = "pointer";
  });

  // Initialize everything
  initTable();
});
