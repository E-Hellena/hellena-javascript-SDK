# ==========================================
# Variables
# ==========================================
PACKAGE_NAME = @hellena-sdk/hellena
BUN = bun
NPM = npm

.PHONY: help install clean build dev pack publish publish-otp publish-token

# Default target when running just `make`
.DEFAULT_GOAL := help

## help: Shows available commands
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
# 	@grep -E '^[a-zA-Z_-]+:.*?## .*$$'$(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1,$$2}'

## install: Install project dependencies
install:
	@echo "📦 Installing dependencies..."
	$(BUN) install

## clean: Remove dist and temporary build folders
clean:
	@echo "🧹 Cleaning dist and build artifacts..."
	rm -rf dist packages *.tgz

## dev: Run local development script (index.ts)
dev:
	@echo "🚀 Running dev script..."
	$(BUN) run index.ts

## build: Build TypeScript files and generate declarations
build: clean
	@echo "🔨 Building package with Bun & TypeScript..."
	$(BUN) build src/main.ts --outdir dist --target node && tsc --emitDeclarationOnly -p tsconfig.json

## pack: Package the SDK into a local .tgz tarball
pack: build
	@echo "📦 Packaging SDK..."
	mkdir -p packages && $(NPM) pack && mv *.tgz packages/

## publish: Publish package to npm registry
publish: build
	@echo "🚀 Publishing to npm..."
	$(NPM) publish

## publish-otp: Publish to npm passing OTP 2FA code (Usage: make publish-otp OTP=123456)
publish-otp: build
	@ifndef OTP
		$(error OTP code is required. Usage: make publish-otp OTP=123456)
	@endif
	@echo "🔐 Publishing to npm with OTP..."
	$(NPM) publish --otp=$(OTP)

## publish-token: Set npm authentication token and publish (Usage: make publish-token TOKEN=npm_xxx)
publish-token: build
	@ifndef TOKEN
		$(error TOKEN is required. Usage: make publish-token TOKEN=npm_your_token_here)
	@endif
	@echo "🔑 Setting npm token and publishing..."
	$(NPM) config set //registry.npmjs.org/:_authToken=$(TOKEN)$(NPM) publish