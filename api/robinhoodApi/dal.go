package main

import (
    model "playground/api/models"
)

func fetchAllCharacters(search string, limit int) (charactersCollection []model.CharacterTable, err error) {
    if limit < 1 {
        limit = 100
    }

    if len(search) < 1 {
        err = db.Limit(limit).Find(&charactersCollection).Error
        return
    }

    err = db.Where("Name LIKE ?", "%"+search+"%").Limit(limit).Find(&charactersCollection).Error

    return
}