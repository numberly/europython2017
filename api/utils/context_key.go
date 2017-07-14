package utils

type key int

// Any elements pushed to context should have have a key set here to avoid
// conflict and erasing other key by mistake
const (
	// KeyRethink stock db connection
	KeyRethink key = iota

	// KeyStat stock logging information
	KeyStat
)
