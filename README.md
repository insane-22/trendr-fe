# Meesho Dice Hackathon Project – Frontend

### Team Members :
- Bhumika Bachchan
-  Riya Jindal
-  Yukta Agrawal


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

### 1. Influencer Reels with Product Tagging
 - Influencers on Meesho can upload reels showcasing products available on the platform.
 - Products are tagged within the reel, allowing users to explore and purchase items seamlessly.
 - Engagement metrics such as likes and shares, are tracked to provide influencers with actionable insights. 
### 2. Swipe-Based Product Interaction
 - Users can swipe left to dismiss a product or swipe right to add it to their wishlist, creating an engaging, gamified shopping journey within Meesho.
 -  The backend updates wishlists and user preferences in real-time, enabling dynamic product recommendations based on interactions.
### 3. Dashboard and reward system
 - Influencers have access to a dedicated dashboard that displays these metrics, helping them optimize content and engagement.
 - Additionally, a coin/reward system incentivizes influencers based on the reel performance, motivating higher-quality content creation.
### 4. Personalized and Shareable Wishlists
 - Allows the users to create multiple wishlists within Meesho for specific occasions- birthdays, festivals, or events.
 - Each wishlist can be shared with friends or family, enabling collaborative shopping experiences.
### 5. Leaderboard for Top Reels
 - A weekly leaderboard highlights top-performing reels based on engagement metrics, encouraging community participation and rewarding influencers.

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




