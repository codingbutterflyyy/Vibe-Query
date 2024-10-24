self.onmessage = (e) =>
{
    console.log(e.data + " to front")
    // self.postMessage(e.data)
    // carica la schermata principale
    if(e.data == "animationDone")
    {}
}