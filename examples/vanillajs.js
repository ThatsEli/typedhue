
const TypedHue = require('../lib/index');

let bridge = new TypedHue.Bridge('192.168.2.102', (success, username) => {

    bridge.getLights((lights) => { console.log(lights); });

    bridge.setGroupState('1', TypedHue.StateCreator.onOffState(true), () => {});

}, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');
