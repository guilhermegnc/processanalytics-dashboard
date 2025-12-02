# ProcessAnalytics Dashboard

A comprehensive dashboard for analyzing supply chain process times, featuring KPI tracking, trend analysis, and segmentation by supplier, city, and store.

## Features

- **KPI Tracking**: Monitor key performance indicators such as Order to Invoice, Invoice to Delivery, and Delivery to Entry times.
- **Trend Analysis**: Visualise temporal evolution of metrics with interactive charts.
- **Segmentation**: Analyze performance breakdowns by Supplier, City, and Store.
- **Interactive Filtering**: Filter data dynamically to focus on specific segments.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive user interface.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS (CDN), Lucide React (Icons)
- **Charts**: Recharts
- **Data**: Mock data generator included for demonstration

## Run Locally

**Prerequisites:** Node.js (v18 or higher recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Build

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.
