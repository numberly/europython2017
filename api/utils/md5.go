package utils

import (
	"crypto/md5"
	"encoding/hex"
)

// MD5FromString convert a string to a md5 convert
func MD5FromString(text string) (string, error) {
	// Add a test
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil)), nil
}
