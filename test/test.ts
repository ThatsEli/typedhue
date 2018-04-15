
let TypedHue = require('../lib/index');

let bridge = new TypedHue.Bridge('192.168.2.102', (success: boolean, username?: string) => {
    // console.log(success, ( username ? username : 'No username' ));

    bridge.getLights((lights: any) => {
        // console.log(lights['1']);
    });

    bridge.switchLight('1', {bri:50}, (success: boolean) => {
        console.log(success);
    });



}, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');


