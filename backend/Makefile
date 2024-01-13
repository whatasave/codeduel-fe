build:
	@go build -o ../bin/$(BINARY_NAME) -v

# run: build
# 	./bin/$(BINARY_NAME).exe

run:
	@go run .

test:
	@go test -v ./...

clean:
	@go clean
	@rm -f bin/$(BINARY_NAME)
