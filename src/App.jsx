import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"



function App() {
  const incioLS = JSON.parse(localStorage.getItem('pacientes'))??[]; // pasamos al useState inicial lo que hay en el localstorage
  const [pacientes, setPacientes] = useState(incioLS);
  const [paciente, setPaciente] = useState({});

  // Creamos el useEffect para almacenar los datos en el localstorage
  useEffect(()=>{
    //console.log('Componente listo o cambio pacientes')
    localStorage.setItem('pacientes', JSON.stringify(pacientes)) // JSON pasa el arreglo a un string
  },[pacientes])

  // Funcion para eliminar un paciente
  const eliminarPaciente = (id)=>{
    //console.log('Eliminando paciente', id);
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    //console.log(pacientesActualizados)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        // pasamos la funcion eliminar paciente
        eliminarPaciente = {eliminarPaciente}
        />
      </div>
      
    </div>
  )
}

export default App
