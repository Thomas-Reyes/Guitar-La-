
  import Guitar from "./components/guitar"
  import Header from "./components/Header"
import { useCart } from "./hooks/useCart"



        function App() { 
          const { data,cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,cleartCart,isEmpty,
            cartTotal } = useCart(); // se llama al hook useCart



  return ( 
    <>

      <Header  
      //le pasamos las propiedades al componente del carrito

              cart={cart}//carrito
              removeFromCart={removeFromCart} //eliminar cantidad de articulos
              decreaseQuantity={decreaseQuantity} //decrementar cantidad de articulos
              increaseQuantity={increaseQuantity} //incrementar cantidad de articulos
              cleartCart={cleartCart} //limpiar carrito
              isEmpty = {isEmpty} //carrito vacio
              cartTotal = {cartTotal} //total del carrito
              addToCart={addToCart} //agregar al carrito



      /> {/* llamado de componente */}
 


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
           <Guitar
           key= {guitar.id} // se le pasa la key
           guitar={guitar} // se le pasa la guitarra
           addToCart={addToCart}   // se le pasa la función addToCart
       
 
 
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
