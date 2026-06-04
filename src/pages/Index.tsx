import { useState } from 'react';
import Sidebar from '@/components/crm/Sidebar';
import ContactsPage from '@/components/crm/ContactsPage';
import DealsPage from '@/components/crm/DealsPage';
import TasksPage from '@/components/crm/TasksPage';
import AnalyticsPage from '@/components/crm/AnalyticsPage';
import SettingsPage from '@/components/crm/SettingsPage';
import IntegrationsPage from '@/components/crm/IntegrationsPage';
import Icon from '@/components/ui/icon';

type Page = 'contacts' | 'deals' | 'tasks' | 'analytics' | 'settings' | 'integrations';

const pageTitles: Record<Page, string> = {
  contacts: 'Контакты',
  deals: 'Сделки',
  tasks: 'Задачи',
  analytics: 'Аналитика',
  settings: 'Настройки',
  integrations: 'Интеграции',
};

export default function Index() {
  const [page, setPage] = useState<Page>('deals');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar currentPage={page} onNavigate={setPage} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-12 border-b bg-white flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-xs font-medium text-muted-foreground/60">SalesCore</span>
            <Icon name="ChevronRight" size={13} className="text-muted-foreground/40" />
            <span className="text-xs font-semibold text-foreground">{pageTitles[page]}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            >
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
            </button>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center ml-1">
              <span className="text-[11px] font-bold text-white">ИС</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {page === 'contacts' && <ContactsPage />}
          {page === 'deals' && <DealsPage />}
          {page === 'tasks' && <TasksPage />}
          {page === 'analytics' && <AnalyticsPage />}
          {page === 'settings' && <SettingsPage />}
          {page === 'integrations' && <IntegrationsPage />}
        </main>
      </div>

      {notifOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
          <div className="fixed top-12 right-4 z-50 w-80 bg-white border rounded-2xl shadow-xl overflow-hidden animate-slide-up">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">Уведомления</h3>
              <button className="text-xs text-primary hover:underline">Прочитать все</button>
            </div>
            <div className="divide-y max-h-80 overflow-y-auto scrollbar-thin">
              {[
                { icon: 'TrendingUp', color: 'bg-sky-50 text-sky-600', text: 'Сделка "API подключение" перешла в Переговоры', time: '5 мин' },
                { icon: 'AlertCircle', color: 'bg-amber-50 text-amber-600', text: 'Задача "Позвонить Петрову" просрочена', time: '1 час' },
                { icon: 'UserPlus', color: 'bg-violet-50 text-violet-600', text: 'Новый контакт: Дмитрий Козлов (Яндекс)', time: '3 часа' },
                { icon: 'CheckCircle', color: 'bg-emerald-50 text-emerald-600', text: 'Сделка "Техническая поддержка" закрыта', time: 'Вчера' },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-accent/30 cursor-pointer transition-colors">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}>
                    <Icon name={n.icon} size={13} fallback="Bell" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug">{n.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{n.time} назад</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
