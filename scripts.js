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
const delay = 50; // Adjust this value to change speed (in milliseconds)

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

// Real-time Cursor Update for Mouse
document.addEventListener('mousemove', (event) => {
    customCursor.style.transform = `translate3d(${event.pageX - 10}px, ${event.pageY - 10}px, 0)`;
});

// Real-time Cursor Update for Touch
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    customCursor.style.transform = `translate3d(${touch.pageX - 10}px, ${touch.pageY - 10}px, 0)`;
});

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
    }
};

// Mouse Move Event (Desktop)
document.addEventListener('mousemove', (event) => {
    if (isOverSlider) return;
    createCharacter(event.pageX, event.pageY);
});

// Variables to track touch position
let startX = 0;
let startY = 0;
let isDragging = false;
const tapThreshold = 10; // Maximum movement to be considered a tap

// Mobile: Touch Start
document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    isDragging = false; // Reset dragging state
});

// Mobile: Touch Move (for dragging)
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const moveX = touch.pageX;
    const moveY = touch.pageY;

    // Calculate the distance moved
    const distanceX = Math.abs(moveX - startX);
    const distanceY = Math.abs(moveY - startY);

    // If the movement is significant, it's a drag
    if (distanceX > tapThreshold || distanceY > tapThreshold) {
        isDragging = true;
        createCharacter(moveX, moveY);
    }
});

// Mobile: Touch End (to detect tap)
document.addEventListener('touchend', (event) => {
    if (!isDragging) {
        const touch = event.changedTouches[0];
        createHeart(touch.pageX, touch.pageY);
    }
});

// Clear canvas when the red button is clicked
const clearButton = document.getElementById('clear-canvas');
clearButton.addEventListener('click', () => {
    const trailContainer = document.getElementById('trail-container');
    trailContainer.innerHTML = ''; // Clear all characters
});

// Function to create a heart symbol at the given coordinates
const createHeart = (x, y) => {
    const heartElement = document.createElement('div');
    heartElement.classList.add('character');
    heartElement.innerText = '❤️';
    heartElement.style.left = `${x}px`;
    heartElement.style.top = `${y}px`;
    heartElement.style.fontSize = `${currentFontSize}px`;
    heartElement.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.getElementById('trail-container').appendChild(heartElement);

    // Optional: Make the heart float up a little
    setTimeout(() => {
        heartElement.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        heartElement.style.transform += ' translateY(-20px)';
        heartElement.style.opacity = '0.8';
    }, 0);
};

// Desktop: Click to produce a heart
document.addEventListener('click', (event) => {
    createHeart(event.pageX, event.pageY);
});
