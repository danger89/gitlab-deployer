FROM node:lts-slim
ENV NODE_ENV production

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# Install PHP (used for post-deployment commands)
RUN apt update && apt install -y php-cli php-intl php-mbstring php-xml php-zip

# Worarkound https://github.com/npm/cli/issues/5900
RUN npm install --omit=dev && \
  chown -R node:node node_modules

COPY --chown=node:node . .

# Create temp folder
RUN mkdir -p /app/tmp
RUN chown node:node /app/tmp

# Create dest folder, but should not be used in production,
# instead the user should volume mount /app/dest folder
RUN mkdir -p /app/dest
RUN chown node:node /app/dest

USER node

EXPOSE 3042

HEALTHCHECK --interval=120s --timeout=12s --start-period=6s \
  CMD node healthcheck.js

CMD ["npm", "start"]
