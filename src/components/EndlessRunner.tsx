'use client';

import dynamic from 'next/dynamic';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type p5 from 'p5';
import { useRef } from 'react';

// Dynamically import the p5 sketch component to ensure it only runs on the client-side.
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

// Define classes outside the component so they are not recreated on every render
class Player {
  y: number;
  x: number;
  w: number;
  h: number;
  gravity = 0.6;
  lift = -15;
  velocity = 0;

  constructor(private p: p5, private groundY: number) {
    this.y = this.groundY - 50;
    this.x = 64;
    this.w = 50;
    this.h = 50;
  }

  jump = () => {
    if (this.y >= this.groundY - this.h) {
      this.velocity += this.lift;
    }
  };

  hits = (obstacle: Obstacle): boolean => {
    return (
      this.x < obstacle.x + obstacle.w &&
      this.x + this.w > obstacle.x &&
      this.y < obstacle.y + obstacle.h &&
      this.y + this.h > obstacle.y
    );
  };

  update = () => {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= this.groundY - this.h) {
      this.y = this.groundY - this.h;
      this.velocity = 0;
    }
  };

  show = (playerImg: p5.Image) => {
    this.p.image(playerImg, this.x, this.y, this.w, this.h);
  };
}

class Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  speed = 6;
  img: p5.Image;

  constructor(private p: p5, private groundY: number, obstacleImages: p5.Image[]) {
    this.x = this.p.width;
    this.w = 40;
    this.h = 40;
    this.y = this.groundY - this.h;
    this.img = this.p.random(obstacleImages);
  }

  update = () => {
    this.x -= this.speed;
  };

  isOffscreen = (): boolean => {
    return this.x < -this.w;
  };

  show = () => {
    this.p.image(this.img, this.x, this.y, this.w, this.h);
  };
}

export default function EndlessRunner() {
  const gameRef = useRef<{
    player?: Player;
    obstacles: Obstacle[];
    playerImg?: p5.Image;
    obstacleImgs: p5.Image[];
    groundY: number;
    score: number;
    gameOver: boolean;
  }>({ 
    obstacles: [],
    obstacleImgs: [],
    groundY: 200 - 40,
    score: 0,
    gameOver: false,
  });

  const resetGame = (p: p5) => {
    const game = gameRef.current;
    game.groundY = p.height - 40;
    game.player = new Player(p, game.groundY);
    if (game.obstacleImgs.length > 0) {
      game.obstacles = [new Obstacle(p, game.groundY, game.obstacleImgs)];
    }
    game.score = 0;
    game.gameOver = false;
    p.loop();
  };

  const preload = (p: p5) => {
    gameRef.current.playerImg = p.loadImage('/game/momo-walk.gif');
    gameRef.current.obstacleImgs = [
      p.loadImage('/game/rock.png'),
      p.loadImage('/game/spikes.png'),
      p.loadImage('/game/alligator.gif'),
    ];
  };

  const setup = (p: p5, canvasParentRef: Element) => {
    p.createCanvas(p.windowWidth, 200).parent(canvasParentRef);
    resetGame(p);
  };

  const draw = (p: p5) => {
    const game = gameRef.current;
    if (!game.player || !game.playerImg || game.obstacleImgs.length === 0) {
      return;
    }

    p.background(249, 250, 251);
    p.stroke(229, 231, 235);
    p.line(0, game.groundY, p.width, game.groundY);

    if (game.gameOver) {
      p.textAlign(p.CENTER);
      p.textSize(32);
      p.fill(0, 0, 0);
      p.text('GAME OVER', p.width / 2, p.height / 2 - 20);
      p.textSize(16);
      p.text(`Score: ${Math.floor(game.score)}`, p.width / 2, p.height / 2 + 10);
      p.text('Press R to Restart', p.width / 2, p.height / 2 + 40);
      p.noLoop();
      return;
    }

    game.score += p.deltaTime / 1000;
    p.textAlign(p.LEFT);
    p.textSize(16);
    p.fill(0, 0, 0);
    p.text(`Score: ${Math.floor(game.score)}`, 20, 30);

    if (p.frameCount > 0 && p.frameCount % Math.floor(p.random(80, 150)) === 0) {
      game.obstacles.push(new Obstacle(p, game.groundY, game.obstacleImgs));
    }

    for (let i = game.obstacles.length - 1; i >= 0; i--) {
      const obstacle = game.obstacles[i];
      obstacle.update();
      obstacle.show();
      if (game.player.hits(obstacle)) {
        game.gameOver = true;
      }
      if (obstacle.isOffscreen()) {
        game.obstacles.splice(i, 1);
      }
    }

    game.player.update();
    game.player.show(game.playerImg);
  };

  const keyPressed = (p: p5) => {
    if (p.key === ' ' || p.key === 'ArrowUp') {
      gameRef.current.player?.jump();
    }
    if (gameRef.current.gameOver && p.key.toLowerCase() === 'r') {
      resetGame(p);
    }
  };

  const windowResized = (p: p5) => {
    p.resizeCanvas(p.windowWidth, 200);
    gameRef.current.groundY = p.height - 40;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-50/75 backdrop-blur-sm">
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        keyPressed={keyPressed}
        windowResized={windowResized}
      />
    </div>
  );
}
