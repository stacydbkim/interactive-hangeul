document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('interactive-area');

    for (let i = 0; i < 100; i++) {
        const character = document.createElement('div');
        character.innerText = '한';
        character.style.position = 'absolute';
        character.style.fontSize = `${Math.random() * 50 + 20}px`;
        character.style.top = `${Math.random() * 100}%`;
        character.style.left = `${Math.random() * 100}%`;
        character.style.opacity = Math.random();
        area.appendChild(character);
    }
});
