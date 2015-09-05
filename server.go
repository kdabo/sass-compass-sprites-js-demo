package main

import (
	"fmt"
	"net/http"
)

func addDefaultHeaders(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fn(w, r)
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./")))
	fmt.Println("server online port 3000")
	http.ListenAndServe(":3000", nil)
}
