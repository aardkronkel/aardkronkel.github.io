const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

let lastframe = 0;
const period_seconds = 20000;
let t = 0;

const a = 300.0;
const b = 107.0;

class Entity {
    constructor(image, x, y, width, height, xdir, ydir, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xdir = xdir;
        this.ydir = ydir;
        this.speed = speed;
    }
}

// Array of entities
let entities = [];

// Images
let images = [];
let loadcount = 0;
let loadtotal = 0;
let preloaded = false;

function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    let loadedimages = [];
    for (var i = 0; i < imagefiles.length; i++) {
        let image = new Image();
        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                // Done loading
                preloaded = true;
            }
        };
        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function init() {
    images = loadImages([
        "../images/agent_left.svg", 
        "../images/lemniscate.png", 
        "../images/agent_right.svg"]);

    let imageindex = 1;

    black = new Entity(images[1], 0, 0, 2 * a, 2 * b, 0, 0, 0);
    black.x = canvas.width / 2 - black.width / 2
    black.y = canvas.height / 2 - black.height / 2
    entities.push(black);

    for (var i = 0; i < 2; i++) {
        const scale = 200;

        if (i == 0) {
            imageindex = 0
            xdir = -1
            ydir = -1
        } else {
            imageindex = 2
            xdir = 1
            ydir = 1
        }
        const entity = new Entity(images[imageindex], 0, 0, 0.7 * scale, scale, xdir, ydir, randRange(100, 400));
        entities.push(entity);
    }

    // Enter main loop
    main(0);
}

// Get a random int between low and high, inclusive
function randRange(low, high) {
    return Math.floor(low + Math.random() * (high - low + 1));
}

function main(tframe) {
    window.requestAnimationFrame(main);

    update(tframe);
    render();
}

function update(tframe) {
    const dt = (tframe - lastframe) / 1000;
    lastframe = tframe;

    t = (t + dt);
    const tp = t % period_seconds;
    const rtp = (period_seconds - t) % period_seconds;

    // Update entities except last one
    for (let i = 1; i < entities.length; i++) {
        let entity = entities[i];

        if (i == 1) {
            ttp = tp;
        } else {
            ttp = rtp;
        }

        // Draw the lemniscate figure https://mathworld.wolfram.com/Lemniscate.html
        entity.x = canvas.width / 2 - entity.width / 2 + a * Math.cos(ttp) / (1.0 + Math.sin(ttp) * Math.sin(ttp))
        entity.y = canvas.height / 2 - entity.height / 2 + a * Math.sin(ttp) * Math.cos(ttp) / (1.0 + Math.sin(ttp) * Math.sin(ttp))
    }
}

function render() {
    drawEmptyFrame();

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        context.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
    }
}

function drawEmptyFrame() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

init();
