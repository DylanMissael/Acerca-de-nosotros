
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const emoji = document.getElementById("emoji");

const usernameField = document.getElementById("usernameField");
const forgotPassword = document.getElementById("forgotPassword");
const terms = document.getElementById("terms");

const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const switchMode = document.getElementById("switchMode");

const authForm = document.getElementById("authForm");
const message = document.getElementById("message");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");

const togglePassword = document.getElementById("togglePassword");

let mode = "login";

function setMode(newMode){
    mode = newMode;

    message.textContent = "";
    message.className = "message";

    emailInput.value = "";
    passwordInput.value = "";
    usernameInput.value = "";

    if(mode === "login"){
        loginTab.classList.add("active");
        registerTab.classList.remove("active");

        formTitle.textContent = "Bienvenido de nuevo";
        formSubtitle.textContent = "Inicia sesión y vuelve a tu colección.";

        usernameField.style.display = "none";
        forgotPassword.style.display = "block";
        terms.style.display = "none";

        submitBtn.textContent = "Iniciar sesión";
        switchText.textContent = "¿No tienes cuenta? ";
        switchMode.textContent = "Crear cuenta";
    }

    if(mode === "register"){
        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        formTitle.textContent = "Crea tu cuenta";
        formSubtitle.textContent = "Únete a la comunidad donde coleccionar también es conectar.";

        usernameField.style.display = "block";
        forgotPassword.style.display = "none";
        terms.style.display = "block";

        submitBtn.textContent = "Crear cuenta gratis";
        switchText.textContent = "¿Ya tienes cuenta? ";
        switchMode.textContent = "Iniciar sesión";
    }
}

loginTab.addEventListener("click", () => {
    setMode("login");
});

registerTab.addEventListener("click", () => {
    setMode("register");
});

switchMode.addEventListener("click", (event) => {
    event.preventDefault();

    if(mode === "login"){
        setMode("register");
    }else{
        setMode("login");
    }
});

togglePassword.addEventListener("click", () => {
    if(passwordInput.type === "password"){
        passwordInput.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    }else{
        passwordInput.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    message.className = "message";

    if(mode === "register" && username === ""){
        showMessage("Escribe tu nombre de usuario.", "error");
        return;
    }

    if(email === ""){
        showMessage("Escribe tu correo electrónico.", "error");
        return;
    }

    if(!isValidEmail(email)){
        showMessage("Escribe un correo válido.", "error");
        return;
    }

    if(password === ""){
        showMessage("Escribe tu contraseña.", "error");
        return;
    }

    if(password.length < 6){
        showMessage("La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }

    if(mode === "login"){
        showMessage("Inicio de sesión validado correctamente.", "success");
    }else{
        showMessage("Cuenta creada correctamente.", "success");
    }
});

function showMessage(text, type){
    message.textContent = text;
    message.classList.add(type);
}

function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}