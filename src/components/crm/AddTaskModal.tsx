import { useState } from 'react';
import { type Task, type TaskStatus, type TaskPriority, contacts } from './data';
import Icon from '@/components/ui/icon';

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
  defaultStatus?: TaskStatus;
}

export default function AddTaskModal({ onClose, onAdd, defaultStatus = 'todo' }: AddTaskModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'task' as Task['type'],
    priority: 'medium' as TaskPriority,
    status: defaultStatus as TaskStatus,
    dueDate: '',
    assignee: 'Иван Смирнов',
    relatedTo: contacts[0].company,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Введите название задачи';
    if (!form.dueDate) e.dueDate = 'Укажите срок выполнения';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onAdd({
      id: `t${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      type: form.type,
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
      assignee: form.assignee,
      relatedTo: form.relatedTo,
    });
    onClose();
  };

  const typeOptions: { value: Task['type']; label: string; icon: string }[] = [
    { value: 'task', label: 'Задача', icon: 'CheckSquare' },
    { value: 'call', label: 'Звонок', icon: 'Phone' },
    { value: 'meeting', label: 'Встреча', icon: 'Users' },
    { value: 'email', label: 'Письмо', icon: 'Mail' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-slide-up overflow-hidden">

        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Новая задача</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Тип задачи</label>
            <div className="flex gap-2">
              {typeOptions.map(t => (
                <button
                  key={t.value}
                  onClick={() => setForm(f => ({ ...f, type: t.value }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border transition-all ${
                    form.type === t.value
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <Icon name={t.icon} size={13} fallback="CheckSquare" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
              Название <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.title ? 'border-red-400' : ''}`}
              placeholder="Что нужно сделать?"
              value={form.title}
              onChange={e => { setForm(f => ({ ...f, title: e.target.value })); if (errors.title) setErrors(v => ({ ...v, title: '' })); }}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Описание</label>
            <textarea
              className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              rows={3}
              placeholder="Дополнительные детали..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Приоритет</label>
              <div className="flex gap-1.5">
                {([['high', 'Высокий', 'bg-red-500'], ['medium', 'Средний', 'bg-amber-400'], ['low', 'Низкий', 'bg-gray-300']] as const).map(([v, l, c]) => (
                  <button
                    key={v}
                    onClick={() => setForm(f => ({ ...f, priority: v as TaskPriority }))}
                    className={`flex-1 text-xs py-2 rounded-lg border font-medium transition-all ${
                      form.priority === v
                        ? `${c} text-white border-transparent`
                        : 'border-border text-muted-foreground hover:border-gray-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Статус</label>
              <select
                className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
              >
                <option value="todo">К выполнению</option>
                <option value="in_progress">В работе</option>
                <option value="done">Готово</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Срок выполнения <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.dueDate ? 'border-red-400' : ''}`}
                value={form.dueDate}
                onChange={e => { setForm(f => ({ ...f, dueDate: e.target.value })); if (errors.dueDate) setErrors(v => ({ ...v, dueDate: '' })); }}
              />
              {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Ответственный</label>
              <select
                className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={form.assignee}
                onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
              >
                {['Иван Смирнов', 'Ольга Кузнецова', 'Павел Орлов'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Связана с компанией</label>
            <select
              className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              value={form.relatedTo}
              onChange={e => setForm(f => ({ ...f, relatedTo: e.target.value }))}
            >
              {contacts.map(c => <option key={c.id}>{c.company}</option>)}
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-lg hover:bg-secondary transition-colors">
            Отмена
          </button>
          <button
            onClick={submit}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={14} />
            Создать задачу
          </button>
        </div>
      </div>
    </div>
  );
}
