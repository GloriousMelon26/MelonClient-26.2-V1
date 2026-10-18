// MelonClient Game Core + EaglerForge Mod Configuration
window.addEventListener('DOMContentLoaded', () => {
    console.log("MelonClient Core Mods Booting...");

    // Reconstruct asset paths safely using separate string variables
    const CDN_HOST = "https://eaglercraftnoa.github.io";
    const FOLDER_PATH = "/version";
    const ASSET_FILE = "/assets.epk";
    const RESOLVED_URI = CDN_HOST + FOLDER_PATH + ASSET_FILE;

    // 1. Core Boot Parameters for Eaglercraft Engine
    window.eaglercraftXOpts = {
        container: "game-container",
        canvas: "canvas",
        assetsURI: RESOLVED_URI, // Fixed asset path string
        serverList: [
            { addr: "wss://relay.as93.net", name: "Melon Relay" }
        ]
    };

    // 2. Mod Feature: Permanent Fullbright Trigger
    ModAPI.addEventListener("update", () => {
        // Overrides lighting rendering parameters inside the engine loop to force absolute brightness
        if (ModAPI.player) {
            ModAPI.gameSettings.gammaSetting = 10.0; 
        }
    });

    // 3. Mod Feature: Compass & Axis Position Map Tracker
    ModAPI.addEventListener("update", () => {
        if (ModAPI.player) {
            let posX = Math.floor(ModAPI.player.posX);
            let posY = Math.floor(ModAPI.player.posY);
            let posZ = Math.floor(ModAPI.player.posZ);
            
            // Calculates directional heading based on rotation pitch/yaw angles
            let rotation = (Math.floor(ModAPI.player.rotationYaw) % 360 + 360) % 360;
            let direction = "N";
            if (rotation >= 45 && rotation < 135) direction = "W";
            else if (rotation >= 135 && rotation < 225) direction = "S";
            else if (rotation >= 225 && rotation < 315) direction = "E";

            // Updates your visual layout UI data hook variables smoothly every frame
            const coordsDisplay = document.getElementById('melon-hud-coords');
            if (coordsDisplay) {
                coordsDisplay.innerText = `XYZ: ${posX} / ${posY} / ${posZ} | Heading: ${direction}`;
            }
        }
    });

    // 4. Handle Logo Splash Dismissal
    ModAPI.addEventListener("init", () => {
        console.log("Game Engine Ready. Dismissing splash screen overlay...");
        const splash = document.getElementById('melon-splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            setTimeout(() => splash.remove(), 600);
        }
    });
});
