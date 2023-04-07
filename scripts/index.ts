
const getData = async() => {
    const resp = await fetch('http://localhost:4000/BTCUSDT/1m');
    const data = await resp.json();
    console.log(data);
}

getData();