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

    function cssColorToRGB(color) {
        if (color.startsWith('#')) {
            let r = parseInt(color.slice(1, 3), 16);
            let g = parseInt(color.slice(3, 5), 16);
            let b = parseInt(color.slice(5, 7), 16);
            return [r, g, b];
        }
        return [0, 0, 0]; // Fallback
    }

    function grayscaleValue(r, g, b) {
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function otsuThreshold(imageData) {
        const data = imageData.data;
        const histogram = Array(256).fill(0);

        // Calculate histogram
        for (let i = 0; i < data.length; i += 4) {
            let gray = grayscaleValue(data[i], data[i + 1], data[i + 2]);
            histogram[Math.floor(gray)]++;
        }

        const totalPixels = imageData.width * imageData.height;
        let sum = 0;
        for (let i = 0; i < 256; i++) {
            sum += i * histogram[i];
        }

        let sumB = 0;
        let wB = 0;
        let wF = 0;
        let maxVariance = 0;
        let threshold = 0;

        for (let t = 0; t < 256; t++) {
            wB += histogram[t];
            if (wB === 0) continue;

            wF = totalPixels - wB;
            if (wF === 0) break;

            sumB += t * histogram[t];

            let mB = sumB / wB;
            let mF = (sum - sumB) / wF;

            let variance = wB * wF * (mB - mF) ** 2;
            if (variance > maxVariance) {
                maxVariance = variance;
                threshold = t;
            }
        }

        console.log('Histogram:', histogram.slice(0, 50)); // Log first 50 values for debugging
        console.log('Sum:', sum); // Debug log
        console.log('SumB:', sumB); // Debug log
        console.log('W_B:', wB); // Debug log
        console.log('W_F:', wF); // Debug log
        console.log('M_B:', wB ? sumB / wB : 0); // Debug log
        console.log('M_F:', wF ? (sum - sumB) / wF : 0); // Debug log
        console.log('Threshold:', threshold); // Debug log

        return threshold;
    }

    function apply2BitEffect() {
        document.querySelectorAll('.image-container').forEach(container => {
            const img = container.querySelector('.fullcolor-img');
            if (!img) return;
    
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            canvas.className = 'canvas';
            container.appendChild(canvas);
    
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
    
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const threshold = otsuThreshold(imageData);
    
                console.log('Image Data:', imageData); // Debug log
                console.log('Threshold:', threshold); // Debug log
    
                const data = imageData.data;
                const colorA = getComputedStyle(document.documentElement).getPropertyValue('--colora').trim();
                const colorB = getComputedStyle(document.documentElement).getPropertyValue('--colorb').trim();
                const rgbColorA = cssColorToRGB(colorA);
                const rgbColorB = cssColorToRGB(colorB);
    
                console.log('Colors Applied:', { rgbColorA, rgbColorB }); // Debug log
    
                for (let i = 0; i < data.length; i += 4) {
                    let gray = grayscaleValue(data[i], data[i + 1], data[i + 2]);
    
                    if (gray >= threshold) {
                        data[i] = rgbColorA[0];
                        data[i + 1] = rgbColorA[1];
                        data[i + 2] = rgbColorA[2];
                    } else {
                        data[i] = rgbColorB[0];
                        data[i + 1] = rgbColorB[1];
                        data[i + 2] = rgbColorB[2];
                    }
                }
    
                ctx.putImageData(imageData, 0, 0);
            };
    
            img.onerror = function() {
                console.error('Error loading image.');
            };
    
            if (img.complete) {
                img.onload(); // Trigger load event if image is already cached
            }
        });
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
