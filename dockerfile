# Base image
FROM ubuntu:latest

# Set the working directory
WORKDIR /automation_playwright

# Install Node.js and dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs
    
# Install dependencies for Playwright
RUN apt-get install -y \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    libatk1.0-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    libgbm1 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    libatk1.0-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    libgbm1 \
    libatk-bridge2.0-0 \
    libepoxy0 \
    libevent-2.1-7 \
    libxcb-dri3-0 \
    libsecret-1-0 \
    libx11-xcb1 \
    libxkbcommon0 \
    libstdc++6 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxrender1 \
    libdbus-1-3 \
    libdbus-glib-1-2 \
    libatspi2.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxkbcommon0 \
    libxcb-dri3-0 \
    libsecret-1-0 \
    libx11-xcb1 \
    libxkbcommon0 \
    libxcb-dri3-0 \
    libsecret-1-0 \
    libx11-xcb1 \
    libxkbcommon0 \
    libxcb-dri3-0 \
    libsecret-1-0

# Copy the project files to the container
COPY . .

# Install project dependencies
RUN npm install

# Install Playwright
RUN npx playwright install

# Run the tests
CMD ["npm", "test"]