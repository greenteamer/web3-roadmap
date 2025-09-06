/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  children: Task[];
}

interface TaskState {
  id: number;
  completed: boolean;
}
const initialData: Task[] = [
  {
    id: 1,
    text: "1. Изучение и подготовка Web3-среды",
    completed: false,
    children: [
      {
        id: 2,
        text: "Освежить основы EVM-совместимых блокчейнов и Solidity.",
        completed: false,
        children: [],
      },
      {
        id: 3,
        text: "Выбрать и настроить Ethereum Sepolia в качестве EVM-совместимой тестовой сети для разработки. Ethereum Sepolia является полностью EVM-совместимой сетью.",
        completed: false,
        children: [],
      },
    ],
  },
  {
    id: 4,
    text: "2. Разработка смарт-контрактов (на Solidity, для Ethereum Sepolia)",
    completed: false,
    children: [
      {
        id: 5,
        text: "Создать смарт-контракт на Solidity, который будет:",
        completed: false,
        children: [
          {
            id: 6,
            text: 'Хранить списки "полезных" и "развлекательных" приложений, определяемые родителями.',
            completed: false,
            children: [],
          },
          {
            id: 7,
            text: "Принимать записи о времени использования от мобильного приложения.",
            completed: false,
            children: [],
          },
          {
            id: 8,
            text: 'Реализовать логику обмена "полезного" времени на "развлекательное" (например, функция "заработать развлекательное время").',
            completed: false,
            children: [],
          },
          {
            id: 9,
            text: 'Управлять балансом "временных кредитов" или "токенов" для каждого ребенка.',
            completed: false,
            children: [],
          },
        ],
      },
      {
        id: 10,
        text: "Развернуть смарт-контракт на Ethereum Sepolia Testnet.",
        completed: false,
        children: [],
      },
      {
        id: 11,
        text: "Ограничиваться базовой практикой и уточнять требования по ходу, так как это новая сфера.",
        completed: false,
        children: [],
      },
    ],
  },
  {
    id: 12,
    text: "3. Интеграция с Envio HyperIndex",
    completed: false,
    children: [
      {
        id: 13,
        text: "Использовать Envio HyperIndex для индексации всех ключевых событий и данных из разработанного смарт-контракта.",
        completed: false,
        children: [],
      },
      {
        id: 14,
        text: 'Индексировать такие события, как: добавление/удаление приложений, запись времени использования, начисление/списание "кредитов", активация "развлекательного" времени.',
        completed: false,
        children: [],
      },
      {
        id: 15,
        text: "Максимально сфокусироваться на понимании работы HyperIndex и архитектуры индексации.",
        completed: false,
        children: [],
      },
      {
        id: 16,
        text: "Использовать высокую производительность HyperIndex (более 10 000+ событий в секунду) и его способность к индексации в реальном времени.",
        completed: false,
        children: [],
      },
      {
        id: 17,
        text: "Обеспечить доступ к индексированным данным через GraphQL API Envio HyperIndex.",
        completed: false,
        children: [],
      },
      {
        id: 18,
        text: "Использовать ReScript для всех примеров по HyperIndex, самостоятельно принимая решение о его применении в проекте.",
        completed: false,
        children: [],
      },
      {
        id: 19,
        text: "HyperIndex поддерживает индексацию любых EVM-совместимых блокчейнов.",
        completed: false,
        children: [],
      },
    ],
  },
  {
    id: 20,
    text: "4. Разработка мобильного фронтенда (React Native)",
    completed: false,
    children: [
      {
        id: 21,
        text: "Разработать мобильное приложение на React Native.",
        completed: false,
        children: [],
      },
      {
        id: 22,
        text: "Приложение должно:",
        completed: false,
        children: [
          {
            id: 23,
            text: 'Предоставлять интерфейс для родителей, чтобы вручную добавлять приложения в списки "полезных" / "развлекательных".',
            completed: false,
            children: [],
          },
          {
            id: 24,
            text: "Позволять родителям вручную заносить время использования каждого типа приложений.",
            completed: false,
            children: [],
          },
          {
            id: 25,
            text: "Взаимодействовать со смарт-контрактом (например, отправлять транзакции на запись времени).",
            completed: false,
            children: [],
          },
          {
            id: 26,
            text: 'Запрашивать все необходимые данные (списки приложений, текущий баланс "времени", историю активности) через GraphQL API HyperIndex.',
            completed: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 27,
    text: "5. Тестирование и демонстрация",
    completed: false,
    children: [
      {
        id: 28,
        text: "Провести комплексное тестирование смарт-контрактов и мобильного приложения.",
        completed: false,
        children: [],
      },
      {
        id: 29,
        text: "Подготовить завершенный pet-project на EVM-совместимой сети с использованием HyperIndex для демонстрации навыков.",
        completed: false,
        children: [],
      },
      {
        id: 30,
        text: "Этот проект станет прямой и мощной демонстрацией навыков, релевантных для Envio (через GitHub репозиторий и демо-видео).",
        completed: false,
        children: [],
      },
      {
        id: 31,
        text: "Активно взаимодействовать с сообществом Envio (например, Discord, GitHub).",
        completed: false,
        children: [],
      },
    ],
  },
];

function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  children,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: ReactNode;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="modal-actions">
          <button onClick={onCancel} className="button-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="button-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskItem({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (id: number) => void;
}) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content" onClick={() => onToggle(task.id)}>
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          aria-labelledby={`task-label-${task.id}`}
        />
        <label id={`task-label-${task.id}`}>{task.text}</label>
      </div>
      {task.children && task.children.length > 0 && (
        <TaskList tasks={task.children} onToggle={onToggle} />
      )}
    </li>
  );
}

function TaskList({
  tasks,
  onToggle,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function App() {
  console.log("Rendering App");
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedStates = localStorage.getItem("taskStates");
      if (savedStates) {
        const taskStates: TaskState[] = JSON.parse(savedStates);
        const stateMap = new Map(
          taskStates.map((state) => [state.id, state.completed]),
        );

        const applyStates = (tasks: Task[]): Task[] => {
          return tasks.map((task) => ({
            ...task,
            completed: stateMap.get(task.id) ?? task.completed,
            children: applyStates(task.children),
          }));
        };

        return applyStates(initialData);
      }
      return initialData;
    } catch (error) {
      console.error("Could not load task states from localStorage", error);
      return initialData;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToConfirm, setTaskToConfirm] = useState<number | null>(null);

  useEffect(() => {
    try {
      const extractStates = (tasks: Task[]): TaskState[] => {
        const states: TaskState[] = [];
        tasks.forEach((task) => {
          states.push({ id: task.id, completed: task.completed });
          states.push(...extractStates(task.children));
        });
        return states;
      };

      const taskStates = extractStates(tasks);
      localStorage.setItem("taskStates", JSON.stringify(taskStates));
    } catch (error) {
      console.error("Could not save task states to localStorage", error);
    }
  }, [tasks]);

  const performToggle = (taskId: number) => {
    const toggleTaskAndChildren = (
      tasks: Task[],
      id: number,
    ): [Task[], boolean] => {
      let taskFoundAndToggled = false;
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          taskFoundAndToggled = true;
          const newCompleted = !task.completed;
          const updateChildren = (children: Task[]): Task[] =>
            children.map((child) => ({
              ...child,
              completed: newCompleted,
              children: updateChildren(child.children),
            }));
          return {
            ...task,
            completed: newCompleted,
            children: updateChildren(task.children),
          };
        }
        if (task.children.length > 0) {
          const [newChildren, childToggled] = toggleTaskAndChildren(
            task.children,
            id,
          );
          if (childToggled) {
            taskFoundAndToggled = true;
            return { ...task, children: newChildren };
          }
        }
        return task;
      });
      return [newTasks, taskFoundAndToggled];
    };

    const updateParentStatus = (tasks: Task[]): Task[] => {
      return tasks.map((task) => {
        if (task.children.length > 0) {
          const updatedChildren = updateParentStatus(task.children);
          const allChildrenCompleted = updatedChildren.every(
            (child) => child.completed,
          );
          return {
            ...task,
            completed: allChildrenCompleted,
            children: updatedChildren,
          };
        }
        return task;
      });
    };

    setTasks((currentTasks) => {
      const [toggledTasks] = toggleTaskAndChildren(currentTasks, taskId);
      return updateParentStatus(toggledTasks);
    });
  };

  const handleToggle = (taskId: number) => {
    const findTask = (tasks: Task[], id: number): Task | null => {
      for (const task of tasks) {
        if (task.id === id) return task;
        const foundInChildren = findTask(task.children, id);
        if (foundInChildren) return foundInChildren;
      }
      return null;
    };

    const taskToToggle = findTask(tasks, taskId);

    if (!taskToToggle) return;

    if (taskToToggle.completed) {
      setTaskToConfirm(taskId);
      setIsModalOpen(true);
    } else {
      performToggle(taskId);
    }
  };

  const handleConfirm = () => {
    if (taskToConfirm !== null) {
      performToggle(taskToConfirm);
    }
    setIsModalOpen(false);
    setTaskToConfirm(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTaskToConfirm(null);
  };

  return (
    <main className="roadmap-container">
      <header>
        <h1>Children's Screen Time Management: Web3 & HyperIndex Roadmap</h1>
        <h2>
          Дорожная карта: Приложение для управления экранным временем детей
        </h2>
      </header>
      <section className="goal-section">
        <h3>🎯 Главная Цель:</h3>
        <ul>
          <li>
            Фактическая реализация проекта и глубокое освоение технического
            roadmap для создания приложения по управлению экранным временем
            детей.
          </li>
          <li>
            Получение предложения о работе от Envio, в частности, в команду
            HyperIndex, что будет достигнуто демонстрацией навыков через этот
            проект.
          </li>
        </ul>
      </section>
      <hr />
      <section className="steps-section">
        <h3>🚀 Шаги дорожной карты:</h3>
        <TaskList tasks={tasks} onToggle={handleToggle} />
      </section>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <h4>Confirm Action</h4>
        <p>Are you sure you want to mark this task as incomplete?</p>
      </ConfirmationModal>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
