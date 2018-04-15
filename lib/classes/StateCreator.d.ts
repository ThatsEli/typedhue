import { State } from '../interfaces/State';
export declare class StateCreator {
    /**
     * joins multiple states into one
     * @param states array of States
     */
    static joinStates(states: State[]): State;
    /**
     * switch a lamp on or off
     * @param on lamp on / off
     */
    static onOffState(on: boolean): State;
    /**
     * sets the brightness for a lamp
     * @param brightness brightness between 1 and 254
     */
    static setBrightness(brightness: number): State;
    /**
     * set the hue of a lamp
     * @param hue hue between 0 and 65535
     */
    static setHue(hue: number): State;
    /**
     * set the saturation of a lamp
     * @param saturation hue between 0 and 254
     */
    static setSaturation(saturation: number): State;
    /**
     * sets the color of a lamp in the EIS colorspace
     * @param x x coordinate in EIS colorspace
     * @param y y coordinate in EIS colorspace
     */
    static setColorCIEColorspace(x: number, y: number): State;
    /**
     * set the colortemperator of a lamp
     * @param kelvin kelvin between 135 and 500
     */
    static setColortemperator(kelvin: number): State;
}
