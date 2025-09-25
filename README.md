# BRIN Client Count Dashboard

A modern, high-performance dashboard for monitoring BRIN client counts across different locations and time sessions. Built with Next.js 15, React 19, and optimized for speed and user experience.

![Dashboard Screenshot](./public/web-schreenshot.jpeg)

## 🚀 Quick Start

Choose your preferred method to run the application:

### 🐳 Option 1: Docker (Recommended - No Node.js required)

**Install Docker first**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### Production Mode
```bash
# Run on default port 3000
docker run -d -p 3000:3000 --name brin-client-count nojinnojs/brin-client-count:latest

# Or run on custom port (e.g., 3001)
docker run -d -p 3001:3000 --name brin-client-count nojinnojs/brin-client-count:latest
```

#### Development Mode (for team development)
```bash
# Clone repository first
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Run development environment
docker-compose --profile dev up --build
```

### 💻 Option 2: Local Development (Traditional way)

#### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- pnpm package manager (`npm install -g pnpm`)

#### Installation
```bash
# Clone the repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Copy environment template
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

#### Production Build
```bash
# Build and start production server
pnpm build
pnpm start
```

## ⚙️ Environment Configuration

### Environment Variables

⚠️ **Required Configuration** - The application will not start without these environment variables.

Create `.env` file in root directory:

```bash
# Copy the example file
cp .env.example .env
```

**Required Configuration:**

```env
# API Configuration (REQUIRED)
API_URL=10.13.222.10
API_PORT=5010

# Available Kawasan/Locations (REQUIRED - JSON array format)
KAWASAN=["gatsu", "thamrin", "ancol", "pejaten"]
```

**Note:** All environment variables are mandatory. The application will throw an error if any are missing or invalid.

### Docker with Environment Variables

⚠️ **All environment variables are required** - Container will fail to start without them.

```bash
# REQUIRED: Run with environment variables
docker run -d -p 3000:3000 \
  -e API_URL=10.13.222.10 \
  -e API_PORT=5010 \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Or with env file (RECOMMENDED)
docker run -d -p 3000:3000 --env-file .env --name brin-client-count nojinnojs/brin-client-count:latest

# Example with additional locations
docker run -d -p 3000:3000 \
  -e API_URL=192.168.1.100 \
  -e API_PORT=8080 \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten", "agam"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest
```

## 📖 Docker Commands Explained

### Docker Flags Explanation
- `-d` = Run in detached mode (background)
- `-p 3001:3000` = Map port 3001 (host) to 3000 (container)
- `--name` = Give container a custom name for easy management
- `-e KEY=value` = Set environment variable
- `--env-file .env` = Load environment variables from file

### Basic Docker Commands
```bash
# Check running containers
docker ps

# Stop and remove container
docker stop brin-client-count
docker rm brin-client-count

# View container logs
docker logs brin-client-count

# Run on different port
docker run -d -p 8080:3000 --name brin-client-count nojinnojs/brin-client-count:latest
```

## 🌍 Multi-Platform Support

### Windows
```cmd
# PowerShell
docker run -d -p 3000:3000 --name brin-client-count nojinnojs/brin-client-count:latest
```

### macOS/Linux
```bash
# Terminal
docker run -d -p 3000:3000 --name brin-client-count nojinnojs/brin-client-count:latest
```

## 🛠 For Developers

### Cross-Platform Development (Windows/Linux/Mac)

#### Option 1: Docker Development (No Node.js installation needed)
```bash
# 1. Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# 2. Copy and configure environment
cp .env.example .env
# Edit .env file with your settings

# 3. Start development environment with hot reload
docker-compose --profile dev up --build

# 4. Access at http://localhost:3000
```

#### Option 2: Direct Docker Hub (Simplest)
```bash
# Run directly from Docker Hub (no cloning needed)
docker run -d -p 3000:3000 \
  -e API_URL=10.13.222.10 \
  -e API_PORT=5010 \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Access at http://localhost:3000
```

#### Option 3: Traditional Node.js Development
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

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Team Development Workflow
```bash
# Set the default branch (adjust as needed for your repository)
export BRANCH_NAME=master  # or 'main' if your repo uses main as default

# 1. Developer makes changes
git add .
git commit -m "Add new feature"
git push origin $BRANCH_NAME

# 2. Build and push to Docker Hub (if needed)
npm run docker:build
npm run docker:push

# 3. Other team members pull latest
git pull origin $BRANCH_NAME
docker-compose --profile dev up --build
```

## 🚀 For Production/Server Deployment

### Ubuntu Server Deployment

⚠️ **Environment variables are required for all deployments**

#### Method 1: Deploy from Docker Hub (Recommended - Fastest)

```bash
# 1. SSH to your Ubuntu server
ssh user@your-server-ip

# 2. Pull latest image from Docker Hub
docker pull nojinnojs/brin-client-count:latest

# 3. Create environment file
cat > .env << EOF
API_URL=10.13.222.10
API_PORT=5010
KAWASAN=["gatsu", "thamrin", "ancol", "pejaten"]
EOF

# 4. Run container with restart policy
docker run -d -p 3000:3000 --restart unless-stopped \
  --env-file .env \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# 5. Verify deployment
docker ps
docker logs brin-client-count

# 6. Access application
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

# 4. Create environment file
cat > .env << EOF
API_URL=10.13.222.10
API_PORT=5010
KAWASAN=["gatsu", "thamrin", "ancol", "pejaten"]
EOF

# 5. Build and run
docker build -t brin-client-count .
docker run -d -p 3000:3000 --restart unless-stopped \
  --env-file .env \
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
  --env-file .env \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest
```

#### Custom Port Configuration

```bash
# Run on port 8080 instead of 3000
docker run -d -p 8080:3000 --restart unless-stopped \
  --env-file .env \
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

### Build and Push Your Own Image
```bash
# Build local image
npm run docker:build

# Push to Docker Hub (requires login)
npm run docker:push
```

## 📊 Access Points

- **Application**: http://localhost:3000 (or your custom port)
- **Health Check**: http://localhost:3000/api/health

## 🎯 Quick Reference

### For New Team Members (Any Platform)
```bash
# Easiest way - just run from Docker Hub
docker run -d -p 3000:3000 \
  -e API_URL=10.13.222.10 \
  -e API_PORT=5010 \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Access: http://localhost:3000
```

### For Development (Clone + Docker)
```bash
# Clone and develop
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count
cp .env.example .env
docker-compose --profile dev up --build

# Access: http://localhost:3000
```

### For Server Deployment (Ubuntu)
```bash
# Method 1: From Docker Hub (Fastest)
docker pull nojinnojs/brin-client-count:latest
docker run -d -p 3000:3000 --restart unless-stopped \
  -e API_URL=10.13.222.10 \
  -e API_PORT=5010 \
  -e KAWASAN='["gatsu", "thamrin", "ancol", "pejaten"]' \
  --name brin-client-count \
  nojinnojs/brin-client-count:latest

# Method 2: From GitHub
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count
docker build -t brin-client-count .
docker run -d -p 3000:3000 --restart unless-stopped \
  --env-file .env \
  --name brin-client-count \
  brin-client-count
```

## 🔧 Essential Scripts

```json
{
  "scripts": {
    "dev": "pnpm dev",
    "build": "pnpm build", 
    "docker:dev": "docker-compose --profile dev up --build",
    "docker:prod": "docker run -d -p 3000:3000 --name brin-client-count nojinnojs/brin-client-count:latest",
    "docker:stop": "docker stop brin-client-count && docker rm brin-client-count"
  }
}
```

## 🛡 Technologies Used

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Package Manager**: pnpm (recommended)
- **Containerization**: Docker

## 🆘 Troubleshooting

### Common Issues

#### Windows Build Error (EPERM symlink)
If you get symlink permission errors on Windows:

**Solution 1: Use Windows Dockerfile**
```bash
# Build with Windows-compatible Dockerfile
npm run docker:build:windows

# Run Windows build
docker run -d -p 3000:3000 --name brin-client-count brin-client-count:windows
```

**Solution 2: Enable Developer Mode**
1. Open Windows Settings
2. Go to Update & Security → For developers
3. Enable "Developer Mode"
4. Restart your computer
5. Try build again: `pnpm run build`

**Solution 3: Run as Administrator**
```bash
# Run PowerShell as Administrator
pnpm run build
```

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

## 📝 License

This project is proprietary to BRIN (Badan Riset dan Inovasi Nasional).

---

**Built by Aqsan**
