// sign up inputs variable
var inputName  = document.getElementById("nameId");
var inputEmail = document.getElementById("emailId");
var inputPassword = document.getElementById("passwordId");
var confirmPassword = document.getElementById("passworConfirmdId");

// pages variable
var loginPage = document.getElementById("login");
var signupPage = document.getElementById("signup");
var homePage = document.getElementById("homeId");
var navBar = document.getElementById("navbar");

// move to login & signup variable
var moveToLogin = document.querySelector("#moveToLoginId");
var moveToSignup = document.querySelector("#moveTosignupId");

// Buttons variable
var signupButton = document.querySelector("#signupButtonId");
var loginButton = document.querySelector("#loginButtonId");
var logoutButton = document.querySelector("#logout");

// login variable
var loginPassword = document.querySelector("#loginPasswordlId");
var loginEmail = document.querySelector("#loginEmailId");

// message variable for sign up page 
var message = document.querySelector("#message");

// message variable for login page
var message2 = document.querySelector("#messageLogin");

// current User
var currentUser;

// data
var register = [];
var information;
var travel = [];
var cartona="";

// index to know the place of user name & password
var index;

// validation
var nameValidation = /^([A-Z])[a-zA-Z ]{2,25}$/;
var emailValidation = /^[a-zA-Z][a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{3,5}$/;
var passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// get data from local storage
if(localStorage.getItem("personInformation")!=null)
{
    register = JSON.parse(localStorage.getItem("personInformation"));
}
// =================== Function ===================

// add data to local storage
function addToRegister()
{
    information ={
        pName:inputName.value,
        pEmail:inputEmail.value,
        pPassword:inputPassword.value
    }
    register.push(information);
    localStorage.setItem("personInformation",JSON.stringify(register));
    clearInput();
    inputName.classList.remove("is-valid");
    inputEmail.classList.remove("is-valid");
    inputPassword.classList.remove("is-valid");
    confirmPassword.classList.remove("is-valid");
}

// clear input
function clearInput()
{
    inputName.value="";
    inputEmail.value="";
    inputPassword.value="";
    confirmPassword.value="";
}

// check Existing Email
function checkExistingEmail()
{
    for(var i=0;i<register.length;i++)
    {
        if(inputEmail.value===register[i].pEmail)
        {
            alert("This Email Is Already Exist Please Enter Anthor Email");
            inputEmail.value="";
            inputEmail.classList.replace("is-valid","is-invalid");
        }
    }
}

// error message if inputs are null for sign up page
function inputsIsEmptySignup()
{
    message.classList.remove("d-none");
    message.classList.replace("text-success","text-danger");
    message.innerHTML ="All inputs is required";
}

// error message if inputs are null for login page
function inputsIsEmptyLogin()
{
    message2.classList.remove("d-none");
    message2.classList.replace("text-success","text-danger");
    message2.innerHTML ="All inputs is required";
}

// check Existing Email in login page
function emailExistLogin()
{
    for(var i=0;i<register.length;i++)
    {
        if(loginEmail.value===register[i].pEmail)
        {
            index = i;
            console.log(index);
            loginEmail.classList.replace("is-invalid","is-valid");
            break;
        }
        else
        {
            message2.innerHTML = "Invalid Email Or Password";
        }
    }
}

// log in
function LogIn()
{
    currentUser = register[index].pName;
    loginPage.classList.add("d-none");
    homePage.classList.remove("d-none");
    navBar.classList.remove("d-none");
    document.getElementById("home").innerHTML = `<h1 class="text-info text-center p-3 mb-5">Welcome ${currentUser}</h1>`;
    getApi();
}

// API 
function getApi()
{
    var httpCopy = new XMLHttpRequest();
    httpCopy.open("GET","https://v6.vbb.transport.rest/locations?query=berlin")
    httpCopy.send()
    httpCopy.addEventListener("readystatechange",function(){
        if(httpCopy.readyState==4&&httpCopy.status==200)
        {
            travel = JSON.parse(httpCopy.response);
            displayData();
        }
    })
}

// display data
function displayData()
{
   cartona =`<div class="col-md-12">
                <h1 class="text-info bg-main  p-3 mb-2">There Are All Information About Public transport for Berlin & Brandenburg:</h1>
            </div>`;
    for(var i=0;i<travel.length;i++)
    {
        cartona += `<div class="col-md-6">
            <div class="bg-main p-3">
                <h3 class="text-white"><span class="text-danger">Name: </span> ${travel[i].name}</h3>
                <h4 class="text-danger">Location:</h4>
                <p class="text-white "><i class="fa-solid fa-circle text-warning"></i> <span class="text-danger">Latitude: </span> ${travel[i].location.latitude}</p>
                <p class="text-white "><i class="fa-solid fa-circle text-warning"></i> <span class="text-danger">Longitude: </span> ${travel[i].location.longitude}</p>
                <h4 class="text-white"><span class="text-danger">Travle Using: </span></h4>
                <p class="text-white "><i class="fa-solid fa-circle text-warning"></i> <span class="text-danger">Tram: </span> ${travel[i].products.tram}</p>
                <p class="text-white "><i class="fa-solid fa-circle text-warning"></i> <span class="text-danger">Bus: </span> ${travel[i].products.bus}</p>
                <p class="text-white "><i class="fa-solid fa-circle text-warning"></i> <span class="text-danger">Regional: </span> ${travel[i].products.regional}</p>
                <p class="text-white"><span class="text-danger">StationDHID: </span>${travel[i].stationDHID}</p>
            </div>
        </div>`
    }
    document.querySelector("#travel").innerHTML = cartona; 
}
// =================== Events And Action ===================

// name validation
inputName.addEventListener("keyup",function(){
    if(nameValidation.test(inputName.value))
    {
        inputName.classList.replace("is-invalid","is-valid");
    }
    else
    {
        inputName.classList.add("is-invalid");
    }
});

// email validation
inputEmail.addEventListener("keyup",function(){
    if(emailValidation.test(inputEmail.value))
    {
        inputEmail.classList.replace("is-invalid","is-valid");
    }
    else
    {
        inputEmail.classList.add("is-invalid");
    }
    checkExistingEmail();
})

// password validation
inputPassword.addEventListener("keyup",function(){
    if(passwordValidation.test(inputPassword.value))
    {
        inputPassword.classList.replace("is-invalid","is-valid");
    }
    else
    {
        inputPassword.classList.add("is-invalid");
    }
})

// confirm Passweord
confirmPassword.addEventListener("keyup",function(){
    confirmPassword.classList.add("is-invalid");
    if(confirmPassword.value===inputPassword.value)
    {
        confirmPassword.classList.replace("is-invalid","is-valid");
    }
    if(inputName.classList.contains("is-valid")&&inputEmail.classList.contains("is-valid")&&inputPassword.classList.contains("is-valid")&&confirmPassword.classList.contains("is-valid"))
    {
        message.classList.remove("d-none");
        message.classList.replace("text-danger","text-success");
        message.innerHTML ="Success";
    }
    
})

// move to login page
moveToLogin.addEventListener("click",function(){
    message.classList.add("d-none");
    signupPage.classList.replace("d-flex","d-none");
    loginPage.classList.remove("d-none");
})

// move to signup page
moveToSignup.addEventListener("click",function(){
    message2.classList.add("d-none");
    loginPage.classList.add("d-none");
    signupPage.classList.replace("d-none","d-flex");
})

// Register Data
signupButton.addEventListener("click",function(){
    if(inputName.classList.contains("is-valid")&&inputEmail.classList.contains("is-valid")&&inputPassword.classList.contains("is-valid")&&confirmPassword.classList.contains("is-valid"))
    {
        addToRegister();
        message.classList.add("d-none");
        signupPage.classList.add("d-none");
        loginPage.classList.remove("d-none");
    }
    else if(inputName.value==""||inputEmail.value==""||inputPassword.value=="")
    {
        inputsIsEmptySignup();
    }
    else
    {
        inputsIsEmptySignup();
    }
})

// check email Exist
loginEmail.addEventListener("keyup",function(){
    loginEmail.classList.add("is-invalid");
    emailExistLogin();

})

// check password exist
loginPassword.addEventListener("keyup",function(){
    loginPassword.classList.add("is-invalid");
    if(loginPassword.value===register[index].pPassword)
    {
        loginPassword.classList.replace("is-invalid","is-valid");
        if(loginEmail.classList.contains("is-valid"))
        {
            message2.classList.replace("text-danger","text-success");
            message2.innerHTML = "Success";
        }
    }
    else if(loginPassword.classList.contains("is-invalid")||loginEmail.classList.contains("is-invalid"))
    {
        message2.classList.add("text-danger");
        message2.innerHTML ="Invalid Email Or Password";
    }
})

// log in
loginButton.addEventListener("click",function(){
    if(loginPassword.value==""||loginEmail=="")
    {
        inputsIsEmptyLogin();
    }
    else if(loginEmail.classList.contains("is-valid")&&loginPassword.classList.contains("is-valid"))
    {
        LogIn();
        loginEmail.value = "";
        loginEmail.classList.remove("is-valid");
        loginPassword.value = "";
        loginPassword.classList.remove("is-valid");
    }
})

// log out
logoutButton.addEventListener("click",function(){
    message2.classList.add("d-none");
    navBar.classList.add("d-none");
    homePage.classList.add("d-none");
    loginPage.classList.remove("d-none");
    currentUser="";
})