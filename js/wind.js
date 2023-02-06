window.onload = function () {

    canvas = document.getElementById("viewport");
  
    const app = new PIXI.Application({
        view: canvas,
        width: 800, height: 800, backgroundColor: 0xffffff, resolution: window.devicePixelRatio || 1,
    });

    var count = 0;

    // Create a new texture
    const texture_left = PIXI.Texture.from("../images/agent_left.png");
    const texture_right = PIXI.Texture.from("../images/agent_right.png");
    var texture = texture_left;
    const width = 160;
    const height = 119;
    const scale = 4;

    const xcenter = app.screen.width/2;
    const ycenter = app.screen.height/2;

    sprite = new PIXI.Sprite(texture);
    sprite.x = xcenter -0.5 * scale * width;
    sprite.y = ycenter -0.5 * scale * height;
    sprite.width = scale * width;
    sprite.height = scale * height;
    app.stage.addChild(sprite);

    var g = new PIXI.Graphics();

    const path_body = [
        xcenter - 240, ycenter +  20,
        xcenter - 220, ycenter -  10,
        xcenter - 200, ycenter -  30,
        xcenter - 180, ycenter -  44,
        xcenter - 160, ycenter -  58,
        xcenter - 140, ycenter -  72,
        xcenter - 120, ycenter -  84,
        xcenter - 100, ycenter -  90,
        xcenter -  80, ycenter -  96,
        xcenter -  60, ycenter - 100,
        xcenter -  40, ycenter - 106,
        xcenter -  20, ycenter - 110,
        xcenter +   0, ycenter - 112,
        xcenter +  20, ycenter - 114,
        xcenter +  40, ycenter - 116,
        xcenter +  60, ycenter - 116,
        xcenter +  80, ycenter - 114,
        xcenter + 100, ycenter - 112,
        xcenter + 120, ycenter - 108,
        xcenter + 140, ycenter - 104,
        xcenter + 160, ycenter -  80,
        xcenter + 170, ycenter -  68,
        xcenter + 176, ycenter -  34,
        xcenter + 170, ycenter -   6,
        xcenter + 160, ycenter +   4,
        xcenter + 140, ycenter +  32,
        xcenter + 120, ycenter +  52,
        xcenter + 100, ycenter +  64,
        xcenter +  80, ycenter +  74,
        xcenter +  60, ycenter +  94,
        xcenter +  40, ycenter + 102,
        xcenter +  20, ycenter + 110,
        xcenter +   0, ycenter + 120,
        xcenter -  20, ycenter + 130,
        xcenter -  40, ycenter + 140,
        xcenter -  60, ycenter + 148,
        xcenter -  80, ycenter + 154,
        xcenter - 100, ycenter + 156,
        xcenter - 120, ycenter + 156,
        xcenter - 140, ycenter + 156,
        xcenter - 160, ycenter + 152,
        xcenter - 180, ycenter + 146,
        xcenter - 200, ycenter + 136,
        xcenter - 220, ycenter + 102,
        xcenter - 232, ycenter + 64,
    ];

    // hair1 
    g.lineStyle(2, 0xFF00FF, 1);
    g.drawCircle(xcenter - 240, ycenter +  20, 4);
    g.drawCircle(xcenter - 260, ycenter +  18, 4);
    g.drawCircle(xcenter - 280, ycenter +  10, 4);
    g.drawCircle(xcenter - 290, ycenter -  40, 4);

    g.lineStyle(4, 0x000000, 2);
    g.moveTo(xcenter - 240, ycenter +  20);
    g.lineTo(xcenter - 260, ycenter +  18);
    g.lineTo(xcenter - 280, ycenter +  10);
    g.lineTo(xcenter - 290, ycenter -  40);

    // hair2
    g.lineStyle(2, 0xFF00FF, 1);
    g.drawCircle(xcenter - 210, ycenter -  20, 4);
    g.drawCircle(xcenter - 240, ycenter -  60, 4);
    g.drawCircle(xcenter - 248, ycenter -  80, 4);
    g.drawCircle(xcenter - 234, ycenter -  120, 4);
    g.drawCircle(xcenter - 226, ycenter -  138, 4);

    g.lineStyle(4, 0x000000, 2);
    g.moveTo(xcenter - 210, ycenter -  20);
    g.lineTo(xcenter - 240, ycenter -  60);
    g.lineTo(xcenter - 248, ycenter -  80);
    g.lineTo(xcenter - 234, ycenter -  120);
    g.lineTo(xcenter - 226, ycenter -  138);

    // body polygon
    g.lineStyle(2, 0x000000, 1);
    g.beginFill(0x000000, 1);
    g.drawPolygon(path_body);
    g.endFill();
   
    // // body top
    g.lineStyle(2, 0xFF0000, 2);
    g.drawCircle(xcenter - 240, ycenter +  20, 4);
    g.drawCircle(xcenter - 220, ycenter -  10, 4);
    g.drawCircle(xcenter - 200, ycenter -  30, 4);
    g.drawCircle(xcenter - 180, ycenter -  44, 4);
    g.drawCircle(xcenter - 160, ycenter -  58, 4);
    g.drawCircle(xcenter - 140, ycenter -  72, 4);
    g.drawCircle(xcenter - 120, ycenter -  84, 4);
    g.drawCircle(xcenter - 100, ycenter -  90, 4);
    g.drawCircle(xcenter -  80, ycenter -  96, 4);
    g.drawCircle(xcenter -  60, ycenter - 100, 4);
    g.drawCircle(xcenter -  40, ycenter - 106, 4);
    g.drawCircle(xcenter -  20, ycenter - 110, 4);
    g.drawCircle(xcenter +   0, ycenter - 112, 4);
    g.drawCircle(xcenter +  20, ycenter - 114, 4);
    g.drawCircle(xcenter +  40, ycenter - 116, 4);
    g.drawCircle(xcenter +  60, ycenter - 116, 4);
    g.drawCircle(xcenter +  80, ycenter - 114, 4);
    g.drawCircle(xcenter + 100, ycenter - 112, 4);
    g.drawCircle(xcenter + 120, ycenter - 108, 4);
    g.drawCircle(xcenter + 140, ycenter - 104, 4);
    g.drawCircle(xcenter + 160, ycenter -  80, 4);
    g.drawCircle(xcenter + 170, ycenter -  68, 4);
    g.drawCircle(xcenter + 176, ycenter -  34, 4);
    // body bottom    
    g.drawCircle(xcenter + 170, ycenter -   6, 4);
    g.drawCircle(xcenter + 160, ycenter +   4, 4);
    g.drawCircle(xcenter + 140, ycenter +  32, 4);
    g.drawCircle(xcenter + 120, ycenter +  52, 4);
    g.drawCircle(xcenter + 100, ycenter +  64, 4);
    g.drawCircle(xcenter +  80, ycenter +  74, 4);
    g.drawCircle(xcenter +  60, ycenter +  94, 4);
    g.drawCircle(xcenter +  40, ycenter + 102, 4);
    g.drawCircle(xcenter +  20, ycenter + 110, 4);
    g.drawCircle(xcenter +   0, ycenter + 120, 4);
    g.drawCircle(xcenter -  20, ycenter + 130, 4);
    g.drawCircle(xcenter -  40, ycenter + 140, 4);
    g.drawCircle(xcenter -  60, ycenter + 148, 4);
    g.drawCircle(xcenter -  80, ycenter + 154, 4);
    g.drawCircle(xcenter - 100, ycenter + 156, 4);
    g.drawCircle(xcenter - 120, ycenter + 156, 4);
    g.drawCircle(xcenter - 140, ycenter + 156, 4);
    g.drawCircle(xcenter - 160, ycenter + 152, 4);
    g.drawCircle(xcenter - 180, ycenter + 146, 4);
    g.drawCircle(xcenter - 200, ycenter + 136, 4);
    g.drawCircle(xcenter - 220, ycenter + 102, 4);
    g.drawCircle(xcenter - 232, ycenter +  64, 4);

    // eyes
    g.lineStyle(2, 0x000000, 2);
    g.beginFill(0xFFFFFF, 1);
    g.drawEllipse(xcenter - 124, ycenter + 20, 72, 60);
    g.drawEllipse(xcenter +  80, ycenter - 26, 66, 60);
    g.endFill();

    g.beginFill(0x000000, 2);
    g.drawCircle(xcenter - 124, ycenter + 20, 8);
    g.drawCircle(xcenter +  80, ycenter - 26, 8);
    g.endFill();

    // smile bottom
    g.lineStyle(2, 0x00FF00, 2);
    g.drawCircle(xcenter - 50, ycenter +  84, 4);
    g.drawCircle(xcenter - 40, ycenter +  88, 4);
    g.drawCircle(xcenter - 30, ycenter +  90, 4);
    g.drawCircle(xcenter - 20, ycenter +  92, 4);
    g.drawCircle(xcenter - 10, ycenter +  90, 4);
    g.drawCircle(xcenter - 0,  ycenter +  88, 4);
    g.drawCircle(xcenter + 10, ycenter +  82, 4);
    g.drawCircle(xcenter + 20, ycenter +  74, 4);
    g.drawCircle(xcenter + 30, ycenter +  66, 4);
    g.drawCircle(xcenter + 40, ycenter +  54, 4);
    // smile top
    g.drawCircle(xcenter + 30, ycenter +  65, 4);
    g.drawCircle(xcenter + 20, ycenter +  73, 4);
    g.drawCircle(xcenter + 10, ycenter +  81, 4);
    g.drawCircle(xcenter - 0,  ycenter +  87, 4);
    g.drawCircle(xcenter - 10, ycenter +  89, 4);
    g.drawCircle(xcenter - 20, ycenter +  91, 4);
    g.drawCircle(xcenter - 30, ycenter +  89, 4);
    g.drawCircle(xcenter - 40, ycenter +  87, 4);
  
    const path_smile = [
        xcenter - 50, ycenter +  84,
        xcenter - 40, ycenter +  88,
        xcenter - 30, ycenter +  90,
        xcenter - 20, ycenter +  92,
        xcenter - 10, ycenter +  90,
        xcenter - 0,  ycenter +  88,
        xcenter + 10, ycenter +  82,
        xcenter + 20, ycenter +  74,
        xcenter + 30, ycenter +  66,
        xcenter + 40, ycenter +  54,
        xcenter + 30, ycenter +  65,
        xcenter + 20, ycenter +  73,
        xcenter + 10, ycenter +  81,
        xcenter - 0,  ycenter +  87,
        xcenter - 10, ycenter +  89,
        xcenter - 20, ycenter +  91,
        xcenter - 30, ycenter +  89,
        xcenter - 40, ycenter +  87
    ];

    g.lineStyle(2, 0xFFFFFF, 1);
    g.beginFill(0xFFFFFF, 1);
    g.drawPolygon(path_smile);
    g.endFill();

    app.stage.addChild(g);

    update = (count) => {
    }

    app.ticker.add((delta) => {

        count += 0.0001;

        update(count);

    });

}