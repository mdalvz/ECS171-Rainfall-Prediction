const spawn = require('child-process-promise').spawn;
const express = require('express');
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/run', async (req, res) => {
    try {
        const { tmpc, dwpc, relh, sped, mslp, vsby, month, skyc1, model } = req.body;
        let input = { tmpc, dwpc, relh, sped, mslp, vsby, month, skyc1 };
        let loc = path.join(__dirname, '../model/run.py');
        let promise = spawn('python', [loc, model, JSON.stringify(input)]);
        let result = '';
        promise.childProcess.stdout.on('data', (data) => {
            result += data.toString();
        });
        await promise;
        res.status(200);
        return res.json(parseFloat(result));
    }
    catch (err) {
        res.status(500);
        return res.send();
    }
});

app.listen(80);