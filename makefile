# Hellena JavaScript SDK
PACKAGE_NAME = @hellena-sdk/hellena
BUN = bun
NPM = npm
TOKEN = npm_

.PHONY: help install clean build dev pack publish publish-otp

.DEFAULT_GOAL := help

help:
	@echo "Usage: make [target]"
	@echo "  install      Install dependencies"
	@echo "  clean        Remove build artifacts"
	@echo "  build        Build JavaScript bundle and TypeScript declarations"
	@echo "  dev          Run development entry point"
	@echo "  pack         Create an npm tarball"
	@echo "  publish      Publish to npm (requires npm login)"
	@echo "  publish-otp  Publish with npm 2FA (make publish-otp OTP=123456)"

install:
	$(BUN) install

clean:
	rm -rf dist packages *.tgz

dev:
	$(BUN) run index.ts

build: clean
	$(BUN) run build

pack: build
	mkdir -p packages
	$(NPM) pack
	mv *.tgz packages/

publish: build
	$(NPM) publish --access public

config:
	$(NPM) config set //registry.npmjs.org/:_authToken=$(TOKEN)