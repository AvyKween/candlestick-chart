import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

import { KLine } from './src/interfaces';


const app = express();
const server = app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
    console.log('Go to http://localhost:4000/BTCUSDT/1m to see some data');
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