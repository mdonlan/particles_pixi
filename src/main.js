import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x1e1e1e;

document.body.appendChild(app.view);

if(app.renderer instanceof PIXI.CanvasRenderer) {
    console.log('canvas mode');
} else {
    console.log('webgl mode');
}

const particles = [];

PIXI.loader
.load(setup);


function create_particle(id, texture) {
    return {
        id: id,
        velocity: { x: Math.floor(Math.random() * 6) - 3, y: Math.floor(Math.random() * 6) - 3},
        position: { x: Math.floor(Math.random() * window.innerWidth), y: Math.floor(Math.random() * window.innerHeight) },
        sprite: new PIXI.Sprite(texture),
        color: null,
    }
}

function create_particles() {
    let color = "0xffffff";
    // create particle graphic and turn it into a texture
    const circle  = new PIXI.Graphics();
    circle.beginFill(color);
    circle.lineStyle(0);
    circle.drawCircle(0, 0, 3);
    circle.endFill();
    const texture = circle.generateCanvasTexture();

    for (let i = 0; i < 200; i++) {
        particles.push(create_particle(i, texture));
        particles[i].sprite.position = particles[i].position;
        app.stage.addChild(particles[i].sprite)
    }
}

const graphics = new PIXI.Graphics(true); // true turns on native lines, is it better/faster???
app.stage.addChild(graphics);   
console.log(graphics);

function move_particles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].position.x += particles[i].velocity.x;
        particles[i].position.y += particles[i].velocity.y;

        if (particles[i].position.x >= window.innerWidth - 3) particles[i].velocity.x *= -1;
        if (particles[i].position.x <= 0) particles[i].velocity.x *= -1;
        if (particles[i].position.y >= window.innerHeight - 3) particles[i].velocity.y *= -1;
        if (particles[i].position.y <= 0) particles[i].velocity.y *= -1;

        particles[i].sprite.position = particles[i].position;
    }
}

function get_distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function draw_lines() {
    graphics.clear();
    graphics.lineStyle(1, 0xffffff, 1);

    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            if (particles[i].id != particles.id) {
                const dist = get_distance(particles[i].position, particles[j].position);
                if (dist < 100) {
                    const dist_percent_max = (100 - dist) / 100;
                    // const int_percent_max = Math.floor((dist_percent_max * 100));
                    // console.log(int_percent_max)
                    // graphics.fillAlpha = int_percent_max;
                    graphics.moveTo(particles[i].position.x, particles[i].position.y);
                    graphics.lineTo(particles[j].position.x, particles[j].position.y);
                    // console.log(graphics.graphicsData.length)
                    graphics.graphicsData[graphics.graphicsData.length - 1].lineAlpha = dist_percent_max;
                    
                }
            }
        }
    }

    // .closePath()
    graphics.endFill();
    // for (let i = 0; i < graphics.graphicsData.length; i++) {
    //     graphics.graphicsData[i].lineAlpha = 0.2;
    // }
}

function update() {
    move_particles();
    draw_lines();
}

function setup() {
    console.log(app);
    // runs after loading all assets
    create_particles();
    app.ticker.add(update)
    // const particles = new Particles(app);
    // const lines = new Lines(app, this.particles);
}