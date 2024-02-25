export const  serviceWorkerDev = () =>{
    const swURL = `${process.env.PUBLIC_URL}/serviceworker.js`;
    navigator.serviceWorker.register(swURL).then((res) =>{
        console.warn(res, "registration")
    }).catch((err) =>{
        console.log(err)
    })
}