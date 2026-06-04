import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Integration {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
  connected: boolean;
  color: string;
  bg: string;
}

const integrations: Integration[] = [
  { id: 'i1', name: '1С: Предприятие', desc: 'Синхронизация счетов и договоров', icon: 'Database', category: 'Бухгалтерия', connected: true, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'i2', name: 'Telegram Bot', desc: 'Уведомления и команды через бот', icon: 'MessageCircle', category: 'Мессенджеры', connected: true, color: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'i3', name: 'Яндекс.Почта', desc: 'Синхронизация входящих писем', icon: 'Mail', category: 'Email', connected: false, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'i4', name: 'AmoCRM Import', desc: 'Импорт контактов и сделок', icon: 'Download', category: 'CRM', connected: false, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 'i5', name: 'Bitrix24', desc: 'Двусторонняя синхронизация данных', icon: 'RefreshCw', category: 'CRM', connected: false, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'i6', name: 'Zoom', desc: 'Автозапись встреч к сделкам', icon: 'Video', category: 'Видеосвязь', connected: true, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'i7', name: 'Google Workspace', desc: 'Календарь, Диск, Почта', icon: 'Chrome', category: 'Продуктивность', connected: false, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'i8', name: 'Webhook API', desc: 'Отправка событий во внешние системы', icon: 'Webhook', category: 'Разработка', connected: false, color: 'text-gray-600', bg: 'bg-gray-100' },
  { id: 'i9', name: 'SMS центр', desc: 'Рассылки и уведомления по SMS', icon: 'Smartphone', category: 'Маркетинг', connected: false, color: 'text-pink-600', bg: 'bg-pink-50' },
];

const categories = ['Все', ...Array.from(new Set(integrations.map(i => i.category)))];

export default function IntegrationsPage() {
  const [list, setList] = useState<Integration[]>(integrations);
  const [cat, setCat] = useState('Все');
  const [search, setSearch] = useState('');

  const toggle = (id: string) => {
    setList(prev => prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
  };

  const filtered = list
    .filter(i => cat === 'Все' || i.category === cat)
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const connectedCount = list.filter(i => i.connected).length;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-5 border-b bg-white flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Интеграции</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{connectedCount} из {list.length} подключено</p>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 border text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
            <Icon name="Plus" size={14} />
            Запросить интеграцию
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm border rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  cat === c ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((intg, i) => (
            <div
              key={intg.id}
              className="bg-white border rounded-2xl p-5 hover:shadow-md transition-all animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${intg.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={intg.icon} size={20} className={intg.color} fallback="Puzzle" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{intg.name}</p>
                    <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-medium">
                      {intg.category}
                    </span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${intg.connected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{intg.desc}</p>

              <button
                onClick={() => toggle(intg.id)}
                className={`w-full py-2 text-sm font-medium rounded-lg transition-all ${
                  intg.connected
                    ? 'border border-red-200 text-red-500 hover:bg-red-50'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {intg.connected ? 'Отключить' : 'Подключить'}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
              <Icon name="Puzzle" size={22} className="text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Интеграции не найдены</p>
            <p className="text-sm text-muted-foreground mt-1">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}
