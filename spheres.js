window.onload = function () {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Timing and frames per second
    var lastframe = 0;

    var period_seconds = 20000;
    var t = 0;

    a = 300.0;
    b = 107.0;

    var initialized = false;

    // Level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width,
        height: canvas.height
    };

    // Define an entity class
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
    var entities = [];

    // Images
    var images = [];

    // Image loading global variables
    var loadcount = 0;
    var loadtotal = 0;
    var preloaded = false;

    // Load images
    function loadImages(imagefiles) {
        // Initialize variables
        loadcount = 0;
        loadtotal = imagefiles.length;
        preloaded = false;

        // Load the images
        var loadedimages = [];
        for (var i = 0; i < imagefiles.length; i++) {
            // Create the image object
            var image = new Image();

            // Add onload event handler
            image.onload = function () {
                loadcount++;
                if (loadcount == loadtotal) {
                    // Done loading
                    preloaded = true;
                }
            };

            // Set the source url of the image
            image.src = imagefiles[i];

            // Save to the image array
            loadedimages[i] = image;
        }

        // Return an array of images
        return loadedimages;
    }

    // Initialize the game
    function init() {
        // Load images
        images = loadImages(["agent_left.svg", "agent_right.svg"]);

        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        var scale = 150;
        var selected_image = images[0];

        xdir = 0;
        ydir = 0;
        speed = 0;
        earthling = new Entity(selected_image, 0, 0, 0.7*scale, scale, xdir, ydir, speed);
        earthling.x = level.width / 2 - earthling.width / 2;
        earthling.y = level.height / 2 - earthling.height / 2;
        entities.push(earthling);

        for (var i = 1; i < 8; i++) {
            if (i % 2 === 0) {
                selected_image = images[1];
                xdir = 1;
                ydir = 1;
            } else {
                selected_image = images[0];
                xdir = -1;
                ydir = -1;
            }

            speed = 200 * i;
            agent = new Entity(selected_image, 0, 0, 0.7*scale, scale, xdir, ydir, speed);
            entities.push(agent);
        }

        // Enter main loop
        main(0);
    }

    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);

        if (!initialized) {
            // Preloader

            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the frame
            drawFrame();

            if (preloaded) {
                // Add a delay for demonstration purposes
                setTimeout(function () { initialized = true; }, 100);
            }
        } else {
            // Update and render the game
            update(tframe);
            render();
        }
    }

    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
    
        t = (t + dt);
        tp = t % period_seconds;
        rtp = (period_seconds - t) % period_seconds;

        console.log(t / period_seconds, tp, rtp);

        // Update entities except first one
        for (var i = 1; i < entities.length; i++) {
            var entity = entities[i];

            radius = 15 + 0.15 * i * a;

            if (i % 2 === 0) {
                ttp = tp;
            } else {
                ttp = rtp;
            } 

            entity.x = level.width / 2 - entity.width / 2 + radius * Math.cos(ttp);
            entity.y = level.height / 2 - entity.height / 2 + radius * Math.sin(ttp)
        }
    }

    // Render the game
    function render() {
        // Draw the frame
        drawFrame();

        for (var i = 0; i < entities.length; i++) {
            // Draw the entity
            var entity = entities[i];
            context.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
        }


    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);

    }

    // Mouse event handlers
    function onMouseMove(e) { }
    function onMouseDown(e) { }
    function onMouseUp(e) { }
    function onMouseOut(e) { }

    init();
};