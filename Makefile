be:
	@cd backend && \
	make run &

be-build:
	@cd backend && \
	make build

fe:
	cd frontend && \
	yarn && \
	yarn dev

dev:
	make be-build && \
	./bin/codeduel & \
	make fe

clean:
	go clean
	rm -f bin/$(BINARY_NAME)
