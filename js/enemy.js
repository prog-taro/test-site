export class Enemy {
    constructor(game) {
        this.game = game;
        this.player = game.player;
        this.enemySize = 30;
        this.enemies = [];
        this.maxEnemyHits = 2;
    }

    createEnemy() {
        const enemy = {
            x: Math.random() * this.game.canvas.width,
            y: 0,
            hits: 0
        };
        this.enemies.push(enemy);
    }

    createEnemyIfNeeded() {
        if (Math.random() < 0.02) {
            this.createEnemy();
        }
    }

    moveEnemies() {
        this.enemies.forEach((enemy) => {
            enemy.y += 3;

            // 敵が画面外に出たら削除
            if (enemy.y > this.game.canvas.height) {
                this.removeEnemy(enemy);
                return;
            }

            // プレイヤーとの衝突判定
            if (
                this.player.playerX - (this.player.playerSize / 2) < enemy.x + (this.enemySize / 2) &&
                this.player.playerX + (this.player.playerSize / 2) > enemy.x - (this.enemySize / 2) &&
                this.player.playerY - (this.player.playerSize / 2) < enemy.y + (this.enemySize / 2) &&
                this.player.playerY + (this.player.playerSize / 2) > enemy.y - (this.enemySize / 2)
            ) {
                // プレイヤーが敵と衝突したらゲームオーバー
                this.game.gameState = "gameover";
            }

            // ショットとの衝突判定
            this.player.bullet.bullets = this.player.bullet.bullets.filter((bullet) => {
                if (
                    bullet.x - (this.player.bullet.bulletSize / 2) < enemy.x + (this.enemySize / 2) &&
                    bullet.x + (this.player.bullet.bulletSize / 2) > enemy.x - (this.enemySize / 2) &&
                    bullet.y - (this.player.bullet.bulletSize / 2) < enemy.y + (this.enemySize / 2) &&
                    bullet.y + (this.player.bullet.bulletSize / 2) > enemy.y - (this.enemySize / 2)
                ) {
                    // 敵が被弾したら被弾回数を増やす
                    enemy.hits++;

                    // ショットが敵に当たったらショットを削除
                    return false;
                }
                return true;
            });

            // 被弾回数が最大に達したら敵を削除
            if (enemy.hits >= this.maxEnemyHits) {
                this.removeEnemy(enemy);
            }
        });
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index !== -1) {
            this.enemies.splice(index, 1);
        }
    }

    // 以下は例として一部を修正した drawEnemies メソッド
    drawEnemies() {
        this.game.ctx.fillStyle = "green";
        this.enemies.forEach((enemy) => {
            this.game.ctx.fillRect(
                enemy.x - this.enemySize / 2,
                enemy.y - this.enemySize / 2,
                this.enemySize,
                this.enemySize
            );
        });
    }
}
