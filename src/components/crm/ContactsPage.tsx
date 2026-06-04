import { useState } from 'react';
import { contacts, type Contact } from './data';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const statusConfig = {
  active: { label: 'Активный', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  lead: { label: 'Лид', class: 'bg-sky-50 text-sky-700 border-sky-200' },
  inactive: { label: 'Неактивный', class: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Contact | null>(null);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full animate-fade-in">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-5 border-b bg-white flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Контакты</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{contacts.length} контактов в базе</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск контактов..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 w-56 h-9 text-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
              <Icon name="Plus" size={15} />
              Добавить
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="border-b" style={{ background: 'hsl(220 20% 97%)' }}>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Контакт</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Компания</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Статус</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сделки</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell">Активность</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact, i) => (
                <tr
                  key={contact.id}
                  className={`border-b hover:bg-accent/30 cursor-pointer transition-colors ${selected?.id === contact.id ? 'bg-accent/50' : 'bg-white'}`}
                  onClick={() => setSelected(selected?.id === contact.id ? null : contact)}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">{contact.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {contact.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-secondary rounded text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-foreground">{contact.company}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusConfig[contact.status].class}`}>
                      {statusConfig[contact.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-foreground">{contact.deals}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden xl:table-cell">
                    <p className="text-sm text-muted-foreground">{contact.lastActivity}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                      <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="w-72 border-l bg-white flex-shrink-0 flex flex-col animate-slide-up overflow-y-auto scrollbar-thin">
          <div className="p-5 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Карточка контакта</h3>
            <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary transition-colors">
              <Icon name="X" size={15} className="text-muted-foreground" />
            </button>
          </div>
          <div className="p-5 space-y-5">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{selected.avatar}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{selected.company}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusConfig[selected.status].class}`}>
                {statusConfig[selected.status].label}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Icon name="Mail" size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground break-all">{selected.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="Phone" size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground">{selected.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="TrendingUp" size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground">{selected.deals} сделок</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="Clock" size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{selected.lastActivity}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="Phone" size={13} />
                Звонок
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border text-xs font-medium rounded-lg hover:bg-secondary transition-colors">
                <Icon name="Mail" size={13} />
                Письмо
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
