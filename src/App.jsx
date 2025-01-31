  import {useState} from "react" // importar useState
import {useEffect} from "react"  // importar useEffect
  import { db } from "./data/db" 
  import Guitar from "./components/guitar"
  import Header from "./components/Header"



        function App() { 
        /* el useStade se define dentro del componente*/ 
        //hooks - NO se debe poner despues de un retun ni condicionales 
        // [HOOKS State] (variable - funcion - valor inicial)
        // const [auth,setAuth] = useState([]); // se define el estado y la funcion que lo modifica*/
          // [HOOKS Effect] (variable - funcion - valor inicial) 
        /*  const [guitars, setGuitars] = useState(false); // se define el estado y la funcion que lo modifica
          useEffect(() => {
            if(auth){
              console.log("autenticado")
            } 
            console.log("componente listo")
          },[guitars]) // se ejecuta despues de que el componente se renderiza
          
          setTimeout(() => {
            setGuitars(true)
          }, 3000);
        */

      const initialCart = () =>  { 
        const localStorageCart = localStorage.getItem("cart") // se obtiene el carrito del localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] // 
      }; // se obtiene el carrito del localStorage}

      const [data] = useState(db); // se define el estado y la funcion que lo modifica
      
      const [cart, setCart] = useState(initialCart); // carrito

      const max_Item = 20; // cantidad maxima de articulos en el carrito

      const min_Item = 1; // cantidad maxima de articulos en el carrito

      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart)) // se guarda el carrito en el localStorage en formato JSON, solo guarda formato strings  
      },[cart]);  // se ejecuta despues de que el componente se renderiza maquetacion para API



      //funcion de agregar al carrito
        function addToCart(item) { 
            const itemExists = cart.findIndex(guitar => guitar.id === item.id)// se busca si el item existe en el carrito
            if(itemExists >= 0){// esiste en el carrito
              if(cart[itemExists].quantity >= max_Item)return; // que no aumente,si la cantidad es mayor a la permitida
              const updateCart = [...cart]; // se crea una copia del carrito con [...cart]
                updateCart[itemExists].quantity++; // se agrega la cantidad seleccionada
                  setCart(updateCart); // se actualiza el carrito
              }else{
                item.quantity = 1; // se agrega la cantidad
                      setCart( [...cart, item])  
              } 
              
        }
      
      
        //eliminar cantidad de articulos
          function removeFromCart(id) {//eliminar cantidad de articulos
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // se actualiza el carrito
          }


          //incrementar cantidad de articulos en el carrito
          function increaseQuantity(id) { //incrementar cantidad de articulos en el carrito
              const updatedCart = cart.map(item => { // se mapea el carrito
                if(item.id ===id && item.quantity < max_Item){ // si el item existe y la cantidad es menor a la permitida
                  return {
                    ...item, // se retorna el item
                    quantity: item.quantity + 1 // se incrementa la cantidad
                  }} 
                  return item // se retorna el item
              })
              setCart(updatedCart) // se actualiza el carrito
          }


          //decrementar cantidad de articulos en el carrito
          function decreaseQuantity(id) { //decrementar cantidad de articulos en el carrito
            const updatedCart = cart.map(item => { // se mapea el carrito
              if(item.id ===id && item.quantity > min_Item){// si el item existe y la cantidad es mayor a 1
                return {
                  ...item,// se retorna el item
                  quantity: item.quantity - 1 // se decrementa la cantidad
                }} 
                return item // se retorna el item
            })
              setCart(updatedCart) // se actualiza el carrito
          }

          //limpiar carrito
          function cleartCart() {
            setCart([]) // se limpia el carrito
          }
      
          
//  const [data, setData] = useState([]); // se define el estado y la funcion que lo modifica
//  useEffect(() => {setData(db)},[]);  se ejecuta despues de que el componente se renderiza maquetacion para API
 
  return ( 
    <>

 <Header  
 //le pasamos las propiedades al componente del carrito

        cart={cart}//carrito
        increaseQuantity={increaseQuantity} //incrementar cantidad de articulos
        decreaseQuantity={decreaseQuantity} //decrementar cantidad de articulos
        removeFromCart={removeFromCart} //eliminar cantidad de articulos
        cleartCart={cleartCart} //limpiar carrito



 /> {/* llamado de componente */}
 


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
           <Guitar
           key= {guitar.id}
           guitar={guitar}
           setCart={setCart}
           addToCart={addToCart} 
       
 
 
           /> // llamado de componente 
           )) }; 

        </div>
    </main>




    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
 
    </>
  )
}

export default App
