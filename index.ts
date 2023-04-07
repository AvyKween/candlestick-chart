import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

import { KLine } from './src/interfaces';

// Server
const app = express();
const server = app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
    console.log('Go to http://localhost:4000/BTCUSDT/1m to see some data');
})

// Middlewares
app.use( cors() );
app.use( express.static('public') );


// Routes
app.get('/scripts/tv.js', (_req: Request, res: Response) => {
        res.status(200).sendFile('/dist/scripts/tv.js', { root: './' })
})
app.get('/scripts/index.js', (_req: Request, res: Response) => {
        res.status(200).sendFile('/dist/scripts/index.js', { root: './' })
})
app.get('/:symbol/:interval', async (req: Request, res: Response) => {

    try {
        const { symbol, interval } = req.params
        const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ symbol }&interval=${ interval }`)

        const klines = data.map( (d: KLine) => ({
            time: d[0] / 1000,
            open: Number(d[1]),
            high: Number(d[2]),
            low: Number(d[3]),
            close: Number(d[4]),
        }))
        
        res.status(200).json(klines)

    } catch (error) {
        res.status(500).json(error)
    }
})
