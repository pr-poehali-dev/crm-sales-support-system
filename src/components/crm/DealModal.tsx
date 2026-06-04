import { useState } from 'react';
import { type Deal, type DealStage, dealStages, contacts } from './data';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  author: string;
  initials: string;
  text: string;
  time: string;
}

const initialComments: Comment[] = [
  { id: 'cm1', author: 'Иван Смирнов', initials: 'ИС', text: 'Провели первичную встречу. Клиент заинтересован, запросил детальное КП.', time: '15 янв, 14:30' },
  { id: 'cm2', author: 'Ольга Кузнецова', initials: 'ОК', text: 'Выслала КП на почту. Ожидаем обратную связь до конца недели.', time: '17 янв, 10:15' },
];

const formatAmount = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

interface DealModalProps {
  deal: Deal;
  onClose: () => void;
  onUpdate: (deal: Deal) => void;
}

type Tab = 'info' | 'comments' | 'history';

const historyItems = [
  { icon: 'TrendingUp', color: 'bg-amber-50 text-amber-600', text: 'Этап изменён: Новые → Переговоры', time: '17 янв, 09:00' },
  { icon: 'MessageSquare', color: 'bg-sky-50 text-sky-600', text: 'Добавлен комментарий', time: '17 янв, 10:15' },
  { icon: 'FileText', color: 'bg-violet-50 text-violet-600', text: 'Загружено КП_СберТех.pdf', time: '17 янв, 10:20' },
  { icon: 'Phone', color: 'bg-emerald-50 text-emerald-600', text: 'Звонок с клиентом · 22 мин', time: '15 янв, 14:00' },
  { icon: 'Plus', color: 'bg-gray-100 text-gray-500', text: 'Сделка создана', time: '10 янв, 11:30' },
];

export default function DealModal({ deal, onClose, onUpdate }: DealModalProps) {
  const [tab, setTab] = useState<Tab>('info');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Deal>({ ...deal });
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const stage = dealStages.find(s => s.key === form.stage)!;

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
            {editing ? (
              <input
                className="w-full text-lg font-semibold text-foreground bg-transparent border-b border-primary outline-none pb-0.5"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            ) : (
              <h2 className="text-lg font-semibold text-foreground truncate">{form.title}</h2>
            )}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${stage.bg} ${stage.color}`}>
                {stage.label}
              </span>
              <span className="text-xs text-muted-foreground">{form.company}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs font-semibold text-foreground">{formatAmount(form.amount)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button onClick={() => { setForm({ ...deal }); setEditing(false); }} className="px-3 py-1.5 text-xs border rounded-lg hover:bg-secondary transition-colors">Отмена</button>
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
                <Field label="Клиент" editing={editing}>
                  {editing ? (
                    <select
                      className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={form.contact}
                      onChange={e => {
                        const c = contacts.find(c => c.name === e.target.value);
                        setForm(f => ({ ...f, contact: e.target.value, company: c?.company || f.company }));
                      }}
                    >
                      {contacts.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {form.contact.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{form.contact}</span>
                    </div>
                  )}
                </Field>

                <Field label="Компания" editing={editing}>
                  {editing
                    ? <input className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    : <span className="text-sm text-foreground">{form.company}</span>
                  }
                </Field>

                <Field label="Сумма сделки" editing={editing}>
                  {editing
                    ? <input type="number" className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} />
                    : <span className="text-sm font-semibold text-foreground">{formatAmount(form.amount)}</span>
                  }
                </Field>

                <Field label="Этап" editing={editing}>
                  {editing ? (
                    <select
                      className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={form.stage}
                      onChange={e => setForm(f => ({ ...f, stage: e.target.value as DealStage }))}
                    >
                      {dealStages.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${stage.bg} ${stage.color}`}>
                      {stage.label}
                    </span>
                  )}
                </Field>

                <Field label="Вероятность закрытия" editing={editing}>
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <input type="range" min="0" max="100" step="5" className="flex-1 accent-primary" value={form.probability} onChange={e => setForm(f => ({ ...f, probability: Number(e.target.value) }))} />
                      <span className="text-sm font-medium w-8 text-right">{form.probability}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${form.probability}%` }} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{form.probability}%</span>
                    </div>
                  )}
                </Field>

                <Field label="Дата закрытия" editing={editing}>
                  {editing
                    ? <input type="date" className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20" value={form.closeDate} onChange={e => setForm(f => ({ ...f, closeDate: e.target.value }))} />
                    : <span className="text-sm text-foreground">{form.closeDate}</span>
                  }
                </Field>

                <Field label="Ответственный" editing={editing}>
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
                </Field>

                <Field label="Создана" editing={false}>
                  <span className="text-sm text-muted-foreground">{form.createdAt}</span>
                </Field>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Прогресс по воронке</p>
                <div className="flex items-center gap-1.5">
                  {dealStages.map((s, i) => {
                    const stageIdx = dealStages.findIndex(x => x.key === form.stage);
                    const isActive = i <= stageIdx && form.stage !== 'lost';
                    const isCurrent = s.key === form.stage;
                    return (
                      <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`h-1.5 w-full rounded-full transition-all ${isActive ? 'bg-primary' : 'bg-secondary'}`} />
                        <span className={`text-[10px] font-medium ${isCurrent ? s.color : 'text-muted-foreground'}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
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

function Field({ label, editing, children }: { label: string; editing: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{label}</p>
      {children}
    </div>
  );
}
