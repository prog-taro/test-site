export class Menu {
    constructor(game) {
        this.game = game;
        this.titleText = "Shooting Game";
        this.startText = "スペースバー: ゲームスタート";
        this.pauseMenuText = "Esc: ゲームを再開, Backspace: ゲームを終了";
        this.gameOverMenuText = "Esc: ゲームを再開, Backspace: ゲームを終了";
    }

    handleTitleScreenKey(e) {
        if (this.game.gameState === "title") {
            if (e.key === " ") {
                this.game.initGame();
                this.game.gameState = "playing"; // スペースバーでゲームスタート
            }
        }
    }

    drawTitleScreen() {
        // 背景を黒で塗りつぶす
        this.game.ctx.fillStyle = "black";
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    
        // グラデーションを作成
        const gradient = this.game.ctx.createLinearGradient(0, 0, 0, this.game.canvas.height);
        gradient.addColorStop(0, "#ff6f00"); // グラデーションの開始色
        gradient.addColorStop(1, "#0072ff"); // グラデーションの終了色
    
        // グラデーションを背景に設定
        this.game.ctx.fillStyle = gradient;
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    
        // テキストを描画
        this.game.ctx.fillStyle = "white";
        this.game.ctx.font = "bold 60px 'Arial'";
        this.game.ctx.textAlign = "center";
        this.game.ctx.textBaseline = "middle";
    
        // テキストをアニメーションさせる（例: 上下に揺れる）
        const offsetY = 10 * Math.sin(Date.now() * 0.002);
        this.game.ctx.fillText(this.titleText, this.game.canvas.width / 2, this.game.canvas.height / 2 - 20 + offsetY);
    
        // サブタイトルを描画
        this.game.ctx.font = "bold 30px 'Arial'";
        this.game.ctx.fillText(this.startText, this.game.canvas.width / 2, this.game.canvas.height / 2 + 40);
    }

    handlePauseKey(e) {
        if (e.key === "Shift" || e.key === "Escape") {
            this.togglePause();
        } else if (e.key === "Backspace" && this.game.gameState === "paused") {
            // バックスペースキーでゲームを終了する処理を追加
            // 例えば、別の画面に遷移するなどの処理をここに追加する
            this.game.initGame();
            this.game.gameState = "title";
        }
    }

    togglePause() {
        if (this.game.gameState === "playing") {
            this.game.gameState = "paused";
        } else if (this.game.gameState === "paused") {
            this.game.gameState = "playing";
        }
    }

    drawPauseMenu() {
        this.game.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.game.ctx.fillStyle = "white";
        this.game.ctx.font = "20px Arial";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(this.pauseMenuText, this.game.canvas.width / 2, this.game.canvas.height / 2);
    }

    handleGameOverKey(e) {
        if (this.game.gameState === "gameover") {
            if (e.key === "Shift" || e.key === "Escape") {
                this.game.initGame();
                this.game.gameState = "playing";
            } else if (e.key === "Backspace") {
                // バックスペースキーでゲームを終了する処理を追加
                // 例えば、別の画面に遷移するなどの処理をここに追加する
                this.game.initGame();
                this.game.gameState = "title";
            }
        }
    }

    drawGameOverMenu() {
        this.game.ctx.fillStyle = "rgba(126, 0, 0, 0.5)";
        this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.game.ctx.fillStyle = "white";
        this.game.ctx.font = "20px Arial";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(this.gameOverMenuText, this.game.canvas.width / 2, this.game.canvas.height / 2);
    }

    handleFullscreenToggle() {
        const canvas = this.game.canvas;

        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}