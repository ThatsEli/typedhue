
export interface State {

    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    xy?: number[];
    ct?: number;
    alert?: string;
    effect?: string;
    transitiontime?: number;

    // groups/rooms //
    scene?: string;

}