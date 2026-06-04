import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

const roles = [
  { id: 'r1', name: 'Иван Смирнов', initials: 'ИС', email: 'i.smirnov@company.ru', role: 'Руководитель', status: 'active', since: 'Янв 2023' },
  { id: 'r2', name: 'Ольга Кузнецова', initials: 'ОК', email: 'o.kuznetsova@company.ru', role: 'Менеджер продаж', status: 'active', since: 'Мар 2023' },
  { id: 'r3', name: 'Павел Орлов', initials: 'ПО', email: 'p.orlov@company.ru', role: 'Менеджер продаж', status: 'active', since: 'Июн 2023' },
  { id: 'r4', name: 'Наталья Белова', initials: 'НБ', email: 'n.belova@company.ru', role: 'Техподдержка', status: 'inactive', since: 'Сен 2023' },
  { id: 'r5', name: 'Артём Фёдоров', initials: 'АФ', email: 'a.fedorov@company.ru', role: 'Техподдержка', status: 'active', since: 'Окт 2023' },
];

const roleColors: Record<string, string> = {
  'Руководитель': 'bg-violet-50 text-violet-700 border-violet-200',
  'Менеджер продаж': 'bg-sky-50 text-sky-700 border-sky-200',
  'Техподдержка': 'bg-amber-50 text-amber-700 border-amber-200',
};

const sections = [
  { id: 'team', label: 'Команда и роли', icon: 'Users' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
  { id: 'workflow', label: 'Воркфлоу', icon: 'GitBranch' },
  { id: 'security', label: 'Безопасность', icon: 'Shield' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('team');

  const notifs = [
    { label: 'Новая сделка', desc: 'При создании новой сделки в системе', key: 'new_deal', value: true },
    { label: 'Смена этапа', desc: 'При переходе сделки на другой этап', key: 'stage_change', value: true },
    { label: 'Просроченная задача', desc: 'Напоминание о невыполненных задачах', key: 'overdue', value: true },
    { label: 'Новый контакт', desc: 'При добавлении нового контакта', key: 'new_contact', value: false },
    { label: 'Email уведомления', desc: 'Дублировать уведомления на почту', key: 'email', value: true },
    { label: 'SMS уведомления', desc: 'Критичные уведомления по SMS', key: 'sms', value: false },
  ];

  const workflows = [
    { label: 'Авто-назначение лидов', desc: 'Равномерно распределять новые лиды между менеджерами', active: true },
    { label: 'Эскалация при просрочке', desc: 'Уведомлять руководителя при просрочке задачи на 1 день', active: true },
    { label: 'Авто-задача после сделки', desc: 'Создавать задачу "Онбординг" после закрытия сделки', active: false },
    { label: 'Follow-up напоминание', desc: 'Напоминать о контакте если нет активности 7 дней', active: true },
  ];

  return (
    <div className="flex h-full animate-fade-in">
      <div className="w-52 border-r bg-white flex-shrink-0 py-4">
        <p className="px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Настройки</p>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
              activeSection === s.id
                ? 'text-primary bg-accent font-medium'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <Icon name={s.icon} size={15} className={activeSection === s.id ? 'text-primary' : 'text-muted-foreground'} fallback="Settings" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeSection === 'team' && (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Команда и роли</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{roles.length} сотрудников</p>
              </div>
              <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="UserPlus" size={14} />
                Пригласить
              </button>
            </div>

            <div className="bg-white border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead style={{ background: 'hsl(220 20% 97%)' }}>
                  <tr className="border-b">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сотрудник</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Роль</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Статус</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">В системе с</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((member, i) => (
                    <tr key={member.id} className="border-b last:border-0 hover:bg-accent/20 transition-colors animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{member.initials}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${roleColors[member.role] || 'bg-secondary text-foreground border-border'}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${member.status === 'active' ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                          {member.status === 'active' ? 'Активен' : 'Неактивен'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-muted-foreground">{member.since}</td>
                      <td className="px-4 py-3.5">
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                          <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-1">Уведомления</h2>
            <p className="text-sm text-muted-foreground mb-5">Настройте когда и как получать уведомления</p>
            <div className="bg-white border rounded-2xl divide-y">
              {notifs.map((n, i) => (
                <div key={n.key} className="flex items-center justify-between px-5 py-4 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.value} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'workflow' && (
          <div className="p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-1">Автоматизация воркфлоу</h2>
            <p className="text-sm text-muted-foreground mb-5">Триггеры и автоматические действия</p>
            <div className="space-y-3">
              {workflows.map((w, i) => (
                <div key={w.label} className="bg-white border rounded-xl px-5 py-4 flex items-center justify-between animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${w.active ? 'bg-primary/10' : 'bg-secondary'}`}>
                      <Icon name="Zap" size={15} className={w.active ? 'text-primary' : 'text-muted-foreground'} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{w.desc}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={w.active} />
                </div>
              ))}
              <button className="w-full py-3 border border-dashed rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors flex items-center justify-center gap-2">
                <Icon name="Plus" size={15} />
                Добавить правило
              </button>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-1">Безопасность</h2>
            <p className="text-sm text-muted-foreground mb-5">Управление доступом и защита данных</p>
            <div className="space-y-4">
              {[
                { title: 'Двухфакторная аутентификация', desc: 'Требовать 2FA для всех пользователей', icon: 'ShieldCheck', active: true },
                { title: 'Сессионный тайм-аут', desc: 'Автовыход после 8 часов неактивности', icon: 'Clock', active: true },
                { title: 'Аудит действий', desc: 'Логировать все действия пользователей', icon: 'FileText', active: false },
                { title: 'IP-ограничения', desc: 'Разрешить вход только с офисных IP', icon: 'Globe', active: false },
              ].map((item, i) => (
                <div key={item.title} className="bg-white border rounded-xl px-5 py-4 flex items-center justify-between animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.active ? 'bg-emerald-50' : 'bg-secondary'}`}>
                      <Icon name={item.icon} size={15} className={item.active ? 'text-emerald-600' : 'text-muted-foreground'} fallback="Shield" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={item.active} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
