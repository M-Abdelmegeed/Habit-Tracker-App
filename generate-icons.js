const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const scale = size / 512;

  // Background with rounded corners
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, 50 * scale);
  ctx.fill();

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#14b8a6');
  gradient.addColorStop(1, '#0891b2');

  // Circle
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 24 * scale;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 180 * scale, 0, Math.PI * 2);
  ctx.stroke();

  // Checkmark
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 32 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(180 * scale, 260 * scale);
  ctx.lineTo(230 * scale, 310 * scale);
  ctx.lineTo(340 * scale, 200 * scale);
  ctx.stroke();

  return canvas.toBuffer('image/png');
}

// Generate icons
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
  const buffer = createIcon(size);
  fs.writeFileSync(`public/icons/icon-${size}x${size}.png`, buffer);
  console.log(`Created icon-${size}x${size}.png`);
});

console.log('All icons generated!');
