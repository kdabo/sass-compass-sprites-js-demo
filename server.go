package main

import (
	"fmt"
	"net/http"
	"os"
)

func addDefaultHeaders(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fn(w, r)
	}
}

var Port = os.Getenv("PORT")

func main() {
	if Port == "" {
		Port = "3000"
	}
	http.Handle("/", http.FileServer(http.Dir("./")))
	fmt.Println("server online port 3000")
	http.ListenAndServe(":"+Port, nil)
}
