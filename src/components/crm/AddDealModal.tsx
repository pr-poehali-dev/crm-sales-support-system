import { useState } from 'react';
import { type Deal, type DealStage, dealStages, contacts } from './data';
import Icon from '@/components/ui/icon';

interface AddDealModalProps {
  onClose: () => void;
  onAdd: (deal: Deal) => void;
  defaultStage?: DealStage;
}

export default function AddDealModal({ onClose, onAdd, defaultStage = 'new' }: AddDealModalProps) {
  const [form, setForm] = useState({
    title: '',
    contact: contacts[0].name,
    company: contacts[0].company,
    amount: '',
    stage: defaultStage as DealStage,
    probability: 20,
    closeDate: '',
    assignee: 'Иван Смирнов',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Введите название сделки';
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'Введите сумму';
    if (!form.closeDate) e.closeDate = 'Укажите дату закрытия';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onAdd({
      id: `d${Date.now()}`,
      title: form.title.trim(),
      contact: form.contact,
      company: form.company,
      amount: Number(form.amount),
      stage: form.stage,
      probability: form.probability,
      closeDate: form.closeDate,
      assignee: form.assignee,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-slide-up overflow-hidden">

        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Новая сделка</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
              Название сделки <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.title ? 'border-red-400' : ''}`}
              placeholder="Например: Корпоративная лицензия"
              value={form.title}
              onChange={e => { setForm(f => ({ ...f, title: e.target.value })); if (errors.title) setErrors(v => ({ ...v, title: '' })); }}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Клиент</label>
              <select
                className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={form.contact}
                onChange={e => {
                  const c = contacts.find(c => c.name === e.target.value);
                  setForm(f => ({ ...f, contact: e.target.value, company: c?.company || f.company }));
                }}
              >
                {contacts.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Компания</label>
              <input
                className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Сумма (₽) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={`w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.amount ? 'border-red-400' : ''}`}
                placeholder="0"
                value={form.amount}
                onChange={e => { setForm(f => ({ ...f, amount: e.target.value })); if (errors.amount) setErrors(v => ({ ...v, amount: '' })); }}
              />
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Дата закрытия <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.closeDate ? 'border-red-400' : ''}`}
                value={form.closeDate}
                onChange={e => { setForm(f => ({ ...f, closeDate: e.target.value })); if (errors.closeDate) setErrors(v => ({ ...v, closeDate: '' })); }}
              />
              {errors.closeDate && <p className="text-xs text-red-500 mt-1">{errors.closeDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Этап</label>
              <select
                className="w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={form.stage}
                onChange={e => setForm(f => ({ ...f, stage: e.target.value as DealStage }))}
              >
                {dealStages.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
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
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Вероятность закрытия — <span className="text-foreground">{form.probability}%</span>
            </label>
            <input
              type="range" min="0" max="100" step="5"
              className="w-full accent-primary"
              value={form.probability}
              onChange={e => setForm(f => ({ ...f, probability: Number(e.target.value) }))}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
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
            Создать сделку
          </button>
        </div>
      </div>
    </div>
  );
}
