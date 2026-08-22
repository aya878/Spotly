const searchInput =
    document.getElementById("searchInput");

const categoriesGrid =
    document.getElementById("categoriesGrid");


// Search categories

searchInput.addEventListener(
    "input",
    function () {

        const searchValue =
            searchInput.value.toLowerCase();

        const cards =
            categoriesGrid.querySelectorAll(
                ".category-card"
            );


        cards.forEach(function (card) {

            const categoryName =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();


            if (
                categoryName.includes(searchValue)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }
);


// Add category

const addCategoryBtn =
    document.getElementById(
        "addCategoryBtn"
    );


addCategoryBtn.addEventListener(
    "click",
    function () {

        const name =
            prompt("Enter category name:");

        if (!name) {
            return;
        }


        const card =
            document.createElement("div");

        card.className =
            "category-card";


        card.innerHTML = `

            <div class="category-icon">
                📁
            </div>

            <div class="category-info">

                <h3>${name}</h3>

                <p>
                    0 Events
                </p>

            </div>

            <div class="category-actions">

                <button class="edit">
                    ✎
                </button>

                <button class="delete">
                    ♧
                </button>

            </div>

        `;


        categoriesGrid.appendChild(card);

        attachActions(card);

    }
);


// Edit & Delete

function attachActions(card) {

    const editButton =
        card.querySelector(".edit");

    const deleteButton =
        card.querySelector(".delete");


    editButton.addEventListener(
        "click",
        function () {

            const title =
                card.querySelector("h3");


            const newName =
                prompt(
                    "Edit category name:",
                    title.textContent
                );


            if (newName) {

                title.textContent =
                    newName;

            }

        }
    );


    deleteButton.addEventListener(
        "click",
        function () {

            const title =
                card.querySelector("h3")
                    .textContent;


            const confirmDelete =
                confirm(
                    "Delete " +
                    title +
                    " category?"
                );


            if (confirmDelete) {

                card.remove();

            }

        }
    );

}


// Activate actions for existing cards

const existingCards =
    categoriesGrid.querySelectorAll(
        ".category-card"
    );


existingCards.forEach(
    attachActions
);