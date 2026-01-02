# BloomLoop - Social Habit Tracking Garden App

## Overview
BloomLoop is a social habit-tracking application that visualizes user progress through a virtual garden interface. Each habit is represented by a plant that grows based on daily check-ins and completion rates. The app uses mock data stored in frontend state only.

## Core Features

### Garden Dashboard
- Interactive virtual garden displaying plants representing different habits
- Drag-and-drop functionality to reposition plants within the garden
- Visual growth stages for each plant based on habit completion progress with transparent backgrounds
- Plant images change dynamically: seedling at start, growing at mid-progress, mature when habit duration completes
- Smooth animations showing gradual plant growth over time
- Plants display growth based on daily check-ins versus total habit duration (7-30 days)

### Habit Management
- Create new habits with custom names, descriptions, and durations
- Select plant types for each habit
- Edit existing habits (name, description, duration, plant type)
- Delete habits
- Daily check-in system to mark habits as complete
- Display streak counters and completion percentages for each habit

### Social Features
- Social feed showing recent friend activities and posts
- Leaderboard button with trophy icon that opens modal showing users ranked by points or habit completions
- View friends' gardens and their habit progress
- Add friends with typeahead suggestions showing mock friend names for easy selection
- Clickable user profiles that open detailed stats view showing habits, streaks, and achievements
- Create posts with text content and emoji/avatar selection
- Change user profile picture/emoji/logo
- Mock friend interactions including posts, comments, and reactions

### Achievements System
- Dedicated Achievements page in navigation
- Display unlocked badges in full color
- Show locked badges in grayscale with requirement tooltips
- Extended mock achievements covering total days streak, number of completed habits, and social interactions milestones
- Achievement badges also displayed on user profile page

### Profile Management
- Enhanced profile editing allowing customization of username, avatar, and background color
- Profile page showing user stats and achievements

### UI Customization
- New UI Customization tab next to Profile in navigation
- Popup modal with options to modify font size, text color, and background color
- Live preview section in modal reflecting user changes in real-time
- UI customization settings persist in frontend state only (resets on refresh)

### Navigation & Layout
- Replicate the exact UI, layout, and color scheme from the reference design
- Nature-inspired green color palette
- Smooth transitions and responsive design for desktop and mobile
- Clean interface without demo watermarks
- Design consistency maintained across all new features

## Data Structure
All data is stored in frontend state using mock data including:
- User profiles with customizable avatars/emojis and background colors
- Habit definitions with progress tracking
- Friend relationships and social interactions
- Garden layout and plant positions
- Achievement unlock statuses with expanded milestone achievements
- Social feed posts and interactions
- Leaderboard rankings and user statistics
- UI customization preferences (font size, text color, background color)

## Technical Requirements
- Frontend-only application with no backend persistence
- Data resets on page refresh
- Mock data includes realistic user names and avatars
- Smooth drag-and-drop interactions with proper visual feedback
- Responsive design supporting both desktop and mobile devices
- Transparent plant images for seamless garden integration
- Dynamic plant image switching based on growth progress
- Typeahead functionality for friend suggestions
- Modal interfaces for leaderboard, user stats, and UI customization
