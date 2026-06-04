import { useState } from 'react';
import { deals, dealStages, type Deal, type DealStage } from './data';
import Icon from '@/components/ui/icon';

const formatAmount = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

export default function DealsPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const dealsByStage = (stage: DealStage) => deals.filter(d => d.stage === stage);
  const stageTotal = (stage: DealStage) =>
    dealsByStage(stage).reduce((s, d) => s + d.amount, 0);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-5 border-b bg-white flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Сделки</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {deals.length} сделок · {formatAmount(deals.reduce((s, d) => s + d.amount, 0))} общий объём
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg p-0.5 bg-secondary">
            <button
              onClick={() => setView('kanban')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === 'kanban' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Columns" size={13} className="inline mr-1.5" />
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === 'list' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="List" size={13} className="inline mr-1.5" />
              Список
            </button>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            <Icon name="Plus" size={15} />
            Сделка
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex-1 overflow-x-auto scrollbar-thin p-5">
          <div className="flex gap-4 h-full min-w-max">
            {dealStages.map(stage => (
              <div key={stage.key} className="w-64 flex flex-col">
                <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg border mb-3 ${stage.bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${stage.color}`}>{stage.label}</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-white/60 ${stage.color}`}>
                      {dealsByStage(stage.key).length}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${stage.color} opacity-75`}>
                    {formatAmount(stageTotal(stage.key))}
                  </span>
                </div>

                <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-thin pr-0.5">
                  {dealsByStage(stage.key).map((deal, i) => (
                    <DealCard key={deal.id} deal={deal} index={i} />
                  ))}
                  <button className="w-full py-2 border border-dashed rounded-lg text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors flex items-center justify-center gap-1.5">
                    <Icon name="Plus" size={12} />
                    Добавить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <table className="w-full">
            <thead className="sticky top-0 z-10" style={{ background: 'hsl(220 20% 97%)' }}>
              <tr className="border-b">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сделка</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Компания</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сумма</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Этап</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Вероятность</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Закрытие</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ответственный</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const stage = dealStages.find(s => s.key === deal.stage)!;
                return (
                  <tr key={deal.id} className="border-b bg-white hover:bg-accent/20 cursor-pointer transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-medium text-foreground">{deal.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{deal.contact}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{deal.company}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-foreground">{formatAmount(deal.amount)}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${stage.bg} ${stage.color}`}>
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden w-16">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{deal.closeDate}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-primary">
                            {deal.assignee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-foreground">{deal.assignee}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const stage = dealStages.find(s => s.key === deal.stage)!;
  return (
    <div
      className="bg-white border rounded-xl p-3.5 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 animate-slide-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <p className="text-sm font-medium text-foreground leading-snug">{deal.title}</p>
      <p className="text-xs text-muted-foreground mt-1">{deal.company}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(deal.amount)} ₽
        </span>
        <span className="text-xs text-muted-foreground">{deal.probability}%</span>
      </div>

      <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary/60 rounded-full transition-all" style={{ width: `${deal.probability}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary">
              {deal.assignee.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{deal.assignee.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Calendar" size={11} />
          {deal.closeDate.slice(5).replace('-', '.')}
        </div>
      </div>
    </div>
  );
}
