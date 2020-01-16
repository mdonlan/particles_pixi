export default class Lines {
    constructor (app, particles) {
        this.app = app;
        this.particles = particles;
        this.line = new PIXI.Graphics();
        this.line.lineStyle(1, 0xffffff, 1);
        this.app.stage.addChild(this.line);

        this.maxLinesPerParticle = 5;

        this.app.ticker.add(() => {this.update();});
    }

    update () {
        this.line.clear();
        this.line.lineStyle(0.2, 0xffffff, 1);

        // for each particle check all other particles and see if we need to draw a line between them
        for (let i = 0; i < this.particles.particles.length; i++) {
            const particle = this.particles.particles[i];
            let linesDrawnForParticle = 0;
            for (let j = 0; j < this.particles.particles.length; j++) {
                if (linesDrawnForParticle >= this.maxLinesPerParticle) {
                    continue;
                }
                const otherParticle = this.particles.particles[j];
                if (particle.id != otherParticle.id && j > i) {
                    let distance = Math.hypot(otherParticle.sprite.x - particle.sprite.x, otherParticle.sprite.y - particle.sprite.y);
                    if (distance < 200) {
                        linesDrawnForParticle++;
                        this.line.moveTo(particle.sprite.x + (particle.sprite.width / 2), particle.sprite.y + (particle.sprite.height / 2));
                        this.line.lineTo(otherParticle.sprite.x + (particle.sprite.width / 2), otherParticle.sprite.y + (particle.sprite.height / 2));
                    }
                }
            }
        }
    } 
}