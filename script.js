document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }


    /* =========================
       AUTH MENU
    ========================= */

    const loginNav = document.getElementById("loginNav");
    const registerNav = document.getElementById("registerNav");
    const accountNav = document.getElementById("accountNav");
    const logoutNav = document.getElementById("logoutNav");


    function updateAuthMenu() {

        const savedUser =
            localStorage.getItem("nexoraDemoUser");

        if (savedUser) {

            let user = null;

            try {
                user = JSON.parse(savedUser);
            } catch (error) {
                user = null;
            }

            if (user) {

                if (loginNav) {
                    loginNav.style.display = "none";
                }

                if (registerNav) {
                    registerNav.style.display = "none";
                }

                if (accountNav) {

                    accountNav.style.display = "block";

                    accountNav.textContent =
                        "👤 " + (user.name || "Account");
                }

                if (logoutNav) {
                    logoutNav.style.display = "block";
                }

            }

        } else {

            if (loginNav) {
                loginNav.style.display = "block";
            }

            if (registerNav) {
                registerNav.style.display = "block";
            }

            if (accountNav) {
                accountNav.style.display = "none";
            }

            if (logoutNav) {
                logoutNav.style.display = "none";
            }
        }
    }


    updateAuthMenu();


    /* =========================
       LOGOUT
    ========================= */

    if (logoutNav) {

        logoutNav.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem("nexoraDemoUser");

            showNexoraMessage(
                "You have been logged out of NEXORA."
            );

            setTimeout(function () {

                window.location.href = "index.html";

            }, 1000);

        });
    }


    /* =========================
       HOME LOGIN BUTTON
    ========================= */

    const homeLoginButton =
        document.querySelector(
            '.buttons a[href="login.html"]'
        );

    if (
        homeLoginButton &&
        localStorage.getItem("nexoraDemoUser")
    ) {

        homeLoginButton.style.display = "none";
    }


    /* =========================
       CARD 3D EFFECT
    ========================= */

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg) " +
                    "translateY(-5px)";
            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =========================
       LOGIN FORM
    ========================= */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const emailInput =
                    document.getElementById("loginEmail");

                const passwordInput =
                    document.getElementById("loginPassword");

                if (!emailInput || !passwordInput) {
                    return;
                }

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value.trim();

                if (email === "" || password === "") {

                    showNexoraMessage(
                        "Please enter your email and password."
                    );

                    return;
                }

                const savedUser =
                    localStorage.getItem("nexoraDemoUser");

                if (!savedUser) {

                    showNexoraMessage(
                        "No account found. Please create an account first."
                    );

                    return;
                }

                let demoUser;

                try {

                    demoUser =
                        JSON.parse(savedUser);

                } catch (error) {

                    showNexoraMessage(
                        "Saved account data is invalid. Please register again."
                    );

                    return;
                }

                if (
                    demoUser.email &&
                    email.toLowerCase() ===
                    demoUser.email.toLowerCase() &&
                    password ===
                    demoUser.password
                ) {

                    showNexoraMessage(
                        "Login successful! Welcome to NEXORA, " +
                        demoUser.name +
                        "!"
                    );

                    loginForm.reset();

                    setTimeout(function () {

                        window.location.href =
                            "index.html";

                    }, 1200);

                } else {

                    showNexoraMessage(
                        "Incorrect email or password."
                    );
                }

            }
        );
    }


    /* =========================
       REGISTER FORM
    ========================= */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById("registerName");

                const emailInput =
                    document.getElementById("registerEmail");

                const passwordInput =
                    document.getElementById("registerPassword");

                if (
                    !nameInput ||
                    !emailInput ||
                    !passwordInput
                ) {
                    return;
                }

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value.trim();

                if (
                    name === "" ||
                    email === "" ||
                    password === ""
                ) {

                    showNexoraMessage(
                        "Please fill all account details."
                    );

                    return;
                }

                if (!email.includes("@")) {

                    showNexoraMessage(
                        "Please enter a valid email address."
                    );

                    return;
                }

                if (password.length < 6) {

                    showNexoraMessage(
                        "Password must be at least 6 characters."
                    );

                    return;
                }


                const existingUser =
                    localStorage.getItem(
                        "nexoraDemoUser"
                    );


                if (existingUser) {

                    let oldUser = null;

                    try {

                        oldUser =
                            JSON.parse(existingUser);

                    } catch (error) {

                        oldUser = null;
                    }


                    if (
                        oldUser &&
                        oldUser.email &&
                        email.toLowerCase() ===
                        oldUser.email.toLowerCase()
                    ) {

                        showNexoraMessage(
                            "An account with this email already exists. Please login."
                        );

                        return;
                    }
                }


                const demoUser = {

                    name: name,

                    email: email,

                    password: password,

                    picture: ""

                };


                localStorage.setItem(
                    "nexoraDemoUser",
                    JSON.stringify(demoUser)
                );


                showNexoraMessage(
                    "Account created successfully! Redirecting to login..."
                );


                registerForm.reset();


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1500);

            }
        );
    }


    /* =========================
       ACCOUNT PAGE
    ========================= */

    const accountName =
        document.getElementById("accountName");

    const accountEmail =
        document.getElementById("accountEmail");

    const accountStatus =
        document.getElementById("accountStatus");

    const accountPicture =
        document.getElementById("accountPicture");

    const editAccountBtn =
        document.getElementById("editAccountBtn");

    const editAccountForm =
        document.getElementById("editAccountForm");

    const editName =
        document.getElementById("editName");

    const editEmail =
        document.getElementById("editEmail");

    const editPassword =
        document.getElementById("editPassword");

    const editPicture =
        document.getElementById("editPicture");

    const saveAccountBtn =
        document.getElementById("saveAccountBtn");


    let currentUser = null;


    /* LOAD ACCOUNT */

    if (
        accountName &&
        accountEmail &&
        accountStatus
    ) {

        const savedUser =
            localStorage.getItem("nexoraDemoUser");


        if (savedUser) {

            try {

                currentUser =
                    JSON.parse(savedUser);


                accountName.textContent =
                    currentUser.name ||
                    "Not available";


                accountEmail.textContent =
                    currentUser.email ||
                    "Not available";


                accountStatus.textContent =
                    "✓ Active Demo Account";


                if (
                    editName &&
                    currentUser.name
                ) {

                    editName.value =
                        currentUser.name;
                }


                if (
                    editEmail &&
                    currentUser.email
                ) {

                    editEmail.textContent =
                        currentUser.email;
                }


                if (
                    accountPicture &&
                    currentUser.picture
                ) {

                    accountPicture.innerHTML =
                        "";

                    const image =
                        document.createElement("img");

                    image.src =
                        currentUser.picture;

                    image.style.width =
                        "100%";

                    image.style.height =
                        "100%";

                    image.style.objectFit =
                        "cover";

                    accountPicture.appendChild(
                        image
                    );
                }


            } catch (error) {

                accountName.textContent =
                    "Not available";

                accountEmail.textContent =
                    "Not available";

                accountStatus.textContent =
                    "Account data error";
            }

        } else {

            accountName.textContent =
                "No account";

            accountEmail.textContent =
                "Please login first";

            accountStatus.textContent =
                "Not logged in";
        }
    }


    /* =========================
       OPEN EDIT FORM
    ========================= */

    if (
        editAccountBtn &&
        editAccountForm
    ) {

        editAccountBtn.addEventListener(
            "click",
            function () {

                if (
                    editAccountForm.style.display ===
                    "none"
                ) {

                    editAccountForm.style.display =
                        "block";

                    editAccountBtn.textContent =
                        "✖ Close Edit";

                } else {

                    editAccountForm.style.display =
                        "none";

                    editAccountBtn.textContent =
                        "✏️ Edit Details";
                }

            }
        );
    }


    /* =========================
       SAVE ACCOUNT CHANGES
    ========================= */

    if (saveAccountBtn) {

        saveAccountBtn.addEventListener(
            "click",
            function () {

                const savedUser =
                    localStorage.getItem(
                        "nexoraDemoUser"
                    );


                if (!savedUser) {

                    showNexoraMessage(
                        "Please login first."
                    );

                    return;
                }


                let user;


                try {

                    user =
                        JSON.parse(savedUser);

                } catch (error) {

                    showNexoraMessage(
                        "Account data is invalid."
                    );

                    return;
                }


                /* NAME */

                if (editName) {

                    const newName =
                        editName.value.trim();


                    if (newName === "") {

                        showNexoraMessage(
                            "Name cannot be empty."
                        );

                        return;
                    }


                    user.name =
                        newName;
                }


                /* PASSWORD */

                if (editPassword) {

                    const newPassword =
                        editPassword.value.trim();


                    if (newPassword !== "") {

                        if (
                            newPassword.length < 6
                        ) {

                            showNexoraMessage(
                                "Password must be at least 6 characters."
                            );

                            return;
                        }


                        user.password =
                            newPassword;
                    }
                }


                /* PROFILE PICTURE */

                if (
                    editPicture &&
                    editPicture.files &&
                    editPicture.files[0]
                ) {

                    const file =
                        editPicture.files[0];


                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        showNexoraMessage(
                            "Please select an image file."
                        );

                        return;
                    }


                    const reader =
                        new FileReader();


                    reader.onload = function () {

                        user.picture =
                            reader.result;


                        localStorage.setItem(
                            "nexoraDemoUser",
                            JSON.stringify(user)
                        );


                        showNexoraMessage(
                            "Account details updated successfully!"
                        );


                        setTimeout(function () {

                            window.location.reload();

                        }, 1000);

                    };


                    reader.readAsDataURL(file);


                } else {

                    localStorage.setItem(
                        "nexoraDemoUser",
                        JSON.stringify(user)
                    );


                    showNexoraMessage(
                        "Account details updated successfully!"
                    );


                    setTimeout(function () {

                        window.location.reload();

                    }, 1000);
                }

            }
        );
    }


    /* =========================
       FORGOT PASSWORD
    ========================= */

    const forgotPassword =
        document.getElementById(
            "forgotPassword"
        );

    const forgotModal =
        document.getElementById(
            "forgotModal"
        );

    const forgotClose =
        document.getElementById(
            "forgotClose"
        );

    const resetEmail =
        document.getElementById(
            "resetEmail"
        );

    const resetPasswordBtn =
        document.getElementById(
            "resetPasswordBtn"
        );

    const resetMessage =
        document.getElementById(
            "resetMessage"
        );


    if (
        forgotPassword &&
        forgotModal
    ) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                forgotModal.classList.add(
                    "active"
                );

            }
        );
    }


    if (
        forgotClose &&
        forgotModal
    ) {

        forgotClose.addEventListener(
            "click",
            function () {

                forgotModal.classList.remove(
                    "active"
                );

            }
        );
    }


    if (forgotModal) {

        forgotModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    forgotModal
                ) {

                    forgotModal.classList.remove(
                        "active"
                    );
                }

            }
        );
    }


    /* =========================
       RESET PASSWORD DEMO
    ========================= */

    if (
        resetPasswordBtn &&
        resetEmail &&
        resetMessage
    ) {

        resetPasswordBtn.addEventListener(
            "click",
            function () {

                const email =
                    resetEmail.value.trim();


                if (email === "") {

                    resetMessage.textContent =
                        "Please enter your email address.";

                    return;
                }


                if (!email.includes("@")) {

                    resetMessage.textContent =
                        "Please enter a valid email address.";

                    return;
                }


                resetMessage.textContent =
                    "Reset link demo sent successfully!";


                resetEmail.value = "";

            }
        );
    }


    /* =========================
       NEXORA MESSAGE
    ========================= */

    /**
     * @param {string} message
     */
    function showNexoraMessage(message) {

        let messageBox =
            document.getElementById(
                "nexoraMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );

            messageBox.id =
                "nexoraMessage";

            document.body.appendChild(
                messageBox
            );
        }


        messageBox.textContent =
            message;


        messageBox.style.position =
            "fixed";

        messageBox.style.left =
            "50%";

        messageBox.style.bottom =
            "30px";

        messageBox.style.transform =
            "translateX(-50%) translateY(20px)";

        messageBox.style.width =
            "calc(100% - 40px)";

        messageBox.style.maxWidth =
            "500px";

        messageBox.style.padding =
            "15px 20px";

        messageBox.style.borderRadius =
            "14px";

        messageBox.style.background =
            "rgba(15, 10, 30, 0.96)";

        messageBox.style.border =
            "1px solid rgba(139, 92, 246, 0.7)";

        messageBox.style.color =
            "#ffffff";

        messageBox.style.textAlign =
            "center";

        messageBox.style.fontSize =
            "14px";

        messageBox.style.lineHeight =
            "1.5";

        messageBox.style.zIndex =
            "3000";

        messageBox.style.boxShadow =
            "0 0 35px rgba(124, 58, 237, 0.35)";

        messageBox.style.opacity =
            "0";

        messageBox.style.transition =
            "0.3s ease";


        setTimeout(function () {

            messageBox.style.opacity =
                "1";

            messageBox.style.transform =
                "translateX(-50%) translateY(0)";

        }, 10);


        clearTimeout(
            window.nexoraMessageTimer
        );


        window.nexoraMessageTimer =
            setTimeout(function () {

                messageBox.style.opacity =
                    "0";

                messageBox.style.transform =
                    "translateX(-50%) translateY(20px)";

            }, 3500);

    }

});