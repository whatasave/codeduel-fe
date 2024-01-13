be-build:
	@cd backend && \
	make build

be:
	@cd backend && \
	make run &

fe:
	cd frontend && \
	yarn && \
	yarn dev

dev:
	make be-build && \
	./bin/codeduel & \
	make fe

docker-build:
	docker compose build --no-cache --force-rm --parallel

docker-up:
	docker compose up -d

docker-down:
	docker compose down

clean:
	go clean
	rm -f bin/$(BINARY_NAME)
