
import * as http from 'http';
// import * as request from 'request';
const request = require('request');
import { StateCreator } from './StateCreator';
import { State } from '../../lib/interfaces/State';

export class Bridge {

    private apiGateway : string;
    private username: string = '';

    /**
     * creates a new bridge instance
     * @param host host of the hue bridge
     * @param callback callback function to call when connected
     * @param username optional username, if not supplied a username will be generated and returned as the 2nd callback parameter
     */
    constructor(host: string, callback: Function, username?: string) {

        this.apiGateway = 'http://' + host;

        if(username === undefined) {
            // get username
            this.doReq('/api', 'POST', '{"devicetype":"typedhue"}', (err: any, res: any, bod: string) => {
                let body: any = JSON.parse(bod);
                if(body[0].error) {
                    console.error('Error, did you press the button on the Hue bridge / is the bridge connected?'); process.exit();
                } else if(body[0].success) {
                    this.username = body[0].success.username; callback(true, this.username);
                } else { this.username = ''; process.exit(); }
            });

        } else {
            this.username = username;
            this.doReq('/api/' + this.username + '/capabilities', 'GET', '', (err: any, res:any, body: string) => {
                if(res.statusCode == 200) { callback(true); } else { callback(false); }
            });            
        }  

    }

    /**
     * get all lights connected to the bridges
     * @param callback callback to be called with the lights
     */
    public getLights(callback: Function): void {
        this.doReq('/api/_USERNAME_/lights', 'GET', '{}', (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(JSON.parse(body));
            } else {
                callback({});
            }
        })
    }

    /**
     * get all groups/rooms knows to the bridge
     * @param callback callback o be called with the groups
     */
    public getGroups(callback: Function): void {
        this.doReq('/api/_USERNAME_/groups', 'GET', '', (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(JSON.parse(body));
            } else {
                callback({});
            }
        });
    }

    /**
     * 
     * @param id id of the light
     * @param state new state of the light
     * @param callback callback callback to be called with success or not
     */
    public setLightState(id: string, state: State, callback: Function): void {
        this.doReq('/api/_USERNAME_/lights/' + id + '/state', 'PUT', JSON.stringify(state), (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    public setGroupState(id: string, state: State, callback: Function): void {
        this.doReq('/api/_USERNAME_/groups/' + id + '/action', 'PUT', JSON.stringify(state), (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }


    private doReq(path: string, method: string, body: string, callback: Function): void {
        path = path.replace('_USERNAME_', this.username);
        request({
            uri: this.apiGateway + path,
            method: method,
            body: body,
            headers: {}
        }, (error: Error, response: any, body: string) => {
            callback(error, response, body);
        } );

    }

}