const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const agent_left = document.getElementById('agent_left');
const agent_right = document.getElementById('agent_right');

const width = 160;
const height = 119;
const gap = 20;

// Timing and frames per second
let lastframe = 0;
let t = 0;

class Entity {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

// Array of entities
let entities = [];

function init() {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            let x = 130 + (width + gap) * i;
            let y = 130 + (height + gap) * j;

            let show = true;
            let left = true;

            if (Math.random() > 0.5) {
                show = false;
            }

            if (Math.random() > 0.5) {
                left = false;
            }

            if (show) {
                let agent = agent_right;
                if (left) {
                    agent = agent_left;
                } 
                const entity = new Entity(agent, x, y, width, height);
                entities.push(entity);
            }
        }
    }

    // Enter main loop
    main(0);
}

function update(tframe) {
    const dt = (tframe - lastframe) / 1000;
    lastframe = tframe;

    t = (t + dt);

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];

        entity.x = entity.x;
        entity.y = entity.y;
    }
}

function drawEmptyFrame() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function render() {
    drawEmptyFrame();

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        context.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
    }
}

// Main loop
function main(tframe) {
    // Request animation frames
    window.requestAnimationFrame(main);

    // Update and render the game
    update(tframe);
    render();
}

init();

