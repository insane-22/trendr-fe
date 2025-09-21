# Meesho Dice Hackathon Project – Frontend

### Team Members :
Bhumika Bachchan, Riya Jindal, Yukta Agrawal


## Project Overview

This frontend project brings a Meesho app to life, combining shopping with social discovery for users and influencerss.

<img width="1600" height="659" alt="image" src="https://github.com/user-attachments/assets/dd54489e-fbf3-4317-b6cb-2c3e505e1bda" />
<img width="1600" height="600" alt="image" src="https://github.com/user-attachments/assets/e84fb01a-149d-48b4-b4c4-a620ffd21d3f" />

---

## Key goals

- Let users create and personalized wishlists for different occasions.
- Allow influencers to upload reels and tag products in them.
- Enable users to interact with products via swipe gestures (like/reject).
- Maintain a leaderboard for most liked Reel.

--- 

## Features

### 1. Personalized and Shareable Wishlists

- Users can create multiple wishlists for specific occasions (birthdays, festivals, etc.).
- Wishlists can be shared with other users.
- Backend supports CRUD operations for wishlists and ensures proper product-user association.

### 2. Influencer Reels with Product Tagging

- Influencers can upload reels showcasing products.
- Products can be tagged and viewed within reels for easy access.
- Tracks likes for engagement metrics.

### 3. Swipe-Based Product Interaction

- Users can swipe left to reject a product or swipe right to add it to a wishlist(dating-app like feel).
- Backend updates the user's preferences and wishlists accordingly.

### 4. Leaderboard for Top Reels

- Calculates weekly top reels based on engagement metrics (likes).
- Provides real-time leaderboard updates.

---


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/insane-22/trendr-fe.git
cd trendr-fe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the .env.example to .env.local:
cp .env.example .env.local

# Update the .env.local file with your credentials and API endpoints:
UPLOADTHING_TOKEN='<your-uploadthing-token>'
NEXT_PUBLIC_BASE_API='<your-backend-api-url>'
```

### 4. Run the Development Server

```bash
npm run dev
```




