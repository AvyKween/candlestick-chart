
const getData = async() => {
    const resp = await fetch('http://localhost:4000/BTCUSDT/1m');
    const data = await resp.json();
    return data;
}

const renderChart = async() => {
    const chartProperties = {
        timeScale: {
            timeVisible: true,
            secondsVisible: true,
        }
    }
    const domElement = document.getElementById('tvchart');

    const chart = LightweightCharts.createChart(domElement, chartProperties)
    const candleseries = chart.addCandlestickSeries();
    const klines = await getData();
    candleseries.setData(klines);

    // SMA Indicator
    const smaSeries = chart.addLineSeries({ color: 'red', lineWidth: 1 })
    const smaData = klines
        .filter(d => d.sma)
        .map(d => ({ time: d.time, value: d.sma }))
    smaSeries.setData(smaData)
    

    // EMA Indicator
    const emaSeries = chart.addLineSeries({ color: 'cyan', lineWidth: 1 })
    const emaData = klines
        .filter(d => d.ema)
        .map(d => ({ time: d.time, value: d.ema }))
    emaSeries.setData(emaData)

}
renderChart();