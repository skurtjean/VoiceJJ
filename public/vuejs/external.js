function sleep(ms) {   return new Promise(resolve => setTimeout(resolve, ms)); }
async function sideNav(){
    await sleep(1000);
    $('.sidenav').sidenav()
}
async function collapsible(){
    await sleep(1000);
    $('.collapsible').collapsible();
}
async function espera(ms){
    await sleep(ms);
}