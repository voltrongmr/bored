# 🎮 Games Integration Setup for BORED v5

## 🚀 Quick Start

1. **Copy your Games folder** into the `boredv5-main` directory
2. **Run the scanner**: `node update-games.js`
3. **Open BORED v5** in your browser
4. **Click on Games** to see your integrated games!

## 📁 What You Need

Make sure you have these files in your `boredv5-main` directory:

```
boredv5-main/
├── index.html              # ✅ Already exists
├── games-loader.js         # ✅ Created
├── games-config.js         # ✅ Created  
├── update-games.js         # ✅ Created
├── Games/                  # 📁 Your games folder goes here
└── README-GAMES.md         # 📖 Documentation
```

## 🔧 Setup Steps

### Step 1: Copy Your Games Folder
Copy your existing `Games` folder into the `boredv5-main` directory so it looks like this:
```
boredv5-main/
└── Games/
    ├── flappybird/
    ├── cookieclicker/
    ├── geometrydash/
    └── ... (all your games)
```

### Step 2: Run the Games Scanner
Open a terminal in the `boredv5-main` directory and run:

```bash
node update-games.js
```

This will:
- Scan your Games folder
- Automatically detect all games
- Generate appropriate icons and descriptions
- Update the `games-config.js` file

### Step 3: Test the Integration
1. Open `index.html` in your browser
2. Enter the passcode (1234)
3. Click on the "Games" card
4. You should see all your games displayed as cards!

## 🎯 Features

- **Automatic Discovery**: Just drop new games into the Games folder
- **Smart Icons**: Automatically assigns appropriate emoji icons
- **Search Function**: Find games quickly with the search bar
- **Fullscreen Mode**: Play games in fullscreen
- **Responsive Design**: Works on all devices
- **Auto-refresh**: Scan for new games with the refresh button

## 🔄 Adding New Games

### Method 1: Automatic (Recommended)
1. Drop a new game folder into `Games/`
2. Run `node update-games.js`
3. Refresh your BORED v5 page
4. New game appears automatically!

### Method 2: Manual Configuration
Edit `games-config.js` to add custom metadata:

```javascript
mynewgame: {
    name: "My New Game",
    icon: "🎮",
    description: "Custom description",
    entryPoint: "game.html"
}
```

## 🛠️ Troubleshooting

### Games Not Showing?
1. **Check file structure**: Ensure Games folder is in the right place
2. **Run scanner**: Execute `node update-games.js`
3. **Check console**: Look for errors in browser console
4. **Verify paths**: Make sure all files are in the correct locations

### Game Not Loading?
1. **Check entry point**: Ensure the game has an HTML file
2. **File permissions**: Make sure files are readable
3. **Path issues**: Check that folder names match the config

### Scanner Errors?
1. **Node.js installed**: Make sure you have Node.js installed
2. **File permissions**: Ensure you can read/write to the directory
3. **Path issues**: Check that the Games folder exists

## 📱 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎨 Customization

### Changing Game Icons
Edit the `icon` field in `games-config.js`:
```javascript
icon: "🎮"  // Use any emoji
icon: "⚡"  // Or another emoji
```

### Styling
Modify CSS variables in `index.html`:
```css
:root {
    --primary: #6366f1;      /* Main color */
    --secondary: #8b5cf6;    /* Secondary color */
    --accent: #06b6d4;       /* Accent color */
}
```

## 📊 Performance Tips

- **Large collections**: Games load on-demand, so performance stays good
- **Search**: Use the search function for quick navigation
- **Refresh**: Only refresh when you add new games
- **Caching**: Modern browsers will cache game assets

## 🔮 Future Enhancements

The system is designed to be easily extensible:

- **Game thumbnails**: Add custom preview images
- **Categories**: Organize games by genre
- **Favorites**: Mark favorite games
- **History**: Track recently played games
- **Ratings**: Add game ratings and reviews

## 📞 Support

If you need help:

1. **Check the console**: Look for error messages
2. **Verify setup**: Ensure all files are in place
3. **Test scanner**: Run `node update-games.js --help`
4. **Check paths**: Verify folder structure is correct

## 🎉 You're All Set!

Your Games folder is now fully integrated into BORED v5! 

- **Add games**: Just drop them into the Games folder
- **Update**: Run the scanner when you add new games
- **Enjoy**: Play all your games from one beautiful interface

The system will automatically handle everything else! 🚀
