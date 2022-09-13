import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const[nombre, setNombre] = useState('');
  const[propietario, setPropietario] = useState('');
  const[email, setEmail] = useState('');
  const[fecha, setFecha] = useState('');
  const[sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)
  
  useEffect(() => {
    
    if( Object.keys(paciente).length >0 ){
        console.log('Si hay')
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    }
  
  }, [paciente])
  
  //console.log(paciente);
  const generarId = ()=>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return fecha+random;
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    // Validacion del Formulario
    if([nombre, propietario,email,fecha, sintomas].includes('')){
      console.log('Hay un campo vacio')
      setError(true)
      return;
    }
    setError(false)
    // Objeto de Paciente
    const objetoPaciente={
      nombre, 
      propietario,
      email,
      fecha, 
      sintomas, 
      
    }
    if(paciente.id){
        //Editando paciente
        objetoPaciente.id = paciente.id
        const pacienteActualizado =pacientes.map(pacienteState =>pacienteState.id === paciente.id ? objetoPaciente:pacienteState)
        setPacientes(pacienteActualizado)
        setPaciente({})
    }else {
        // Nuevo Registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente])
    }

    // console.log(objetoPaciente)
    
    //Reiniciamos el formulario
    setNombre('')
    setEmail('')
    setPropietario('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiennto Pacientes</h2>
        <p className='text-lg mt-5 text-center mb-10'>
            Añade Paciente y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form
        onSubmit={handleSubmit} 
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
          {error && <Error><p>Todo los campos son obligatorios</p></Error>
            
          }
          <div className='mb-5'>
            <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre de la Mascota</label>
            <input 
            type="text"
            id='mascota'
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre} 
            onChange={(e)=>setNombre(e.target.value)}
            />
            
          </div>
          <div className='mb-5'>
            <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>Nombre del Propietario</label>
            <input 
            type="text"
            id='propietario'
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario} 
            onChange={(e)=>setPropietario(e.target.value)} />
          </div>
          <div className='mb-5'>
            <label htmlFor='emailContacto' className='block text-gray-700 uppercase font-bold'>Email de Contacto</label>
            <input 
            type="email"
            id='emailContacto'
            placeholder='Email de contacto'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='mb-5'>
            <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Alta</label>
            <input 
            type="date"
            id='alta'
            className='border-2 w-full p-2 mt-2 '
            value={fecha} 
            onChange={(e)=>setFecha(e.target.value)} />
          </div>
          <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>Sintomas</label>
            <textarea 
              name="" 
              id="sintomas" 
              placeholder='Describe los Sintomas'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={sintomas} 
              onChange={(e)=>setSintomas(e.target.value)}></textarea>
          </div>
            
          <input type="submit" 
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-colors' />

        </form>

    </div>
  )
}

export default Formulario

