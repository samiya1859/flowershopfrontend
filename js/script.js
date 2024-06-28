const toggler = document.getElementById('toggler-item');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    toggler.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
    });

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}
      
// handling registration for a seller

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}


const handleRegistrationForSeller = (event) => {
    event.preventDefault();

    const username = getValue("seller-username");
    const first_name = getValue("seller-firstname");
    const last_name = getValue("seller-lastname");
    const email = getValue("seller-email");
    const phone = getValue("seller-phone");
    const address = getValue("seller-address");
    const shop_name = getValue("seller-shop-name");
    const is_customer = false;
    const is_seller = true;
    const password = getValue("seller-password");
    const confirm_password = getValue("seller-confirm-password");

    if (!username || !first_name || !last_name || !email || !phone || !address || !shop_name || !password || !confirm_password) {
        alert("Please fill out all fields");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords didn't match");
        return;
    }

    const registrationInfo = {
        username, first_name, last_name, email, phone, address, shop_name, is_customer, is_seller, password,confirm_password
    };
    console.log(registrationInfo);

    fetch(`http://127.0.0.1:8000/user/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationInfo),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        alert("Check your email for joining as a seller");
    })
    .catch((error) => {
        console.error("Error:", error.message);
        alert("Registration failed! Try again");
    });
}

const handleRegistrationForCustomer = (event) => {
    event.preventDefault();

    const username = getValue("customer-username");
    const first_name = getValue("customer-firstname");
    const last_name = getValue("customer-lastname");
    const email = getValue("customer-email");
    const phone = getValue("customer-phone");
    const address = getValue("customer-address");
    const shop_name = null;
    const is_customer = true;
    const is_seller = false;
    const password = getValue("customer-password");
    const confirm_password = getValue("customer-confirm-password");

    if (!username || !first_name || !last_name || !email || !phone || !address || !password || !confirm_password) {
        alert("Please fill out all fields");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords didn't match");
        return;
    }

    const registrationInfo = {
        username, first_name, last_name, email, phone, address, shop_name, is_customer, is_seller, password,confirm_password
    };
    console.log(registrationInfo);
    fetch(`http://127.0.0.1:8000/user/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationInfo),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        alert("Check your email for joining as a customer");
    })
    .catch((error) => {
        console.error("Error:", error.message);
        alert("Registration failed! Try again");
    });
}

const showForm = (formType) => {
    document.getElementById('customer-form').style.display = formType === 'customer' ? 'block' : 'none';
    document.getElementById('seller-form').style.display = formType === 'seller' ? 'block' : 'none';
}






// handling login

const handleLogin = (event) => {
    event.preventDefault();

const username = getValue("login-username")
const password = getValue("login-password")

if(username,password){
    fetch(`http://127.0.0.1:8000/user/login/`,{
        method: "POST",
        headers: {
            "content-Type":"application/json",
        },
        body:JSON.stringify({username,password}),
    })
    .then((res) => res.json())
    .then((data) =>{
      console.log(data);
      
    if(data.token && data.user_id){
        localStorage.setItem("token",data.token);
        localStorage.setItem("user_id",data.user_id);

        fetch(`http://127.0.0.1:8000/user/${data.user_id}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.is_customer);
            console.log(data.is_seller);
            
            localStorage.setItem("is_customer",data.is_customer);
            localStorage.setItem("is_seller",data.is_seller);

            if (data.is_customer) {
                window.location.href = "home.html";
            } else if (data.is_seller) {
                window.location.href = "seller_home.html";
            } else {
                window.location.href = "home.html"; // Default redirect if neither role is set
            }
            alert("Logged in successfully");
        }) 

            // handlenavbar(true);
    }
    })
    .catch((error) => {
        console.error("Error:", error.message);
        alert("Login failed! Try again");
    });
} else {
    alert("Username or Password incorrect");
}   
    
}



const handlelogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_customer");
    localStorage.removeItem("is_seller");
    alert("Logged out Successfully!");
  
    // Redirect to index.html
    window.location.href = "home.html";
  
    
    const token = localStorage.getItem("token"); 
  
    fetch("http://127.0.0.1:8000/user/logout", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  