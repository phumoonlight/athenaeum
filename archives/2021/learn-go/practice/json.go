package practice

import (
	"encoding/json"
	"fmt"
	"time"
)

type ExamplePayload struct {
	Name     string          `json:"name"`
	Age      uint            `json:"age"`
	Property PayloadProperty `json:"property"`
}

type PayloadProperty struct {
	OldName   string    `json:"Old name"`
	LastLogin time.Time `json:"Last login"`
}

func init() {
	payload := ExamplePayload{}
	payload.Property.OldName = "joseph"
	payload.Property.LastLogin = time.Now()
	payloadAsByte, _ := json.Marshal(payload)
	payloadAsJson := string(payloadAsByte)
	fmt.Println("[practice][json]", payloadAsJson)
}
