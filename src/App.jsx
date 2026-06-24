import { useEffect, useState } from "react";
import "./App.css"; // Importamos los estilos personalizados

function App() {
  // 1. Definición de estados para la aplicación (Requisito de evaluación)
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Función asíncrona interna para consumir la API de forma controlada
    const obtenerProductos = async () => {
      try {
        // Consumo de una API pública de productos 
        const respuesta = await fetch("https://fakestoreapi.com/products?limit=6");
        
        // Validación obligatoria del estado HTTP de la respuesta
        if (!respuesta.ok) {
          throw new Error("No se pudo conectar con el servidor de datos.");
        }
        
        // Transformación de la respuesta HTTP a formato JSON legible por JS
        const datos = await respuesta.json();
        
        // Guardar la informacion en el estado de éxito
        setProductos(datos);
      } catch (err) {
        // Almacenar el mensaje de error si la petición falla
        setError(err.message);
      } finally {
        // Finalizar el estado de carga independientemente del resultado
        setCargando(false);
      }
    };

    // Llamado inmediato a la función al montar el componente en la interfaz
    obtenerProductos();
  }, []); // Array de dependencias vacío para asegurar que se ejecute una sola vez

  return (
    <div className="contenedor-principal">
      <header className="encabezado-app">
        <h1>Módulo de Catálogo — API Fetch</h1>
        <p className="subtitulo-app">Desarrollo Frontend en React con Vite</p>
      </header>
      <hr className="linea-division" />

      {/* RENDERIZADO CONDICIONAL: ESTADO DE CARGA */}
      {cargando && (
        <div className="alerta estado-carga">
          <p> Cargando catálogo de productos...</p>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL: ESTADO DE ERROR */}
      {error && (
        <div className="alerta estado-error">
          <p> Error en la solicitud: {error}</p>
        </div>
      )}

      {/* MOSTRAR DATOS DE LA API */}
      {!cargando && !error && (
        <div className="cuadricula-productos">
          {productos.map((producto) => (
            <div key={producto.id} className="tarjeta-producto">
              <div className="contenedor-imagen">
                <img src={producto.image} alt={producto.title} />
              </div>
              <div className="info-producto">
                <h3 title={producto.title}>{producto.title}</h3>
                <span className="etiqueta-categoria">{producto.category}</span>
                <p className="precio-producto">${producto.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
