package models


type Response struct {
    Code        int         `json:"code, omitempty"`
    Status      string      `json:"status, omitempty"`
    Results     interface{} `json:"results, omitempty"`
}
// CharacterTable will be used as a model to save the respone result
type CharacterTable struct {
	CharacterID int    `gorm:"column:CharacterID;primary_key" json:"characterId,omitempty" `
	Name        string `gorm:"column:Name;" json:"name" `
	Description string `gorm:"column:Description;" json:"description,omitempty" `
	Thumbnail   string `gorm:"column:Thumbnail;" json:"thumbnail,omitempty" `
	GivenID     int    `gorm:"column:GivenID;" json:"id,omitempty" `
}

func (t CharacterTable) TableName() string {
    return "DevOnboarding.JP_Marvel_Characters"
}

type Characters struct {
    items   []CharacterTable
}

func (cs *Characters) Populate(responseCharacters []marvelCharacter) []CharacterTable {
	var tablecharacter CharacterTable

	for _, respCharacter := range responseCharacters {
		tablecharacter = CharacterTable{}

		tablecharacter.Name = respCharacter.Name
		tablecharacter.Description = respCharacter.Description
		tablecharacter.GivenID = respCharacter.ID
		tablecharacter.Thumbnail = respCharacter.Thumbnail.Path + "." + respCharacter.Thumbnail.Extension

		cs.items = append(cs.items, tablecharacter)
	}

	return cs.items
}

type MarvelResponseCharacter struct {
    Code int
    Status string
    Etag string
    Data struct {
        Offset int
        Limit int
        Total int 
        Count int
        Results []marvelCharacter
    }
}

type marvelCharacter struct {
    ID              int
    Name            string
    Description     string
    Thumbnail       marvelThumbnail
}

type marvelThumbnail struct {
    Path string 
    Extension string
}