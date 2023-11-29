import {Menu} from './menu.js';
import {Player} from './player.js';
import {Enemy} from './enemy.js';
import {Boss} from './boss.js';
import {Background} from './background.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.gameState = "title";
        this.keyConfig = {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight",
            shoot: " "
        };
        this.keys = {};
        this.player = null;
        this.enemy = null;
        this.boss = null; // ボスのインスタンスを保持するプロパティを追加
        this.background = null;
        this.menu = new Menu(this);
    }

    initGame() {
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.boss = new Boss(this);
        this.background = new Background(this);
    }

    gameMain() {
        if (this.gameState !== "playing") {
            return;
        }

        this.player.updateShotCooldown();
        this.player.handlePlayerMovement();
        this.player.handleShoot();
        this.player.bullet.moveBullets();
        this.enemy.createEnemyIfNeeded();
        this.enemy.moveEnemies();
        this.background.movePlanets();

        if (this.boss) {
            this.boss.moveBoss(); // ボスの移動メソッドを呼び出す
            this.boss.bossAttack(); // ボスの攻撃メソッドを呼び出す
        }
    }

    update() {
        this.gameMain();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === "title") {
            this.menu.drawTitleScreen();
        } else if (this.gameState === "playing" || this.gameState === "paused" || this.gameState === "gameover") {

            this.background.drawBackground();
            if (this.gameState !== "gameover") {
                this.player.drawPlayer();
            }
            this.player.bullet.drawBullets();
            this.enemy.drawEnemies();

            if (this.gameState === "paused") {
                this.menu.drawPauseMenu();
            }

            if (this.gameState === "gameover") {
                this.menu.drawGameOverMenu();
            }
        }
        if (this.boss) {
            this.boss.drawBoss(); // ボスの描画メソッドを呼び出す
        }
    }

    gameLoop() {
        this.update(); // ゲームの状態を更新
        this.draw();   // ゲームの描画を行う
        requestAnimationFrame(() => this.gameLoop()); // 次のフレームをリクエストする
    }

    // ゲームを開始するメソッド
    start() {
        this.gameLoop();
    }
}