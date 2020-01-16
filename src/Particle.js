export default class Particle {
    constructor(app, speedMod, id, texture) {
        this.app = app;
        this.speedMod = speedMod;
        this.id = id;
        this.texture = texture;
        
        this.velX = Math.floor(Math.random() * 3) + 1; // 1 to 3;
        this.velX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.velX *= this.speedMod;
        this.velY = Math.floor(Math.random() * 3) + 1; // 1 to 3;
        this.velY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.velY *= this.speedMod;
       
        this.sprite = new PIXI.Sprite(texture);
        this.app.stage.addChild(this.sprite);

        this.sprite.x = Math.floor(Math.random() * window.innerWidth) + 1;
        this.sprite.y = Math.floor(Math.random() * window.innerHeight) + 1;
    }

    makeRandomColor(){
        var c = '';
        while (c.length < 7) {
            c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '0x'+c;
    }

    update () {
        this.sprite.x += this.velX;
        this.sprite.y += this.velY;
        this.checkBounds();
    }

    checkBounds () {
        if (this.sprite.x <= 0) this.velX *= -1;
        if (this.sprite.x >= window.innerWidth - this.sprite.width) this.velX *= -1;
        if (this.sprite.y <= 0) this.velY *= -1;
        if (this.sprite.y >= window.innerHeight - this.sprite.height) this.velY *= -1;
    }
}