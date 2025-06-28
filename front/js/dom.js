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
        document.getElementById("loggedUsername").textContent = `¡Bienvenido ${username}!`;
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
        if (notepad.style.display !== "none") {
            notepad.style.display = "none";
            loginForm.style.display = "";
            this.clearAllNotes();
            this.clearSelect();
        }
        else {
            notepad.style.display = "";
            loginForm.style.display = "none";
        }
    }

    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;

        const modal = new bootstrap.Modal('#modal', {
            keyboard: true,
            focus: true
        });

        modal.show();
    }   

    
}

const ui = new UserInterface();