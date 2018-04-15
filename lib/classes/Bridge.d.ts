import { State } from '../../lib/interfaces/State';
export declare class Bridge {
    private apiGateway;
    private username;
    /**
     * creates a new bridge instance
     * @param host host of the hue bridge
     * @param callback callback function to call when connected
     * @param username optional username, if not supplied a username will be generated and returned as the 2nd callback parameter
     */
    constructor(host: string, callback: Function, username?: string);
    /**
     * get all lights connected to the bridges
     * @param callback callback to be called with the lights
     */
    getLights(callback: Function): void;
    /**
     * get all groups/rooms knows to the bridge
     * @param callback callback o be called with the groups
     */
    getGroups(callback: Function): void;
    /**
     * set the state of a light
     * @param id id of the light
     * @param state new state of the light
     * @param callback callback to be called with success or not
     */
    setLightState(id: string, state: State, callback: Function): void;
    /**
     * set the state of a group
     * @param id id of the group
     * @param state new state of the goup/their lights
     * @param callback callback to be called with success or not
     */
    setGroupState(id: string, state: State, callback: Function): void;
    private doReq(path, method, body, callback);
}
