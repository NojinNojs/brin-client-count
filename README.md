# BRIN Client Count Dashboard

A modern, high-performance dashboard for monitoring BRIN client counts across different locations and time sessions. Built with Next.js 15, React 19, and optimized for speed and user experience.

![Dashboard Screenshot](./public/web-schreenshot.jpeg)

## 🚀 Quick Start

### Prerequisites
- Docker installed ([Download Docker](https://www.docker.com/get-started))
- Git (for development)

### Development Environment

#### Option 1: Docker Development (Recommended - No Node.js required)
```bash
# 1. Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# 2. Create .env file
cp .env.example .env

# 3. Edit .env with your values
# NEXT_PUBLIC_API_URL="10.13.222.10"
# NEXT_PUBLIC_API_PORT="5010"
# NEXT_PUBLIC_KAWASAN='["gatsu","thamrin","ancol","pejaten","agam"]'

# 4. Start development with hot reload
npm run docker:dev

# Access: http://localhost:3000
```

#### Option 2: Traditional Node.js Development
```bash
# Prerequisites: Node.js 18+ and pnpm
# Windows: Download from https://nodejs.org/
# Linux: sudo apt install nodejs npm && npm install -g pnpm
# Mac: brew install node && npm install -g pnpm

# 1. Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# 2. Install dependencies
pnpm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env with your values
# NEXT_PUBLIC_API_URL="10.13.222.10"
# NEXT_PUBLIC_API_PORT="5010"
# NEXT_PUBLIC_KAWASAN='["gatsu","thamrin","ancol","pejaten","agam"]'

# 5. Start development server
pnpm dev

# 6. Build for production
pnpm build

# 7. Start production server
pnpm start

# Access: http://localhost:3000
```

### Production Environment

```bash
# 1. Build production image
npm run docker:build

# 2. Push to Docker Hub
npm run docker:push

# 3. Run on server with environment variables
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest
```

## ⚙️ Environment Configuration

### .env.example
```env
# API Configuration (Client-side accessible)
NEXT_PUBLIC_API_URL="10.13.222.10"
NEXT_PUBLIC_API_PORT="5010"

# Available Kawasan/Locations (JSON array format)
NEXT_PUBLIC_KAWASAN='["gatsu","thamrin","ancol","pejaten","agam"]'
```

**Note:** All environment variables are mandatory and must use `NEXT_PUBLIC_` prefix for client-side access. The application will throw an error if any are missing or invalid.

## 🔧 Available Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack", 
  "start": "next start",
  "lint": "eslint",
  "docker:dev": "docker-compose up --build",
  "docker:build": "docker build --target prod -t brin-client-count .",
  "docker:push": "docker tag brin-client-count nojinnojs/brin-client-count:latest && docker push nojinnojs/brin-client-count:latest"
}
```

## 🛠 For Developers

### Development Workflow

#### Option 1: Docker Development (Recommended - No Node.js required)
```bash
# Clone and start development
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Copy environment template
cp .env.example .env

# Edit .env with your values
# Start development with hot reload
npm run docker:dev

# Access: http://localhost:3000
```

#### Option 2: Traditional Node.js Development
```bash
# Prerequisites: Node.js 18+ and pnpm
# Windows: Download from https://nodejs.org/
# Linux: sudo apt install nodejs npm && npm install -g pnpm
# Mac: brew install node && npm install -g pnpm

# Clone and setup
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Configure environment
cp .env.example .env
# Edit .env file with your settings

# Install dependencies
pnpm install

# Start development server (reads .env automatically)
pnpm dev

# Build for production (reads .env automatically)
pnpm build

# Start production server (reads .env automatically)
pnpm start
```

### Team Development Workflow
```bash
# 1. Developer makes changes
git add .
git commit -m "Add new feature"
git push origin main

# 2. Build and push to Docker Hub (if needed)
npm run docker:build
npm run docker:push

# 3. Other team members pull latest
git pull origin main
npm run docker:dev
```

## 🚀 For Production/Server Deployment

### Ubuntu Server Deployment

#### Method 1: Deploy from Docker Hub (Recommended - Fastest)

```bash
# 1. SSH to your Ubuntu server
ssh user@your-server-ip

# 2. Pull latest image from Docker Hub
docker pull nojinnojs/brin-client-count:latest

# 3. Run container with environment variables
docker run -d -p 3000:3000 --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# 4. Verify deployment
docker ps
docker logs brin-client-count

# 5. Access application
# http://your-server-ip:3000
```

#### Method 2: Deploy from GitHub (Build on Server)

```bash
# 1. SSH to your Ubuntu server
ssh user@your-server-ip

# 2. Install Git (if not installed)
sudo apt update && sudo apt install git -y

# 3. Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# 4. Build production image
npm run docker:build

# 5. Run with environment variables
docker run -d -p 3000:3000 --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  brin-client-count

# 6. Verify deployment
docker ps
docker logs brin-client-count
```

#### Server Management Commands

```bash
# Check container status
docker ps

# View logs
docker logs brin-client-count

# Restart container
docker restart brin-client-count

# Stop container
docker stop brin-client-count

# Start container
docker start brin-client-count

# Update container (pull latest from Docker Hub)
docker pull nojinnojs/brin-client-count:latest
docker stop brin-client-count
docker rm brin-client-count
docker run -d -p 3000:3000 --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest
```

#### Custom Port Configuration

```bash
# Run on port 8080 instead of 3000
docker run -d -p 8080:3000 --restart unless-stopped \
  -e API_URL="10.13.222.10" \
  -e API_PORT="5010" \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Access at http://your-server-ip:8080
```

#### Health Check & Monitoring

```bash
# Health check endpoint
curl http://localhost:3000/api/health

# Container stats
docker stats brin-client-count

# Real-time logs
docker logs -f brin-client-count
```

## 📊 Access Points

- **Application**: http://localhost:3000 (or your custom port)
- **Health Check**: http://localhost:3000/api/health

## 🎯 Quick Reference

### For New Team Members (Any Platform)
```bash
# Easiest way - just run from Docker Hub
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Access: http://localhost:3000
```

### For Development (Clone + Docker)
```bash
# Clone and develop
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Copy environment template
cp .env.example .env

# Edit .env with your values
# Option 1: Docker development (recommended)
npm run docker:dev

# Option 2: Traditional development
pnpm install
pnpm dev

# Access: http://localhost:3000
```

### For Server Deployment (Ubuntu)
```bash
# Method 1: From Docker Hub (Fastest)
docker pull nojinnojs/brin-client-count:latest
docker run -d -p 3000:3000 --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL="10.13.222.10" \
  -e NEXT_PUBLIC_API_PORT="5010" \
  -e NEXT_PUBLIC_KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Method 2: From GitHub (Build Required)
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Build production image
npm run docker:build

# Run with environment variables
docker run -d -p 3000:3000 --restart unless-stopped \
  -e API_URL="10.13.222.10" \
  -e API_PORT="5010" \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  brin-client-count
```

## 🛡 Technologies Used

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Package Manager**: pnpm (recommended)
- **Containerization**: Docker

## 🔒 Security Features

- **No Hard-coded Secrets**: All configuration via environment variables
- **Environment-based Configuration**: All API endpoints and locations configurable via environment variables
- **Build-time Validation**: Application fails to build if required environment variables are missing
- **Client-side Safety**: No internal network details embedded in client bundle

## 🆘 Troubleshooting

### Common Issues

#### Port already in use
```bash
# Find and kill process using port
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux  
lsof -ti:3000 | xargs kill -9
```

#### Docker permission denied (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### Can't access application
- Check if container is running: `docker ps`
- Check container logs: `docker logs brin-client-count`
- Try different port: `docker run -d -p 3001:3000 --name brin-client-count nojinnojs/brin-client-count:latest`

#### Environment variables not working
- Check if .env file exists: `ls -la .env`
- Verify environment variables: `cat .env`
- For production, ensure environment variables are passed with `-e` flag

## 📝 License

This project is proprietary to BRIN (Badan Riset dan Inovasi Nasional).

---

**Built by Aqsan**