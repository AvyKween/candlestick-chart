import tulind from 'tulind';
import { promisify } from 'util';

const smaAsync = promisify(tulind.indicators.sma.indicator);

const smaInc = async(data: any[]) => {
    const d1 = data.map( (d: any)=> d.close)
    const results = await smaAsync([d1], [100]);

    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArr = [...new Array(diff)].map((d: any) => '');
    
    const d3 = [...emptyArr, ...d2];
    data = data.map((d: any, i) => ({...d, sma: d3[i]}))
    return data;
}

export default smaInc;