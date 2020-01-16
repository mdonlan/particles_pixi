import Particles from "./Particles";
import Lines from "./Lines";

export default class App extends PIXI.Application {
    constructor(width, height, antialias, transparent, resolution) {
        super(width, height, antialias, transparent, resolution);
    }

    init() {
        this.particles = new Particles(this);
        this.lines = new Lines(this, this.particles);
    }
}