import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-green-400 border-green-400">⚡ Защита в реальном времени</Badge>,
    title: "Лучший антивирус.",
    showButton: true,
    buttonText: 'Скачать бесплатно',
    showScanner: true,
  },
  {
    id: 'about',
    title: 'Почему GuardX?',
    content: 'Мы сканируем угрозы быстрее всех. Наш движок обнаруживает вирусы, трояны и шпионское ПО за секунды — до того, как они причинят вред.'
  },
  {
    id: 'features',
    title: 'Что мы блокируем',
    content: 'Вирусы, трояны, руткиты, рекламное ПО, шпионские программы, фишинг и zero-day атаки. GuardX работает 24/7 без нагрузки на систему.'
  },
  {
    id: 'testimonials',
    title: '10 млн пользователей защищены',
    content: 'Пользователи по всему миру доверяют GuardX защиту своих данных, паролей и финансов. Присоединяйтесь — это бесплатно.'
  },
  {
    id: 'join',
    title: 'Скачайте прямо сейчас.',
    content: 'Бесплатная версия защищает от 99,9% угроз. Установка занимает 30 секунд.',
    showButton: true,
    buttonText: 'Скачать бесплатно'
  },
]
