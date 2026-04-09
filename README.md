# Price Scraper Pro

An automated e-commerce product price data collection and comparison analysis tool. This project provides a robust solution to scrape product prices from various social e-commerce platforms (like Telegram, Instagram, LinkedIn, and X), clean the data, analyze it, and present it via a sleek web dashboard or a convenient Command Line Interface (CLI).

## Features

- **Multi-Platform Scraping**: Supports fetching data from platforms like `t.me`, `instagram.com`, `linkedin.com`, and `x.com`.
- **Data Processing**: Cleans invalid entries, normalizes prices, and deduplicates products.
- **Smart Recommendations**: Uses a custom algorithm considering price, sales volume, and rating to assign badges like "Best Value" or "Trending".
- **Interactive Dashboard**: A React-based UI built with TailwindCSS to visualize the scraped data using Recharts (Price Trends & Sales Volume).
- **CLI Tool**: A built-in command-line tool to run scrapers directly from the terminal and view results in an ASCII table.

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite, Zustand, Recharts, Lucide React
- **Backend**: Node.js, Express
- **Scraping Engine**: Playwright
- **CLI**: Commander, cli-table3

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers (required for the scraping engine):
   ```bash
   npx playwright install chromium
   ```

### Running the Web Application

Start both the frontend client and the backend server concurrently:

```bash
npm run dev
```

- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### Running the CLI Tool

You can run the scraper directly from your terminal using the built-in CLI:

```bash
# Basic search using default platforms
npx tsx cli.ts search smartphone

# Search on specific platforms
npx tsx cli.ts search laptop --platforms t.me,x.com
```

## Architecture & Requirements

Please check the `.trae/documents/` folder for more detailed information:
- [Product Requirements Document (PRD)](.trae/documents/PRD.md)
- [Technical Architecture](.trae/documents/Technical_Architecture.md)

## Cloud Environments (GitHub Codespaces)

This project is fully compatible with GitHub Codespaces. When opening the repository in a Codespace, ensure you run `npm install` and `npx playwright install chromium` before starting the application or running the CLI.
