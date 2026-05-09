// APP.JSX ES COMO EL DIRECTOR DE ORQUESTA EN ESTE ARCHIVO PONDREMOS LAS VISTAS QUE QUEREMOS MOSTRAR EN LA PAGINA.


import  SearchComponent  from "./components/Search.jsx";
import { useState } from "react"; // Hook que permite guardar y actualizar estados dentro del componente
// react detecta esa variacion y ejecuta de nuevo el componente con el cambio detectado.

const App = () => {
    // Definimos nuestra variable de estado y la funcion que cambia su valor, la inicializamos con search
    const [view, setView] = useState('search')

    return (
        <>
            <main id="app">
            
            {view === 'search' && (
                <div>
                    <SearchComponent/><br></br>
                    <button onClick={() => setView('details')}>Ver detalle de prueba</button>
                </div>
            )}

            {view === 'details' && (
                <div>
                    <button onClick={() => setView('search')}>Volver al buscador</button>
                </div>
            )}
            </main>

            <footer>
                <p>&copy; Todos los derechos reservados - Victor Nunez</p>
            </footer>
        </>
    )
}

export default App;
