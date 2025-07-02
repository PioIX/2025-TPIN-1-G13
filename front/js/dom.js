class UserInterface {
    constructor() {

    }

    getEmail() {
        return document.getElementById("email").value;
    }

    getUser() {
        return document.getElementById("username").value;
    }

    setUser(username) {
        document.getElementById("username").textContent = `¡Bienvenido ${username}!`;
    }

    getPassword() {
        return document.getElementById("password").value;
    }

    clearLoginInputs() {
        document.getElementById("password").value = "";
        document.getElementById("username").value = "";
    }

    changeScreen() {
        const notepad = document.getElementById("notepad");
        const loginForm = document.getElementById("loginForm");
        if (notepad.style.display == "none") {
            notepad.style.display = "block";
            loginForm.style.display = "none";
        } else {
            notepad.style.display = "none";
            loginForm.style.display = "flex";
        }
        /*if (notepad.style.display !== "none") {
            notepad.style.display = "none";
            loginForm.style.display = "";
        }
        else {
            notepad.style.display = "";
            loginForm.style.display = "none";
        } */
    }

    changeScreenAdmin() {
        const admin = document.getElementById("admin");
        const loginForm = document.getElementById("loginForm");
        const notepad = document.getElementById("notepad");
        notepad.style.display = "none";
        loginForm.style.display = "none";
        admin.style.display = "block";
    }

    mostrarSeccion(id) {
        const secciones = document.querySelectorAll('.admin-seccion');
        secciones.forEach(sec => {
            sec.style.display = (sec.id === id) ? 'block' : 'none';
        }); 
        
    }

    getPregunta() {
        return document.getElementById("pregunta").value
    }

    getCategoria() {
        return document.getElementById("categoria").value
    }







    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;

        const modal = new bootstrap.Modal(document.getElementById("modal"), {
            keyboard: true,
            focus: true
        });

        modal.show();
    } 
}

const ui = new UserInterface();