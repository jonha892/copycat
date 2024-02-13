package main

import (
	"github.com/jonha892/copycat/v2/pkg/data"
	"github.com/jonha892/copycat/v2/pkg/handlers"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"go.uber.org/zap"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	logger, _ := zap.NewProduction()
	loader := data.NewLocalLoader("data/")
	apiHandler := handlers.NewAPIHandler(logger, &loader)

	e.GET("/api/spotlights", apiHandler.GetSpotlights)
	e.GET("/api/blobs/:id", apiHandler.GetSingleBlob)
	e.GET("/api/gifs/:id", apiHandler.GetSingleGif)
	e.GET("/api/search", apiHandler.Search)

	e.Logger.Fatal(e.Start(":1234"))
}
