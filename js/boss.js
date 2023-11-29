export class Boss {
    constructor(game) {
        this.game = game;
        this.bossSize = 60;
        this.hp = 100; // 例として、ボスのヒットポイントを100としましたが、適切な値に調整してください。
        this.x = game.canvas.width / 2;
        this.y = -this.bossSize; // 画面の上から出現するように設定
        this.bullets = [];
        this.homingBullets = [];
        this.highDurabilityBullets = [];
    }

    // ボスの描画メソッドなどを追加することも考えられます
    createBullet() {
        // 通常の弾を生成
        this.bullets.push({ x: this.x, y: this.y });
    }

    createHomingBullet() {
        // 追尾する弾の生成
        this.homingBullets.push({ x: this.x, y: this.y }); // 耐久力を3と仮定
    }

    createHighDurabilityBullet() {
        // 耐久力の高い弾を生成
        this.highDurabilityBullets.push({ x: this.x, y: this.y, durability: 3 }); // 耐久力を3と仮定
    }

    moveBoss() {
        if (Math.random() < 0.02) {
            this.x += Math.random() * 10 - 5; // X方向のランダムな移動
            this.y += Math.random() * 10 - 5; // Y方向のランダムな移動
        }
    }

    bossAttack() {
        // 弾の発射パターンを変更
        if (Math.random() < 0.01) {
            this.createBullet();
            this.createHomingBullet(); // 追尾する弾の生成
        }

        // 通常の弾を発射
        if (Math.random() < 0.01) {
            this.createBullet();
        }

        // 耐久力の高い弾を発射
        if (Math.random() < 0.005) {
            this.createHighDurabilityBullet();
        }
    
        // 他の攻撃パターンのロジックを追加
    }
    
    drawBoss() {
        // ボスの描画ロジックを実装
        this.game.ctx.fillStyle = "purple";
        this.game.ctx.fillRect(
            this.x - this.bossSize / 2,
            this.y - this.bossSize / 2,
            this.bossSize,
            this.bossSize
        );
    }
}
