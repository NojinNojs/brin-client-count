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

## 📖 Docker Commands Explained

### Docker Flags Explanation
- `-d` = Run in detached mode (background)
- `-p 3001:3000` = Map port 3001 (host) to 3000 (container)
- `--name` = Give container a custom name for easy management

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

### Development with Docker (No Node.js installation needed)
```bash
# Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Start development environment with hot reload
npm run docker:dev

# Access at http://localhost:3000
```

### Development with Node.js
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🚀 For Production/Server Deployment

### Deploy to Server
```bash
# Pull and run latest production image
docker run -d -p 3000:3000 --name brin-client-count nojinnojs/brin-client-count:latest

# Or with custom port
docker run -d -p 8080:3000 --name brin-client-count nojinnojs/brin-client-count:latest

# For production with restart policy
docker run -d -p 3000:3000 --restart unless-stopped --name brin-client-count nojinnojs/brin-client-count:latest
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
