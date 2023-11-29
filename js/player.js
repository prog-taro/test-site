import {Bullet} from './bullet.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.playerSize = 30;
        this.playerX = this.game.canvas.width / 2;
        this.playerY = this.game.canvas.height - 50;
        this.shotCooldown = 0;
        this.bullet = new Bullet(game, this);
    }
    
    updateShotCooldown() {
        this.shotCooldown = Math.max(0, this.shotCooldown - 16);
    }

    handlePlayerMovement() {
        // キーに応じてプレイヤーを移動
        if (this.game.keys[this.game.keyConfig.up] && this.playerY > (this.playerSize / 2)) {
            this.playerY -= 5;
        }
        if (this.game.keys[this.game.keyConfig.down] && this.playerY < this.game.canvas.height - (this.playerSize / 2)) {
            this.playerY += 5;
        }
        if (this.game.keys[this.game.keyConfig.left] && this.playerX > (this.playerSize / 2)) {
            this.playerX -= 5;
        }
        if (this.game.keys[this.game.keyConfig.right] && this.playerX < this.game.canvas.width - (this.playerSize / 2)) {
            this.playerX += 5;
        }
    }
    
    handleShoot() {
        // ショットの連射制御
        if (this.game.keys[this.game.keyConfig.shoot] && this.shotCooldown <= 0) {
            this.bullet.createBullet();
            // 連射クールダウンを設定（1秒間に4発）
            this.shotCooldown = 1000 / 4;
        }
    }
    
    drawPlayer() {
        // プレイヤーを描画
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.fillRect(this.playerX - (this.playerSize / 2), this.playerY - (this.playerSize / 2), this.playerSize, this.playerSize);
    }
}