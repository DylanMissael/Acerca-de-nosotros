/* Referencias a los tabs que cambian entre login y registro. */
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

/* Textos principales del formulario que cambian segun el modo activo. */
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const emoji = document.getElementById("emoji");

/* Elementos que se muestran u ocultan segun sea login o registro. */
const usernameField = document.getElementById("usernameField");
const forgotPassword = document.getElementById("forgotPassword");
const terms = document.getElementById("terms");

/* Controles de envio y enlace inferior para alternar de modo. */
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const switchMode = document.getElementById("switchMode");

/* Formulario, mensaje de validacion y campos de entrada. */
const authForm = document.getElementById("authForm");
const message = document.getElementById("message");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");

/* Icono que permite mostrar u ocultar la contrasena. */
const togglePassword = document.getElementById("togglePassword");

/* Estado actual del formulario: puede ser "login" o "register". */
let mode = "login";

/* Cambia el formulario entre iniciar sesion y crear cuenta. */
function setMode(newMode){
    mode = newMode;

    /* Limpia mensajes y campos para evitar mezclar estados anteriores. */
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

/* Click directo en los tabs superiores. */
loginTab.addEventListener("click", () => {
    setMode("login");
});

registerTab.addEventListener("click", () => {
    setMode("register");
});

/* Click en el enlace inferior para alternar al modo contrario. */
switchMode.addEventListener("click", (event) => {
    event.preventDefault();

    if(mode === "login"){
        setMode("register");
    }else{
        setMode("login");
    }
});

/* Alterna el tipo del input para ver u ocultar la contrasena. */
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

/* Valida el formulario en el navegador; no envia datos a un servidor. */
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

/* Muestra un mensaje debajo del formulario y aplica el color segun el tipo. */
function showMessage(text, type){
    message.textContent = text;
    message.classList.add(type);
}

/* Valida que el correo tenga formato basico usuario@dominio.extension. */
function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
