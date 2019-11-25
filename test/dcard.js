"use strict"

const should = require('should');
const dcard = require('../modules/dcard');
const assert = require('assert').strict;

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

    it('DB, 未紀錄IP情況下, 撈取ip 紀錄應該為0', async function(){

        let ip = '127.0.0.1';
        let ipCount = await dcard.getIpcount(ip, dcard.getTimeStamp());
        ipCount.should.eql(0);
    });

    it('DB, 試著塞入一筆, 傳回結果應該為一個物件(Object)', async function(){

        let dummyIp = '127.0.0.2';
        let result = await dcard.recordIp(dummyIp,dcard.getTimeStamp());
        result.should.be.Object();
    });

    it('DB, 試著塞入三筆, 則撈取紀錄應該為 3', async function(){

        let dummyIp = '127.0.0.4';

        await dcard.recordIp(dummyIp,dcard.getTimeStamp());
        await dcard.recordIp(dummyIp,dcard.getTimeStamp());
        await dcard.recordIp(dummyIp,dcard.getTimeStamp());

        let ipCount = await dcard.getIpcount(dummyIp, dcard.getOneMinAgo());
        ipCount.should.eql(3);
    });

    after(async function(){
        console.log('>>> CleanUp DB');

        const db = require('../modules/async-db');

        let query = "DELETE FROM `dcard-logs` WHERE ip LIKE ?";
        let values = [
            '127.0.0%'
        ];

        let result = await db.query(query, values);
        console.log('>>> Rows Cleanedup: [' + result.affectedRows +']');
    })

})



