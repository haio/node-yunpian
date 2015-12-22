# [Yunpian API](https://www.yunpian.com/api/sms.html)

## Usage

```js
npm install node-yunpian --save

var yunpian = require('node-yunpian')(apikey)
```

## API

### 账户

#### 获取账户信息

```js
yunpian
  .user
  .show()
  .then(onsuccess)
  .catch(onerror)
```

#### 更新账户信息

```js
yunpian
  .user
  .update({
    emergency_contact: 'XX'
  })
  .then(onsuccess)
  .catch(onerror)
```

### 短信

#### 发送短信

```js
yunpian
 .sms
 .send(mobile, text)
 .then(onsuccess)
 .catch(onerror)
```

#### 发送模版短信

```js
yunpian
  .sms
  .sendWithTemplate(mobile, 2, { '#company#': 'XXXX', '#code#': '2223' })
  .then(onsuccess)
  .catch(onerror)
```

#### 获取回复列表

```js
yunpian
  .sms
  .getReplies({
    start_time: '2015-01-01 00:00:00',
    end_time: '2015-12-22 24:00:00',
    page_num: 1,
    page_size: 10,
  })
  .then(onsuccess)
  .catch(onerror)
```

#### 获取发送记录列表

```js
yunpian
  .sms
  .getRecords({
    start_time: '2015-01-01 00:00:00',
    end_time: '2015-12-22 24:00:00',
    page_num: 1,
    page_size: 10,
    phone: 'xxxxxxxxxxx',
  })
  .then(onsuccess)
  .catch(onerror)
```

#### 获取黑名单

```js
yunpian
  .sms
  .getBlackWords('欢迎报名')
  .then(onsuccess)
  .catch(onerror)
```

#### 短信群发

```js
yunpian
  .sms
  .multiSend(mobile, text)
  .then(onsuccess)
  .catch(onerror)
```

### 语音

#### 发送语音

```js
yunpian
  .voice
  .send(mobile, '222222')
  .then(onsuccess)
  .catch(onerror)
```