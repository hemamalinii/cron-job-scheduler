package main

import (
	"log"
	"net/http"

	"context"

	"github.com/gorilla/mux"
	"github.com/robfig/cron/v3"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func main() {
	router := mux.NewRouter()

	// Define API routes
	router.HandleFunc("/api/gmail", handleGmail).Methods("GET")

	router.HandleFunc("/api/spotify", handleSpotify).Methods("GET")
	router.HandleFunc("/api/calendar", handleCalendar).Methods("GET")

	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", router))

	connectDB()
	initFirebase()
	scheduleJobs()
}

var db *mongo.Client

func connectDB() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	db = client
}

func scheduleJobs() {
	c := cron.New()
	c.AddFunc("@every 1h", func() {
		// Task to be executed every hour
		log.Println("Running a scheduled task")
	})
	c.Start()
}

var authClient *auth.Client

func initFirebase() {
	opt := option.WithCredentialsFile("path/to/your-service-account.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v", err)
	}

	authClient, err = app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}
}

func verifyIDToken(idToken string) (*auth.Token, error) {
	return authClient.VerifyIDToken(context.Background(), idToken)
}
