# dcard-njs
### A demo for dcard

#### CI Status [![CircleCI](https://circleci.com/gh/mouWorks/dcard-njs/tree/master.svg?style=svg)](https://circleci.com/gh/mouWorks/dcard-njs/tree/master)

#### How to Access
* visit [Link](https://dcard.m0u.work/demo) (Mysql)
* visit [Link](https://dcard.m0u.work/r) (Redis)

#### Rules
* Every Single IP can access the link 60 times per minute
* Once Reached Limit user will see an error display.

#### Table Schema

* Table `dcard-logs`

| Name | Desc | Type |
|:-----|:------|:-----|
|id|id|int|
|ip|User Ip位置|string|
|queryString|QueryString|string|
|status|HttpsStatusCode|string|
|timestamp|timestamp|string|

#### How it works

* 當 User 進入頁面, 先撈取該Ip一分鐘內的登入紀錄

```sql=
SELECT COUNT(id) as Times 
  FROM `dcard-logs` 
 WHERE ip = ? 
   AND timestamp > ? 
   AND queryString = `/demo`
```

* 如果 數量 >= 60 -> 顯示 Error 
* 如果 數量 < 60 -> 則再寫入一筆到資料庫 (userIp, 當下的 Timestamp)