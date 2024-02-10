package data

type Tag string

type Metadata struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Tags  []Tag  `json:"tags"`
}
