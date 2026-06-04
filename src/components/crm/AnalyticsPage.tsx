import Icon from '@/components/ui/icon';
import { deals, tasks, contacts } from './data';

const formatAmount = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n) + ' ₽';

const wonDeals = deals.filter(d => d.stage === 'won');
const wonRevenue = wonDeals.reduce((s, d) => s + d.amount, 0);
const activeDeals = deals.filter(d => !['won', 'lost'].includes(d.stage));
const pipeline = activeDeals.reduce((s, d) => s + d.amount, 0);
const conversionRate = Math.round((wonDeals.length / deals.length) * 100);
const activeTasks = tasks.filter(t => t.status !== 'done').length;

const metrics = [
  { label: 'Выручка', value: formatAmount(wonRevenue), icon: 'DollarSign', change: '+18%', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Воронка', value: formatAmount(pipeline), icon: 'TrendingUp', change: '+7%', up: true, color: 'text-sky-600', bg: 'bg-sky-50' },
  { label: 'Конверсия', value: `${conversionRate}%`, icon: 'Target', change: '-2%', up: false, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Контактов', value: contacts.length.toString(), icon: 'Users', change: '+12', up: true, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const monthlyData = [
  { month: 'Авг', value: 380000, deals: 4 },
  { month: 'Сен', value: 520000, deals: 6 },
  { month: 'Окт', value: 290000, deals: 3 },
  { month: 'Ноя', value: 680000, deals: 8 },
  { month: 'Дек', value: 450000, deals: 5 },
  { month: 'Янв', value: wonRevenue, deals: wonDeals.length },
];

const maxValue = Math.max(...monthlyData.map(d => d.value));

const teamData = [
  { name: 'Иван Смирнов', initials: 'ИС', deals: 3, revenue: 636000, conversion: 75 },
  { name: 'Ольга Кузнецова', initials: 'ОК', deals: 2, revenue: 180000, conversion: 50 },
  { name: 'Павел Орлов', initials: 'ПО', deals: 2, revenue: 960000, conversion: 33 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin animate-fade-in">
      <div className="px-6 py-5 border-b bg-white flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Аналитика</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Январь 2024 · обновлено только что</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border text-sm rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <Icon name="Download" size={14} />
            Экспорт
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border text-sm rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <Icon name="Filter" size={14} />
            Фильтр
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-white border rounded-2xl p-4 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center`}>
                  <Icon name={m.icon} size={17} className={m.color} fallback="BarChart2" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {m.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-foreground">Выручка по месяцам</h3>
              <span className="text-xs text-muted-foreground">последние 6 мес.</span>
            </div>
            <div className="flex items-end gap-3 h-44">
              {monthlyData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {(d.value / 1000).toFixed(0)}к
                  </span>
                  <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${(d.value / maxValue) * 140}px` }}>
                    <div
                      className={`absolute inset-0 rounded-t-lg transition-all ${i === monthlyData.length - 1 ? 'bg-primary' : 'bg-primary/20'}`}
                    />
                    {i === monthlyData.length - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-t-lg" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Воронка продаж</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Новые', value: deals.filter(d => d.stage === 'new').length, total: deals.length, color: 'bg-sky-400' },
                { label: 'Переговоры', value: deals.filter(d => d.stage === 'negotiation').length, total: deals.length, color: 'bg-amber-400' },
                { label: 'Предложение', value: deals.filter(d => d.stage === 'proposal').length, total: deals.length, color: 'bg-violet-400' },
                { label: 'Закрыто', value: wonDeals.length, total: deals.length, color: 'bg-emerald-400' },
                { label: 'Потеряно', value: deals.filter(d => d.stage === 'lost').length, total: deals.length, color: 'bg-red-400' },
              ].map((item, i) => (
                <div key={item.label} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-muted-foreground font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Результаты команды</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сотрудник</th>
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сделки</th>
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Выручка</th>
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Конверсия</th>
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">KPI</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((member, i) => (
                  <tr key={member.name} className="border-b last:border-0 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-primary">{member.initials}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-foreground">{member.deals}</td>
                    <td className="py-3 text-sm font-semibold text-foreground">{formatAmount(member.revenue)}</td>
                    <td className="py-3 text-sm text-foreground">{member.conversion}%</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${member.conversion}%` }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                <Icon name="AlertCircle" size={16} className="text-amber-600" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">Просроченные</h4>
            </div>
            <p className="text-3xl font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground mt-1">задачи требуют внимания</p>
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
                <Icon name="Clock" size={16} className="text-sky-600" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">Активные задачи</h4>
            </div>
            <p className="text-3xl font-bold text-foreground">{activeTasks}</p>
            <p className="text-xs text-muted-foreground mt-1">в работе прямо сейчас</p>
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Icon name="CheckCircle" size={16} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">Выполнено</h4>
            </div>
            <p className="text-3xl font-bold text-foreground">{tasks.filter(t => t.status === 'done').length}</p>
            <p className="text-xs text-muted-foreground mt-1">задач за этот месяц</p>
          </div>
        </div>
      </div>
    </div>
  );
}
