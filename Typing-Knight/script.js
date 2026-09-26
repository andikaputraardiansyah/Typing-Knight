// =====================================
// DATA GAME
// =====================================

let level = 1;

let score = 0;

let time = 10;

let wordCount = 0;

let playerHP = 100;

let monsterHP = 100;

let currentWord = "";

let gameRunning = false;

let timer;


// =====================================
// DAFTAR KATA
// =====================================

const words = [

    // Level awal
    "pedang",
    "ksatria",
    "monster",
    "naga",
    "kastil",
    "perisai",
    "panah",

    // Level menengah
    "pahlawan",
    "serangan",
    "pertahanan",
    "kerajaan",
    "pertempuran",
    "keberanian",
    "kekuatan",

    // Level tinggi
    "petualangan",
    "kemenangan",
    "pengorbanan",
    "pertempuran",
    "kesatria",
    "keajaiban",
    "kegelapan",

    // Level sulit
    "penyelamatan",
    "penghancuran",
    "perlawanan",
    "kepahlawanan",
    "pertarungan",
    "pengkhianatan",
    "kemenangan"
];


// =====================================
// AMBIL ELEMENT HTML
// =====================================

const levelElement =
    document.getElementById("level");

const scoreElement =
    document.getElementById("score");

const timeElement =
    document.getElementById("time");

const wordCountElement =
    document.getElementById("wordCount");

const wordElement =
    document.getElementById("word");

const typingInput =
    document.getElementById("typingInput");

const startButton =
    document.getElementById("startButton");

const messageElement =
    document.getElementById("message");

const playerHealth =
    document.getElementById("playerHealth");

const monsterHealth =
    document.getElementById("monsterHealth");

const playerHealthText =
    document.getElementById(
        "playerHealthText"
    );

const monsterHealthText =
    document.getElementById(
        "monsterHealthText"
    );


// =====================================
// UPDATE TAMPILAN
// =====================================

function updateDisplay() {

    levelElement.textContent =
        level;

    scoreElement.textContent =
        score;

    timeElement.textContent =
        time;

    wordCountElement.textContent =
        wordCount;


    playerHealth.style.width =
        playerHP + "%";

    monsterHealth.style.width =
        monsterHP + "%";


    playerHealthText.textContent =
        "HP: " +
        playerHP +
        " / 100";


    monsterHealthText.textContent =
        "HP: " +
        monsterHP +
        " / 100";
}


// =====================================
// MEMILIH KATA
// =====================================

function generateWord() {

    let availableWords = [];


    // Semakin tinggi level,
    // semakin panjang kata

    if (level <= 2) {

        availableWords =
            words.filter(
                function(word) {
                    return word.length <= 8;
                }
            );

    } else if (level <= 4) {

        availableWords =
            words.filter(
                function(word) {
                    return (
                        word.length >= 8 &&
                        word.length <= 12
                    );
                }
            );

    } else {

        availableWords =
            words.filter(
                function(word) {
                    return word.length >= 10;
                }
            );
    }


    // Jika tidak ada kata
    // gunakan semua kata

    if (availableWords.length === 0) {

        availableWords = words;
    }


    // Pilih kata secara random

    const randomIndex =
        Math.floor(
            Math.random() *
            availableWords.length
        );


    currentWord =
        availableWords[randomIndex];


    wordElement.textContent =
        currentWord;


    // Kosongkan input

    typingInput.value = "";


    typingInput.focus();
}


// =====================================
// MULAI GAME
// =====================================

function startGame() {

    // Reset game

    level = 1;

    score = 0;

    time = 10;

    wordCount = 0;

    playerHP = 100;

    monsterHP = 100;

    gameRunning = true;


    // Aktifkan input

    typingInput.disabled = false;


    // Disable tombol mulai

    startButton.disabled = true;

    startButton.textContent =
        "⚔️ SEDANG BERTARUNG";


    messageElement.textContent =
        "⚔️ Pertarungan dimulai!";


    // Buat kata

    generateWord();


    // Update tampilan

    updateDisplay();


    // Hapus timer sebelumnya

    clearInterval(timer);


    // Timer berjalan setiap 1 detik

    timer = setInterval(
        gameTimer,
        1000
    );
}


// =====================================
// TIMER
// =====================================

function gameTimer() {

    if (!gameRunning) {

        return;
    }


    time--;


    updateDisplay();


    // Waktu habis

    if (time <= 0) {

        monsterAttack();
    }
}


// =====================================
// MONSTER MENYERANG
// =====================================

function monsterAttack() {

    // Monster memberikan damage

    const damage =
        20 + level * 2;


    playerHP -= damage;


    // Pastikan tidak kurang dari 0

    if (playerHP < 0) {

        playerHP = 0;
    }


    messageElement.textContent =
        "💥 Waktu habis! Monster menyerang dan memberikan " +
        damage +
        " damage!";


    // Reset waktu

    time =
        Math.max(
            5,
            10 - level
        );


    updateDisplay();


    // Cek apakah pemain kalah

    if (playerHP <= 0) {

        gameOver();

        return;
    }


    // Kata baru

    generateWord();
}


// =====================================
// KETIKA PLAYER MENGETIK
// =====================================

typingInput.addEventListener(
    "input",
    function() {

        if (!gameRunning) {

            return;
        }


        const typedWord =
            typingInput.value
                .trim()
                .toLowerCase();


        const targetWord =
            currentWord
                .toLowerCase();


        // Jika kata benar

        if (
            typedWord ===
            targetWord
        ) {

            playerAttack();
        }

    }
);


// =====================================
// PLAYER MENYERANG
// =====================================

function playerAttack() {

    // Damage berdasarkan level

    const damage =
        15 + level * 3;


    monsterHP -= damage;


    // Tambah skor

    score +=
        10 * level;


    wordCount++;


    messageElement.textContent =
        "⚔️ Serangan berhasil! " +
        damage +
        " damage diberikan!";


    // Reset waktu sedikit

    time =
        Math.max(
            time,
            5
        );


    // Monster kalah

    if (monsterHP <= 0) {

        monsterDefeated();

        return;
    }


    // Kata baru

    generateWord();


    updateDisplay();
}


// =====================================
// MONSTER KALAH
// =====================================

function monsterDefeated() {

    score += 50;


    messageElement.textContent =
        "🏆 Monster dikalahkan! " +
        "Kamu naik level!";


    // Naik level

    level++;


    // Reset HP monster

    monsterHP = 100;


    // Waktu semakin sedikit

    time =
        Math.max(
            5,
            10 - level + 1
        );


    updateDisplay();


    // Kata baru

    generateWord();
}


// =====================================
// GAME OVER
// =====================================

function gameOver() {

    gameRunning = false;


    clearInterval(timer);


    typingInput.disabled = true;


    startButton.disabled = false;


    startButton.textContent =
        "🔄 MAIN LAGI";


    wordElement.textContent =
        "GAME OVER";


    messageElement.textContent =
        "☠️ Ksatria kalah! Skor akhir: " +
        score;


    updateDisplay();
}


// =====================================
// TAMPILAN AWAL
// =====================================

updateDisplay();