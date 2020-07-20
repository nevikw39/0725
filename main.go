package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
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
				session.Set("nevikw39_0725", time.Now().Add(60*time.Second).UnixNano())
				session.Save()
				c.JSON(http.StatusForbidden, gin.H{"nevikw39_0725": time.Now().Add(60 * time.Second).UnixNano()})
			default:
				session.Set("nevikw39_0725", time.Now().Add(60*time.Second).UnixNano())
				session.Save()
				c.JSON(http.StatusUnauthorized, gin.H{"nevikw39_0725": time.Now().Add(60 * time.Second).UnixNano()})
			}
		}
	})
	r.Run(":725")
}
