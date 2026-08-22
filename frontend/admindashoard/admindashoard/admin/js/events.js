// Search Events
const searchInput = document.getElementById("searchInput");
const eventFilter = document.getElementById("eventFilter");
const eventsTable = document.getElementById("eventsTable");


// Search function
function searchEvents() {

    const searchValue = searchInput.value.toLowerCase();
    const filterValue = eventFilter.value;

    const rows = eventsTable.querySelectorAll("tr");

    rows.forEach(function(row) {

        const eventName = row.children[1].textContent.toLowerCase();
        const status = row.querySelector(".status").textContent
            .toLowerCase();

        const matchesSearch =
            eventName.includes(searchValue);

        const matchesFilter =
            filterValue === "all" ||
            status === filterValue;

        if (matchesSearch && matchesFilter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}


// Search when typing
searchInput.addEventListener("input", searchEvents);


// Filter events
eventFilter.addEventListener("change", searchEvents);


// Add Event Button

const addEventBtn = document.getElementById("addEventBtn");

addEventBtn.addEventListener("click", function() {

    alert("Add Event button clicked!");

});


// Edit Buttons


const editButtons =
    document.querySelectorAll(".edit");

editButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert("Edit event");

    });

});


// ===============================
// Delete Buttons
// ===============================

const deleteButtons =
    document.querySelectorAll(".delete");

deleteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const row = button.closest("tr");

        const eventName =
            row.children[1].textContent;

        const confirmDelete =
            confirm(
                "Are you sure you want to delete " +
                eventName +
                "?"
            );

        if (confirmDelete) {

            row.remove();

        }

    });

});