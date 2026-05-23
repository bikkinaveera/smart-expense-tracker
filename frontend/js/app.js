let expenses = [];
let editId = null;

function addExpense() {

    let amount =
        document.getElementById("amount").value;

    let category =
        document.getElementById("category").value;

    let userId =
        localStorage.getItem("userId");

    if(editId == null) {

        fetch("http://localhost:5000/addExpense", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                amount: amount,

                category: category,

                user_id: userId

            })

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadExpenses();

        });

    }

    else {

        fetch(`http://localhost:5000/updateExpense/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                amount: amount,

                category: category

            })

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadExpenses();

            editId = null;

        });

    }

    document.getElementById("amount").value = "";

    document.getElementById("category").value = "Food";

}
function loadExpenses() {

    let userId =
    localStorage.getItem("userId");

    fetch(`http://localhost:5000/expenses/${userId}`)

    .then(response => response.json())

    .then(data => {

        let table =
            document.getElementById("expenseTable");

        table.innerHTML = `
            <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
        `;

        let total = 0;

        let food = 0;

        let travel = 0;

        let shopping = 0;

        let bills = 0;
        for(let i = 0; i < data.length; i++) {

            let expense = data[i];

            let row = `
                <tr>

                    <td>${expense.amount}</td>

                    <td>${expense.category}</td>

                    <td>

                        <button onclick="editExpense(
                            ${expense.id},
                            ${expense.amount},
                            '${expense.category}'
                        )">

                            Edit

                        </button>

                        <button onclick="deleteExpense(${expense.id})">

                            Delete

                        </button>

                    </td>

                </tr>
            `;

            table.innerHTML += row;

            total =
                total + Number(expense.amount);

                if(expense.category == "Food"){

                    food =
                        food + Number(expense.amount);

                }

                else if(expense.category == "Travel"){

                    travel =
                        travel + Number(expense.amount);

                }

                else if(expense.category == "Shopping"){

                    shopping =
                        shopping + Number(expense.amount);

                }

                else if(expense.category == "Bills"){

                    bills =
                        bills + Number(expense.amount);

}
        }

        document.getElementById("totalExpense")
        .innerText = "₹" + total;

        let budget = 10000;

        let remaining = budget - total;

        document.getElementById("remaining")
        .innerText = "₹" + remaining;

        const ctx =
          document.getElementById("expenseChart");

          new Chart(ctx, {

              type: "pie",

              data: {

                  labels: [
                      "Food",
                      "Travel",
                      "Shopping",
                      "Bills"
                  ],

                  datasets: [{

                      data: [
                          food,
                          travel,
                          shopping,
                          bills
                      ]

                  }]

              }

          });

    });

}
function deleteExpense(id) {

    fetch(`http://localhost:5000/deleteExpense/${id}`, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        loadExpenses();

    });

}
function editExpense(id, amount, category) {

    document.getElementById("amount").value =
        amount;

    document.getElementById("category").value =
        category;

    editId = id;
}
function logoutUser() {

    localStorage.removeItem("token");

    alert("Logout Successful");

    window.location.href = "login.html";

}

