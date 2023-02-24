async function serviceRequests (url: string, options?: RequestInit) {
    url = `${url}?apikey=abrradiology`
    const response: any = await fetch(url, options);
    const data = await response.json();
    return data;
}

export async function getAppData () {
    const url = 'http://localhost:5001/gofish';
    const data = await serviceRequests(url);
    return data;
}
