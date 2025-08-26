.PHONY: help install dev build start test lint clean docker-up docker-down docker-build

# Default target
help:
	@echo "🚀 Money App - Available Commands:"
	@echo ""
	@echo "📦 Installation:"
	@echo "  install        Install all dependencies"
	@echo "  install-frontend Install frontend dependencies"
	@echo "  install-backend Install backend dependencies"
	@echo ""
	@echo "🔄 Development:"
	@echo "  dev            Start all services in development mode"
	@echo "  dev-frontend   Start frontend in development mode"
	@echo "  dev-backend    Start backend services in development mode"
	@echo ""
	@echo "🏗️  Build:"
	@echo "  build          Build all services"
	@echo "  build-frontend Build frontend"
	@echo "  build-backend  Build backend services"
	@echo ""
	@echo "🚀 Production:"
	@echo "  start          Start all services in production mode"
	@echo "  start-frontend Start frontend in production mode"
	@echo "  start-backend  Start backend services in production mode"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  test           Run all tests"
	@echo "  test-frontend  Run frontend tests"
	@echo "  test-backend   Run backend tests"
	@echo ""
	@echo "🔍 Linting:"
	@echo "  lint           Run linting on all services"
	@echo "  lint-frontend  Run frontend linting"
	@echo "  lint-backend   Run backend linting"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  docker-up      Start all Docker services"
	@echo "  docker-down    Stop all Docker services"
	@echo "  docker-build   Build all Docker images"
	@echo ""
	@echo "🧹 Cleanup:"
	@echo "  clean          Clean all build artifacts and dependencies"

# Installation
install:
	@echo "📦 Installing all dependencies..."
	npm run install:all

install-frontend:
	@echo "📦 Installing frontend dependencies..."
	npm run install:frontend

install-backend:
	@echo "📦 Installing backend dependencies..."
	npm run install:backend

# Development
dev:
	@echo "🔄 Starting all services in development mode..."
	npm run dev:all

dev-frontend:
	@echo "🔄 Starting frontend in development mode..."
	npm run dev:frontend

dev-backend:
	@echo "🔄 Starting backend services in development mode..."
	npm run dev:backend

# Build
build:
	@echo "🏗️  Building all services..."
	npm run build:all

build-frontend:
	@echo "🏗️  Building frontend..."
	npm run build:frontend

build-backend:
	@echo "🏗️  Building backend services..."
	npm run build:backend

# Production
start:
	@echo "🚀 Starting all services in production mode..."
	npm run start:all

start-frontend:
	@echo "🚀 Starting frontend in production mode..."
	npm run start:frontend

start-backend:
	@echo "🚀 Starting backend services in production mode..."
	npm run start:backend

# Testing
test:
	@echo "🧪 Running all tests..."
	npm run test:all

test-frontend:
	@echo "🧪 Running frontend tests..."
	npm run test:frontend

test-backend:
	@echo "🧪 Running backend tests..."
	npm run test:backend

# Linting
lint:
	@echo "🔍 Running linting on all services..."
	npm run lint:all

lint-frontend:
	@echo "🔍 Running frontend linting..."
	npm run lint:frontend

lint-backend:
	@echo "🔍 Running backend linting..."
	npm run lint:backend

# Docker
docker-up:
	@echo "🐳 Starting all Docker services..."
	docker-compose up -d

docker-down:
	@echo "🐳 Stopping all Docker services..."
	docker-compose down

docker-build:
	@echo "🐳 Building all Docker images..."
	docker-compose build

docker-dev-up:
	@echo "🐳 Starting development Docker services..."
	docker-compose -f docker-compose.dev.yml up -d

docker-dev-down:
	@echo "🐳 Stopping development Docker services..."
	docker-compose -f docker-compose.dev.yml down

# Cleanup
clean:
	@echo "🧹 Cleaning all build artifacts and dependencies..."
	rm -rf node_modules
	rm -rf frontend/node_modules
	rm -rf backend/*/node_modules
	rm -rf gateway/node_modules
	rm -rf frontend/.next
	rm -rf frontend/out
	rm -rf backend/*/dist
	rm -rf coverage
	rm -rf .nyc_output
	@echo "✅ Cleanup completed!"

# Database
db-init:
	@echo "🗄️  Initializing database..."
	docker-compose exec postgres psql -U money_user -d money_app -f /docker-entrypoint-initdb.d/init.sql

db-reset:
	@echo "🗄️  Resetting database..."
	docker-compose down -v
	docker-compose up -d postgres
	@echo "⏳ Waiting for database to be ready..."
	sleep 10
	make db-init

# Logs
logs:
	@echo "📋 Showing all service logs..."
	docker-compose logs -f

logs-frontend:
	@echo "📋 Showing frontend logs..."
	docker-compose logs -f frontend

logs-backend:
	@echo "📋 Showing backend logs..."
	docker-compose logs -f user-service financial-service investment-service notification-service payment-service analytics-service

# Health check
health:
	@echo "🏥 Checking service health..."
	@echo "Frontend: http://localhost:3000"
	@echo "API Gateway: http://localhost:8080"
	@echo "User Service: http://localhost:3001"
	@echo "Financial Service: http://localhost:3002"
	@echo "Investment Service: http://localhost:3003"
	@echo "Notification Service: http://localhost:3004"
	@echo "Payment Service: http://localhost:3005"
	@echo "Analytics Service: http://localhost:3006"
	@echo "PostgreSQL: localhost:5432"
	@echo "Redis: localhost:6379"
