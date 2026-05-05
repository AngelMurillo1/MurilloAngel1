
console.log("conexion hecha");
const botonCalculo = document.getElementById("botonCalculo");

botonCalculo.addEventListener('click',async function consultaDolar(){
    botonCalculo.disabled="true";
    let data=[];
    //Realizo el fetch
    try{

        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok){
            throw new Error('Algo salio mal');
        }
        data = await response.json();
        //console.log(data);

    }
    //capturo errores
    catch(error){
    console.error(error.message);
    }
    //Recupero los valores competentes
    let valores=[];
    data.forEach(dolar=>{
        if (dolar.casa==="oficial" || dolar.casa==="blue" || dolar.casa==="bolsa"){
            valores.push(dolar);
        }
    });
    console.log(valores);
    
    //Recupero monto ingresado
    const montoPesos=Number(document.getElementById("monto").value);
    console.log(montoPesos);

    //recupero div y lo muestro
    const resultados=document.getElementById("resultados");
    resultados.style.display='block';
    //recupero objetos del div
    const listaOficial=document.getElementById("oficial");
    const listaBlue=document.getElementById("blue");
    const listaMep=document.getElementById("mep");
    

    valores.forEach(dolar=>{
        if (dolar.casa=="oficial"){
            if (dolar.compra){
            const item=document.createElement("li");  
            item.classList.add('oficial');  
            item.textContent="";
            let montoCompra=Number(montoPesos/dolar.compra);
            item.textContent="Conversion Compra: USD$"+montoCompra.toFixed(2)+". Valor Compra:  USD$"+dolar.compra; 
            listaOficial.appendChild(item);
            }  
            if(dolar.venta){
            const item=document.createElement("li");    
            item.classList.add('oficial');
            item.textContent="";    
            let montoVenta=Number(montoPesos/dolar.venta);
            console.log(montoVenta.toFixed(2));    
            item.textContent="Conversion Venta: USD$"+montoVenta.toFixed(2)+". Valor Venta:  USD$"+dolar.venta;
            listaOficial.appendChild(item);
            }
        }
        if (dolar.casa=="blue"){
            if (dolar.compra){
            const item=document.createElement("li"); 
            item.classList.add('blue');   
            item.textContent="";
            let montoCompra=Number(montoPesos/dolar.compra);
            item.textContent="Conversion Compra: USD$"+montoCompra.toFixed(2)+". Valor Compra:  USD$"+dolar.compra; 
            listaBlue.appendChild(item);
            }  
            if(dolar.venta){
            const item=document.createElement("li");   
            item.classList.add('blue'); 
            item.textContent="";    
            let montoVenta=Number(montoPesos/dolar.venta);
            console.log(montoVenta.toFixed(2));    
            item.textContent="Conversion Venta: USD$"+montoVenta.toFixed(2)+". Valor Venta:  USD$"+dolar.venta;
            listaBlue.appendChild(item);
            }
        }
        if (dolar.casa=="bolsa"){
            if (dolar.compra){
            const item=document.createElement("li"); 
            item.classList.add('mep');
            item.textContent="";
            let montoCompra=Number(montoPesos/dolar.compra);
            item.textContent="Conversion Compra: USD$"+montoCompra.toFixed(2)+". Valor Compra:  USD$"+dolar.compra; 
            listaMep.appendChild(item);
            }  
            if(dolar.venta){
            const item=document.createElement("li"); 
            item.classList.add('mep');   
            item.textContent="";    
            let montoVenta=Number(montoPesos/dolar.venta);
            console.log(montoVenta.toFixed(2));    
            item.textContent="Conversion Venta: USD$"+montoVenta.toFixed(2)+". Valor Venta:  USD$"+dolar.venta;
            listaMep.appendChild(item);
            }
        }    
    })
    const textoDescriptivo=document.getElementById("textoDescriptivo");
    textoDescriptivo.style.display='none';
    const botonReset=document.getElementById("reset");
    botonReset.style.display='block';
    
});

