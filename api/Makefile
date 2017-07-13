BINARY=ep17-quizz-api

VERSION=`git describe --abbrev=0 --tags`
BUILD=`date +%FT%T%z`
HASH=`git rev-parse HEAD`

# Setup the -ldflags option for go build
LDFLAGS=-ldflags "-X main.Version=${VERSION} -X main.Build=${BUILD} -X main.Hash=${HASH} -s -w"

.DEFAULT_GOAL: $(BINARY)

# Builds the project
$(BINARY):
	go build ${LDFLAGS} -o ${BINARY}

# Cleans our project
clean:
	if [ -f ${BINARY} ] ; then rm ${BINARY} ; fi

# Clean and install
re: clean $(BINARY)

.PHONY: clean install re
