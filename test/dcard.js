"use strict"

const should = require('should');
const dcard = require('../modules/dcard');

describe('DCard Demo Test', () => {
    it('getTimeStamp 應該要生成一個 TimeStamp值', done => {
        let getOneMinAgo = dcard.getOneMinAgo();
        getOneMinAgo.should.String;
        done();
    });

    it('getOneMinAgo 應該要生成一個 1分鐘前的 TimeStamp值', done => {
        let getTimeStamp = dcard.getTimeStamp();
        getTimeStamp.should.String;
        done();
    });

    it('getOneMinAgo 應該要小於 getTimeStamp', done => {
        let getOneMinAgo = dcard.getOneMinAgo();
        let getTimeStamp = dcard.getTimeStamp();
        getTimeStamp.should.greaterThan(getOneMinAgo);
        done();
    });

    it('', done => {
        done();
    });


})