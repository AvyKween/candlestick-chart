import tulind from 'tulind';
import { promisify } from 'util';

const smaAsync = promisify(tulind.indicators.sma.indicator);
const emaAsync = promisify(tulind.indicators.ema.indicator);

export const smaInc = async(data: any[]) => {

    let newData = data;

    const d1 = newData.map( (d: any)=> d.close)
    const results = await smaAsync([d1], [100]);

    const d2 = results[0];
    const diff = newData.length - d2.length;
    const emptyArr = [...new Array(diff)].map((_) => '');
    
    const d3 = [...emptyArr, ...d2];
    newData = newData.map((d: any, i) => ({...d, sma: d3[i]}))
    return newData;
}

export const emaInc = async(data: any[]) => {

    let newData = data;

    const d1 = newData.map( (d: any)=> d.close)
    const results = await emaAsync([d1], [100]);

    const d2 = results[0];
    const diff = newData.length - d2.length;
    const emptyArr = [...new Array(diff)].map((_) => '');
    
    const d3 = [...emptyArr, ...d2];
    newData = newData.map((d: any, i) => ({...d, ema: d3[i]}))
    return newData;
}

export const markersInc = (data: any[]) => {
    // EMA21 CROSSOVER SMA100 - LONG
    // EMA21 CROSSUNDER SMA100 - SHORT
    let newData = data.map((d, i, arr) => {
        const long = 
            arr[i]?.ema > arr[i].sma && arr[i - 1]?.ema < arr[i - 1]?.sma 
            ? true 
            : false

        const short = 
            arr[i]?.ema < arr[i].sma && arr[i - 1]?.ema > arr[i - 1]?.sma 
            ? true 
            : false

        return { ...d, long, short };
    })
    return newData;
}