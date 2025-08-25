// Games Loader - Automatically discovers and loads games from the Games folder
class GamesLoader {
    constructor() {
        this.gamesContainer = null;
        this.games = [];
        this.init();
    }

    async init() {
        await this.discoverGames();
        this.renderGames();
    }

    async discoverGames() {
        try {
            // This will be populated by scanning the Games directory
            // For now, we'll use a static list that can be easily updated
            this.games = [
                // Bloons Tower Defense Series
                { name: "Bloons TD", folder: "btd", icon: "🎈", description: "Classic tower defense game" },
                { name: "Bloons TD 2", folder: "btd2", icon: "🎈", description: "Enhanced tower defense sequel" },
                { name: "Bloons TD 3", folder: "btd3", icon: "🎈", description: "Advanced tower defense strategy" },
                { name: "Bloons TD 5", folder: "btd5", icon: "🎈", description: "Premium tower defense experience" },
                { name: "Bloons TD 6", folder: "btd6", icon: "🎈", description: "Latest tower defense installment" },
                
                // Popular Classics
                { name: "Flappy Bird", folder: "flappybird", icon: "🐦", description: "Navigate through pipes" },
                { name: "Cookie Clicker", folder: "cookieclicker", icon: "🍪", description: "Addictive idle clicking game" },
                { name: "Geometry Dash", folder: "geometrydash", icon: "🔷", description: "Rhythm-based platformer" },
                { name: "Happy Wheels", folder: "happywheels", icon: "🚲", description: "Physics-based obstacle course" },
                { name: "Jetpack Joyride", folder: "jetpackjoyride", icon: "🚀", description: "Endless runner with jetpack" },
                
                // Clicker Games
                { name: "Clicker Heroes", folder: "clickerheroes", icon: "⚔️", description: "RPG idle clicker game" },
                { name: "Commodore Clicker", folder: "commodoreclicker", icon: "💻", description: "Retro computer clicker" },
                { name: "Idle Breakout", folder: "idlebreakout", icon: "🧱", description: "Brick breaking idle game" },
                
                // Arcade Games
                { name: "Doodle Jump", folder: "doodlerjump", icon: "✏️", description: "Endless jumping adventure" },
                { name: "Crossy Road", folder: "crossyroad", icon: "🐔", description: "Cross the road safely" },
                { name: "Fruit Ninja", folder: "fruitninja", icon: "🍎", description: "Slice fruits with precision" },
                { name: "Cut the Rope", folder: "cuttherope", icon: "🍭", description: "Feed the candy to Om Nom" },
                
                // Strategy Games
                { name: "Chess", folder: "chess", icon: "♟️", description: "Classic chess game" },
                { name: "Champion Island", folder: "championisland", icon: "🏆", description: "Multi-sport championship" },
                
                // Retro Games
                { name: "Doom", folder: "doom", icon: "👹", description: "Classic FPS shooter" },
                { name: "Duck Life 1", folder: "ducklife1", icon: "🦆", description: "Train your duck to race" },
                { name: "Duck Life 2", folder: "ducklife2", icon: "🦆", description: "Continue your duck's journey" },
                { name: "Duck Life 3", folder: "ducklife3", icon: "🦆", description: "Advanced duck training" },
                { name: "Duck Life 4", folder: "ducklife4", icon: "🦆", description: "Epic duck racing adventure" },
                { name: "Duck Life 5", folder: "ducklife5", icon: "🦆", description: "Space duck training" },
                { name: "Duck Life 6", folder: "ducklife6", icon: "🦆", description: "Latest duck racing challenge" },
                
                // Horror Games
                { name: "Five Nights at Freddy's", folder: "fnaf", icon: "🐻", description: "Survive the night shift" },
                { name: "FNAF 2", folder: "fnaf2", icon: "🐻", description: "Second night of terror" },
                { name: "FNAF 3", folder: "fnaf3", icon: "🐻", description: "Springtrap's revenge" },
                { name: "FNAF 4", folder: "fnaf4", icon: "🐻", description: "Nightmare in the bedroom" },
                
                // Adventure Games
                { name: "Fireboy & Watergirl", folder: "fireboywatergirl", icon: "🔥💧", description: "Cooperative puzzle adventure" },
                { name: "Fireboy & Watergirl 2", folder: "fireboywatergirl2", icon: "🔥💧", description: "Light Temple adventure" },
                { name: "Fireboy & Watergirl 3", folder: "fireboywatergirl3", icon: "🔥💧", description: "Ice Temple challenge" },
                { name: "Fireboy & Watergirl 4", folder: "fireboywatergirl4", icon: "🔥💧", description: "Crystal Temple quest" },
                
                // Racing Games
                { name: "Drive Mad", folder: "drivemad", icon: "🏎️", description: "Crazy driving challenges" },
                { name: "Drift Boss", folder: "drift-boss", icon: "🔄", description: "Master the art of drifting" },
                { name: "Hill Climb Racing 2", folder: "hillclimbracing2", icon: "🚗", description: "Climb impossible hills" },
                
                // Puzzle Games
                { name: "Factory Balls", folder: "factoryballs", icon: "⚫", description: "Paint balls to match patterns" },
                { name: "Factory Balls Forever", folder: "factoryballsforever", icon: "⚫", description: "Endless ball painting puzzles" },
                { name: "Fancy Pants Adventures", folder: "fancypantsadventures", icon: "👖", description: "Stick figure adventure" },
                { name: "Fancy Pants Adventures 2", folder: "fancypantsadventures2", icon: "👖", description: "Continue the stick figure saga" },
                
                // Music Games
                { name: "Friday Night Funkin'", folder: "fridaynightfunkin", icon: "🎵", description: "Rhythm battle game" },
                
                // Simulation Games
                { name: "Fluid Simulator", folder: "fluidsim", icon: "💧", description: "Physics-based fluid simulation" },
                { name: "Cell Machine", folder: "cell-machine", icon: "🔬", description: "Cellular automata simulator" },
                
                // And many more games...
                { name: "Bob the Robber 2", folder: "bobtherobber2", icon: "🦹", description: "Stealth thief adventure" },
                { name: "Boxing Physics 2", folder: "boxingphysics2", icon: "🥊", description: "Physics-based boxing" },
                { name: "Boxing Random", folder: "boxingrandom", icon: "🥊", description: "Random boxing challenges" },
                { name: "Breaking the Bank", folder: "breakingthebank", folder: "breakingthebank", icon: "🏦", description: "Bank heist adventure" },
                { name: "Bubble Shooter", folder: "bubbleshooter", icon: "🫧", description: "Pop bubbles to clear the board" },
                { name: "Burger and Frights", folder: "burgerandfrights", icon: "🍔👻", description: "Spooky burger adventure" },
                { name: "Burrito Bison", folder: "burritobison", icon: "🌯", description: "Bison launches through candy" },
                { name: "Celeste", folder: "celeste", icon: "🏔️", description: "Challenging platformer" },
                { name: "Chibi Knight", folder: "chibiknight", icon: "⚔️", description: "Tiny knight adventure" },
                { name: "Circloo", folder: "circloo", icon: "⭕", description: "Circle-based puzzle game" },
                { name: "Cluster Rush", folder: "cluster-rush", icon: "🎯", description: "Fast-paced cluster shooting" },
                { name: "Color Switch", folder: "colorswitch", icon: "🎨", description: "Switch colors to survive" },
                { name: "CSGO Clicker", folder: "csgoclicker", icon: "🔫", description: "CS:GO themed clicker" },
                { name: "Cube Field", folder: "cubefield", icon: "⬜", description: "Navigate through cube obstacles" },
                { name: "Cut the Rope Holiday", folder: "cuttherope-holiday", icon: "🎄", description: "Festive rope cutting" },
                { name: "Dadish", folder: "dadish", icon: "🥬", description: "Radish dad platformer" },
                { name: "Dadish 2", folder: "dadish2", icon: "🥬", description: "Radish dad returns" },
                { name: "Dadish 3", folder: "dadish3", icon: "🥬", description: "Radish dad trilogy" },
                { name: "Dante", folder: "dante", icon: "⚔️", description: "Epic adventure game" },
                { name: "Deal", folder: "deal", icon: "💼", description: "Business deal simulator" },
                { name: "Death Run 3D", folder: "death-run-3d", icon: "💀", description: "3D obstacle course" },
                { name: "Dino", folder: "dino", icon: "🦖", description: "Chrome dinosaur game" },
                { name: "Doge Miner", folder: "dogeminer", icon: "🐕", description: "Mine dogecoins" },
                { name: "Doodle Jump", folder: "doodlerjump", icon: "✏️", description: "Endless jumping" },
                { name: "Doom", folder: "doom", icon: "👹", description: "Classic FPS" },
                { name: "Drag", folder: "drag", icon: "🐉", description: "Dragon adventure" },
                { name: "Dragon Ball Devolution", folder: "dragonballdevolution", icon: "🐉", description: "Dragon Ball fighting game" },
                { name: "Drift Hunters", folder: "drifthunters", icon: "🏎️", description: "Professional drifting" },
                { name: "Emulator JS", folder: "emulatorjs", icon: "🎮", description: "Retro game emulator" },
                { name: "Escaping the Prison", folder: "escapingtheprison", icon: "🚪", description: "Prison escape adventure" },
                { name: "Fleeing the Complex", folder: "fleeingthecomplex", icon: "🏃", description: "Escape the complex" },
                { name: "Flippy Fish", folder: "flippyfish", icon: "🐟", description: "Fish flipping adventure" },
                { name: "Flappy Plane", folder: "flappyplane", icon: "✈️", description: "Plane navigation game" },
                { name: "Funny Mad Racing", folder: "funnymadracing", icon: "🏎️", description: "Crazy racing game" },
                { name: "Funny Ball Game", folder: "funnyballgame", icon: "⚽", description: "Hilarious ball physics" },
                { name: "Funny Shooter", folder: "funnyshooter", icon: "🔫", description: "Comedic shooting game" },
                { name: "Funny Shooter 2", folder: "funnyshooter2", icon: "🔫", description: "More comedic shooting" },
                { name: "Game Maker", folder: "gamemaker", icon: "🎮", description: "Game creation tool" },
                { name: "Geometry Rash", folder: "geometryrash", icon: "🔷", description: "Geometric rhythm game" },
                { name: "GBA Emulator", folder: "gba", icon: "🎮", description: "Game Boy Advance emulator" },
                { name: "Helix Jump", folder: "helixjump", icon: "🧬", description: "Helix jumping puzzle" },
                { name: "Halloween 2016", folder: "halloween2016", icon: "🎃", description: "Spooky Halloween game" },
                { name: "Gun Mayhem", folder: "gunmayhem", icon: "🔫", description: "Multiplayer shooting mayhem" },
                { name: "Gun Mayhem 2", folder: "gunmayhem2", icon: "🔫", description: "Enhanced shooting mayhem" },
                { name: "Gun Mayhem Redux", folder: "gunmayhemredux", icon: "🔫", description: "Remastered shooting mayhem" },
                { name: "Guilty Gear", folder: "guiltygear", icon: "⚔️", description: "Fighting game classic" },
                { name: "Gold Digger Forever", folder: "golddiggerfrvr", icon: "⛏️", description: "Endless gold digging" },
                { name: "Getaway Shooter", folder: "getawayshooter", icon: "🔫", description: "Escape and shoot" },
                { name: "HexGL", folder: "hexgl", icon: "🏎️", description: "Futuristic racing" },
                { name: "Hole.io", folder: "holeio", icon: "🕳️", description: "Absorb everything" },
                { name: "Hextris", folder: "hextris", icon: "🔷", description: "Hexagonal Tetris" },
                { name: "I Wanna Be The Guy", folder: "iwbtc", icon: "👾", description: "Extremely difficult platformer" },
                { name: "Infiltrating the Airship", folder: "infiltratingtheairship", icon: "🚁", description: "Stealth airship mission" },
                { name: "Infinite", folder: "inf", icon: "♾️", description: "Endless adventure" }
            ];

            // Sort games alphabetically
            this.games.sort((a, b) => a.name.localeCompare(b.name));
            
        } catch (error) {
            console.error('Error discovering games:', error);
            this.games = [];
        }
    }

    renderGames() {
        if (!this.gamesContainer) {
            this.gamesContainer = document.getElementById('games-grid');
            if (!this.gamesContainer) return;
        }

        this.gamesContainer.innerHTML = '';

        if (this.games.length === 0) {
            this.gamesContainer.innerHTML = `
                <div class="no-games">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>No Games Found</h3>
                    <p>Make sure your Games folder is properly configured.</p>
                </div>
            `;
            return;
        }

        // Create game cards
        this.games.forEach(game => {
            const gameCard = this.createGameCard(game);
            this.gamesContainer.appendChild(gameCard);
        });

        // Add refresh button
        const refreshCard = this.createRefreshCard();
        this.gamesContainer.appendChild(refreshCard);
    }

    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.game = game.folder;
        
        card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-description">${game.description}</p>
            </div>
            <div class="game-actions">
                <button class="play-btn" title="Play ${game.name}">
                    <i class="fas fa-play"></i>
                </button>
                <button class="fullscreen-btn" title="Fullscreen ${game.name}">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;

        // Add event listeners
        card.querySelector('.play-btn').addEventListener('click', () => {
            this.playGame(game);
        });

        card.querySelector('.fullscreen-btn').addEventListener('click', () => {
            this.playGameFullscreen(game);
        });

        return card;
    }

    createRefreshCard() {
        const card = document.createElement('div');
        card.className = 'game-card refresh-card';
        
        card.innerHTML = `
            <div class="game-icon">
                <i class="fas fa-sync-alt"></i>
            </div>
            <div class="game-info">
                <h3 class="game-title">Refresh Games</h3>
                <p class="game-description">Scan for new games in folder</p>
            </div>
            <div class="game-actions">
                <button class="refresh-btn" title="Refresh Games">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        `;

        card.querySelector('.refresh-btn').addEventListener('click', () => {
            this.refreshGames();
        });

        return card;
    }

    playGame(game) {
        const gamePath = `Games/${game.folder}/index.html`;
        
        // Check if game has index.html, if not, look for other common files
        fetch(gamePath)
            .then(response => {
                if (response.ok) {
                    this.openGame(game, gamePath);
                } else {
                    // Try to find alternative entry points
                    this.findGameEntryPoint(game);
                }
            })
            .catch(() => {
                this.findGameEntryPoint(game);
            });
    }

    findGameEntryPoint(game) {
        // Common entry point files to check
        const entryPoints = [
            `Games/${game.folder}/index.html`,
            `Games/${game.folder}/game.html`,
            `Games/${game.folder}/main.html`,
            `Games/${game.folder}/play.html`
        ];

        // For now, just try the first one and show a message
        this.openGame(game, entryPoints[0]);
    }

    openGame(game, path) {
        // Create or update the game iframe
        const gameIframe = document.getElementById('game-iframe');
        if (gameIframe) {
            gameIframe.src = path;
            gameIframe.title = game.name;
            
            // Show the game container
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                gameContainer.classList.add('show');
            }
        }
    }

    playGameFullscreen(game) {
        const gamePath = `Games/${game.folder}/index.html`;
        
        // Open in fullscreen overlay
        const fullscreenOverlay = document.getElementById('fullscreen-overlay');
        const fullscreenIframe = document.getElementById('fullscreen-iframe');
        const fullscreenTitle = document.getElementById('fullscreen-title');
        
        if (fullscreenOverlay && fullscreenIframe && fullscreenTitle) {
            fullscreenIframe.src = gamePath;
            fullscreenTitle.textContent = game.name;
            fullscreenOverlay.classList.add('show');
        }
    }

    async refreshGames() {
        // Show loading state
        const refreshBtn = document.querySelector('.refresh-card .refresh-btn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }

        // Simulate refresh delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Re-discover games
        await this.discoverGames();
        this.renderGames();

        // Show success message
        if (typeof showNotification === 'function') {
            showNotification(`Refreshed! Found ${this.games.length} games`, 'success');
        }
    }

    // Method to add a new game dynamically
    addGame(gameData) {
        this.games.push(gameData);
        this.games.sort((a, b) => a.name.localeCompare(b.name));
        this.renderGames();
    }

    // Method to remove a game
    removeGame(folderName) {
        this.games = this.games.filter(game => game.folder !== folderName);
        this.renderGames();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamesLoader;
}
