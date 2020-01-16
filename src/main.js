import * as PIXI from 'pixi.js'
import App from './App'

export const app = new App({ 
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
app.renderer.backgroundColor = 0x111111;

document.body.appendChild(app.view);

if(app.renderer instanceof PIXI.CanvasRenderer) {
    console.log('canvas mode');
} else {
    console.log('webgl mode');
}

PIXI.loader
    .load(setup);

function setup() {
    console.log(app);
    // runs after loading all assets
    app.init();
}