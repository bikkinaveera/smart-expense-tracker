function loginUser() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        if(data.token){

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "userId",
                data.userId
            );

            alert("Login Successful");

            window.location.href =
                "dashboard.html";

        }

        else{

            alert(data.message || data);

        }

    })

    .catch(error => {

        console.log(error);

        alert("Login Failed");

    });

}