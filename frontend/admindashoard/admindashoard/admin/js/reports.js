const applyBtn =
    document.getElementById("applyBtn");

const exportBtn =
    document.getElementById("exportBtn");

const categoryFilter =
    document.getElementById("categoryFilter");


applyBtn.addEventListener(
    "click",
    function () {

        const category =
            categoryFilter.value;

        if (category === "all") {

            alert("Report updated for all categories.");

        } else {

            alert(
                "Report updated for " +
                category +
                "."
            );

        }

    }
);


exportBtn.addEventListener(
    "click",
    function () {

        alert(
            "Report exported successfully!"
        );

    }
);