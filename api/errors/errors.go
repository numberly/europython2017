package errors

import (
	"encoding/json"
	"ep17_quizz/api/utils"
	"net/http"
)

// Error type encapsulates details about error
type Error struct {
	InternalCode int    `json:"code"`
	CodeHTTP     int    `json:"-"`
	Message      string `json:"message"`
}

// Errors type encapsultates Err
type Errors struct {
	Errors []*Error `json:"errors"`
}

/* Main code used
 *
 * NotFound:          5   - http: 400
 * InvalidArgument:   3   - http: 400
 * Unauthenticated:   16  - http: 401
 * PermissionDenied:  7   - http: 403
 * AlreadyExists:     6   - http: 404
 * Internal:          13  - http: 500
 * Unimplemented:     12  - http: 501
 * Unavailable:       14  - http: 503
 */

// Default error xx
var (
	ErrInternalError      = &Error{1, 500, "Internal error."}
	ErrNotFound           = &Error{2, 404, "Resource not found."}
	ErrServiceUnreachable = &Error{3, 502, "Service unreachable."}
	ErrAccessDenied       = &Error{4, 401, "Unauthenticated."}
	ErrAccessForbidden    = &Error{5, 403, "Access forbidden."}
	ErrBadRequest         = &Error{6, 400, "Bad request."}
	ErrNotImplemented     = &Error{7, 501, "Not implemented."}
	ErrDatabaseError      = &Error{8, 500, "Database internal error."}
	ErrJWTOutDated        = &Error{9, 403, "JWT out dated."}
	ErrJWTInvalid         = &Error{10, 403, "JWT invalid."}
	ErrJWTMissing         = &Error{11, 403, "JWT is missing."}
	ErrNotAuthenticated   = &Error{12, 401, "You need to be authenticated."}
)

// WriteHTTP write the given error as an HTTP response
func WriteHTTP(rw http.ResponseWriter, err *Error, l *utils.LoggingContext) {
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(err.CodeHTTP)
	l.StatusCode = err.CodeHTTP
	json.NewEncoder(rw).Encode(Errors{[]*Error{err}})
}
