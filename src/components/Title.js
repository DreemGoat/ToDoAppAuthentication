import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Dashboard from "./Dashboard"
import { useState, useEffect } from "react";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */

  useEffect(() => {
    const q = query(collection(db,'tasks'), orderBy('created', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc=>({
        id:doc.id,
        Data:doc.data()
      })))
    })
  },[])

  return (
    <div className="title">
      <header>Todo App</header>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className ='title'>
          {tasks.map((tasks)=>(
            <TodoList
            id = {tasks.id}
            key = {tasks.id}
            completed = {tasks.data.completed}
            title = {tasks.data.title}
            description={tasks.data.description}
            />
          ))}
        </div>
        <div className="title">
          <TodoList
            id={1}
            title="Feed The Goat" 
            description={`The goat is hungry`}
            completed={false}
          />
          <Dashboard></Dashboard>
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default Title;
