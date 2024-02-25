export const  serviceWorkerDev = () =>{
    const swURL = `./serviceworker.js`;
    navigator.serviceWorker.register(swURL).then((res) =>{
        console.warn(res)
    }).catch((err) =>{
        console.log(err)
    })
}