const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const agent_left = document.getElementById('../images/agent_left');
const agent_right = document.getElementById('../images/agent_right');
let image;

const num_agents = 3;
const imageWidth = 160;
const imageHeight = 119;
const parentIndex = Math.round(num_agents/2);

let connections = Array.from({ length: num_agents }, () => 
  Array.from({ length: num_agents }, () => 0)
);

let connections2 = Array.from({ length: num_agents }, () => 
  Array.from({ length: num_agents }, () => 0)
);

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
	constructor(x, y, scale) {
        const vx = 1; //-1 + Math.random() * 2;
        const vy = -1 + Math.random() * 2;
    
		this.pos = new Vector(x, y);
		this.vel = new Vector(vx, vy);
        this.scale = scale;
	}

    bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
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
        context.translate(-0.5*this.scale*imageWidth, -0.5*this.scale*imageHeight);
        context.drawImage(image, 0, 0, this.scale*imageWidth, this.scale*imageHeight);
		context.restore();
	}
}

let agents = [];
let agents2 = [];

function init() {

	for (let i = 0; i < num_agents; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;

        let scale = 0.6;
        let scale2 = 0.6;
        if (i == parentIndex) {
            scale = 1.0;
        }
        if (i == parentIndex) {
           scale2 = 1.0;
        }

		agents.push(new Agent(x, y, scale));
        agents2.push(new Agent(x, y, scale2));
	}

    for (let i = 0; i < num_agents; i++) {
        for (let j = 0; j < num_agents; j++) {
            if (i ==  parentIndex) {
                connections[i][j] = 1;   
            }
            if (i ==  parentIndex) {
                connections2[i][j] = 1;
            }
        }
        connections[i][i] = 0;
        connections2[i][i] = 0;
    }
    
    // Enter main loop
    main();
}

function update() {
    context.fillStyle = '#f4bfbf';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];

        for (let j = 0; j < agents.length; j++) {
            const other = agents[j];

            const dist = agent.pos.getDistance(other.pos);

            if (connections[i][j] < 1) continue;

            context.strokeStyle = "#9790e7";
            context.setLineDash([]);
            context.lineWidth = 20;
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.bezierCurveTo(agent.pos.x - dist, agent.pos.y + dist, other.pos.x - dist, other.pos.y + dist, other.pos.x, other.pos.y);
            context.moveTo(agent.pos.x, agent.pos.y);
            context.bezierCurveTo(agent.pos.x + dist, agent.pos.y - dist, other.pos.x + dist, other.pos.y - dist, other.pos.x, other.pos.y);
            context.stroke();
            
            context.strokeStyle = "#FFFFFF";
            context.setLineDash([18, 18]);
            context.lineWidth = 20;
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.bezierCurveTo(agent.pos.x - dist, agent.pos.y + dist, other.pos.x - dist, other.pos.y + dist, other.pos.x, other.pos.y);
            context.moveTo(agent.pos.x, agent.pos.y);
            context.bezierCurveTo(agent.pos.x + dist, agent.pos.y - dist, other.pos.x + dist, other.pos.y - dist, other.pos.x, other.pos.y);
            context.stroke();
        }
    }

    for (let i = 0; i < agents2.length; i++) {
        const agent2 = agents2[i];

        for (let j = 0; j < agents2.length; j++) {
            const other2 = agents2[j];

            const dist = agent2.pos.getDistance(other2.pos);

            if (connections2[i][j] < 1) continue;

            context.strokeStyle = "#e25959";
            context.setLineDash([]);
            context.lineWidth = 20;
            context.beginPath();
            context.moveTo(agent2.pos.x, agent2.pos.y);
            context.bezierCurveTo(agent2.pos.x - dist, agent2.pos.y + dist, other2.pos.x - dist, other2.pos.y + dist, other2.pos.x, other2.pos.y);
            context.moveTo(agent2.pos.x, agent2.pos.y);
            context.bezierCurveTo(agent2.pos.x + dist, agent2.pos.y - dist, other2.pos.x + dist, other2.pos.y - dist, other2.pos.x, other2.pos.y);
            context.stroke();
            
            context.strokeStyle = "#FFFFFF";
            context.setLineDash([18, 18]);
            context.lineWidth = 20;
            context.beginPath();
            context.moveTo(agent2.pos.x, agent2.pos.y);
            context.bezierCurveTo(agent2.pos.x - dist, agent2.pos.y + dist, other2.pos.x - dist, other2.pos.y + dist, other2.pos.x, other2.pos.y);
            context.moveTo(agent2.pos.x, agent2.pos.y);
            context.bezierCurveTo(agent2.pos.x + dist, agent2.pos.y - dist, other2.pos.x + dist, other2.pos.y - dist, other2.pos.x, other2.pos.y);
            context.stroke();
        }
    }

    const parentDist = agents[parentIndex].pos.getDistance(agents2[parentIndex].pos);

    context.strokeStyle = "#999999";
    context.setLineDash([]);
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(agents[parentIndex].pos.x, agents[parentIndex].pos.y);
    context.bezierCurveTo(agents[parentIndex].pos.x - parentDist, agents[parentIndex].pos.y + parentDist, agents2[parentIndex].pos.x - parentDist, agents2[parentIndex].pos.y + parentDist, agents2[parentIndex].pos.x, agents2[parentIndex].pos.y);
    context.moveTo(agents[parentIndex].pos.x, agents[parentIndex].pos.y);
    context.bezierCurveTo(agents[parentIndex].pos.x + parentDist, agents[parentIndex].pos.y - parentDist, agents2[parentIndex].pos.x + parentDist, agents2[parentIndex].pos.y - parentDist, agents2[parentIndex].pos.x, agents2[parentIndex].pos.y);
    context.stroke();
    context.strokeStyle = "#FFFFFF";
    context.setLineDash([18, 18]);
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(agents[parentIndex].pos.x, agents[parentIndex].pos.y);
    context.bezierCurveTo(agents[parentIndex].pos.x - parentDist, agents[parentIndex].pos.y + parentDist, agents2[parentIndex].pos.x - parentDist, agents2[parentIndex].pos.y + parentDist, agents2[parentIndex].pos.x, agents2[parentIndex].pos.y);
    context.moveTo(agents[parentIndex].pos.x, agents[parentIndex].pos.y);
    context.bezierCurveTo(agents[parentIndex].pos.x + parentDist, agents[parentIndex].pos.y - parentDist, agents2[parentIndex].pos.x + parentDist, agents2[parentIndex].pos.y - parentDist, agents2[parentIndex].pos.x, agents2[parentIndex].pos.y);
    context.stroke();

    agents.forEach(agent => {
        agent.update();
        agent.draw(context);
        agent.bounce(canvas.width, canvas.height);
    });

    agents2.forEach(agent2 => {
        agent2.update();
        agent2.draw(context);
        agent2.bounce(canvas.width, canvas.height);
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

