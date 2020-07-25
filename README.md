# 0725
## 佰拾壹中部電資聯合幹部見面：ＲＰＧ解謎

[http://35.197.98.141:725/](http://35.197.98.141:725/)

### 給學弟的話

知道有學弟解謎時就很機智想到要找我的 GitHub，我這不就公開惹嗎？？這次很榮幸能夠設計這個謎題，令本次活動更具電資特色。看到各組都能順利解出，其實倍感欣慰（？

相信大家也有藉機學到一點東西，像是如何以手機查看原始碼。聽說有人還真的想用矩陣快速蜜算費氏數列呢，希望 `O(1)` 的提示有避免你走偏ＸＤＤ但是搭配 `Python` 的整數應該也能得到正解吧（？

這邊給學弟一個小小建議，往後假若你們有要設計類似謎題，可以考慮每個小隊有不同帳號，如此不但可以更嚴格的限制鎖定時間（這次只要修改 _cookies_ 或開新的（無痕）視窗就可繞過），也能更準確的分析各小隊的進度。

#### 關於 CTF

最後跟大家分享一下 **CTF** _(Capture the Flag)_。簡單來說，就是一個資安的攻防戰。我們這次主要是想要模仿解謎式 **CTF** 的型式，難度應該只有幼稚園的幼幼班（？

**CTF** 競賽所涉及之領域非常繁雜，通常不重於程式設計方面。其實我也沒參加過喇 `o'_'o` 有興趣可以自己多研究喔，感覺挺好玩ㄉ

### 內容
1. 以 *hex* 表示伺服器的 __IP__
2. 在網頁原始碼中隱藏密碼的規則
    - 在網頁中已與背景同色之文字提示
3. 根據規則，計算費氏數列第 111 項之個位數字和，再轉為 *ASCII*

### Design
#### Backend
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
- session
#### Frontend
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
##### Frameworks, Libraries depended
- *Bootstrap*
  - 不必多說，手刻網頁的好夥伴
  - 我有自己慢慢調整過 css
- *anime.js*
  - 登入畫面的各種動畫以及成功畫面的字體動畫
- *ScrollMagic*
  - 成功畫面的滑動特效，但是我寫的有 `bug` 沒空抓＝＝

### Usage
```bash
git clone git@github.com:nevikw39/0725.git
cd 0725
go mod download
go build
./0725
# Have Fun!!
```
