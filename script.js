```javascript
/* =========================================================
   CLOUDGUARD
   GLOBAL JAVASCRIPT
   Navigation + Login + Toast + Storage + UI
========================================================= */


/* =========================================================
   1. GLOBAL SETTINGS
========================================================= */

const CLOUDGUARD = {
    appName: "CloudGuard",
    version: "2.4.1",

    demoEmail: "demo@cloudguard.com",
    demoPassword: "cloudguard123",

    adminEmail: "admin@cloudguard.com",
    adminPassword: "admin123"
};


/* =========================================================
   2. PAGE NAVIGATION
========================================================= */

function goTo(page) {

    if (!page) {
        return;
    }

    window.location.href = page;
}


/* =========================================================
   3. LOGIN STATUS
========================================================= */

function isLoggedIn() {

    return (
        localStorage.getItem("cloudguardLoggedIn") === "true"
    );
}


/* =========================================================
   4. CURRENT PAGE
========================================================= */

function getCurrentPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (!page) {
        page = "index.html";
    }

    return page;
}


const currentPage = getCurrentPage();


/* =========================================================
   5. PROTECTED PAGES
========================================================= */

const protectedPages = [
    "dashboard.html",
    "servers.html",
    "threats.html",
    "analytics.html",
    "incidents.html",
    "reports.html",
    "settings.html"
];


/* =========================================================
   6. LOGIN PROTECTION
========================================================= */

function checkPageAccess() {

    if (
        protectedPages.includes(currentPage) &&
        !isLoggedIn()
    ) {

        window.location.href = "login.html";
    }
}


/* =========================================================
   7. LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem("cloudguardLoggedIn");
    localStorage.removeItem("cloudguardUser");

    showToast(
        "Logged out successfully",
        "success"
    );

    setTimeout(function () {

        window.location.href = "login.html";

    }, 700);
}


/* =========================================================
   8. LOGIN USER
========================================================= */

function loginUser(email, password) {

    email =
        String(email || "")
            .trim()
            .toLowerCase();

    password =
        String(password || "");

    if (!email || !password) {

        showToast(
            "Please enter email and password",
            "error"
        );

        return false;
    }


    /* Demo account */

    if (
        email === CLOUDGUARD.demoEmail &&
        password === CLOUDGUARD.demoPassword
    ) {

        const user = {
            name: "Demo User",
            email: email,
            role: "Security Analyst"
        };

        localStorage.setItem(
            "cloudguardLoggedIn",
            "true"
        );

        localStorage.setItem(
            "cloudguardUser",
            JSON.stringify(user)
        );

        showToast(
            "Login successful",
            "success"
        );

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 700);

        return true;
    }


    /* Admin account */

    if (
        email === CLOUDGUARD.adminEmail &&
        password === CLOUDGUARD.adminPassword
    ) {

        const user = {
            name: "Administrator",
            email: email,
            role: "Administrator"
        };

        localStorage.setItem(
            "cloudguardLoggedIn",
            "true"
        );

        localStorage.setItem(
            "cloudguardUser",
            JSON.stringify(user)
        );

        showToast(
            "Admin login successful",
            "success"
        );

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 700);

        return true;
    }


    showToast(
        "Invalid email or password",
        "error"
    );

    return false;
}


/* =========================================================
   9. LOGOUT ALL SESSIONS
========================================================= */

function logoutAllSessions() {

    localStorage.removeItem(
        "cloudguardLoggedIn"
    );

    localStorage.removeItem(
        "cloudguardUser"
    );

    showToast(
        "All sessions have been logged out",
        "success"
    );

    setTimeout(function () {

        window.location.href =
            "login.html";

    }, 900);
}


/* =========================================================
   10. TOAST SYSTEM
========================================================= */

function showToast(
    message,
    type = "success"
) {

    let toast =
        document.getElementById(
            "cloudguardToast"
        );


    /* Create toast */

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "cloudguardToast";

        toast.innerHTML = `
            <span class="cg-toast-icon">✓</span>
            <span class="cg-toast-message"></span>
        `;

        document.body.appendChild(toast);


        /* Toast styling */

        Object.assign(
            toast.style,
            {
                position: "fixed",
                right: "24px",
                bottom: "24px",
                zIndex: "99999",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "260px",
                maxWidth: "420px",
                padding: "14px 18px",
                background: "#24130d",
                color: "#f8eee8",
                border: "1px solid #5a3020",
                borderRadius: "12px",
                boxShadow:
                    "0 20px 60px rgba(0,0,0,.55)",
                opacity: "0",
                transform: "translateY(20px)",
                transition:
                    "all .3s ease"
            }
        );
    }


    const icon =
        toast.querySelector(
            ".cg-toast-icon"
        );

    const text =
        toast.querySelector(
            ".cg-toast-message"
        );


    if (text) {
        text.textContent = message;
    }


    /* Type */

    if (type === "error") {

        icon.textContent = "!";
        icon.style.color = "#ff7167";

        toast.style.borderColor =
            "rgba(239,75,63,.4)";
    }

    else if (type === "warning") {

        icon.textContent = "!";
        icon.style.color = "#ffc36c";

        toast.style.borderColor =
            "rgba(255,179,71,.4)";
    }

    else {

        icon.textContent = "✓";
        icon.style.color = "#68d995";

        toast.style.borderColor =
            "rgba(67,196,123,.3)";
    }


    /* Show */

    requestAnimationFrame(function () {

        toast.style.opacity = "1";

        toast.style.transform =
            "translateY(0)";
    });


    clearTimeout(
        window.cloudGuardToastTimer
    );


    window.cloudGuardToastTimer =
        setTimeout(function () {

            toast.style.opacity = "0";

            toast.style.transform =
                "translateY(20px)";

        }, 2800);
}


/* =========================================================
   11. ACTIVE SIDEBAR NAVIGATION
========================================================= */

function setActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );

    links.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const page =
            href
                .split("/")
                .pop()
                .toLowerCase();

        if (page === currentPage) {

            link.classList.add(
                "active"
            );

        }
    });
}


/* =========================================================
   12. LOAD USER
========================================================= */

function getUser() {

    const data =
        localStorage.getItem(
            "cloudguardUser"
        );

    if (!data) {
        return null;
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        return null;
    }
}


/* =========================================================
   13. DISPLAY USER INFORMATION
========================================================= */

function loadUserInformation() {

    const user =
        getUser();

    if (!user) {
        return;
    }


    const name =
        user.name ||
        user.fullName ||
        user.username ||
        "CloudGuard User";

    const email =
        user.email ||
        CLOUDGUARD.demoEmail;

    const role =
        user.role ||
        "Security Analyst";


    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(function (element) {

            element.textContent = name;
        });


    document
        .querySelectorAll(
            "[data-user-email]"
        )
        .forEach(function (element) {

            element.textContent = email;
        });


    document
        .querySelectorAll(
            "[data-user-role]"
        )
        .forEach(function (element) {

            element.textContent = role;
        });


    document
        .querySelectorAll(
            ".user-name"
        )
        .forEach(function (element) {

            element.textContent = name;
        });


    document
        .querySelectorAll(
            ".user-email"
        )
        .forEach(function (element) {

            element.textContent = email;
        });
}


/* =========================================================
   14. INITIAL LETTER AVATAR
========================================================= */

function updateAvatars() {

    const user =
        getUser();

    if (!user) {
        return;
    }

    const name =
        user.name ||
        user.username ||
        "User";

    const letter =
        name
            .charAt(0)
            .toUpperCase();


    document
        .querySelectorAll(
            ".avatar"
        )
        .forEach(function (avatar) {

            if (
                !avatar.querySelector("img")
            ) {

                avatar.textContent =
                    letter;
            }
        });
}


/* =========================================================
   15. NOTIFICATION PANEL
========================================================= */

function openNotifications() {

    let panel =
        document.getElementById(
            "notificationPanel"
        );


    /* Toggle */

    if (panel) {

        panel.remove();

        return;
    }


    panel =
        document.createElement("div");

    panel.id =
        "notificationPanel";


    panel.innerHTML = `
        <div class="notification-header">
            <strong>Security Alerts</strong>

            <button
                type="button"
                onclick="closeNotifications()">
                ×
            </button>
        </div>

        <div class="notification-item">
            <span class="notification-dot danger"></span>

            <div>
                <strong>Critical Threat</strong>

                <p>
                    Suspicious login detected
                    from an unknown location.
                </p>

                <small>
                    2 minutes ago
                </small>
            </div>
        </div>

        <div class="notification-item">
            <span class="notification-dot warning"></span>

            <div>
                <strong>Firewall Alert</strong>

                <p>
                    Multiple blocked requests
                    detected.
                </p>

                <small>
                    18 minutes ago
                </small>
            </div>
        </div>

        <div class="notification-item">
            <span class="notification-dot success"></span>

            <div>
                <strong>Security Scan</strong>

                <p>
                    AI security scan completed.
                </p>

                <small>
                    1 hour ago
                </small>
            </div>
        </div>

        <div style="
            padding:15px;
            text-align:center;
            border-top:1px solid #43251a;
        ">
            <button
                class="btn btn-secondary btn-small"
                onclick="goTo('threats.html')">
                View All Alerts
            </button>
        </div>
    `;


    document.body.appendChild(panel);


    Object.assign(
        panel.style,
        {
            position: "fixed",
            top: "76px",
            right: "24px",
            width: "350px",
            maxWidth: "calc(100vw - 30px)",
            background: "#21120d",
            border: "1px solid #543021",
            borderRadius: "15px",
            zIndex: "9999",
            boxShadow:
                "0 25px 70px rgba(0,0,0,.6)",
            overflow: "hidden"
        }
    );
}


function closeNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );

    if (panel) {
        panel.remove();
    }
}


/* =========================================================
   16. MOBILE MENU
========================================================= */

function createMobileMenu() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    if (!sidebar) {
        return;
    }


    let button =
        document.getElementById(
            "mobileMenuButton"
        );


    if (!button) {

        button =
            document.createElement("button");

        button.id =
            "mobileMenuButton";

        button.type = "button";

        button.innerHTML = "☰";

        document.body.appendChild(
            button
        );


        Object.assign(
            button.style,
            {
                position: "fixed",
                top: "14px",
                left: "14px",
                zIndex: "10001",
                width: "43px",
                height: "43px",
                border: "1px solid #5a3020",
                borderRadius: "10px",
                background: "#24130d",
                color: "#ff9147",
                fontSize: "21px"
            }
        );


        button.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "mobile-open"
                );

                if (
                    sidebar.classList.contains(
                        "mobile-open"
                    )
                ) {

                    sidebar.style.transform =
                        "translateX(0)";

                }

                else {

                    sidebar.style.transform =
                        "translateX(-100%)";
                }
            }
        );
    }


    function updateMenu() {

        if (window.innerWidth <= 900) {

            button.style.display = "flex";

            button.style.alignItems =
                "center";

            button.style.justifyContent =
                "center";

            if (
                !sidebar.classList.contains(
                    "mobile-open"
                )
            ) {

                sidebar.style.transform =
                    "translateX(-100%)";
            }

        }

        else {

            button.style.display = "none";

            sidebar.style.transform =
                "translateX(0)";
        }
    }


    updateMenu();

    window.addEventListener(
        "resize",
        updateMenu
    );
}


/* =========================================================
   17. SEARCH
========================================================= */

function setupSearch() {

    const inputs =
        document.querySelectorAll(
            'input[type="search"], .search-input'
        );


    inputs.forEach(function (input) {

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    const value =
                        input.value.trim();

                    if (value) {

                        showToast(
                            `Searching for "${value}"`,
                            "success"
                        );
                    }
                }
            }
        );
    });
}


/* =========================================================
   18. LOCAL STORAGE HELPERS
========================================================= */

function savePreference(
    key,
    value
) {

    if (!key) {
        return;
    }

    localStorage.setItem(
        "cloudguard_" + key,
        JSON.stringify(value)
    );
}


function getPreference(
    key,
    defaultValue = null
) {

    const value =
        localStorage.getItem(
            "cloudguard_" + key
        );

    if (value === null) {
        return defaultValue;
    }

    try {

        return JSON.parse(value);

    } catch (error) {

        return value;
    }
}


/* =========================================================
   19. CONFIRM ACTION
========================================================= */

function confirmAction(
    message,
    callback
) {

    const result =
        window.confirm(
            message ||
            "Are you sure?"
        );

    if (
        result &&
        typeof callback === "function"
    ) {

        callback();
    }
}


/* =========================================================
   20. PASSWORD VISIBILITY
========================================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );

    if (!input) {
        return;
    }


    if (
        input.type === "password"
    ) {

        input.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    }

    else {

        input.type = "password";

        if (button) {
            button.textContent = "👁";
        }
    }
}


/* =========================================================
   21. COPY TEXT
========================================================= */

async function copyText(
    text
) {

    if (!text) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "Copied to clipboard",
            "success"
        );

    }

    catch (error) {

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value = text;

        textarea.style.position =
            "fixed";

        textarea.style.opacity = "0";

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand(
            "copy"
        );

        textarea.remove();

        showToast(
            "Copied to clipboard",
            "success"
        );
    }
}


/* =========================================================
   22. CLOCK
========================================================= */

function startCloudGuardClock() {

    const clocks =
        document.querySelectorAll(
            "[data-cloudguard-clock]"
        );

    if (!clocks.length) {
        return;
    }


    function updateClock() {

        const now =
            new Date();

        const time =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );


        clocks.forEach(
            function (clock) {

                clock.textContent =
                    time;
            }
        );
    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );
}


/* =========================================================
   23. ONLINE STATUS
========================================================= */

function updateOnlineStatus() {

    const elements =
        document.querySelectorAll(
            "[data-online-status]"
        );

    elements.forEach(
        function (element) {

            if (navigator.onLine) {

                element.textContent =
                    "Online";

                element.classList.remove(
                    "offline"
                );

                element.classList.add(
                    "online"
                );

            }

            else {

                element.textContent =
                    "Offline";

                element.classList.remove(
                    "online"
                );

                element.classList.add(
                    "offline"
                );
            }
        }
    );
}


window.addEventListener(
    "online",
    updateOnlineStatus
);

window.addEventListener(
    "offline",
    updateOnlineStatus
);


/* =========================================================
   24. LIVE NUMBER SIMULATION
========================================================= */

function simulateSecurityActivity() {

    const elements =
        document.querySelectorAll(
            "[data-live-number]"
        );

    if (!elements.length) {
        return;
    }


    elements.forEach(
        function (element) {

            const current =
                parseInt(
                    element.textContent
                ) || 0;

            const change =
                Math.floor(
                    Math.random() * 3
                );

            element.textContent =
                current + change;
        }
    );
}


/* =========================================================
   25. AUTO REFRESH
========================================================= */

function autoRefresh(
    callback,
    seconds = 30
) {

    if (
        typeof callback !==
        "function"
    ) {

        return;
    }


    return setInterval(
        callback,
        seconds * 1000
    );
}


/* =========================================================
   26. LOADING BUTTON
========================================================= */

function setButtonLoading(
    button,
    loading = true
) {

    if (!button) {
        return;
    }


    if (loading) {

        if (
            !button.dataset.originalText
        ) {

            button.dataset.originalText =
                button.innerHTML;
        }

        button.disabled = true;

        button.innerHTML =
            `
            <span class="loading">
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
            </span>
            `;

    }

    else {

        button.disabled = false;

        if (
            button.dataset.originalText
        ) {

            button.innerHTML =
                button.dataset.originalText;
        }
    }
}


/* =========================================================
   27. GENERATE RANDOM ID
========================================================= */

function generateID(
    prefix = "CG"
) {

    const number =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return prefix + "-" + number;
}


/* =========================================================
   28. FORMAT DATE
========================================================= */

function formatDate(
    date = new Date()
) {

    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================================
   29. FORMAT TIME
========================================================= */

function formatTime(
    date = new Date()
) {

    return new Date(
        date
    ).toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   30. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;
        }


        closeNotifications();


        document
            .querySelectorAll(
                ".modal"
            )
            .forEach(
                function (modal) {

                    modal.style.display =
                        "none";
                }
            );
    }
);


/* =========================================================
   31. CLOSE MODAL WHEN CLICKING BACKDROP
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.style.display =
                "none";
        }
    }
);


/* =========================================================
   32. BUTTON RIPPLE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }


        const ripple =
            document.createElement(
                "span"
            );

        ripple.className =
            "cloudguard-ripple";


        const rect =
            button.getBoundingClientRect();


        ripple.style.position =
            "absolute";

        ripple.style.width =
            "10px";

        ripple.style.height =
            "10px";

        ripple.style.borderRadius =
            "50%";

        ripple.style.background =
            "rgba(255,255,255,.25)";

        ripple.style.pointerEvents =
            "none";

        ripple.style.left =
            (
                event.clientX -
                rect.left -
                5
            ) + "px";

        ripple.style.top =
            (
                event.clientY -
                rect.top -
                5
            ) + "px";


        button.style.position =
            "relative";

        button.style.overflow =
            "hidden";


        button.appendChild(
            ripple
        );


        setTimeout(
            function () {

                ripple.remove();

            },
            500
        );
    }
);


/* =========================================================
   33. SETTINGS STORAGE
========================================================= */

function saveCloudGuardSettings(
    settings
) {

    if (!settings) {
        return;
    }

    localStorage.setItem(
        "cloudguardSettings",
        JSON.stringify(settings)
    );

    showToast(
        "Settings saved successfully",
        "success"
    );
}


function loadCloudGuardSettings() {

    const data =
        localStorage.getItem(
            "cloudguardSettings"
        );

    if (!data) {
        return {};
    }


    try {

        return JSON.parse(data);

    }

    catch (error) {

        return {};
    }
}


/* =========================================================
   34. RESET SETTINGS
========================================================= */

function resetCloudGuardSettings() {

    confirmAction(
        "Reset all CloudGuard settings?",
        function () {

            localStorage.removeItem(
                "cloudguardSettings"
            );

            localStorage.removeItem(
                "cloudguard_dashboard_refresh"
            );

            localStorage.removeItem(
                "cloudguard_ai_monitoring"
            );

            showToast(
                "Settings reset successfully",
                "success"
            );

            setTimeout(
                function () {

                    location.reload();

                },
                700
            );
        }
    );
}


/* =========================================================
   35. DASHBOARD REFRESH
========================================================= */

function refreshDashboard() {

    showToast(
        "Dashboard refreshed",
        "success"
    );


    const numbers =
        document.querySelectorAll(
            "[data-live-number]"
        );


    numbers.forEach(
        function (element) {

            const current =
                parseInt(
                    element.textContent
                ) || 0;

            const change =
                Math.floor(
                    Math.random() * 5
                ) - 2;

            element.textContent =
                Math.max(
                    0,
                    current + change
                );
        }
    );
}


/* =========================================================
   36. SECURITY SCAN
========================================================= */

function runSecurityScan() {

    showToast(
        "AI security scan started...",
        "warning"
    );


    setTimeout(
        function () {

            showToast(
                "Security scan completed. No critical threats found.",
                "success"
            );

        },
        1800
    );
}


/* =========================================================
   37. GENERATE SECURITY REPORT
========================================================= */

function generateSecurityReport() {

    showToast(
        "Generating security report...",
        "warning"
    );


    setTimeout(
        function () {

            const report =
                `
CLOUDGUARD SECURITY REPORT
===========================

Generated:
${formatDate()} ${formatTime()}

Security Status:
SECURE

AI Risk Score:
27 / 100

Threats Detected:
128

Threats Blocked:
113

Firewall Status:
98%

AI Detection Accuracy:
96.4%

CloudGuard Security Engine:
ONLINE
                `.trim();


            const blob =
                new Blob(
                    [report],
                    {
                        type:
                            "text/plain"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =
                "cloudguard-security-report.txt";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

            URL.revokeObjectURL(
                url
            );


            showToast(
                "Security report downloaded",
                "success"
            );

        },
        1200
    );
}


/* =========================================================
   38. NOTIFICATION CLICK OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const panel =
            document.getElementById(
                "notificationPanel"
            );

        if (!panel) {
            return;
        }


        const clickedInside =
            panel.contains(
                event.target
            );


        const notificationButton =
            event.target.closest(
                "[data-notifications]"
            );


        if (
            !clickedInside &&
            !notificationButton
        ) {

            panel.remove();
        }
    }
);


/* =========================================================
   39. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            updateOnlineStatus();
        }
    }
);


/* =========================================================
   40. INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Login protection */

        checkPageAccess();


        /* Navigation */

        setActiveNavigation();


        /* User */

        loadUserInformation();

        updateAvatars();


        /* UI */

        createMobileMenu();

        setupSearch();

        startCloudGuardClock();

        updateOnlineStatus();


        /* Console */

        console.log(
            "%c CLOUDGUARD SECURITY ",
            "background:#e86f24;color:white;padding:8px;border-radius:6px;font-weight:bold;"
        );

        console.log(
            "AI Security Engine: ONLINE"
        );

        console.log(
            "Version: " +
            CLOUDGUARD.version
        );
    }
);


/* =========================================================
   41. LIVE SECURITY SIMULATION
========================================================= */

setInterval(
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            simulateSecurityActivity();
        }

    },
    10000
);


/* =========================================================
   42. GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.warn(
            "CloudGuard:",
            event.message
        );
    }
);


/* =========================================================
   43. EXPORT GLOBAL FUNCTIONS
========================================================= */

window.CloudGuard = CLOUDGUARD;

window.goTo = goTo;

window.logout = logout;

window.logoutAllSessions =
    logoutAllSessions;

window.showToast = showToast;

window.loginUser = loginUser;

window.openNotifications =
    openNotifications;

window.closeNotifications =
    closeNotifications;

window.togglePassword =
    togglePassword;

window.copyText =
    copyText;

window.runSecurityScan =
    runSecurityScan;

window.generateSecurityReport =
    generateSecurityReport;

window.refreshDashboard =
    refreshDashboard;

window.savePreference =
    savePreference;

window.getPreference =
    getPreference;

window.saveCloudGuardSettings =
    saveCloudGuardSettings;

window.loadCloudGuardSettings =
    loadCloudGuardSettings;

window.resetCloudGuardSettings =
    resetCloudGuardSettings;

window.confirmAction =
    confirmAction;

window.generateID =
    generateID;

window.formatDate =
    formatDate;

window.formatTime =
    formatTime;


/* =========================================================
   END CLOUDGUARD JAVASCRIPT
========================================================= */
```
