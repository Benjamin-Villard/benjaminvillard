const fonts = [
    { fontA: "'Georgia Pro', Georgia, serif", fontB: "'Cascadia Code', sans-serif" },
    { fontA: "'Cascadia Code', sans-serif", fontB: "'Georgia Pro', Georgia, serif" },
];

function getCurrentFontIndex() {
    // Retrieve the current font index from localStorage, default to 0 if not set
    return parseInt(localStorage.getItem('currentFontIndex')) || 0;
}

function saveCurrentFontIndex(index) {
    // Save the current font index to localStorage
    localStorage.setItem('currentFontIndex', index);
}

function applyFont(index) {
    // Apply the fonts from the font pair at the specified index
    const fontPair = fonts[index];
    document.documentElement.style.setProperty('--fonta', fontPair.fontA);
    document.documentElement.style.setProperty('--fontb', fontPair.fontB);
}

function fontChange() {
    // Get the current font index
    let currentFontIndex = getCurrentFontIndex();
    
    // Increment the index and wrap around using modulo operator
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    
    // Apply the new font
    applyFont(currentFontIndex);
    
    // Save the new index
    saveCurrentFontIndex(currentFontIndex);
}

// On page load, apply the last used font
window.addEventListener('load', () => {
    const currentFontIndex = getCurrentFontIndex();
    applyFont(currentFontIndex);
});

// Add event listener to the "Change Font" link
document.getElementById('change-font').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default link behavior
    fontChange();        // Change the font
});