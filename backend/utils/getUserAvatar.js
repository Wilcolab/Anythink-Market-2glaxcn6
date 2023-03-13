const { createCanvas } = require('canvas') 

function getUserAvatar(user) {
    const canvas = createCanvas(200,200);
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).to_String(16)}`;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(user.username.substring(0,2).toUpperCase(), canvas.width/2, canvas.height/2);

    return canvas.toDataURL();
}

module.exports = getUserAvatar;