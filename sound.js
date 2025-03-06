let attemptCount = 0; // Track number of failed attempts

document.getElementById("start").addEventListener("click", function () {
    const status = document.querySelector(".status");
    const keyInput = document.getElementById("keyInput");
    const target = document.getElementById("target").value;
    const database = document.getElementById("database").value;

    if (target === "" || database === "") {
        alert("Please enter Target and Database before starting.");
        return;
    }

    if (attemptCount >= 3) { 
        status.innerText = "Access Denied!";
        return;
    }

    status.innerText = "Brute-force attack in progress...";
    keyInput.value = "";

    const fakeKeys = ["U", "L", "B", "Y", "X", "M", "Z", "Q", "R", "A", "D", "E", "K", "P", "T"];
    let i = 0;

    let typingEffect = setInterval(() => {
        keyInput.value += fakeKeys[Math.floor(Math.random() * fakeKeys.length)] + " ";
        i++;

        if (i > 16) {
            clearInterval(typingEffect);
            attemptCount++;

            setTimeout(() => {
                if (attemptCount >= 3) {
                    status.innerText = "Access Denied!";
                } else {
                    status.innerText = "Retry Again!";
                }
            }, 1000);
        }
    }, 200);
});
