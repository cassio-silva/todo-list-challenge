import { FormEvent, useEffect, useState } from 'react';
import { TaskProps } from './entities/Task';
import styles from './TaskList.module.css';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuid } from "uuid";
import { TodoList } from './TodoList';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if (!taskDescription) {
      return;
    }
    setTasks([
      ...tasks,
      {
        id: uuid(),
        description: taskDescription,
        isComplete: false
      }
    ])
    setTaskDescription("");
  }

  function toggleCompleteTask(taskId: string) {
    const taskToggled = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }
      return task;
    })
    setTasks(taskToggled);
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeleted = tasks.filter(task => task.id !== taskId);
    setTasks(tasksWithoutDeleted);
  }

  function updateTaskNumbers() {
    if (tasks.length < 1) {
      setTotalTasks(0);
    }
    setTotalTasks(tasks.length);
    if (tasks.filter(task => task.isComplete).length < 1) {
      setCompletedTasks(0);
    }
    setCompletedTasks(tasks.filter(task => !!task.isComplete).length);
  }

  useEffect(() => {
    updateTaskNumbers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <main className={styles.content}>
      <form onSubmit={handleCreateNewTask} className={styles.controlGroup}>
        <input
          type="text"
          name="taskInput"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setTaskDescription(e.target.value)}
          value={taskDescription}
        />
        <button>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <section>
        <div className={styles.taskListheading}>
          <div className={styles.headingGroup}>
            <span className={styles.total}>
              Tarefas criadas
            </span>
            <span className={styles.taskNumber}>{totalTasks}</span>
          </div>

          <div className={styles.headingGroup}>
            <span className={styles.completed}>
              Concluídas
            </span>
            <span className={styles.taskNumber}>{completedTasks} de {totalTasks}</span>
          </div>
        </div>

        <TodoList
          tasks={tasks}
          toggleCompleteTask={toggleCompleteTask}
          deleteTask={deleteTask}
        />
      </section>
    </main>
  )
}