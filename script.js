const wordDisplay = document.getElementById('word-display');
const wrongLettersEl = document.getElementById('wrong-letters');
const keyboardEl = document.getElementById('keyboard');
const finalMessage = document.getElementById('final-message');
const correctWordEl = document.getElementById('correct-word');
const popupContainer = document.getElementById('popup-container');
const playAgainBtn = document.getElementById('play-again');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['SEMANGKA', 'KOMPUTER', 'NANAS', 'KIJANG', 'KOMODO', 'FILM', 'SINGKONG', 'KUDANIL', 'HARIMAU', 'TV', 'LAPANGAN'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Buat keyboard virtual
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('keyboard-btn');
    button.innerText = letter;
    button.addEventListener('click', () => handleGuess(letter));
    keyboardEl.appendChild(button);
});

// Tampilkan kata tersembunyi
function displayWord() {
    wordDisplay.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
            .join('')
        }
    `;

    const innerWord = wordDisplay.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Selamat, kamu menang! 🎉';
        correctWordEl.innerText = '';
        popupContainer.style.display = 'flex';
    }
}

// Perbarui tebakan salah
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `Tebakan salah: ${wrongLetters.length > 0 ? wrongLetters.join(', ') : ''}`;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Sayang sekali, kamu kalah. 😔';
        correctWordEl.innerText = `Kata yang benar adalah: ${selectedWord}`;
        popupContainer.style.display = 'flex';
    }
}

// Tangani tebakan pemain
function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLettersEl();
        }
    }
    // Nonaktifkan tombol yang sudah ditekan
    const btn = document.querySelector(`.keyboard-btn[data-letter="${letter}"]`);
    if (btn) {
        btn.disabled = true;
    }
}

// Tambahkan event listener untuk tombol keyboard
document.addEventListener('keydown', e => {
    const letter = e.key.toUpperCase();
    if (alphabet.includes(letter)) {
        handleGuess(letter);
    }
});

// Tambahkan event listener untuk tombol virtual
keyboardEl.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const letter = e.target.innerText;
        handleGuess(letter);
        e.target.disabled = true;
    }
});

// Reset game
function initGame() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popupContainer.style.display = 'none';

    // Aktifkan kembali semua tombol keyboard
    document.querySelectorAll('.keyboard-btn').forEach(btn => btn.disabled = false);
}

// Tombol main lagi
playAgainBtn.addEventListener('click', initGame);

// Inisialisasi game pertama kali
initGame();