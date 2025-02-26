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



// Function to create a heart symbol at the given coordinates
const createHeart = (x, y) => {
    const heartElement = document.createElement('div');
    heartElement.classList.add('character');
    heartElement.innerText = '❤️';
    heartElement.style.left = `${x}px`;
    heartElement.style.top = `${y}px`;
    heartElement.style.fontSize = `${currentFontSize}px`;
    heartElement.style.transform = `rotate(${Math.random() * 360 - 0}deg)`;
    document.getElementById('trail-container').appendChild(heartElement);

    // Optional: Make the heart float up a little (cute effect)
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

// Mobile: Tap to produce a heart
document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    createHeart(touch.pageX, touch.pageY);
});
