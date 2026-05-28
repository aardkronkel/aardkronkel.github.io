const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

let count = 0;
const WIND_TIME_SCALE = 2.2;
const WIND_FRAME_STEP = 0.04;
const BODY_INSTANCES = [
    { dx: -100, dy: -120, scale: 0.45, direction: 1, timeOffset: 0.0 },
    { dx: 400, dy: 0, scale: 0.55, direction: -1, timeOffset: 0.6 },
    { dx: 230, dy: 170, scale: 0.50, direction: 1, timeOffset: 1.2 },
];

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};
const xcenter = center.x;
const ycenter = center.y;

function toCanvasPoint([dx, dy]) {
    return [center.x + dx, center.y + dy];
}

const pathBodyOffsets = [
    [-240, 20], [-220, -10],
    [-200, -30], [-180, -44],
    [-160, -58], [-140, -72],
    [-120, -84], [-100, -90],
    [-80, -96], [-60, -100],
    [-40, -106], [-20, -110],
    [0, -112], [20, -114],
    [40, -116], [60, -116],
    [80, -114], [100, -112],
    [120, -108], [140, -104],
    [160, -80], [170, -68],
    [176, -34], [170, -6],
    [160, 4], [140, 32],
    [120, 52], [100, 64],
    [80, 74], [60, 94],
    [40, 102], [20, 110],
    [0, 120], [-20, 130],
    [-40, 140], [-60, 148],
    [-80, 154], [-100, 156],
    [-120, 156], [-140, 156],
    [-160, 152], [-180, 146],
    [-200, 136], [-220, 102],
    [-232, 64],
];

const pathBody = pathBodyOffsets.map(toCanvasPoint);

function createHairFromBase(base, phase) {
    const [bx, by] = base;
    const mag = Math.hypot(bx, by) || 1;
    const ux = bx / mag;
    const uy = by / mag;
    const lengths = [24, 48, 72];

    return {
        phase,
        pts: [
            [bx, by],
            [bx + ux * lengths[0], by + uy * lengths[0]],
            [bx + ux * lengths[1], by + uy * lengths[1]],
            [bx + ux * lengths[2], by + uy * lengths[2]],
        ],
    };
}

// Hair roots are taken from body-outline points and extended outward.
const hairBaseIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
const hairs = hairBaseIndices.map((index, i) => createHairFromBase(pathBodyOffsets[index], i * 0.7));

const pathSmileOffsets = [
    [-50, 84], [-40, 88],
    [-30, 90], [-20, 92],
    [-10, 90], [0, 88],
    [10, 82], [20, 74],
    [30, 66], [40, 54],
    [30, 65], [20, 73],
    [10, 81], [0, 87],
    [-10, 89], [-20, 91],
    [-30, 89], [-40, 87],
];

const pathSmile = pathSmileOffsets.map(toCanvasPoint);

function drawPolygon(points, fillStyle, strokeStyle, lineWidth) {
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
    }
    context.closePath();
    context.fillStyle = fillStyle;
    context.fill();
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.stroke();
}

function drawBody() {
    drawPolygon(pathBody, "#000000", "#000000", 2);

    context.fillStyle = "#ffffff";
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.beginPath();
    context.ellipse(xcenter - 124, ycenter + 20, 72, 60, 0, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.beginPath();
    context.ellipse(xcenter + 80, ycenter - 26, 66, 60, 0, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(xcenter - 124, ycenter + 20, 8, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(xcenter + 80, ycenter - 26, 8, 0, Math.PI * 2);
    context.fill();

    drawPolygon(pathSmile, "#ffffff", "#ffffff", 2);
}

function drawHairs(t) {
    hairs.forEach((hair) => {
        const wt = t * WIND_TIME_SCALE;
        const wind = Math.sin(wt + hair.phase) * 22 + Math.sin(wt * 1.7 + hair.phase) * 8;
        const npts = hair.pts.length;

        context.strokeStyle = "#000000";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(xcenter + hair.pts[0][0], ycenter + hair.pts[0][1]);

        for (let i = 1; i < npts; i++) {
            const frac = i / (npts - 1);
            const wx = wind * frac * frac;
            context.lineTo(xcenter + hair.pts[i][0] + wx, ycenter + hair.pts[i][1]);
        }
        context.stroke();

        // context.fillStyle = "#00ff00";
        // hair.pts.forEach((p, i) => {
        //     const frac = i / (npts - 1);
        //     const wx = wind * frac * frac;
        //     context.beginPath();
        //     context.arc(xcenter + p[0] + wx, ycenter + p[1], 4, 0, Math.PI * 2);
        //     context.fill();
        // });
    });
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    BODY_INSTANCES.forEach((instance) => {
        const dir = instance.direction === -1 ? -1 : 1;
        context.save();
        context.translate(instance.dx, instance.dy);
        context.scale(instance.scale * dir, instance.scale);
        drawHairs(count + instance.timeOffset);
        drawBody();
        context.restore();
    });
}

function animate() {
    count += WIND_FRAME_STEP;
    render();
    requestAnimationFrame(animate);
}

animate();