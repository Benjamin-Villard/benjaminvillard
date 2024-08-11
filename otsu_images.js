// Get the processed canvas
const processedCanvas = document.getElementById('processed-canvas');
// Get the original image element
const originalImage = document.getElementById('original-image');

// Create a new canvas element to render the original image
const originalCanvas = document.createElement('canvas');
originalCanvas.width = originalImage.naturalWidth;
originalCanvas.height = originalImage.naturalHeight;

// Get the context of the original canvas
const ctx = originalCanvas.getContext('2d');

// Draw the original image onto the original canvas
ctx.drawImage(originalImage, 0, 0);

// Load the original image into the processed canvas
const grayScaleDatas = processedCanvas(ctx.getImageData(0, 0, originalCanvas.width, originalCanvas.height).data);
for (let i = 0; i < grayScaleData.length; i += 4) {
    const grayValue = (grayScaleData[i] + grayScaleData[i + 1] + grayScaleData[i + 2]) / 3;
    grayScaleData[i] = grayValue;
    grayScaleData[i + 1] = grayValue;
    grayScaleData[i + 2] = grayValue;
}

// Perform Otsu thresholding to find the optimal threshold value
let threshold = otsuThreshold(grayScaleData);

// Convert the thresholded image to a 2-bit representation (replace white pixels with --colora and black pixels
with (--colorb)
for (let i = 0; i < grayScaleData.length; i += 4) {
    if (grayScaleData[i] > threshold * 255) {
        ctx.fillStyle = '--colora';
    } else {
        ctx.fillStyle = '--colorb';
    }
    ctx.fillRect(i / 4 % originalCanvas.width, Math.floor(i / 4 / originalCanvas.width), 1, 1);
}

// Update the processed canvas with the processed image
ctx.putImageData(ctx.getImageData(0, 0, originalCanvas.width, originalCanvas.height), 0, 0);

// Replace the original image with the processed image
processedCanvas.parentNode.replaceChild(originalCanvas, originalImage);

// Add an event listener for hover events on the processed canvas
processedCanvas.addEventListener('hover', function() {
    // Load the original image into a new canvas element
    const originalHoverCanvas = document.createElement('canvas');
    originalHoverCanvas.width = originalCanvas.width;
    originalHoverCanvas.height = originalCanvas.height;

    // Get the context of the original hover canvas
    const ctx = originalHoverCanvas.getContext('2d');

    // Draw the original image onto the original hover canvas
    ctx.drawImage(originalImage, 0, 0);

    // Replace the processed canvas with the original hover canvas
    processedCanvas.parentNode.replaceChild(originalHoverCanvas, processedCanvas);
});