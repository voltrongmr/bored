#!/usr/bin/env node

/**
 * Games Folder Scanner for BORED v5
 * 
 * This script automatically scans your Games folder and updates the games-config.js file
 * with any new games it finds.
 * 
 * Usage:
 *   node update-games.js
 *   node update-games.js --scan-only    # Just scan, don't update config
 *   node update-games.js --help         # Show help
 */

const fs = require('fs');
const path = require('path');

// Default game icons based on folder names
const ICON_MAPPINGS = {
    // Tower Defense
    'btd': '🎈', 'tower': '🏰', 'defense': '🛡️',
    
    // Platformers
    'platform': '🏃', 'jump': '🦘', 'adventure': '🗺️',
    
    // Racing
    'race': '🏎️', 'car': '🚗', 'drift': '🔄', 'drive': '🚙',
    
    // Shooting
    'shoot': '🔫', 'gun': '🔫', 'fps': '🎯', 'battle': '⚔️',
    
    // Puzzle
    'puzzle': '🧩', 'brain': '🧠', 'logic': '🔍',
    
    // Arcade
    'arcade': '🎮', 'classic': '🕹️', 'retro': '📺',
    
    // Horror
    'horror': '👻', 'scary': '😱', 'nightmare': '💀',
    
    // Music
    'music': '🎵', 'rhythm': '🥁', 'beat': '🎶',
    
    // Simulation
    'sim': '🔬', 'physics': '⚗️', 'simulation': '🧪',
    
    // Sports
    'sport': '⚽', 'ball': '🏀', 'fitness': '💪',
    
    // Strategy
    'strategy': '♟️', 'tactics': '🎯', 'planning': '📋',
    
    // RPG
    'rpg': '⚔️', 'roleplay': '🎭', 'quest': '🗡️',
    
    // Casual
    'casual': '😊', 'simple': '✨', 'easy': '🌟',
    
    // Multiplayer
    'multi': '👥', 'online': '🌐', 'versus': '⚔️',
    
    // Educational
    'learn': '📚', 'education': '🎓', 'school': '🏫',
    
    // Kids
    'kid': '👶', 'child': '🧒', 'family': '👨‍👩‍👧‍👦'
};

// Common game descriptions based on folder names
const DESCRIPTION_MAPPINGS = {
    'btd': 'Tower defense game',
    'flappy': 'Navigate through obstacles',
    'cookie': 'Idle clicking game',
    'geometry': 'Rhythm-based platformer',
    'happy': 'Physics-based obstacle course',
    'jetpack': 'Endless runner with jetpack',
    'clicker': 'Idle clicking game',
    'duck': 'Duck training and racing',
    'fnaf': 'Survive the night shift',
    'fireboy': 'Cooperative puzzle adventure',
    'drift': 'Master the art of drifting',
    'factory': 'Puzzle and logic game',
    'fancy': 'Stick figure adventure',
    'friday': 'Rhythm battle game',
    'fluid': 'Physics-based simulation',
    'cell': 'Cellular automata simulator',
    'bob': 'Stealth adventure game',
    'boxing': 'Physics-based boxing',
    'bubble': 'Pop bubbles to clear the board',
    'burger': 'Spooky burger adventure',
    'burrito': 'Bison launches through candy',
    'celeste': 'Challenging platformer',
    'chibi': 'Tiny knight adventure',
    'circloo': 'Circle-based puzzle game',
    'cluster': 'Fast-paced shooting game',
    'color': 'Switch colors to survive',
    'csgo': 'CS:GO themed game',
    'cube': 'Navigate through cube obstacles',
    'cuttherope': 'Feed the candy to Om Nom',
    'dadish': 'Radish dad platformer',
    'dante': 'Epic adventure game',
    'deal': 'Business simulator',
    'death': 'Obstacle course game',
    'dino': 'Chrome dinosaur game',
    'doge': 'Mine dogecoins',
    'doodle': 'Endless jumping adventure',
    'doom': 'Classic FPS shooter',
    'drag': 'Dragon adventure game',
    'dragonball': 'Dragon Ball fighting game',
    'emulator': 'Retro game emulator',
    'escaping': 'Prison escape adventure',
    'fleeing': 'Escape the complex',
    'flippy': 'Fish flipping adventure',
    'plane': 'Plane navigation game',
    'funny': 'Hilarious game',
    'game': 'Game creation tool',
    'rash': 'Rhythm game',
    'gba': 'Game Boy Advance emulator',
    'helix': 'Helix jumping puzzle',
    'halloween': 'Spooky Halloween game',
    'gun': 'Shooting mayhem game',
    'guilty': 'Fighting game classic',
    'gold': 'Gold digging game',
    'getaway': 'Escape and shoot game',
    'hex': 'Futuristic racing game',
    'hole': 'Absorb everything game',
    'hex': 'Hexagonal puzzle game',
    'iwbtc': 'Extremely difficult platformer',
    'infiltrating': 'Stealth mission game',
    'inf': 'Endless adventure game'
};

function getIconForGame(folderName) {
    const lowerName = folderName.toLowerCase();
    
    // Check for exact matches first
    for (const [key, icon] of Object.entries(ICON_MAPPINGS)) {
        if (lowerName.includes(key)) {
            return icon;
        }
    }
    
    // Default icons based on common patterns
    if (lowerName.includes('td') || lowerName.includes('tower')) return '🏰';
    if (lowerName.includes('clicker') || lowerName.includes('idle')) return '🖱️';
    if (lowerName.includes('racing') || lowerName.includes('race')) return '🏎️';
    if (lowerName.includes('puzzle') || lowerName.includes('brain')) return '🧩';
    if (lowerName.includes('shooter') || lowerName.includes('gun')) return '🔫';
    if (lowerName.includes('platform') || lowerName.includes('jump')) return '🏃';
    if (lowerName.includes('sim') || lowerName.includes('physics')) return '🔬';
    if (lowerName.includes('music') || lowerName.includes('rhythm')) return '🎵';
    if (lowerName.includes('horror') || lowerName.includes('scary')) return '👻';
    if (lowerName.includes('strategy') || lowerName.includes('tactics')) return '♟️';
    
    // Default game icon
    return '🎮';
}

function getDescriptionForGame(folderName) {
    const lowerName = folderName.toLowerCase();
    
    // Check for exact matches first
    for (const [key, desc] of Object.entries(DESCRIPTION_MAPPINGS)) {
        if (lowerName.includes(key)) {
            return desc;
        }
    }
    
    // Generate description based on folder name
    const words = folderName.replace(/[_-]/g, ' ').split(' ');
    const cleanName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    if (lowerName.includes('2') || lowerName.includes('ii')) {
        return `${cleanName} - Enhanced sequel`;
    } else if (lowerName.includes('3') || lowerName.includes('iii')) {
        return `${cleanName} - Third installment`;
    } else if (lowerName.includes('4') || lowerName.includes('iv')) {
        return `${cleanName} - Fourth chapter`;
    } else if (lowerName.includes('5') || lowerName.includes('v')) {
        return `${cleanName} - Fifth edition`;
    } else if (lowerName.includes('6') || lowerName.includes('vi')) {
        return `${cleanName} - Latest version`;
    }
    
    return `${cleanName} - Fun game to play`;
}

function findGameEntryPoint(gamePath) {
    const entryPoints = ['index.html', 'game.html', 'main.html', 'play.html', 'start.html'];
    
    for (const entryPoint of entryPoints) {
        const fullPath = path.join(gamePath, entryPoint);
        if (fs.existsSync(fullPath)) {
            return entryPoint;
        }
    }
    
    return 'index.html'; // Default fallback
}

function scanGamesFolder(gamesPath) {
    const games = {};
    
    if (!fs.existsSync(gamesPath)) {
        console.error(`❌ Games folder not found at: ${gamesPath}`);
        return games;
    }
    
    const items = fs.readdirSync(gamesPath);
    
    for (const item of items) {
        const fullPath = path.join(gamesPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Check if it's a game folder (has HTML files)
            const htmlFiles = fs.readdirSync(fullPath).filter(file => 
                file.endsWith('.html') || file.endsWith('.htm')
            );
            
            if (htmlFiles.length > 0) {
                const entryPoint = findGameEntryPoint(fullPath);
                const icon = getIconForGame(item);
                const description = getDescriptionForGame(item);
                
                games[item] = {
                    name: item.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    icon: icon,
                    description: description,
                    entryPoint: entryPoint
                };
                
                console.log(`✅ Found game: ${item} (${entryPoint})`);
            } else {
                console.log(`⚠️  Skipped folder (no HTML files): ${item}`);
            }
        }
    }
    
    return games;
}

function updateGamesConfig(games, configPath) {
    let configContent = `// Games Configuration File
// Auto-generated by update-games.js
// Add new games here by following the format below
// The system will automatically pick up new games when you refresh

const GAMES_CONFIG = {
`;

    // Sort games alphabetically
    const sortedGames = Object.entries(games).sort(([a], [b]) => a.localeCompare(b));
    
    for (const [folder, config] of sortedGames) {
        configContent += `    ${folder}: {
        name: "${config.name}",
        icon: "${config.icon}",
        description: "${config.description}",
        entryPoint: "${config.entryPoint}"
    },\n`;
    }
    
    configContent += `};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAMES_CONFIG;
}
`;

    fs.writeFileSync(configPath, configContent);
    console.log(`📝 Updated games configuration: ${configPath}`);
}

function main() {
    const args = process.argv.slice(2);
    const scanOnly = args.includes('--scan-only');
    const help = args.includes('--help') || args.includes('-h');
    
    if (help) {
        console.log(`
🎮 Games Folder Scanner for BORED v5

Usage:
  node update-games.js              # Scan and update config
  node update-games.js --scan-only  # Just scan, don't update
  node update-games.js --help       # Show this help

This script automatically scans your Games folder and updates
the games-config.js file with any new games it finds.
        `);
        return;
    }
    
    console.log('🎮 Scanning Games folder...\n');
    
    const gamesPath = path.join(__dirname, 'Games');
    const configPath = path.join(__dirname, 'games-config.js');
    
    const games = scanGamesFolder(gamesPath);
    
    if (Object.keys(games).length === 0) {
        console.log('\n❌ No games found! Make sure your Games folder contains game directories with HTML files.');
        return;
    }
    
    console.log(`\n🎯 Found ${Object.keys(games).length} games!`);
    
    if (!scanOnly) {
        updateGamesConfig(games, configPath);
        console.log('\n✨ Games configuration updated successfully!');
        console.log('🔄 Refresh your BORED v5 page to see the new games.');
    } else {
        console.log('\n📋 Scan complete. Use without --scan-only to update the configuration.');
    }
}

if (require.main === module) {
    main();
}

module.exports = { scanGamesFolder, updateGamesConfig };
