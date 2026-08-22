const tabs =
    document.querySelectorAll(".settings-tab");

const sections =
    document.querySelectorAll(".settings-section");


tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        const sectionName =
            tab.getAttribute("data-section");


        tabs.forEach(function(item) {
            item.classList.remove("active");
        });


        sections.forEach(function(section) {
            section.classList.remove("active");
        });


        tab.classList.add("active");


        const selectedSection =
            document.getElementById(sectionName);


        selectedSection.classList.add("active");

    });

});


// Save buttons

const saveButtons =
    document.querySelectorAll(".save-btn");


saveButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert("Changes saved successfully!");

    });

});


// Change photo button

const changePhoto =
    document.querySelector(".change-photo");


changePhoto.addEventListener(
    "click",
    function() {

        alert("Photo upload selected.");

    }
);