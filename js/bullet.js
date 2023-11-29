export class Bullet {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.bulletSize = 10;
        this.bullets = [];
    }

    createBullet() {
        this.bullets.push({ x: this.player.playerX, y: this.player.playerY });
    }

    moveBullets() {
        this.bullets = this.bullets.filter((bullet) => {
            bullet.y -= 10;
            return bullet.y > 0;
        });
    }

    drawBullets() {
        // ショットを描画
        this.game.ctx.fillStyle = "red";
        this.bullets.forEach((bullet) => {
            this.game.ctx.fillRect(bullet.x - (this.bulletSize / 2), bullet.y - (this.bulletSize / 2), this.bulletSize, this.bulletSize);
        });
    }
}