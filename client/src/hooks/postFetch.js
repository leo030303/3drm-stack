function postFetch(url, data, userToken){
    const myHeaders = new Headers()
    myHeaders.append("Authorization", 'Bearer ' + userToken);
    if(!(data instanceof FormData)){
        data = JSON.stringify(data)
        myHeaders.append("Content-Type", "application/json");
    }
    fetch(url, {
    method: 'POST',
    credentials: "include",
    headers: myHeaders,
    body: data,
    redirect: 'follow',
    })
}

export default postFetch;
