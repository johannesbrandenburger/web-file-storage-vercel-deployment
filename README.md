# Web File Storage

This is a template for creating applications using Next.js 13 (app directory) and NextUI (v2).

## Operating Systems

- Ubuntu 22.04
- Windows 11
- MacOS 14.0

## Programming Languages and Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js 13](https://nextjs.org/docs/getting-started)
- [MongoDB](https://www.mongodb.com/)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Runtime Environment

- [Node.js 20.8.0](https://nodejs.org/en/)

## Database and Storage

- [MongoDB](https://www.mongodb.com/) to store the file information
- Local file system (serverside) to store the file

## How to Use

- Clone this repository
- Setup MongoDB [(see here)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- Start MongoDB
- Create the database: `npm run create-db` (note: only do this to set up the database or if you want to reset the database)
- Install the dependencies: `npm install`
- Start the development server: `npm run dev`
- Or build and start the production server: `npm run build && npm run start`