package server

func Serve() {
	router := initRouter()
	router.Run(":4000")
}
