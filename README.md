# FlexAI

FlexAI is a Next.js application that integrates with various AI services including OpenAI, Google PaLM, and Gemini.

## Installation Requirements

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/flexai-v2.git
cd flexai-v2
```

### Step 2: Install Dependencies

```bash
npm install
```

If you encounter any errors related to missing packages, you may need to install them manually:

```bash
# For markdown rendering functionality
npm install markdown-it --save
```

### Step 3: Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google PaLM
PALM_API_KEY=your_palm_api_key

# Google Gemini (if needed)
GEMINI_API_KEY=your_gemini_api_key
```

You can obtain these API keys from:
- [OpenAI API Keys](https://platform.openai.com/account/api-keys)
- [Google AI Studio](https://makersuite.google.com/app/apikey) for PaLM and Gemini API keys

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Step 5: Build for Production (Optional)

```bash
npm run build
npm start
```

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Radix UI Components
- OpenAI API
- Google PaLM API
- Google Gemini API
- Markdown-it (for rendering markdown content)

## Project Structure

- `/pages`: Next.js pages
- `/components`: React components
- `/styles`: CSS and Tailwind styles
- `/public`: Static assets
- `/lib`: Utility functions
- `/hooks`: Custom React hooks

## Troubleshooting

If you encounter any issues during installation:

1. Make sure all environment variables are correctly set
2. Check that you're using compatible Node.js and npm versions
3. Clear npm cache with `npm cache clean --force` and try reinstalling dependencies
4. Ensure you have proper API keys with sufficient credits/permissions 