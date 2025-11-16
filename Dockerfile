# -----------------------------------------------------------
# 1) FRONTEND BUILD (Create React App)
# -----------------------------------------------------------
FROM node:20-alpine AS metrics_ui-builder

WORKDIR /app/metrics_ui

# Install metrics_ui deps
COPY metrics_ui/package.json metrics_ui/package-lock.json* ./
RUN npm install

# Copy rest of metrics_ui
COPY metrics_ui/ ./

# Build CRA production bundle
RUN npm run build



# -----------------------------------------------------------
# 2) BACKEND BUILD (Node + TypeScript)
# -----------------------------------------------------------
FROM node:20-alpine AS backendAPI-builder

WORKDIR /app/backendAPI

# Install backendAPI deps
COPY backendAPI/package.json backendAPI/package-lock.json* ./
RUN npm install

# Copy backendAPI sources
COPY backendAPI/ ./

# Copy metrics_ui build output into backendAPI/public
COPY --from=metrics_ui-builder /app/metrics_ui/build ./public

# Build backendAPI TypeScript → JS
RUN npm run build



# -----------------------------------------------------------
# 3) FINAL RUNTIME IMAGE
# -----------------------------------------------------------
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Copy compiled backendAPI
COPY --from=backendAPI-builder /app/backendAPI/dist ./dist
COPY --from=backendAPI-builder /app/backendAPI/public ./public
COPY --from=backendAPI-builder /app/backendAPI/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/index.js"]
