const users = [

    {
        id: 1,
        name: "Aya nasr",
        email: "aya@gmail.com",
        role: "User",
        status: "Active",
        joined: "20 Aug 2026"
    },

    {
        id: 2,
        name: "Aya elrahman",
        email: "aya@gmail.com",
        role: "User",
        status: "Active",
        joined: "18 Aug 2026"
    },

    {
        id: 3,
        name: "Youssef Khaled",
        email: "youssef@gmail.com",
        role: "Organizer",
        status: "Active",
        joined: "16 Aug 2026"
    },

    {
        id: 4,
        name: "Omar osama",
        email: "omar@gmail.com",
        role: "User",
        status: "Active",
        joined: "14 Aug 2026"
    },

    {
        id: 5,
        name: "esraa Ahmed",
        email: "esraa@gmail.com",
        role: "User",
        status: "Inactive",
        joined: "13 Aug 2026"
    },

    {
        id: 6,
        name: "ali elatawi",
        email: "ali@gmail.com",
        role: "Organizer",
        status: "Active",
        joined: "12 Aug 2026"
    },

    {
        id: 7,
        name: "Mostafa Kamal",
        email: "mostafa@gmail.com",
        role: "Admin",
        status: "Active",
        joined: "10 Aug 2026"
    }

];


// ========================================
// ELEMENTS
// ========================================

const tableBody =
    document.getElementById("usersTableBody");

const searchInput =
    document.getElementById("searchUser");

const roleFilter =
    document.getElementById("roleFilter");

const statusFilter =
    document.getElementById("statusFilter");

const userCount =
    document.getElementById("userCount");


// ========================================
// DISPLAY USERS
// ========================================

function displayUsers(usersToDisplay) {

    tableBody.innerHTML = "";

    userCount.textContent =
        `${usersToDisplay.length} Users`;


    if (usersToDisplay.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty-state">

                        No users found.

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    usersToDisplay.forEach(user => {

        const row =
            document.createElement("tr");


        let statusClass =
            user.status.toLowerCase();


        row.innerHTML = `

            <td>
                ${user.id}
            </td>


            <td>

                <strong>
                    ${user.name}
                </strong>

            </td>


            <td>
                ${user.email}
            </td>


            <td>
                ${user.role}
            </td>


            <td>

                <span
                    class="status ${statusClass}"
                >

                    ${user.status}

                </span>

            </td>


            <td>
                ${user.joined}
            </td>


            <td>

                <div class="actions">

                    <button
                        class="action-btn action-view"
                        onclick="viewUser(${user.id})"
                        title="View"
                    >
                        👁
                    </button>


                    <button
                        class="action-btn action-edit"
                        onclick="editUser(${user.id})"
                        title="Edit"
                    >
                        ✎
                    </button>


                    <button
                        class="action-btn action-delete"
                        onclick="deleteUser(${user.id})"
                        title="Delete"
                    >
                        ♡
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ========================================
// FILTER USERS
// ========================================

function filterUsers() {

    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();


    const selectedRole =
        roleFilter.value;


    const selectedStatus =
        statusFilter.value;


    const filteredUsers =
        users.filter(user => {


            const matchesSearch =

                user.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                user.email
                    .toLowerCase()
                    .includes(searchValue);


            const matchesRole =

                selectedRole === "all"

                ||

                user.role === selectedRole;


            const matchesStatus =

                selectedStatus === "all"

                ||

                user.status === selectedStatus;


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );

        });


    displayUsers(filteredUsers);

}


// ========================================
// VIEW USER
// ========================================

function viewUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    alert(

        "User Information\n\n" +

        "Name: " +
        user.name +

        "\nEmail: " +
        user.email +

        "\nRole: " +
        user.role +

        "\nStatus: " +
        user.status +

        "\nJoined: " +
        user.joined

    );

}


// ========================================
// EDIT USER
// ========================================

function editUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    const newName =
        prompt(
            "Enter new name:",
            user.name
        );


    if (
        newName &&
        newName.trim() !== ""
    ) {

        user.name =
            newName.trim();


        filterUsers();

    }

}


// ========================================
// DELETE USER
// ========================================

function deleteUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    const confirmed =
        confirm(
            `Delete ${user.name}?`
        );


    if (!confirmed) return;


    const index =
        users.findIndex(
            user => user.id === id
        );


    users.splice(index, 1);


    filterUsers();

}


// ========================================
// ADD USER
// ========================================

document
    .getElementById("addUserBtn")
    .addEventListener(
        "click",
        function () {

            alert(
                "Add User form will be connected later."
            );

        }
    );


// ========================================
// FILTER EVENTS
// ========================================

searchInput.addEventListener(
    "input",
    filterUsers
);

roleFilter.addEventListener(
    "change",
    filterUsers
);

statusFilter.addEventListener(
    "change",
    filterUsers
);



displayUsers(users);