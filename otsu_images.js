// Get the original image
const originalImage = document.getElementById('original-image');

// Create a canvas element to render the processed image
const canvas = document.createElement('canvas');
canvas.width = originalImage.width;
canvas.height = originalImage.height;

// Get the context of the canvas
const ctx = canvas.getContext('2d');

// Load the original image into the canvas
ctx.drawImage(originalImage, 0, 0);

// Convert the image to grayscale (required for Otsu thresholding)
const grayScaleData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
for (let i = 0; i < grayScaleData.length; i += 4) {
    const grayValue = (grayScaleData[i] + grayScaleData[i + 1] + grayScaleData[i + 2]) / 3;
    grayScaleData[i] = grayValue;
    grayScaleData[i + 1] = grayValue;
    grayScaleData[i + 2] = grayValue;
}

// Perform Otsu thresholding to find the optimal threshold value
let threshold = otsuThreshold(grayScaleData);

// Convert the thresholded image to a 2-bit representation (replace white pixels with --colora and black pixels
with --colorb)
for (let i = 0; i < grayScaleData.length; i += 4) {
    if (grayScaleData[i] > threshold * 255) {
        ctx.fillStyle = '--colora';
    } else {
        ctx.fillStyle = '--colorb';
    }
    ctx.fillRect(i / 4 % canvas.width, Math.floor(i / 4 / canvas.width), 1, 1);
}

// Update the canvas with the processed image
ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);

// Replace the original image with the processed image
originalImage.parentNode.replaceChild(canvas, originalImage);

// Get the processed image canvas
const processedCanvas = document.getElementById('processed-canvas');

// Add an event listener for hover events on the canvas
processedCanvas.addEventListener('hover', function() {
    // Load the original image into a new canvas element
    const originalCanvas = document.createElement('canvas');
    originalCanvas.width = processedCanvas.width;
    originalCanvas.height = processedCanvas.height;

    // Get the context of the original canvas
    const ctx = originalCanvas.getContext('2d');

    // Draw the original image on the original canvas
    ctx.drawImage(originalImage, 0, 0);

    // Replace the processed canvas with the original canvas
    processedCanvas.parentNode.replaceChild(originalCanvas, processedCanvas);