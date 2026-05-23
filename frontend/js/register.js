function registerUser() {

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            email: email,
            password: password

        })

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        window.location.href = "login.html";

    });

}