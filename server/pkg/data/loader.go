package data

type Loader interface {
	LoadSpotlights() ([]Spotlight, error)
	LoadSingleBlob(id string) (*Blob, error)
	LoadSingleGif(id string) ([]byte, error)
}
