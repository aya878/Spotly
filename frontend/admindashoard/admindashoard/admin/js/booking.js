const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const bookingsTable = document.getElementById("bookingsTable");


function filterBookings() {

    const searchValue =
        searchInput.value.toLowerCase();

    const filterValue =
        statusFilter.value.toLowerCase();

    const rows =
        bookingsTable.querySelectorAll("tr");


    rows.forEach(function(row) {

        const rowText =
            row.innerText.toLowerCase();

        const status =
            row.querySelector(".status")
                .innerText
                .toLowerCase();


        const matchesSearch =
            rowText.includes(searchValue);


        const matchesStatus =
            filterValue === "all" ||
            status === filterValue;


        if (matchesSearch && matchesStatus) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


searchInput.addEventListener(
    "input",
    filterBookings
);


statusFilter.addEventListener(
    "change",
    filterBookings
);


// View buttons

const viewButtons =
    document.querySelectorAll(".view");


viewButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            alert("Booking details");

        }
    );

});


// Delete buttons

const deleteButtons =
    document.querySelectorAll(".delete");


deleteButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const row =
                button.closest("tr");


            const customer =
                row.children[1].innerText;


            const confirmDelete =
                confirm(
                    "Are you sure you want to delete the booking for " +
                    customer +
                    "?"
                );


            if (confirmDelete) {

                row.remove();

            }

        }
    );

});