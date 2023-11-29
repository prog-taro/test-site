export class Background {
    constructor(game) {
        this.game = game;
        this.planets = [];
        for (let size = 0.1 + (1.5 * Math.random()); size>0.1; size *= Math.random()) {
            const lightGapYMin = size * 50 * (Math.random() - 0.5);
            const lightGapYMax = size * 50 * (Math.random() - 0.5);
            this.planets.push({
                x: this.game.canvas.width * (1 + size) * (Math.random() - (size/2)),
                y: this.game.canvas.height * (1 + size) * (Math.random() - (size/2)),
                ySpeed: Math.random(),
                sizeSeed: size,
                size: this.game.canvas.height * size,
                lightGapX: size * 50 * (Math.random() - 0.5),
                lightGapYMin: lightGapYMin,
                lightGapYRange: lightGapYMax - lightGapYMin
            });
        }
    }

    drawBackground() {
        // 宇宙の背景を描画（グラデーション）
        const gradient = this.game.ctx.createLinearGradient(0, 0, 0, this.game.canvas.height);
        gradient.addColorStop(0, "#021329"); // 暗い色
        gradient.addColorStop(1, "#0F4C75"); // 明るい色
        this.game.ctx.fillStyle = gradient;
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // 惑星を描画
        this.drawPlanets();

        // 星を描画
        this.drawStars(30);

        // 遠くの星を描画（動きを演出）
        this.game.ctx.fillStyle = "white";
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.game.canvas.width;
            const y = Math.random() * this.game.canvas.height;
            const size = Math.random() * 3;

            this.game.ctx.fillRect(x, y, size, size);
        }
    }

    // 星を描画する関数
    drawStars(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.game.canvas.width;
            const y = Math.random() * this.game.canvas.height;
            const size = Math.random() * 2;

            this.game.ctx.fillStyle = "white";
            this.game.ctx.fillRect(x, y, size, size);
        }
    }

    movePlanets() {
        this.planets.forEach((planet) => {
            // 惑星の移動
            planet.y += planet.ySpeed;
            if (planet.y > this.game.canvas.height + planet.size) {
                planet.x = this.game.canvas.width * (1 + planet.sizeSeed) * (Math.random() - (planet.sizeSeed/2));
                planet.y = -(this.game.canvas.height + planet.size)
            }

            // 惑星の回転
            planet.lightGapY = planet.lightGapYMin + planet.lightGapYRange * (planet.y + planet.size) / (this.game.canvas.height + planet.size * 2);
        });
    }

    drawPlanets() {
        this.planets.forEach((planet) => {
            // 惑星の描画
            this.drawPlanet(planet.x, planet.y, planet.size, planet.lightGapX, planet.lightGapY);
        })
    }

    drawPlanet(x, y, size, lightGapX, lightGapY) {
        const lightGap = Math.sqrt(Math.pow(lightGapX, 2) + Math.pow(lightGapY, 2));

        // 大気圏を描画
        this.game.ctx.beginPath();
        this.game.ctx.arc(x - lightGapX, y - lightGapY, size + lightGap, 0, 2 * Math.PI);
        const atmosphereGradient = this.game.ctx.createRadialGradient(x - lightGapX, y - lightGapY, size - lightGap, x - lightGapX, y - lightGapY, size + lightGap);
        atmosphereGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        atmosphereGradient.addColorStop(1, "transparent");
        this.game.ctx.fillStyle = atmosphereGradient;
        this.game.ctx.fill();

        // 惑星を描画
        this.game.ctx.beginPath();
        this.game.ctx.arc(x, y, size, 0, 2 * Math.PI);
        const planetGradient = this.game.ctx.createLinearGradient(0, 0, 0, this.game.canvas.height);
        planetGradient.addColorStop(0, "#021329"); // 暗い色
        planetGradient.addColorStop(1, "#0F4C75"); // 明るい色
        this.game.ctx.fillStyle = planetGradient;
        this.game.ctx.fill();

        // 惑星を描画
        this.game.ctx.beginPath();
        this.game.ctx.arc(x, y, size, 0, 2 * Math.PI);
        const planetHighLightGradient = this.game.ctx.createRadialGradient(x + lightGapX, y + lightGapY, size - lightGap, x + lightGapX, y + lightGapY, size + lightGap);
        planetHighLightGradient.addColorStop(0, "transparent"); // 暗い色
        planetHighLightGradient.addColorStop(0.1, "rgba(255, 255, 255, 0.2)"); // 暗い色
        planetHighLightGradient.addColorStop(0.9, "#1abc9c"); // 明るい色
        planetHighLightGradient.addColorStop(1, "white"); // 明るい色
        this.game.ctx.fillStyle = planetHighLightGradient;
        this.game.ctx.shadowColor = "#34495e"; // ドロップシャドウの色
        this.game.ctx.shadowBlur = 20; // ドロップシャドウのぼかし
        this.game.ctx.fill();
        this.game.ctx.shadowColor = "transparent"; // ドロップシャドウをリセット
    }
}