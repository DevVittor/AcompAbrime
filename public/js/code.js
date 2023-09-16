const btnLogin = document.getElementById('btnLogin');
const divLogin = document.getElementById('divLogin');

const mostrar = ()=>{
    btnLogin.addEventListener('click',()=>{
        divLogin.innerHTML =`<div id='test' class='absolute w-[200px] h-[300px] 
        bg-red-500 '>
        <h1>Olá Ejs</h1></div>`;
    });
}
mostrar();