// function delay(time: number) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// delay(2000).then(() => console.log('2 seconds have passed.'));
// function simulateHTTPRequest(url: string) {
//     return new Promise((resolve, reject) => {
//         if (!url) {
//             reject("URL is not provided");
//         } else {
//             console.log(`Fetching data from ${url}...`);
//             setTimeout(() => resolve(`Data from ${url}`), 2000); // Mock API call
//         }
//     });
// }
// simulateHTTPRequest("https://api.example.com/data")
//     .then(data => console.log(data))
//     .then(data => console.log(data))
//     .catch(error => console.error(`Error: ${error}`));
// function getData() {
//     return new Promise(resolve => setTimeout(() => resolve("Initial Data"), 1500));
// }
// function processData(data: any) {
//     return new Promise(resolve => setTimeout(() => resolve(`${data} processed`), 1500));
// }
// getData()
//     .then(result => processData(result))
//     .then(processedResult => console.log(processedResult));
var promise1 = new Promise(function (resolve) { return setTimeout(function () { return resolve(10); }, 1000); });
var promise2 = new Promise(function (resolve) { return setTimeout(function () { return resolve(20); }, 3000); });
var promise3 = new Promise(function (resolve, reject) {
    reject(7777);
});
Promise.all([promise1, promise2, promise3])
    .then(function (results) {
    console.log("All done with Promise.all :", results); // ["First completed", "Second completed"]
})
    .catch(function (error) { return console.log("Failed: ".concat(error)); });
Promise.allSettled([promise1, promise2, promise3])
    .then(function (results) {
    results.forEach(function (result, index) {
        if (result.status === "fulfilled") {
            console.log('Resolved value: ' + index + result.value);
        }
        else {
            console.log('Rejected value:' + index + result.reason);
        }
    });
})
    .catch(function (error) { return console.log("Failed: ".concat(error)); });
