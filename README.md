# Economy App

An intelligent personal finance management application that lets you talk to your economy through an AI-powered chat interface.

## Overview

Economy App is designed to make personal finance management conversational and intuitive. Instead of manually tracking every transaction, you can simply chat with an AI agent to report income and expenses, ask for insights, and get personalized financial advice.

## Features

- **AI Chat Interface**: Natural language interaction with an AI agent for managing your finances
- **Fixed Income & Expenses**: Set up recurring income sources and fixed expenses
- **Dynamic Transactions**: Easily report one-time or irregular income and expenses through chat
- **Financial Visualizations**: Comprehensive graphs and charts showing your economic trends
- **AI Insights & Advice**: Get personalized financial insights, budgeting recommendations, and spending analysis

## Project Structure

This is a monorepo managed with Bun workspaces, containing:

- **`packages/backend`**: Backend code (no API server)
- **`apps/web`**: Web application (minimal setup)
- **`apps/mobile`**: Mobile application (minimal setup)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (>= 1.0.0) installed on your system

### Installation

```bash
# Install all dependencies for all workspaces
bun install
```

### Development

```bash
# Install all dependencies
bun install
```

## Individual Package Documentation

- [Backend Package](./packages/backend/README.md)
- [Web App](./apps/web/README.md)
- [Mobile App](./apps/mobile/README.md)

## Development Roadmap

1. **Phase 1**: Backend development with core financial tracking features
2. **Phase 2**: Web application with chat interface
3. **Phase 3**: AI agent integration for natural language processing
4. **Phase 4**: Data visualization and insights
5. **Phase 5**: Mobile application
