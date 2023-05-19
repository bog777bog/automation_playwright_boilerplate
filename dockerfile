# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.32.0-jammy
 
# Set the work directory for the application
WORKDIR /automation_playwright
 
# Set the environment path to node_modules/.bin
ENV PATH /automation_playwright/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY . /automation_playwright/

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get install -y \
    libgbm1 \
    libnss3 \
    libglib2.0-0 \
    libfontconfig \
    libfreetype6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libdbusmenu-gtk3-4 \
    libdbus-1-3 \
    lsb-release \
    xdg-utils \
    xvfb \
 && rm -rf /var/lib/apt/lists/*

# Install the dependencies in Node environment
RUN npm install

RUN npx playwright install

RUN npx playwright install chrome
