import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const app = express();
const server = app.listen(process.env.PORT, () => {
    console.log('Server running on : http://localhost:' + process.env.PORT);
})

app.get('/:symbol/:interval', async (req: Request, res: Response) => {

    try {
        const { symbol, interval } = req.params
        const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ symbol }&interval=${ interval }`)
        
        res.status(200).json({
            symbol,
            interval,
            data
        })

    } catch (error) {
        res.status(500).json(error)
    }
})