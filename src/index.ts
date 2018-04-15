
import * as http from 'http';
import * as request from 'request';

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


    public getLights(callback: Function): void {
        this.doReq('/api/_USERNAME_/lights', 'GET', '{}', (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(JSON.parse(body));
            }
        })
    }

    public switchLight(id: string, state: any, callback: Function): void {
        this.doReq('/api/_USERNAME_/lights/' + id + '/state', 'PUT', JSON.stringify(state), (err: any, res: any, body: string) => {
            if(res.statusCode == 200) {
                callback(true);
            }
        });
    }


    private doReq(path: string, method: string, body: string, callback: Function): void {
        path = path.replace('_USERNAME_', this.username);
        // TODO: do this waaaay smarter
        switch (method) {
            case 'POST':
                request.post({
                    headers: {},
                    url: this.apiGateway + path,
                    body: body
                }, (error: Error, response: any, body: string) => {
                    if(callback) {
                        callback(error, response, body);
                    }
                });
                break;
            case 'GET':
                request.get({
                    headers: {},
                    url: this.apiGateway + path
                }, (error: Error, response: any, body: string) => {
                    if(callback) {
                        callback(error, response, body);
                    }
                });
                break;
            case 'PUT':
                request.put({
                    headers: {},
                    url: this.apiGateway + path,
                    body: body
                }, (error: Error, response: any, body: string) => {
                    if(callback) {
                        callback(error, response, body);
                    }
                });
                break;
            default:
                break;
        }

    }

}