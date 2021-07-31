window.onload = function () {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Timing and frames per second
    var lastframe = 0;

    var initialized = false;

    // Level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
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
        images = loadImages(["agent_left.svg", "here_black.png", "agent_right.svg"]);

        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        var imageindex = 1

        normal_scale = 200;
        black = new Entity(images[1], 0, 0, normal_scale, normal_scale, 0, 0, 0);
        black.x = level.width / 2 - black.width / 2
        black.y = level.height / 2 - black.height / 2
        entities.push(black);

        // Create random entities
        for (var i = 0; i < 11; i++) {
            var scale = 200;
            var xdir = 1 - 2 * randRange(0, 1);
            var ydir = 1 - 2 * randRange(0, 1);

            if (xdir < 0) {
                imageindex = 0
            } else {
                imageindex = 2
            }
            var entity = new Entity(images[imageindex], 0, 0, scale, scale, xdir, ydir, randRange(100, 400));

            // Set a random position
            entity.x = randRange(0, level.width - entity.width);
            entity.y = randRange(0, level.height - entity.height);

            // Add to the entities array
            entities.push(entity);
        }

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

        // Update entities
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];

            // Move the entity, time-based
            entity.x += dt * entity.speed * entity.xdir;
            entity.y += dt * entity.speed * entity.ydir;

            // Handle left and right collisions with the level
            if (entity.x <= level.x) {
                // Left edge
                entity.xdir = 1;
                entity.x = level.x;
            } else if (entity.x + entity.width >= level.x + level.width) {
                // Right edge
                entity.xdir = -1;
                entity.x = level.x + level.width - entity.width;
            }

            // Handle top and bottom collisions with the level
            if (entity.y <= level.y) {
                // Top edge
                entity.ydir = 1;
                entity.y = level.y;
            } else if (entity.y + entity.height >= level.y + level.height) {
                // Bottom edge
                entity.ydir = -1;
                entity.y = level.y + level.height - entity.height;
            }
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

    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }

    // Call init to start the game
    init();
};