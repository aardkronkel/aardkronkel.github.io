const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const agent_left = document.getElementById('agent_left');
const agent_right = document.getElementById('agent_right');
let image;

const num_agents = 20;
const scale = 0.4;
const width = scale * 160;
const height = scale *119;

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}

class Agent {
	constructor(x, y) {
        const vx = 0;
        const vy = 1;

		this.pos = new Vector(x, y);
		this.vel = new Vector(vx, vy);
	}

    bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= canvas.width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= canvas.height) this.vel.y *= -1;
	}

	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	draw(context) {
        if (this.vel.x < 0) {
            image = agent_left;
        } else {
            image = agent_right;
        }
		context.save();
		context.translate(this.pos.x, this.pos.y);
        context.translate(-0.5*width, -0.5*height);
        context.drawImage(image, 0, 0, width, height);
		context.restore();
	}
}

let agents = [];

function init() {

	for (let i = 0; i < num_agents; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;

		agents.push(new Agent(x, y));
	}
    
    // Enter main loop
    main();
}

function update() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    agents.forEach(agent => {
        agent.update();
        agent.draw(context);
        agent.bounce(canvas.width, canvas.height);
    });
}

// Main loop
function main() {
    // Request animation frames
    window.requestAnimationFrame(main);

    // Update and render the game
    update();
}

init();

