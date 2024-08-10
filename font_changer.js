const fonts = [
    { fontA: "'Georgia Pro', Georgia, serif", fontB: "'Cascadia Code', sans-serif" },
    { fontA: "'Cascadia Code', sans-serif", fontB: "'Georgia Pro', Georgia, serif" },
];

function getCurrentFontIndex() {
    return parseInt(localStorage.getItem('currentFontIndex')) || 0;
}

function saveCurrentFontIndex(index) {
    localStorage.setItem('currentFontIndex', index);
}

function applyFont(index) {
    const fontPair = fonts[index];
    document.documentElement.style.setProperty('--fonta', fontPair.fontA);
    document.documentElement.style.setProperty('--fontb', fontPair.fontB);
}

function fontChange() {
    let currentFontIndex = getCurrentFontIndex();
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    applyFont(currentFontIndex);
    saveCurrentFontIndex(currentFontIndex);
}

window.addEventListener('load', () => {
    const currentFontIndex = getCurrentFontIndex();
    applyFont(currentFontIndex);
});

document.addEventListener('DOMContentLoaded', () => {
    const changeFontLink = document.getElementById('change-font');
    if (changeFontLink) {
        console.log('Attaching click event listener to "change-font" link'); // Debugging line
        changeFontLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Font change link clicked'); // Debugging line
            fontChange();
        });
    } else {
        console.error('Font change link not found');
    }
});
