import Particle from './Particle';
import { TweenMax } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

export default class Particles {
    constructor(app) {
        this.app = app;

        this.app.ticker.add(() => {this.update();});

        this.particles = [];
        this.speedMod = 0.5;

        this.colors = [];
        this.current_color_i = 0;
        this.active_color_hex = null;
        this.active_color = [1, 1, 1];

        // this.create_colors(.3, .3, .3, 0, 2, 4, null, null, 50);
        this.createParticles();
    }

    create_color_gradient(width, height, rounded) {
        const gradient = new PIXI.Graphics();
        // this.app.stage.addChild(gradient);
        
        const colorFromData = prepareColorData(0xFF00FF, 1);
        const colorToData = prepareColorData(0xFF0000, 0.2);

        let stepCoef;
        let stepColor;
        let stepAlpha;
        let stepsCount = 100;
        const stepHeight = height / stepsCount;
        for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
            stepCoef = stepIndex / stepsCount;
            stepColor = getColorOfGradient(colorFromData, colorToData, stepCoef);

            gradient.beginFill(stepColor.color, stepColor.alpha);
            gradient.drawRect(
                0,
                height * stepCoef,
                width,
                stepHeight
            );
        }

        if (rounded) {
            var round = 0;
            var roundMask = new PIXI.Graphics();
            roundMask.beginFill(0x000000);
            roundMask.drawRoundedRect(0, 0, width, height, round);
            gradient.mask = roundMask;
        }

        return gradient;
    }

    createParticles () {

        // create particle graphic and turn it into a texture
        const circle  = new PIXI.Graphics();
        
        let color = "0xffffff";
        
        circle.beginFill(color);
        circle.lineStyle(0);
        circle.drawCircle(100, 100, 3);
        circle.endFill();
        const texture = circle.generateCanvasTexture();

        for (let i = 0; i < 200; i++) {
            let particle = new Particle(this.app, this.speedMod, i, texture, this);
            this.particles.push(particle);
        }
    }

    update () {
        this.particles.forEach(particle => {
            particle.update(this.active_color_hex, this.create_color_gradient);
        });
    }
}
  
// param color is a number (e.g. 255)
// return value is a string (e.g. ff)
var prepareRGBChannelColor = function(channelColor) {
    var colorText = channelColor.toString(16);
    if (colorText.length < 2) {
        while (colorText.length < 2) {
        colorText = "0" + colorText;
        }
    }

    return colorText;
}
  
// Getting RGB channels from a number color
// param color is a number
// return an RGB channels object {red: number, green: number, blue: number}
var getRGBChannels = function(color) {
    var colorText = color.toString(16);
    if (colorText.length < 6) {
        while (colorText.length < 6) {
        colorText = "0" + colorText;
        }
    }

    var result = {
        red: parseInt(colorText.slice(0, 2), 16),
        green: parseInt(colorText.slice(2, 4), 16),
        blue: parseInt(colorText.slice(4, 6), 16)
    };
    return result;
}

// Preparaiton of a color data object
// param color is a number [0-255]
// param alpha is a number [0-1]
// return the color data object {color: number, alpha: number, channels: {red: number, green: number, blue: number}}
var prepareColorData = function(color, alpha) {
    return {
        color: color,
        alpha: alpha,
        channels: getRGBChannels(color)
    }
}

// Getting the color of a gradient for a very specific gradient coef
// param from is a color data object
// param to is a color data object
// return value is of the same type
var getColorOfGradient = function(from, to, coef) {
    if (!from.alpha && from.alpha !== 0) {
        from.alpha = 1;
    }
    if (!from.alpha && from.alpha !== 0) {
        to.alpha = 1;
    }

    var colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
    colorRed = Math.min(colorRed, 255);
    var colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
    colorGreen = Math.min(colorGreen, 255);
    var colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
    colorBlue = Math.min(colorBlue, 255);

    var rgb = prepareRGBChannelColor(colorRed) + prepareRGBChannelColor(colorGreen) + prepareRGBChannelColor(colorBlue);

    return {
        color: parseInt(rgb, 16),
        alpha: from.alpha + coef * (to.alpha - from.alpha)
    };
}