import * as TypedHue from '../lib/index.js'

let bridge = new TypedHue.Bridge('192.168.2.102', (success: boolean, username?: string) => {

    bridge.getLights((lights: any) => {/* console.log(lights); */});
    bridge.getGroups((groups: any) => {/* console.log(groups); */ })

    bridge.setLightState('1', TypedHue.StateCreator.joinStates([TypedHue.StateCreator.onOffState(true), TypedHue.StateCreator.setBrightness(200)]) , (success: boolean) => {});
    bridge.setLightState('1', TypedHue.StateCreator.setBrightness(10), (success: boolean) => {});

    bridge.setGroupState('1', TypedHue.StateCreator.onOffState(false), (success: boolean) => {});

}, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');
