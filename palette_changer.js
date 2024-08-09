const colorPalettes = [
    { colora: "#E5FFFE", colorb: "#333319" },
    { colora: "#00eb60", colorb: "#24332e" },
    { colora: "#fdca54", colorb: "#402a1f" },
    { colora: "#8ad6de", colorb: "#40318e" },
    { colora: "#ebe5cd", colorb: "#2e2e36" },
    { colora: "#FFFFFF", colorb: "#000000" },
];

function getCurrentPaletteIndex() {
    // Retrieve the current palette index from localStorage, default to 0 if not set
    return parseInt(localStorage.getItem('currentPaletteIndex')) || 0;
}

function saveCurrentPaletteIndex(index) {
    // Save the current palette index to localStorage
    localStorage.setItem('currentPaletteIndex', index);
}

function applyColorPalette(index) {
    // Apply the colors from the palette at the specified index
    const palette = colorPalettes[index];
    document.documentElement.style.setProperty('--colora', palette.colora);
    document.documentElement.style.setProperty('--colorb', palette.colorb);
}

function colorChange() {
    // Get the current palette index
    let currentPaletteIndex = getCurrentPaletteIndex();
    
    // Increment the index and wrap around using modulo operator
    currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
    
    // Apply the new palette
    applyColorPalette(currentPaletteIndex);
    
    // Save the new index
    saveCurrentPaletteIndex(currentPaletteIndex);
}

// On page load, apply the last used palette
window.addEventListener('load', () => {
    const currentPaletteIndex = getCurrentPaletteIndex();
    applyColorPalette(currentPaletteIndex);
});

// Add event listener to the "Colors!" link
document.getElementById('colors').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default link behavior
    colorChange();       // Change the color palette
});