
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
    const klinedata = await getData();
    candleseries.setData(klinedata);
}
renderChart();