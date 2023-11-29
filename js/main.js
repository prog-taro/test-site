import {Game} from './game.js';

const game = new Game();

// イベントリスナーを設定
window.addEventListener("keydown", (e) => {
    if (game.gameState !== "paused") {
        game.keys[e.key] = true;
    }
    if (e.key === 'f') {
        game.menu.handleFullscreenToggle();
    }
    game.menu.handlePauseKey(e);
    game.menu.handleGameOverKey(e);
    game.menu.handleTitleScreenKey(e);
});

window.addEventListener("keyup", (e) => {
    game.keys[e.key] = false;
    if (e.key === game.keyConfig.shoot) {
        game.player.shotCooldown = 0;
    }
});

// ゲームを開始
game.start();