package handlers

import (
	"net/url"

	"github.com/jonha892/copycat/v2/pkg/data"
	"github.com/labstack/echo"
	"go.uber.org/zap"
)

type APIHandler struct {
	logger *zap.Logger
	loader *data.Loader
}

func NewAPIHandler(logger *zap.Logger, loader *data.Loader) *APIHandler {
	return &APIHandler{
		logger: logger,
		loader: loader,
	}
}

func (handler *APIHandler) GetSpotlights(c echo.Context) error {
	(*handler.logger).Info("Loading spotlights")

	data, err := (*handler.loader).LoadSpotlights()
	if err != nil {
		(*handler.logger).Error("Error loading spotlights", zap.Any("error", err))
		return c.String(500, "Internal Server Error")
	}

	return c.JSON(200, data)
}

func (handler *APIHandler) GetSingleBlob(c echo.Context) error {

	id := c.Param("id")
	data, err := (*handler.loader).LoadSingle(id)
	if err != nil {
		(*handler.logger).Error("Error loading single blob", zap.Any("error", err))
		return c.String(500, "Internal Server Error")
	}

	return c.JSON(200, data)
}

func (handler *APIHandler) Search(c echo.Context) error {
	keywords := c.QueryParam("keys")
	keywords, err := url.QueryUnescape(keywords)

	if err != nil {
		(*handler.logger).Error("Error decoding url encoded string", zap.Any("error", err))
		return c.String(400, "Bad Request")
	}

	return c.String(200, "Hello, World!")
}
