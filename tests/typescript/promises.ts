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

let promise1 = new Promise(resolve => setTimeout(() => resolve(10), 1000));
let promise2 = new Promise(resolve => setTimeout(() => resolve(20), 3000));
let promise3 = new Promise( (resolve, reject) => {
   reject(7777);
});

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All done with Promise.all :", results); // ["First completed", "Second completed"]
    })
    .catch(error => console.log(`Failed: ${error}`));

Promise.allSettled([promise1, promise2, promise3])
.then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log('Resolved value: ' + index + result.value);
      } else {
        console.log('Rejected value:' + index  + result.reason);
      }
    })
})
.catch(error => console.log(`Failed: ${error}`));

Promise.race([promise1, promise2, promise3]).then(function onfullfilled (result) {
  console.log('Resolved'+   result);
  console.log(result);
}, function onRejected(error) {
  console.log('error33'+   error);
}).catch(function (error) {
  console.log('catch block: ' + error);
})