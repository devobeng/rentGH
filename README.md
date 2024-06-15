# Property Listing Web Application

This project is a full-featured property listing web application built with Next.js. It leverages MongoDB for database operations, Mongoose for object modeling, Google Auth via NextAuth for authentication, and react-icons for icons. The app is designed to handle various property listings and user management with a focus on performance and scalability using NoSQL.

# Table of Contents

- Features
- Technologies
- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
  - Running the Application
- Project Structure
- Usage
- Contributing
- License
- Contact

# Features

- User authentication with Google using NextAuth
- Secure user sessions and state management
- Property listing CRUD operations
- Realtor profiles
- Messaging between users and realtors
- Rating system for properties and realtors
- Bookmarking properties
- Responsive design(Tailwind CSS)
- Modern UI with react-icons
- NoSQL database operations with MongoDB and Mongoose

# Technologies

- Next.js
- React
- MongoDB
- Mongoose
- NextAuth.js
- react-icons
- NoSQL
- Tailwind CSS

# Getting Started

## Prerequisites

- Node.js (>= 12.x)
- MongoDB Atlas account or local MongoDB server

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/property-listing-app.git
   cd property-listing-app
2. Install dependencies:
   npm install
3. Environment Variables
   Create a .env.local file in the root directory and add the following environment variables:

MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
SECRET=your_secret_key
Running the Application
Start the development server:

npm run dev
Open your browser and navigate to http://localhost:3000.

# Usage

1. Authentication: Click on the "Sign in with Google" button to authenticate yourself.
2. Property Listings: View the list of properties on the home page.
3. Add Property: After authentication, navigate to the "Add Property" page to create a new listing.
4. Edit/Delete Property: Edit or delete properties you have created.
5. Realtor Profiles: View and manage realtor profiles.
6. Message Realtors: Send messages to realtors directly from the property listing.
7. Rate Properties: Rate properties and view ratings from other users.
8. Bookmark Properties: Bookmark properties for easy access later.

# Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create your feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add your feature')
4. Push to the branch (git push origin feature/your-feature)
5. Create a new Pull Request

# License

This project is licensed under the MIT License.

# Contact

- Author: Obeng Bismark
- Email: dev.obeng.bismark@gmail.com
- GitHub: devobeng
