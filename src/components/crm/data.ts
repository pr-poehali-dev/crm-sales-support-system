export type ContactStatus = 'active' | 'lead' | 'inactive';
export type DealStage = 'new' | 'negotiation' | 'proposal' | 'won' | 'lost';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ContactStatus;
  avatar: string;
  deals: number;
  lastActivity: string;
  tags: string[];
}

export interface Deal {
  id: string;
  title: string;
  contact: string;
  company: string;
  amount: number;
  stage: DealStage;
  probability: number;
  closeDate: string;
  assignee: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
  relatedTo: string;
  type: 'call' | 'meeting' | 'email' | 'task';
}

export const contacts: Contact[] = [
  { id: 'c1', name: 'Александр Петров', company: 'ООО Технологии', email: 'a.petrov@tech.ru', phone: '+7 (495) 123-45-67', status: 'active', avatar: 'АП', deals: 3, lastActivity: '2 часа назад', tags: ['VIP', 'Партнёр'] },
  { id: 'c2', name: 'Мария Соколова', company: 'СберТех', email: 'm.sokolova@sber.ru', phone: '+7 (495) 234-56-78', status: 'active', avatar: 'МС', deals: 1, lastActivity: 'Вчера', tags: ['Клиент'] },
  { id: 'c3', name: 'Дмитрий Козлов', company: 'Яндекс', email: 'd.kozlov@yandex.ru', phone: '+7 (495) 345-67-89', status: 'lead', avatar: 'ДК', deals: 0, lastActivity: '3 дня назад', tags: ['Лид'] },
  { id: 'c4', name: 'Елена Новикова', company: 'Mail.ru Group', email: 'e.novikova@mail.ru', phone: '+7 (495) 456-78-90', status: 'active', avatar: 'ЕН', deals: 2, lastActivity: '1 час назад', tags: ['VIP'] },
  { id: 'c5', name: 'Сергей Волков', company: 'Tinkoff', email: 's.volkov@tinkoff.ru', phone: '+7 (495) 567-89-01', status: 'lead', avatar: 'СВ', deals: 0, lastActivity: '1 неделю назад', tags: ['Лид', 'Холодный'] },
  { id: 'c6', name: 'Анна Морозова', company: 'Ozon', email: 'a.morozova@ozon.ru', phone: '+7 (495) 678-90-12', status: 'inactive', avatar: 'АМ', deals: 1, lastActivity: '2 недели назад', tags: ['Клиент'] },
  { id: 'c7', name: 'Игорь Лебедев', company: 'Авито', email: 'i.lebedev@avito.ru', phone: '+7 (495) 789-01-23', status: 'active', avatar: 'ИЛ', deals: 4, lastActivity: '30 минут назад', tags: ['VIP', 'Партнёр'] },
];

export const deals: Deal[] = [
  { id: 'd1', title: 'Корпоративная лицензия CRM', contact: 'Александр Петров', company: 'ООО Технологии', amount: 450000, stage: 'negotiation', probability: 70, closeDate: '2024-02-15', assignee: 'Иван Смирнов', createdAt: '2024-01-10' },
  { id: 'd2', title: 'Интеграция с 1С', contact: 'Мария Соколова', company: 'СберТех', amount: 180000, stage: 'proposal', probability: 55, closeDate: '2024-02-28', assignee: 'Ольга Кузнецова', createdAt: '2024-01-15' },
  { id: 'd3', title: 'Техническая поддержка', contact: 'Елена Новикова', company: 'Mail.ru Group', amount: 96000, stage: 'won', probability: 100, closeDate: '2024-01-20', assignee: 'Иван Смирнов', createdAt: '2024-01-05' },
  { id: 'd4', title: 'Обновление платформы', contact: 'Игорь Лебедев', company: 'Авито', amount: 750000, stage: 'new', probability: 20, closeDate: '2024-03-31', assignee: 'Павел Орлов', createdAt: '2024-01-18' },
  { id: 'd5', title: 'Мобильное приложение', contact: 'Дмитрий Козлов', company: 'Яндекс', amount: 320000, stage: 'lost', probability: 0, closeDate: '2024-01-10', assignee: 'Ольга Кузнецова', createdAt: '2023-12-20' },
  { id: 'd6', title: 'API подключение', contact: 'Сергей Волков', company: 'Tinkoff', amount: 210000, stage: 'new', probability: 15, closeDate: '2024-03-15', assignee: 'Павел Орлов', createdAt: '2024-01-19' },
  { id: 'd7', title: 'Расширение лицензий', contact: 'Александр Петров', company: 'ООО Технологии', amount: 90000, stage: 'negotiation', probability: 80, closeDate: '2024-02-10', assignee: 'Иван Смирнов', createdAt: '2024-01-17' },
];

export const tasks: Task[] = [
  { id: 't1', title: 'Позвонить Александру Петрову', description: 'Уточнить детали по корпоративной лицензии', priority: 'high', status: 'todo', dueDate: '2024-01-25', assignee: 'Иван Смирнов', relatedTo: 'ООО Технологии', type: 'call' },
  { id: 't2', title: 'Подготовить коммерческое предложение', description: 'КП для СберТех по интеграции с 1С', priority: 'high', status: 'in_progress', dueDate: '2024-01-24', assignee: 'Ольга Кузнецова', relatedTo: 'СберТех', type: 'task' },
  { id: 't3', title: 'Встреча с командой Авито', description: 'Обсудить требования к обновлению платформы', priority: 'medium', status: 'todo', dueDate: '2024-01-26', assignee: 'Павел Орлов', relatedTo: 'Авито', type: 'meeting' },
  { id: 't4', title: 'Отправить договор Mail.ru', description: 'Финальная версия договора на техподдержку', priority: 'high', status: 'done', dueDate: '2024-01-20', assignee: 'Иван Смирнов', relatedTo: 'Mail.ru Group', type: 'email' },
  { id: 't5', title: 'Онбординг нового клиента', description: 'Настройка рабочего пространства для СберТех', priority: 'medium', status: 'in_progress', dueDate: '2024-01-28', assignee: 'Ольга Кузнецова', relatedTo: 'СберТех', type: 'task' },
  { id: 't6', title: 'Follow-up с Tinkoff', description: 'Повторный контакт после презентации', priority: 'low', status: 'todo', dueDate: '2024-01-30', assignee: 'Павел Орлов', relatedTo: 'Tinkoff', type: 'call' },
];

export const dealStages: { key: DealStage; label: string; color: string; bg: string }[] = [
  { key: 'new', label: 'Новые', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
  { key: 'negotiation', label: 'Переговоры', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  { key: 'proposal', label: 'Предложение', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' },
  { key: 'won', label: 'Закрыто', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  { key: 'lost', label: 'Потеряно', color: 'text-red-500', bg: 'bg-red-50 border-red-200' },
];
