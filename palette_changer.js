document.addEventListener("DOMContentLoaded", function() {
    const colorPalettes = [
        { colora: "#E5FFFE", colorb: "#333319" },
        { colora: "#00eb60", colorb: "#24332e" },
        { colora: "#fdca54", colorb: "#402a1f" },
        { colora: "#8ad6de", colorb: "#40318e" },
        { colora: "#ebe5cd", colorb: "#2e2e36" },
        { colora: "#FFFFFF", colorb: "#000000" },
    ];

    function getCurrentPaletteIndex() {
        return parseInt(localStorage.getItem('currentPaletteIndex')) || 0;
    }

    function saveCurrentPaletteIndex(index) {
        localStorage.setItem('currentPaletteIndex', index);
    }

    function applyColorPalette(index) {
        const palette = colorPalettes[index];
        document.documentElement.style.setProperty('--colora', palette.colora);
        document.documentElement.style.setProperty('--colorb', palette.colorb);
    }

    function colorChange() {
        let currentPaletteIndex = getCurrentPaletteIndex();
        currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
        applyColorPalette(currentPaletteIndex);
        saveCurrentPaletteIndex(currentPaletteIndex);
        apply2BitEffect(); // Reapply the effect after changing palette
    }


    document.getElementById('colors').addEventListener('click', (e) => {
        e.preventDefault();
        colorChange();
    });

    window.addEventListener('load', () => {
        const currentPaletteIndex = getCurrentPaletteIndex();
        applyColorPalette(currentPaletteIndex);
        apply2BitEffect();
    });
});
