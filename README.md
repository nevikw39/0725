# 0725
## 佰拾壹中部電資聯合幹部見面：ＲＰＧ解謎

### 內容
1. 以 *hex-string* 表示網址的 *ASCII* 編碼
2. 在網頁原始碼中隱藏密碼的規則
    - 在網頁中已與背景同色之文字提示
3. 根據規則，計算費氏數列第 111 項之個位數字和，再轉為 *ASCII*

### 架構
#### 後端
- port config
- route
  - get /
    - *if* __session__: *return* `success`
    - *else*: *return* `login`
  - post /
    - *if* __time limit__: *return* `429`
    - *else* *switch* __pwd__
      - *case* `a`: `session.Set()` *return* `200`
      - *case* `97`: *return* `403`
      - *default*: *return* `401`
#### 前端
- login
  - form
  - hint
  - post
  - modal
  - failed
- succcess
  - firework
  - congratulation
  - section wiping
  - card column