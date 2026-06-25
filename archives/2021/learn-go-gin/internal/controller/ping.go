package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingGet(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"status": "pong",
	})
}
