package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

func handleGmail(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	srv, err := gmail.NewService(ctx, option.WithAPIKey("your-api-key"))
	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
	}

	user := "me"
	res, err := srv.Users.Messages.List(user).MaxResults(10).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve messages: %v", err)
	}

	for _, m := range res.Messages {
		fmt.Fprintf(w, "Message ID: %s\n", m.Id)
	}
}
