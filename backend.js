document.getElementById('converterForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Form values
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    // Make sure the amount is a number
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const apiKey = '2c741f14db110e36c3c1088f'; //  API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/2c741f14db110e36c3c1088f/latest/USD`;
    // api url

    // Exchange rate data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const exchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * exchangeRate).toFixed(2);

                // Display the converted amount
                document.getElementById('result').textContent = 
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

                // Show the result div
                document.getElementById('result').classList.remove('hidden');
            } else {
                alert("Failed to retrieve exchange rate. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            alert("Error fetching exchange rate. Please check your network connection or try again later.");
        });
});

