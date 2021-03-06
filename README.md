# TypedHue
### A NodjeJS libary for the [Phillips Hue API](https://developers.meethue.com/philips-hue-api) written in [Typescript](http://www.typescriptlang.org/).

## What is this?
With this module you can controll your Phillips Hue bridge from NodeJS with all the benefits of Typescript!

## Documentation
Run `$ npm run generate-doc` and open the documentation/ folder with an web-browser(you may need a webserver)

## Install

    $ npm i --save typedhue
 
 ## Getting started

You need to get a username/"password" to controll you Huebridge. You can do this by creating a new instance of the Bridge class without an username(last parameter). Max. 30 seconds before executing this code(change the IP to the IP of your bridge) you need to press the button on the Huebridge:

    let bridge = new TypedHue.Bridge('192.168.XXX.XXX', (success, username) => { console.log(username); });
 
 The script will now log your username(something like 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4'), this needs to be done only once! With your now obtained username you can create a new instance of the Bridge class with the username(as last parameter) and start using the module! :) In this case the username is 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4' and the ip of the bridge '192.168.2.102'
 
    let bridge = new TypedHue.Bridge('192.168.2.102', (success, username) => {
	    // your code here
    }, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');

## How to do something with your lamps
 
 You can access any lamp with the bridge.setLightState() function. The three parameters are

 - id: string - the id of the target light
 - state: State - an State generated by the StateCreator, more about this below
 - callback: Function -  a function that ins called determining the success or failure of the statechange

### How to generate a state for your lamps

You need to have a State to change a property on your lamp. These States can be generated with the StateCreator class. The class has serveral functions which return an Object that can be handed over the the setLightState() function. You can also combine multiple Stated with the StateCreator.joinStates() function.

Creating an State(this will toggle the light on):

    let state = TypedHue.StateCreator.onOffState(true); // { on:true }

Joining/combining multiple states(this will toogle the light on and set its brightness to 200):

    let state = TypedHue.StateCreator.joinStates([TypedHue.StateCreator.onOffState(true), TypedHue.StateCreator.setBrightness(200)])

## Quick example
 
 This will log all lights connected to the bridge to the console and turn the first one on.
 
Typescript:

    import * as TypedHue from 'typedhue';
    
    let bridge = new TypedHue.Bridge('192.168.2.102', (success:  boolean, username?:  string) => {
	    bridge.getLights((lights:  any) => { console.log(lights); });
	    bridge.setLightState('1', TypedHue.StateCreator.onOffState(true), (success:  boolean) => {});
    }, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');


Javascrpt:

    const TypedHue = require('typedhue');
    
    let bridge = new TypedHue.Bridge('192.168.2.102', (success, username) => {
	    bridge.getLights((lights) => { console.log(lights); });
	    bridge.setLightState('1', TypedHue.StateCreator.onOffState(true), () => {});
    }, 'SfJR8F3BZ2wb5DUToQNNFKljyNluPFIlx93KKjb4');

## Building
Just run `$ npm run build`