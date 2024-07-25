// A utility function to generate a random password
const generatePassword = ({ upperCase, lowerCase, numbers, symbols, length }) => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = '';
    if (upperCase) characters += upperCaseChars;
    if (lowerCase) characters += lowerCaseChars;
    if (numbers) characters += numberChars;
    if (symbols) characters += symbolChars;

    if (characters.length === 0) {
        throw new Error('At least one character type must be selected.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
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

