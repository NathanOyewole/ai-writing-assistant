# AI Writing Assistant

A Next.js-based AI writing assistant that helps users generate content using OpenAI's GPT-3.5-turbo model. The application includes a fallback system for when the API is unavailable.

## Features

- 🤖 AI-powered content generation
- 💬 Clean and intuitive user interface
- ⚡ Real-time response generation
- 🛡️ Fallback system for API unavailability
- 📱 Responsive design
- 🔄 Error handling and loading states

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenAI API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/NathanOyewole/ai-writing-assistant.git
cd ai-writing-assistant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
