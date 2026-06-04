import { useState } from 'react';
import { type Task, type TaskStatus, type TaskPriority } from './data';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  author: string;
  initials: string;
  text: string;
  time: string;
}

const initialComments: Comment[] = [
  { id: 'cm1', author: 'Ольга Кузнецова', initials: 'ОК', text: 'Начала работу над КП. Вышлю черновик к вечеру.', time: '16 янв, 11:00' },
];

const priorityConfig = {
  high: { label: 'Высокий', class: 'bg-red-50 text-red-600 border-red-200' },
  medium: { label: 'Средний', class: 'bg-amber-50 text-amber-600 border-amber-200' },
  low: { label: 'Низкий', class: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const statusConfig = {
  todo: { label: 'К выполнению', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
  in_progress: { label: 'В работе', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  done: { label: 'Готово', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
};

const typeConfig = {
  call: { label: 'Звонок', icon: 'Phone' },
  meeting: { label: 'Встреча', icon: 'Users' },
  email: { label: 'Письмо', icon: 'Mail' },
  task: { label: 'Задача', icon: 'CheckSquare' },
};

const historyItems = [
  { icon: 'TrendingUp', color: 'bg-amber-50 text-amber-600', text: 'Статус изменён: К выполнению → В работе', time: '16 янв, 11:00' },
  { icon: 'UserCheck', color: 'bg-sky-50 text-sky-600', text: 'Назначена на Ольгу Кузнецову', time: '15 янв, 15:30' },
  { icon: 'Plus', color: 'bg-gray-100 text-gray-500', text: 'Задача создана', time: '15 янв, 15:00' },
];

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

type Tab = 'info' | 'comments' | 'history';

export default function TaskModal({ task, onClose, onUpdate }: TaskModalProps) {
  const [tab, setTab] = useState<Tab>('info');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Task>({ ...task });
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const status = statusConfig[form.status];
  const priority = priorityConfig[form.priority];
  const typeInfo = typeConfig[form.type];

  const save = () => {
    onUpdate(form);
    setEditing(false);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, {
      id: `cm${Date.now()}`,
      author: 'Иван Смирнов',
      initials: 'ИС',
      text: newComment.trim(),
      time: 'Только что',
    }]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up overflow-hidden">

        <div className="px-6 py-4 border-b flex items-start justify-between gap-4 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name={typeInfo.icon} size={14} className="text-muted-foreground" fallback="CheckSquare" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{typeInfo.label}</span>
            </div>
            {editing ? (
              <input
                className="w-full text-lg font-semibold text-foreground bg-transparent border-b border-primary outline-none pb-0.5"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            ) : (
              <h2 className={`text-lg font-semibold ${form.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {form.title}
              </h2>
            )}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                {priority.label}
              </span>
              <span className="text-xs text-muted-foreground">· {form.relatedTo}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button onClick={() => { setForm({ ...task }); setEditing(false); }} className="px-3 py-1.5 text-xs border rounded-lg hover:bg-secondary transition-colors">Отмена</button>
                <button onClick={save} className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">Сохранить</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg hover:bg-secondary transition-colors">
                <Icon name="Pencil" size={12} />
                Редактировать
              </button>
            )}
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex border-b flex-shrink-0 px-6">
          {([['info', 'Детали', 'Info'], ['comments', `Комментарии (${comments.length})`, 'MessageSquare'], ['history', 'История', 'Clock']] as const).map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setTab(key as Tab)}
              className={`flex items-center gap-1.5 px-1 py-3 mr-5 text-sm border-b-2 transition-colors ${
                tab === key ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={icon} size={13} fallback="Info" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {tab === 'info' && (
            <div className="p-6 space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">

                <div className="col-span-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Описание</p>
                  {editing ? (
                    <textarea
                      className="w-full text-sm border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                      rows={3}
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm text-foreground leading-relaxed">{form.description || '—'}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Статус</p>
                  {editing ? (
                    <select className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}>
                      <option value="todo">К выполнению</option>
                      <option value="in_progress">В работе</option>
                      <option value="done">Готово</option>
                    </select>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Приоритет</p>
                  {editing ? (
                    <select className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as TaskPriority }))}>
                      <option value="high">Высокий</option>
                      <option value="medium">Средний</option>
                      <option value="low">Низкий</option>
                    </select>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${priority.class}`}>
                      {priority.label}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Тип задачи</p>
                  {editing ? (
                    <select className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Task['type'] }))}>
                      <option value="call">Звонок</option>
                      <option value="meeting">Встреча</option>
                      <option value="email">Письмо</option>
                      <option value="task">Задача</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Icon name={typeInfo.icon} size={14} className="text-muted-foreground" fallback="CheckSquare" />
                      <span className="text-sm text-foreground">{typeInfo.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Срок выполнения</p>
                  {editing
                    ? <input type="date" className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
                    : <span className="text-sm text-foreground">{form.dueDate}</span>
                  }
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Ответственный</p>
                  {editing ? (
                    <select className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.assignee} onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}>
                      {['Иван Смирнов', 'Ольга Кузнецова', 'Павел Орлов'].map(a => <option key={a}>{a}</option>)}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {form.assignee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{form.assignee}</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Связана с</p>
                  {editing
                    ? <input className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.relatedTo} onChange={e => setForm(f => ({ ...f, relatedTo: e.target.value }))} />
                    : <span className="text-sm text-foreground">{form.relatedTo}</span>
                  }
                </div>
              </div>

              {!editing && form.status !== 'done' && (
                <div className="flex gap-2 pt-2 border-t">
                  {form.status === 'todo' && (
                    <button
                      onClick={() => { onUpdate({ ...form, status: 'in_progress' }); onClose(); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      <Icon name="Play" size={13} />
                      Взять в работу
                    </button>
                  )}
                  {form.status === 'in_progress' && (
                    <button
                      onClick={() => { onUpdate({ ...form, status: 'done' }); onClose(); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      <Icon name="CheckCircle" size={13} />
                      Завершить
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {tab === 'comments' && (
            <div className="p-6 flex flex-col gap-4 animate-fade-in">
              <div className="space-y-4">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary">{c.initials}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{c.author}</span>
                        <span className="text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <div className="bg-secondary rounded-xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-foreground leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">Пока нет комментариев</div>
                )}
              </div>
              <div className="flex gap-3 pt-2 border-t">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-white">ИС</span>
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full text-sm border rounded-xl px-3.5 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={3}
                    placeholder="Написать комментарий..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addComment(); }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">Ctrl+Enter для отправки</span>
                    <button
                      onClick={addComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Icon name="Send" size={12} />
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="p-6 animate-fade-in">
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-5">
                  {historyItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 relative animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${item.color}`}>
                        <Icon name={item.icon} size={12} fallback="Circle" />
                      </div>
                      <div className="flex-1 pb-1">
                        <p className="text-sm text-foreground">{item.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
