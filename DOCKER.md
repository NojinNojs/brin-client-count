# 🐳 Docker Deployment Guide

Panduan lengkap untuk menjalankan BRIN Client Count Dashboard menggunakan Docker di berbagai platform.

## 🚀 Quick Start (Tanpa Source Code)

Jika Anda hanya ingin menjalankan aplikasi tanpa perlu source code:

### Windows
```cmd
# Download dan install Docker Desktop
# Kemudian jalankan:
docker run -p 3000:3000 nojinnojs/brin-client-count:latest
```

### macOS
```bash
# Download dan install Docker Desktop
# Kemudian jalankan:
docker run -p 3000:3000 nojinnojs/brin-client-count:latest
```

### Linux
```bash
# Install Docker (lihat panduan di README.md)
# Kemudian jalankan:
docker run -p 3000:3000 nojinnojs/brin-client-count:latest
```

Buka http://localhost:3000 untuk melihat dashboard.

## 📦 Available Images

| Image | Description | Size | Use Case |
|-------|-------------|------|----------|
| `nojinnojs/brin-client-count:latest` | Production build | ~150MB | Production deployment |
| `nojinnojs/brin-client-count:dev` | Development build | ~200MB | Development with hot reload |

## 🔧 Advanced Usage

### Using Docker Compose

#### Production
```bash
# Download docker-compose.prod.yml
curl -O https://raw.githubusercontent.com/NojinNojs/brin-client-count/main/docker-compose.prod.yml

# Start production service
docker-compose -f docker-compose.prod.yml up -d
```

#### Development
```bash
# Download docker-compose.yml
curl -O https://raw.githubusercontent.com/NojinNojs/brin-client-count/main/docker-compose.yml

# Start development service
docker-compose --profile hub-dev up
```

### Environment Variables

```bash
# Custom port
docker run -p 8080:3000 nojinnojs/brin-client-count:latest

# Custom environment
docker run -p 3000:3000 -e NODE_ENV=production nojinnojs/brin-client-count:latest
```

### Volume Mounting (Development)

```bash
# Mount current directory for development
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules nojinnojs/brin-client-count:dev
```

## 🏗️ Building from Source

Jika Anda ingin build sendiri dari source code:

```bash
# Clone repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Build production image
docker build -t brin-client-count:latest .

# Build development image
docker build -f Dockerfile.dev -t brin-client-count:dev .

# Run production
docker run -p 3000:3000 brin-client-count:latest

# Run development
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules brin-client-count:dev
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill process
   kill -9 <PID>
   ```

2. **Permission denied (Linux)**
   ```bash
   # Add user to docker group
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Docker not running**
   ```bash
   # Start Docker service
   sudo systemctl start docker
   ```

### Health Check

```bash
# Check if container is healthy
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-01T00:00:00.000Z","service":"brin-client-count"}
```

## 📊 Monitoring

### Container Stats
```bash
# View container resource usage
docker stats brin-dashboard
```

### Logs
```bash
# View container logs
docker logs brin-dashboard

# Follow logs in real-time
docker logs -f brin-dashboard
```

## 🔒 Security

- Container runs as non-root user
- Multi-stage build reduces attack surface
- Health checks for monitoring
- No sensitive data in images

## 🌐 Network Configuration

### Default Ports
- **Application**: 3000
- **Health Check**: 3000/api/health

### Custom Ports
```bash
# Run on different port
docker run -p 8080:3000 nojinnojs/brin-client-count:latest
# Access via http://localhost:8080
```

## 📝 Notes

- Images are automatically updated when new versions are pushed
- Use `:latest` tag for production
- Use `:dev` tag for development
- All images are based on Node.js 20 Alpine Linux
