// A utility function to generate a random password
const generatePassword = ({ upperCase, lowerCase, numbers, symbols, length }) => {
    const charSets = {
        upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowerCase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>?',
    };

    let allowed = '';
    const requiredChars = [];

    if (upperCase) {
        allowed += charSets.upperCase;
        requiredChars.push(randomCharSecure(charSets.upperCase));
    }
    if (lowerCase) {
        allowed += charSets.lowerCase;
        requiredChars.push(randomCharSecure(charSets.lowerCase));
    }
    if (numbers) {
        allowed += charSets.numbers;
        requiredChars.push(randomCharSecure(charSets.numbers));
    }
    if (symbols) {
        allowed += charSets.symbols;
        requiredChars.push(randomCharSecure(charSets.symbols));
    }

    if (allowed.length === 0) {
        throw new Error('At least one character type must be selected.');
    }

    const remainingLength = length - requiredChars.length;
    const password = [...requiredChars];

    for (let i = 0; i < remainingLength; i++) {
        password.push(randomCharSecure(allowed));
    }

    return shuffle(password).join('');
}

function randomCharSecure(charset) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return charset[array[0] % charset.length];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// utility function to copy password to clipboard
const copyPasswordToClipboard = (password) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(password);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Failed to copy password to clipboard", err);
        }
        textArea.remove();
    }
};

export {
    generatePassword,
    copyPasswordToClipboard
};

