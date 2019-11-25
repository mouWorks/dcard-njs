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

    it('判斷規則, 當數量小於 Limit 則應該 Pass (判斷為 false)', done => {

        let Limit = 60;
        let condition = 59;
        let checkLimit = dcard.exceedLimit(condition, Limit);
        checkLimit.should.be.false();
        done();
    });

    it('判斷規則, 當數量等於 Limit 則應該 Fail  (判斷為 true)', done => {

        let Limit = 60;
        let condition = 60;
        let checkLimit = dcard.exceedLimit(condition, Limit);
        checkLimit.should.be.true();
        done();
    });


})