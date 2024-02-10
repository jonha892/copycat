package data

import (
	b64 "encoding/base64"
	"os"
	"path/filepath"
)

type localLoader struct {
	rootPath string
}

func NewLocalLoader(rootPath string) Loader {
	return &localLoader{
		rootPath: rootPath,
	}
}

const (
	TEST_ID        = "test_1"
	GIF_NAME       = "blob.gif"
	THUMBNAIL_NAME = "thumbnail.png"
)

func readFileAsBase64String(path string) (string, error) {
	contents, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}

	sEnc := b64.StdEncoding.EncodeToString(contents)
	return sEnc, nil
}

func (l *localLoader) LoadSpotlights() ([]Spotlight, error) {
	thumbnailPath := filepath.Join(l.rootPath, TEST_ID, THUMBNAIL_NAME)
	thumbnail, err := readFileAsBase64String(thumbnailPath)
	if err != nil {
		return nil, err
	}

	data := []Spotlight{
		{Metadata: Metadata{ID: "1", Title: "Spotlight 1", Tags: []Tag{"tag 1", "another tag"}}, Preview: thumbnail},
		{Metadata: Metadata{ID: "2", Title: "Spotlight 2", Tags: []Tag{"tag 1", "another tag"}}, Preview: thumbnail},
	}
	return data, nil
}

func (l *localLoader) LoadSingle(id string) (*Blob, error) {
	gifPath := filepath.Join(l.rootPath, TEST_ID, THUMBNAIL_NAME)
	gif, err := readFileAsBase64String(gifPath)
	if err != nil {
		return nil, err
	}

	data := Blob{Metadata: Metadata{ID: "1", Title: "Blob 1", Tags: []Tag{"tag 1", "another tag"}}, Gif: gif}
	return &data, nil
}
