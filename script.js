document.addEventListener('DOMContentLoaded', function () {
    const getPriceButton = document.getElementById('get-price-button');
    const tickerInput = document.getElementById('ticker');
    const priceList = document.getElementById('price-list');

    getPriceButton.addEventListener('click', function () {
        const ticker = tickerInput.value.trim().toUpperCase();
        if (ticker) {
            fetchStockPrice(ticker);
        } else {
            alert('Please enter a stock ticker');
        }
    });

    async function fetchStockPrice(ticker) {
        const apiKey = 'YOUR_API_KEY';
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`);
            const data = await response.json();
            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                displayPrice(ticker, data['Global Quote']['05. price']);
            } else {
                alert('Invalid ticker or no data available');
            }
        } catch (error) {
            console.error('Error fetching stock price:', error);
            alert('Error fetching stock price');
        }
    }

    function displayPrice(ticker, price) {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.innerHTML = `<strong>${ticker}</strong>: $${price}`;
        priceList.appendChild(priceItem);
    }
});
