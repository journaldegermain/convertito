const currencies = ["EUR","USD","GBP","JPY","AUD","CAD","CHF","CNY","SEK","NZD","MXN","SGD","HKD"];

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const amountInput = document.getElementById("amount");
const resultP = document.getElementById("result");

// Remplir les listes déroulantes
currencies.forEach(cur => {
    const optionFrom = document.createElement("option");
    optionFrom.value = cur;
    optionFrom.textContent = cur;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = cur;
    optionTo.textContent = cur;
    toSelect.appendChild(optionTo);
});

// Fonction de conversion
document.getElementById("convert").addEventListener("click", () => {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount) {
        alert("Entrez un montant !");
        return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        .then(res => res.json())
        .then(data => {
            const result = Object.values(data.rates)[0];
            resultP.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        })
        .catch(err => {
            alert("Erreur lors de la conversion !");
            console.error(err);
        });
});
