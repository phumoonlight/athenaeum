package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func IndexGet(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
