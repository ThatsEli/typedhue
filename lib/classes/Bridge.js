"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var Bridge = /** @class */ (function () {
    /**
     * creates a new bridge instance
     * @param host host of the hue bridge
     * @param callback callback function to call when connected
     * @param username optional username, if not supplied a username will be generated and returned as the 2nd callback parameter
     */
    function Bridge(host, callback, username) {
        var _this = this;
        this.username = '';
        this.apiGateway = 'http://' + host;
        if (username === undefined) {
            // get username
            this.doReq('/api', 'POST', '{"devicetype":"typedhue"}', function (err, res, bod) {
                var body = JSON.parse(bod);
                if (body[0].error) {
                    console.error('Error, did you press the button on the Hue bridge / is the bridge connected?');
                    process.exit();
                }
                else if (body[0].success) {
                    _this.username = body[0].success.username;
                    callback(true, _this.username);
                }
                else {
                    _this.username = '';
                    process.exit();
                }
            });
        }
        else {
            this.username = username;
            this.doReq('/api/' + this.username + '/capabilities', 'GET', '', function (err, res, body) {
                if (res.statusCode == 200) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            });
        }
    }
    /**
     * get all lights connected to the bridges
     * @param callback callback to be called with the lights
     */
    Bridge.prototype.getLights = function (callback) {
        this.doReq('/api/_USERNAME_/lights', 'GET', '{}', function (err, res, body) {
            if (res.statusCode == 200) {
                callback(JSON.parse(body));
            }
            else {
                callback({});
            }
        });
    };
    /**
     * get all groups/rooms knows to the bridge
     * @param callback callback o be called with the groups
     */
    Bridge.prototype.getGroups = function (callback) {
        this.doReq('/api/_USERNAME_/groups', 'GET', '', function (err, res, body) {
            if (res.statusCode == 200) {
                callback(JSON.parse(body));
            }
            else {
                callback({});
            }
        });
    };
    /**
     * set the state of a light
     * @param id id of the light
     * @param state new state of the light
     * @param callback callback to be called with success or not
     */
    Bridge.prototype.setLightState = function (id, state, callback) {
        this.doReq('/api/_USERNAME_/lights/' + id + '/state', 'PUT', JSON.stringify(state), function (err, res, body) {
            if (res.statusCode == 200) {
                callback(true);
            }
            else {
                callback(false);
            }
        });
    };
    /**
     * set the state of a group
     * @param id id of the group
     * @param state new state of the goup/their lights
     * @param callback callback to be called with success or not
     */
    Bridge.prototype.setGroupState = function (id, state, callback) {
        this.doReq('/api/_USERNAME_/groups/' + id + '/action', 'PUT', JSON.stringify(state), function (err, res, body) {
            if (res.statusCode == 200) {
                callback(true);
            }
            else {
                callback(false);
            }
        });
    };
    Bridge.prototype.doReq = function (path, method, body, callback) {
        path = path.replace('_USERNAME_', this.username);
        request({
            uri: this.apiGateway + path,
            method: method,
            body: body,
            headers: {}
        }, function (error, response, body) {
            callback(error, response, body);
        });
    };
    return Bridge;
}());
exports.Bridge = Bridge;
