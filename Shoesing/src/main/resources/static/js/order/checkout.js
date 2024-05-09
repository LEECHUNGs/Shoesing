document.getElementById("orderBtn").addEventListener("click", e => {

    console.log(order);

    fetch("/order/manage", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(order)
    })
    .then(resp => resp.text());

   
});