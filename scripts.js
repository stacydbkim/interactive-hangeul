// List of Korean consonants and vowels
const koreanCharacters = [
    'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 
    'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'
];

// List of colors to choose from
const colors = ['cyan', 'magenta', 'yellow', 'lime', '#FF8C00'];

// Function to generate a random Korean character
const getRandomCharacter = () => {
    return koreanCharacters[Math.floor(Math.random() * koreanCharacters.length)];
};

// Function to generate a random color
const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

// Throttle settings
let lastDrawTime = 0;
const delay = 0; // Adjust this value to change speed (in milliseconds)

// Default font size
let currentFontSize = 42;

// Event listener for font size slider
const sizeSlider = document.getElementById('size-slider');
sizeSlider.addEventListener('input', (event) => {
    currentFontSize = event.target.value;
});

let isOverSlider = false;

// Detect when the cursor enters or leaves the slider area
sizeSlider.addEventListener('mouseenter', () => {
    isOverSlider = true;
});
sizeSlider.addEventListener('mouseleave', () => {
    isOverSlider = false;
});

// Custom Cursor Movement
const customCursor = document.getElementById('custom-cursor');
let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;

// Smooth Cursor Animation
const animateCursor = () => {
    cursorX += (targetX - cursorX) * 0.1;
    cursorY += (targetY - cursorY) * 0.1;
    customCursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
    requestAnimationFrame(animateCursor);
};
animateCursor();

// Function to create characters at the given coordinates
const createCharacter = (x, y) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastDrawTime > delay) {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');
        characterElement.innerText = getRandomCharacter();
        characterElement.style.color = getRandomColor();
        characterElement.style.left = `${x}px`;
        characterElement.style.top = `${y}px`;
        characterElement.style.fontSize = `${currentFontSize}px`;
        characterElement.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.getElementById('trail-container').appendChild(characterElement);

        lastDrawTime = currentTime;

        // Continuous Animation: Gentle floating effect
        setInterval(() => {
            characterElement.style.transform = `rotate(${Math.random() * 360}deg) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
        }, 1000);
    }
};

// Mouse Move Event (Desktop)
document.addEventListener('mousemove', (event) => {
    if (isOverSlider) return;
    targetX = event.pageX;
    targetY = event.pageY;
    createCharacter(event.pageX, event.pageY);
});

// Touch Events (Mobile)
document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    targetX = touch.pageX;
    targetY = touch.pageY;
    createCharacter(touch.pageX, touch.pageY);
});
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    targetX = touch.pageX;
    targetY = touch.pageY;
    createCharacter(touch.pageX, touch.pageY);
});
document.addEventListener('touchend', () => {
    // Optionally clear cursor or add end-of-touch animation
});

// Clear canvas when the red button is clicked
const clearButton = document.getElementById('clear-canvas');
clearButton.addEventListener('click', () => {
    const trailContainer = document.getElementById('trail-container');
    trailContainer.innerHTML = ''; // Clear all characters
});
