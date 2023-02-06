window.onload = function () {

    canvas = document.getElementById("viewport");
  
    const app = new PIXI.Application({
        view: canvas,
        width: 800, height: 800, backgroundColor: 0xffffff, resolution: window.devicePixelRatio || 1,
    });

    // Create a new texture
    const texture_left = PIXI.Texture.from('../images/agent_left.png');
    const texture_right = PIXI.Texture.from('../images/agent_right.png');
    var texture = texture_right;
    const width = 160;
    const height = 119;
    const scale = 0.5;

    const max_speed = 3;
    const max_force = 1.0;
    const num_boids = 9;
    const perception = 200;

    var count = 0;

    // Inspired by:
    // https://betterprogramming.pub/boids-simulating-birds-flock-behavior-in-python-9fff99375118

    class Boid {
    constructor(index, app, texture) {
        this.angle = 0;
        this.x = Math.floor(Math.random() * index * scale * width);
        this.y = Math.floor(Math.random() * index * scale * width * 3);
        this.velocityx = Math.floor(Math.random() * max_speed);
        this.velocityy = Math.floor(Math.random() * max_speed);
        this.accelerationx = 0.0;
        this.accelerationy = 0.0;

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.width = scale * width;
        this.sprite.height = scale * height;

        app.stage.addChild(this.sprite);
    }

    norm(x, y) {
        return Math.sqrt(x*x + y*y);
    }

    // steering = average velocity — this.velocity
    align(flock) {
        var steeringx = 0.0;
        var steeringy = 0.0;
        var total = 0;
        var avg_velocityx = 0.0;
        var avg_velocityy = 0.0;
        for (const boid of flock) {
            const check_norm = this.norm(boid.velocityx - this.velocityx, boid.velocityy - this.velocityy);
            if (check_norm < perception) {
                avg_velocityx += boid.velocityx;
                avg_velocityy += boid.velocityy;
                total += 1;
            }
        }
        if (total > 0) {
            avg_velocityx /= total;
            avg_velocityy /= total;
            const norm_avg_speed = this.norm(avg_velocityx, avg_velocityy);
            avg_velocityx = avg_velocityx * max_speed/norm_avg_speed;
            avg_velocityy = avg_velocityy * max_speed/norm_avg_speed;
        
            steeringx = avg_velocityx - this.velocityx;
            steeringy = avg_velocityy - this.velocityy;
        }
        return [steeringx, steeringy]; 
    }

    // vec_to_com = center_of_mass — this.position
    // steering = vec_to_com — this.velocity
    cohesion(flock) {
        var steeringx = 0.0;
        var steeringy = 0.0;
        return [steeringx, steeringy]; 
    }
    
    // steering =
    separation(flock) {
        var steeringx = 0.0;
        var steeringy = 0.0;
        return [steeringx, steeringy]; 
    }

    apply_behavior(flock) {
        const [steeringx, steeringy] = this.align(flock);
        this.accelerationx += steeringx;
        this.accelerationy += steeringy;

        const [cohesionx, cohesiony] = this.cohesion(flock);
        this.accelerationx += cohesionx;
        this.accelerationy += cohesiony;

        const [separationx, separationy] = this.separation(flock);
        this.accelerationx += separationx;
        this.accelerationy += separationy;

        this.accelerationx += Math.floor(Math.random() * max_speed);
        this.accelerationy += Math.floor(Math.random() * max_speed);
    }
        
    update(delta) {
        this.x += this.velocityx; 
        this.y += this.velocityy; 

        this.velocityx += this.accelerationx; 
        this.velocityy += this.accelerationy;

        const norm_speed = this.norm(this.velocityx, this.velocityy);
        if (norm_speed > max_speed) {
            this.velocityx = this.velocityx * max_speed/norm_speed;
            this.velocityy = this.velocityy * max_speed/norm_speed;
        }

        this.accelerationx = 0.0;
        this.accelerationy = 0.0;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    edges() {
        if (this.x > app.screen.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = app.screen.width;
        }
        if (this.y > app.screen.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = app.screen.width;
        }

        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    }

    const flock = [];
    for (let index = 0; index < num_boids + 1; index++) {
        const boid = new Boid(index, app, texture);
        flock.push(boid)
    }

    app.ticker.add((delta) => {

        count += 0.0001;

        for (const boid of flock) {
            boid.apply_behavior(flock)
            boid.update(count);
            boid.edges();
        }

    });

}