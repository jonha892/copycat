package data

type Blob struct {
	Metadata
	Gif string `json:"gif"` // automatically base64 encoded
}
