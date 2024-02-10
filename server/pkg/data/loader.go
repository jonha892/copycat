package data

type Loader interface {
	LoadSpotlights() ([]Spotlight, error)
	LoadSingle(id string) (*Blob, error)
}
