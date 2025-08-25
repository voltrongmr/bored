# Games Integration for BORED v5

This system automatically integrates your Games folder into BORED v5, creating a dynamic grid of game cards that automatically updates when you add new games.

## How It Works

1. **Automatic Discovery**: The system scans your Games folder and creates cards for each game
2. **Dynamic Loading**: Games are loaded from their respective folders when clicked
3. **Easy Management**: Add new games by simply dropping them into the Games folder
4. **Smart Entry Points**: Automatically finds the correct entry point (index.html, game.html, etc.)

## File Structure

```
boredv5-main/
├── index.html              # Main BORED interface
├── games-loader.js         # Core games loading logic
├── games-config.js         # Game configurations and metadata
├── Games/                  # Your games folder
│   ├── flappybird/
│   │   └── index.html
│   ├── cookieclicker/
│   │   └── index.html
│   └── ... (more games)
└── README-GAMES.md         # This file
```

## Adding New Games

### Method 1: Automatic Detection (Recommended)
Simply drop a new game folder into your `Games/` directory. The system will automatically detect it on the next refresh.

### Method 2: Manual Configuration
For games that need custom metadata, edit `games-config.js`:

```javascript
// Add this to the GAMES_CONFIG object
newgame: {
    name: "My New Game",
    icon: "🎮",
    description: "Description of the game",
    entryPoint: "index.html" // or "game.html", "main.html", etc.
}
```

## Game Entry Points

The system automatically looks for these files in order:
1. `index.html` (most common)
2. `game.html`
3. `main.html`
4. `play.html`

## Features

- **Search**: Filter games by name or description
- **Categories**: Games are organized by type (strategy, arcade, etc.)
- **Fullscreen Mode**: Play games in fullscreen
- **Responsive Design**: Works on all screen sizes
- **Auto-refresh**: Scan for new games with the refresh button

## Troubleshooting

### Game Not Loading?
1. Check that the game folder has an HTML file (index.html, game.html, etc.)
2. Ensure the game folder name matches the configuration
3. Try refreshing the games list

### Adding Custom Icons
You can use any emoji or text as game icons. For custom images, modify the `games-loader.js` file.

### Performance
- Games are loaded on-demand (not all at once)
- Large game collections may take a moment to load initially
- Use the search function to quickly find specific games

## Customization

### Changing Game Icons
Edit the `icon` field in `games-config.js`:
```javascript
icon: "🎮"  // Use any emoji
icon: "⚡"  // Or another emoji
```

### Adding Game Categories
Games are automatically categorized based on their folder names and descriptions. You can add custom categories by modifying the `games-loader.js` file.

### Styling
Game cards use CSS variables defined in `index.html`. Modify the `--primary`, `--secondary`, and `--accent` colors to match your theme.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Ensure all files are in the correct locations
3. Verify that your Games folder structure is correct
4. Try refreshing the page

## Future Enhancements

- Automatic game thumbnail generation
- Game ratings and reviews
- Favorite games system
- Game history tracking
- Multiplayer game support
