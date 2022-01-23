import React, { useEffect, useState } from "react";
import {firebase} from './firebase'

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');

  useEffect(()=>{

    const obtenerDatos = async () => { 

      try{
        const db =  firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData =  data.docs.map((doc)=>({ id:doc.id, ...doc.data() }))
        console.log(arrayData);
        setTareas(arrayData)

      }catch (error) {
         console.log(error);
      }

    }
    obtenerDatos()
  },[])

  const agregar = async(e)=>{
    e.preventDefault()
    if (!tarea.trim()){
      console.log('esta vacio');
      return
    }

    try{

      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)

      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])

    }catch(error){
      console.log(error)
    }
    
    setTarea('')
    console.log(tarea);
  }

  const eliminar = async (id) =>{
    try{
      
      const db = firebase.firestore()
      await db.collection('tareas').doc().delete()
      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch(error){
      console.log(error);
    }
  }

  const activarEdicion = (item)=>{
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) =>{
    e.preventDefault()
    if (!tarea.trim()){
      console.log('vacio');
      return
    }
    try{

      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name: tarea
      })

      const arrayEditado = tareas.map( item =>(
        item.id === id ? { id: item.id, fecha: item.fecha, name:tarea } :item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
       

    }catch(error){
      console.log(error);

    }
  }
  return (
   
    <div className="container mt-3">
       <h1 className="text-center my-4"> Aplicacion  de tareas</h1>
      <div className="row">
        <div className="col-md-6">
        <ul>
        {
          tareas.map(item=>(
            <li className="list-group-item" key={item.id}>
              {item.name}
              <button className="btn btn-danger btn-sm float-end mx-2 "
              onClick={()=>eliminar(item.id)}
              >
                Eliminar
              </button>
              <button 
              className="btn btn-warning btn-sm float-end mx-2 "
              onClick={ ()=>activarEdicion(item) }>
                Editar
              </button>
            </li>
            
          ))
        }
        </ul>
          
        </div>
        <div className="col-md-6">
          <h3>{modoEdicion ? 'Editar tarea' : 'Agregar tarea'}</h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
             type="text"
             placeholder=" ingrese tarea"
             className="form-control mb-2"
             onChange={e=>setTarea(e.target.value)}
             value={tarea}
            />
            <button 
              className={
                modoEdicion ? "btn btn-warning btn-block w-100" : "btn btn-dark btn-block w-100"
              }
              type="submit"
              >
                {
                  modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
