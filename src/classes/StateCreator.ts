import { State } from '../interfaces/State';

export class StateCreator {

    /**
     * joins multiple states into one
     * @param states array of States
     */
    public static joinStates(states: State[]): State {
        let newState: State = {};
        for (let i: number = 0; i < states.length; i++) {
            // @ts-ignore
            newState = Object.assign(newState, states[i]);
        }
        return newState;
    }

    /**
     * switch a lamp on or off
     * @param on lamp on / off
     */
    public static onOffState(on: boolean): State {
        return { on: on };
    }

    /**
     * sets the brightness for a lamp
     * @param brightness brightness between 1 and 254
     */
    public static setBrightness(brightness: number): State {
        if(brightness < 1) { brightness = 1; }
        if(brightness > 254) { brightness = 254; }
        return { bri: brightness };
    }

    /**
     * set the hue of a lamp
     * @param hue hue between 0 and 65535
     */
    public static setHue(hue: number): State {
        if(hue < 0) { hue = 0; }
        if(hue > 65535) { hue = 65535; }
        return { hue: hue };
    }

    /**
     * set the saturation of a lamp
     * @param saturation hue between 0 and 254
     */
    public static setSaturation(saturation: number): State {
        if(saturation < 0) { saturation = 0; }
        if(saturation > 254) { saturation = 254; }
        return { sat: saturation };
    }

    /**
     * sets the color of a lamp in the EIS colorspace
     * @param x x coordinate in EIS colorspace
     * @param y y coordinate in EIS colorspace
     */
    public static setColorCIEColorspace(x:number, y: number): State {
        return { xy:[x, y] };
    }

    /**
     * set the colortemperator of a lamp
     * @param kelvin kelvin between 135 and 500
     */
    public static setColortemperator(kelvin: number): State {
        if(kelvin < 135) { kelvin = 135; }
        if(kelvin > 500) { kelvin = 500; }
        return { sat: kelvin };
    }


}
