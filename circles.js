
window.onload = function () {

    canvas = document.getElementById("viewport");
  
    const app = new PIXI.Application({
        view: canvas,
        width: 800, height: 800, backgroundColor: 0xffffff, resolution: window.devicePixelRatio || 1,
    });

    // Create a new texture
    const texture_left = PIXI.Texture.from("agent_left.png");
    const texture_right = PIXI.Texture.from("agent_right.png");
    var texture = texture_left;
    const width = 160;
    const height = 119;
    const scale = 0.5;

    class Boid {
    constructor(index, app, texture) {
        this.index = index;
        this.a = 40.0 + 80.0 * index;
        this.b = 2 * this.a;
        this.direction = 1;
        texture = texture_left;
        if (index % 2 == 0) {
            this.direction = -1;
            texture = texture_right;
        }
        this.angle = 0;
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.width = scale * width;
        this.sprite.height = scale * height;

        app.stage.addChild(this.sprite);
    }
        
    update(count) {
        const radius = 100;
        this.x = app.screen.width/2 + this.a * Math.cos(1.0/(this.index + 1) * this.direction * count);
        this.y = app.screen.height/2 + this.b * Math.sin(1.0/(this.index + 1) * this.direction * count);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
    }

    const num_agents = 7;

    const flock = [];
    for (let index = 0; index < num_agents+1; index++) {
        const boid = new Boid(index, app, texture);
        flock.push(boid)
    }

    var count = 0;

    // Listen for animate update
    app.ticker.add((delta) => {

        count += 0.06;
        for (const boid of flock) {
            boid.update(count);
        }

    });

}