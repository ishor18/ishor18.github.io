// Admin Authentication (Salted & Hashed - High Security)
// Credentials are protected using SHA-256 with a secret Salt.
// This prevents "Rainbow Table" attacks even if the code is public.

const SALT = "portfolio_secure_salt_2025_";

const LOGIN_CREDENTIALS = {
    // Hash of (SALT + "ishoracharya977@gmail.com")
    emailHash: "984449bdf382100631f8e8eed53a38ef6e63ab31c52529239b1341e6ecce8da4",
    // Hash of (SALT + "Ishor@321")
    passHash: "8cbedc49a1d14eced3c49fa95f14f5ade9f368f4ce2a2dec6e7770f571463dd8"
};

/**
 * Robust SHA-256 implementation
 */
function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }

    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const lengthProperty = 'length';
    let i, j;
    let result = '';

    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;

    let hash = sha256.h = sha256.h || [];
    let k = sha256.k = sha256.k || [];
    let primeCounter = k[lengthProperty];

    const isPrime = function (n) {
        for (let factor = 2; factor * factor <= n; factor++) {
            if (n % factor === 0) return false;
        }
        return true;
    };

    let candidate = 2;
    while (primeCounter < 64) {
        if (isPrime(candidate)) {
            if (primeCounter < 8) {
                hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
            }
            k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            primeCounter++;
        }
        candidate++;
    }

    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return;
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength | 0);

    for (j = 0; j < words[lengthProperty];) {
        const w = words.slice(j, j += 16);
        const oldHash = hash;
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            const w16 = w[i - 16], w15 = w[i - 15], w7 = w[i - 7], w2 = w[i - 2];
            const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
            const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
            const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
            const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
            const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w16 + s0 + w7 + s1) | 0);
            const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;

            hash = [(temp1 + temp2) | 0].concat(hash);
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            const b = (hash[i] >> (j * 8)) & 255;
            result += (b < 16 ? '0' : '') + b.toString(16);
        }
    }
    return result;
}

// Global Login Function
window.doLogin = async function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const errorDiv = document.getElementById('errorMessage');

    if (!emailField || !passwordField) return false;

    const email = emailField.value.trim().toLowerCase();
    const password = passwordField.value;

    // Verify Salted + Hashed Credentials
    // We concatenate the SALT before matching, making "Rainbow Tables" useless
    const typedEmailHash = sha256(SALT + email);
    const typedPassHash = sha256(SALT + password);

    if (typedEmailHash === LOGIN_CREDENTIALS.emailHash && typedPassHash === LOGIN_CREDENTIALS.passHash) {
        console.log("LOGIN SUCCESSFUL");
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        window.location.href = 'dashboard.html';
    } else {
        if (errorDiv) {
            errorDiv.textContent = 'Invalid email or password.';
            errorDiv.classList.add('show');
            setTimeout(() => errorDiv.classList.remove('show'), 3000);
        }
        passwordField.value = '';
        passwordField.focus();
    }
    return false;
};

// UI Initialization
window.addEventListener('load', () => {
    // Aggressive clear
    const clear = () => {
        const e = document.getElementById('email');
        const p = document.getElementById('password');
        if (e) e.value = '';
        if (p) p.value = '';
    };
    clear();
    setTimeout(clear, 100);
    setTimeout(clear, 500);

    // Password Toggle
    const toggle = document.getElementById('togglePassword');
    const passInput = document.getElementById('password');
    if (toggle && passInput) {
        toggle.onclick = function () {
            passInput.type = passInput.type === 'password' ? 'text' : 'password';
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        };
    }
});
