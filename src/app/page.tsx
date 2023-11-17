'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './globals.css';
import { ListGroup } from 'react-bootstrap';

interface Tarea {
  id: number;
  text: string;
  completada: boolean;
}

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nombreTarea, setNombreTarea] = useState<string>('');

  const agregarTarea = () => {
    if (nombreTarea.trim() === '') return;

    const nuevaTarea: Tarea = {
      id: tareas.length + 1,
      text: nombreTarea,
      completada: false,
    }

    setTareas([...tareas, nuevaTarea]);
    setNombreTarea('');
  }

  const completarTarea = (tareaId: number) => {
    setTareas((prevTareas) =>
      prevTareas.map((Tarea) =>
        Tarea.id === tareaId ? { ...Tarea, completada: !Tarea.completada } : Tarea
      )
    )
  }

  const nombreCheckbox = (tareaId: number) => {
    return "c" + tareaId;
  }

  const eliminarTarea = (tareaId: number) => {
    setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== tareaId));
  }

  const tareasPendientes = () => {
    let cantPendientes = 0;
    tareas.forEach(t => {
      if(!t.completada){
        cantPendientes++;
      }
    })
    return cantPendientes;
  }

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <Container>
      <Row className="align-items-end my-auto">
            <Form.Control
              type="text"
              className='texto'
              placeholder="Nombre de la tarea..."
              value={nombreTarea}
              onChange={(e) => setNombreTarea(e.target.value)}
            />
            <Button
            className='boton-agregar'
            onClick={agregarTarea}>
            Agregar
            </Button>
      </Row>
      <Row className='pendientes'>
        Cantidad de tareas pendientes: {tareasPendientes()}
      </Row>
      <div className='tareas'>
          {tareas.map((tarea) => (
              <Row horizontal key={tarea.id} className = "tarea w-75">
                  <Form.Control
                    type="checkbox"
                    id = {nombreCheckbox(tarea.id)}
                    checked={tarea.completada}
                    onChange={() => completarTarea(tarea.id)}
                  />
                    <label
                      htmlFor = {nombreCheckbox(tarea.id)}
                      className = "nombre-tarea"
                      style ={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                      {tarea.text}
                    </label>

                 <Button className = "boton-eliminar"
                 onClick={() => eliminarTarea(tarea.id)}>
                  Eliminar
                  </Button>
            </Row>
          ))}
      </div>
      </Container>
    </div>
  );
}

export default App;
