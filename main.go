package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
	f, _ := os.Open("port.json")
	defer f.Close()
	b, _ := ioutil.ReadAll(f)
	var j map[string]interface{}
	json.Unmarshal(b, &j)
	r := gin.Default()
	store := cookie.NewStore([]byte("nevikw39_0725"))
	r.Static("static", "static/")
	r.LoadHTMLGlob("templ/*")
	r.Use(sessions.Sessions("nevikw39_0725", store))
	r.GET("/", func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("nevikw39_0725") != "nevikw39_0725" {
			c.HTML(http.StatusOK, "login.html", gin.H{})
		} else {
			c.HTML(http.StatusOK, "success.html", gin.H{})
		}
	})
	r.POST("/", func(c *gin.Context) {
		pwd := c.PostForm("pwd")
		session := sessions.Default(c)
		n := session.Get("nevikw39_0725")
		if n != nil && time.Now().Sub(time.Unix(0, n.(int64))).Nanoseconds() < 0 {
			c.JSON(http.StatusTooManyRequests, gin.H{"nevikw39_0725": n.(int64)})
		} else {
			fmt.Printf("\t%s: %s\n", c.ClientIP(), pwd)
			switch pwd {
			case "a":
				session.Set("nevikw39_0725", "nevikw39_0725")
				session.Save()
				c.JSON(http.StatusOK, gin.H{})
			case "97":
				session.Set("nevikw39_0725", time.Now().Add(15*time.Second).UnixNano())
				session.Save()
				c.JSON(http.StatusForbidden, gin.H{"nevikw39_0725": time.Now().Add(15 * time.Second).UnixNano()})
			default:
				session.Set("nevikw39_0725", time.Now().Add(15*time.Second).UnixNano())
				session.Save()
				c.JSON(http.StatusUnauthorized, gin.H{"nevikw39_0725": time.Now().Add(15 * time.Second).UnixNano()})
			}
		}
	})
	r.Run(fmt.Sprintf(":%v", j["port"].(float64)))
}
