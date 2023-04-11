import tulind from 'tulind';
import { promisify } from 'util';

const smaAsync = promisify(tulind.indicators.sma.indicator);
const emaAsync = promisify(tulind.indicators.ema.indicator);

export const smaInc = async(data: any[]) => {
    const d1 = data.map( (d: any)=> d.close)
    const results = await smaAsync([d1], [100]);

    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArr = [...new Array(diff)].map((_) => '');
    
    const d3 = [...emptyArr, ...d2];
    data = data.map((d: any, i) => ({...d, sma: d3[i]}))
    return data;
}

export const emaInc = async(data: any[]) => {
    const d1 = data.map( (d: any)=> d.close)
    const results = await emaAsync([d1], [100]);

    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArr = [...new Array(diff)].map((_) => '');
    
    const d3 = [...emptyArr, ...d2];
    data = data.map((d: any, i) => ({...d, ema: d3[i]}))
    return data;
}
