
FROM node:20-alpine

WORKDIR /app

# package.json is at repo ROOT
COPY package.json ./
RUN npm install --production

# Keep server/ as a FOLDER
COPY server/ ./server/

# SKILL.md at container root
COPY SKILL.md ./SKILL.md

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server/index.js"]

