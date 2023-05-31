import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './TodoList.module.css'
import { TaskProps } from './entities/Task'
// Assets
import NoTask from './assets/prancheta.svg'

interface TodoListProps {
  tasks: TaskProps[];
  toggleCompleteTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

export function TodoList({ tasks, toggleCompleteTask, deleteTask }: TodoListProps) {

  function handleCompleteTask(taskId: string) {
    toggleCompleteTask(taskId);
  }

  function handleDeleteTask(taskId: string) {
    deleteTask(taskId);
  }

  if (tasks?.length < 1) {
    return (
      <div className={styles.noTasks}>
        <img src={NoTask} alt="Nenhuma tarefa criada" />
        <p>Você ainda não tem tarefas cadastradas</p>
        <span>
          Crie tarefas e organize seus itens a fazer
        </span>
      </div>
    )
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.todoList}>
          <button
            className={`${styles.checkbox} ${task.isComplete && styles.isCompleted}`}
            onClick={() => handleCompleteTask(task.id)}
          >
            {task.isComplete ? <CheckCircle size={24} weight='fill' /> : <Circle size={24} />}
          </button>
          <p className={task.isComplete ? styles.isComplete : ''}>{task.description}</p>
          <button
            className={styles.trash}
            onClick={() => handleDeleteTask(task.id)}
          >
            <Trash size={24} />
          </button>
        </div>
      ))}
    </div>
  )
}