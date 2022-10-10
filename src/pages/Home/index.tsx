import './style.css';

import { Card, CardProps} from '../../components/Card';
import React, { useState, useEffect } from 'react';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  //função para criar um novo estudante
  function handleAddStudents() { 
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    //Clamada da function
    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
    const response = await fetch('https://api.github.com/users/claytonRDSS')
    const data = await response.json() as ProfileResponse
    
      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }
      fetchData();
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista De Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>
      <input 
      type="text"  
      placeholder="Digite um Nome"
      onChange={e =>  setStudentName(e.target.value)}
      />

      <button type="button"
        onClick={handleAddStudents} //captura da função com o onclick
      >
        Adicionar
        </button>

      {
        students.map(student => (
          <Card 
          key={student.time}
          name={student.name}
          time={student.time}/>
        ))
      }
    </div>
  )
}
