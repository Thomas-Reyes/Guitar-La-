    import {useState} from "react" // importar useState
    import {useEffect} from "react"  // importar useEffect
    import {useMemo} from "react"  // importar useMemo
    import { db } from "../data/db.js"  // importar la base de datos




    export const useCart = () => {

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


               //state derivado
                const isEmpty = useMemo( () =>  cart.length === 0, [cart] )  

                const cartTotal = useMemo( () => cart.reduce ( (total, item  ) => total + (item.quantity * item.price)  , 0), [cart] )

 
        return {
         
            data,
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            cleartCart,
            isEmpty,
            cartTotal 


        }

    }




























