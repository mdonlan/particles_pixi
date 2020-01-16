import Particle from './Particle';

export default class Particles {
    constructor(app) {
        this.app = app;

        this.app.ticker.add(() => {this.update();});

        this.particles = [];
        this.speedMod = 0.5;

        this.createParticles();
    }

    createParticles () {

        // create particle graphic and turn it into a texture
        const circle  = new PIXI.Graphics();
        circle.beginFill("0xffffff");
        circle.lineStyle(0);
        circle.drawCircle(100, 100, 3);
        circle.endFill();
        const texture = circle.generateCanvasTexture();

        for (let i = 0; i < 200; i++) {
            let particle = new Particle(this.app, this.speedMod, i, texture);
            this.particles.push(particle);
        }
    }

    update () {
        this.particles.forEach((particle) => {
            particle.update();
        });
    }
}