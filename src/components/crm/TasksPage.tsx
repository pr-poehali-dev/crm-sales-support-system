import { useState } from 'react';
import { tasks as initialTasks, type Task, type TaskStatus } from './data';
import Icon from '@/components/ui/icon';
import TaskModal from './TaskModal';
import AddTaskModal from './AddTaskModal';

const priorityConfig = {
  high: { label: 'Высокий', class: 'bg-red-50 text-red-600 border-red-200' },
  medium: { label: 'Средний', class: 'bg-amber-50 text-amber-600 border-amber-200' },
  low: { label: 'Низкий', class: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const typeIcon = {
  call: 'Phone',
  meeting: 'Users',
  email: 'Mail',
  task: 'CheckSquare',
};

const columns: { key: TaskStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'К выполнению', color: 'text-sky-600' },
  { key: 'in_progress', label: 'В работе', color: 'text-amber-600' },
  { key: 'done', label: 'Готово', color: 'text-emerald-600' },
];

export default function TasksPage() {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addStatus, setAddStatus] = useState<TaskStatus>('todo');

  const byStatus = (s: TaskStatus) => taskList.filter(t => t.status === s);

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const updateTask = (updated: Task) => {
    setTaskList(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSelectedTask(null);
  };

  const addTask = (task: Task) => {
    setTaskList(prev => [task, ...prev]);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-5 border-b bg-white flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Задачи</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {taskList.filter(t => t.status !== 'done').length} активных задач
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg p-0.5 bg-secondary">
            {(['all', 'my'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === f ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {f === 'all' ? 'Все' : 'Мои'}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setAddStatus('todo'); setShowAdd(true); }}
            className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={15} />
            Задача
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto scrollbar-thin p-5">
        <div className="flex gap-5 h-full min-w-max">
          {columns.map(col => (
            <div key={col.key} className="w-72 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${col.color}`}>{col.label}</span>
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {byStatus(col.key).length}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-thin pr-0.5">
                {byStatus(col.key).map((task, i) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={i}
                    onMove={moveTask}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
                <button
                  onClick={() => { setAddStatus(col.key); setShowAdd(true); }}
                  className="w-full py-2 border border-dashed rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icon name="Plus" size={12} />
                  Добавить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTask}
        />
      )}

      {showAdd && (
        <AddTaskModal
          defaultStatus={addStatus}
          onClose={() => setShowAdd(false)}
          onAdd={addTask}
        />
      )}
    </div>
  );
}

function TaskCard({ task, index, onMove, onClick }: {
  task: Task;
  index: number;
  onMove: (id: string, s: TaskStatus) => void;
  onClick: () => void;
}) {
  const statuses: TaskStatus[] = ['todo', 'in_progress', 'done'];
  const currentIdx = statuses.indexOf(task.status);

  return (
    <div
      className="bg-white border rounded-xl p-3.5 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 animate-slide-up group"
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Icon name={typeIcon[task.type]} size={12} className="text-muted-foreground" fallback="CheckSquare" />
          </div>
          <p className={`text-sm font-medium leading-snug ${task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {task.title}
          </p>
        </div>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border flex-shrink-0 ${priorityConfig[task.priority].class}`}>
          {priorityConfig[task.priority].label}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{task.description}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{task.assignee.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Calendar" size={11} />
          {task.dueDate.slice(5).replace('-', '.')}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {currentIdx > 0 && (
          <button
            onClick={e => { e.stopPropagation(); onMove(task.id, statuses[currentIdx - 1]); }}
            className="flex-1 py-1 text-[11px] text-muted-foreground hover:text-foreground border rounded-md hover:border-border transition-colors"
          >
            ← Назад
          </button>
        )}
        {currentIdx < 2 && (
          <button
            onClick={e => { e.stopPropagation(); onMove(task.id, statuses[currentIdx + 1]); }}
            className="flex-1 py-1 text-[11px] text-primary border border-primary/20 rounded-md hover:bg-primary/5 transition-colors font-medium"
          >
            Вперёд →
          </button>
        )}
      </div>

      <div className="mt-2">
        <span className="text-[10px] text-muted-foreground">{task.relatedTo}</span>
      </div>
    </div>
  );
}
