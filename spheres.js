window.onload = function () {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Timing and frames per second
    var lastframe = 0;

    var period_seconds = 20;
    var t = 0;

    a = 300.0;
    b = 107.0;

    var initialized = false;

    // Level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width, //- 2,
        height: canvas.height
    };

    // Define an entity class
    var Entity = function (image, x, y, width, height, xdir, ydir, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xdir = xdir;
        this.ydir = ydir;
        this.speed = speed;
    };

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
        images = loadImages(["sphere_earthling.png", "sphere_skyprobe.png", "sphere_mindprobe.png", "agent_left.svg"]);

        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        var scale = 500;
        xdir = 0;
        ydir = 0;
        speed = 0;
        earthling = new Entity(images[0], 0, 0, 0.7*scale, scale, xdir, ydir, speed);
        earthling.x = level.width / 2 - earthling.width / 2
        earthling.y = level.height / 2 - earthling.height / 2
        entities.push(earthling);

        scale = 500;
        xdir = -1;
        ydir = -1;
        speed = 100;
        skyprobe = new Entity(images[1], 0, 0, 0.7*scale, scale, xdir, ydir, speed);
        entities.push(skyprobe);

        scale = 700;
        xdir = -1;
        ydir = -1;
        speed = 100;
        mindprobe = new Entity(images[2], 0, 0, 0.7*scale, scale, xdir, ydir, speed);
        entities.push(mindprobe);

        scale = 200;
        xdir = 0;
        ydir = 0;
        speed = 0;
        agent = new Entity(images[3], 0, 0, 0.7*scale, scale, xdir, ydir, speed);
        entities.push(agent);

        // Enter main loop
        main(0);
    }

    // Get a random int between low and high, inclusive
    function randRange(low, high) {
        return Math.floor(low + Math.random() * (high - low + 1));
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
                setTimeout(function () { initialized = true; }, 1000);
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

        t = (t + dt)
        tp = t % period_seconds
        rtp = (period_seconds - t) % period_seconds

        // Update entities except first one
        for (var i = 1; i < entities.length; i++) {
            var entity = entities[i];

            if (i == 1) {
                radius = 0.10 * a
                ttp = tp
            } else {
                radius = 0.50 * a
                ttp = rtp
            }

            entity.x = level.width / 2 - entity.width / 2 + radius * Math.cos(ttp)
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

        // Draw title
        // context.fillStyle = "#000000";
        // context.font = "24px monospace";
        // context.fillText("q R here", 10, 30);
    }

    // Mouse event handlers
    function onMouseMove(e) { }
    function onMouseDown(e) { }
    function onMouseUp(e) { }
    function onMouseOut(e) { }

    // Call init to start the game
    init();
};