import { get } from "http";
import https from "https";
// import chalk from "chalk";
import readline from "readline";
// import { read } from "fs";
// import { log } from "console";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const apiKey = `1eeccfb59edc61c8c944107e`;
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2);
};
const change = () => {
    https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const rates = JSON.parse(data).conversion_rates;
            rl.question("Enter the amount in USD: ", (amount) => {
                rl.question(
                    "Enter the target currency(eg. INR,EUR,NPR): ",
                    (currency) => {
                        const rate = rates[currency.toUpperCase()];
                        if (rate) {
                            console.log(
                                `${amount} Usd is approximately ${convertCurrency(
                                    amount,
                                    rate
                                )} ${currency}`
                            );
                            console.log("try More convertion:");
                            change();
                        } else {
                            console.log("invalid currency code \n try Again!");
                            change();
                        }
                        // rl.close();
                    }
                );
            });
        });
    });
};

change();
