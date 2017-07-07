package main

import (
	"crypto/md5"
	"encoding/hex"
)

func MD5FromString(text string) (string, error) {
	// Add a test
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil)), nil
}
