package main

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	store := cookie.NewStore([]byte("nevikw39_0725"))
	r.LoadHTMLGlob("templ/*")
	r.Use(sessions.Sessions("nevikw39_0725", store))
	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", gin.H{})
	})
	r.POST("/login", func(c *gin.Context) {
		pwd := c.PostForm("pwd")
		session := sessions.Default(c)
		switch pwd {
		case "a":
			session.Set("nevikw39_0725", "nevikw39_0725")
			session.Save()
			c.JSON(http.StatusOK, gin.H{})
		case "97":
			c.JSON(http.StatusForbidden, gin.H{})
		default:
			c.JSON(http.StatusUnauthorized, gin.H{})
		}
	})
	r.Run(":725")
}
