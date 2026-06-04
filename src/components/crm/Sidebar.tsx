import Icon from '@/components/ui/icon';

type Page = 'contacts' | 'deals' | 'tasks' | 'analytics' | 'settings' | 'integrations';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: 'contacts' as Page, label: 'Контакты', icon: 'Users', count: 7 },
  { id: 'deals' as Page, label: 'Сделки', icon: 'TrendingUp', count: 7 },
  { id: 'tasks' as Page, label: 'Задачи', icon: 'CheckSquare', count: 3 },
  { id: 'analytics' as Page, label: 'Аналитика', icon: 'BarChart2' },
];

const bottomItems = [
  { id: 'integrations' as Page, label: 'Интеграции', icon: 'Puzzle' },
  { id: 'settings' as Page, label: 'Настройки', icon: 'Settings' },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[220px] min-h-screen flex flex-col" style={{ background: 'hsl(var(--sidebar-bg))' }}>
      <div className="px-5 py-5 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Zap" size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">SalesCore</p>
            <p className="text-[10px]" style={{ color: 'hsl(var(--sidebar-fg))' }}>CRM система</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: 'hsl(215 15% 45%)' }}>
          Рабочее пространство
        </p>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-primary text-white font-medium'
                  : 'hover:bg-white/5 font-normal'
              }`}
              style={{ color: isActive ? 'white' : 'hsl(var(--sidebar-fg))' }}
            >
              <Icon
                name={item.icon}
                size={16}
                className={isActive ? 'text-white' : 'group-hover:text-white/80 transition-colors'}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/8 text-white/40'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-0.5 border-t pt-4" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        {bottomItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
                isActive ? 'bg-primary text-white font-medium' : 'hover:bg-white/5'
              }`}
              style={{ color: isActive ? 'white' : 'hsl(var(--sidebar-fg))' }}
            >
              <Icon name={item.icon} size={16} className="transition-colors" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="mt-4 mx-1 p-3 rounded-lg" style={{ background: 'hsl(var(--sidebar-hover-bg))' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-primary">ИС</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Иван Смирнов</p>
              <p className="text-[10px] truncate" style={{ color: 'hsl(var(--sidebar-fg))' }}>Руководитель продаж</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
