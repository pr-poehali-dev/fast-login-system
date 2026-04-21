import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

const FAKE_THREATS = [
  { name: "Adware.SearchBar.gen", path: "C:\\Program Files\\SearchToolbar\\toolbar.dll", level: "Средняя" },
  { name: "Trojan.Win32.Agent.xyz", path: "C:\\Windows\\Temp\\svchost32.exe", level: "Высокая" },
  { name: "Spyware.KeyLogger.pro", path: "C:\\Users\\User\\AppData\\keylog.dll", level: "Критическая" },
  { name: "Rootkit.Hidden.gen2", path: "C:\\Windows\\System32\\drivers\\hidden.sys", level: "Высокая" },
  { name: "Worm.Network.spread", path: "C:\\Program Files\\NetShare\\spread.exe", level: "Средняя" },
]

const LEVEL_COLOR: Record<string, string> = {
  "Средняя": "text-yellow-400",
  "Высокая": "text-orange-400",
  "Критическая": "text-red-400",
}

interface ExtendedSectionProps extends SectionProps {
  showScanner?: boolean
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, showScanner }: ExtendedSectionProps) {
  const [query, setQuery] = useState("")
  const [popup, setPopup] = useState<typeof FAKE_THREATS[0] | null>(null)
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    if (!query.trim()) return
    setScanning(true)
    setPopup(null)
    setTimeout(() => {
      const threat = FAKE_THREATS[Math.floor(Math.random() * FAKE_THREATS.length)]
      setPopup(threat)
      setScanning(false)
    }, 1500)
  }

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-green-400 bg-transparent border-green-400 hover:bg-green-400 hover:text-black transition-colors text-lg px-8 py-6"
          >
            {buttonText}
          </Button>
        </motion.div>
      )}

      {showScanner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-neutral-400 text-sm mb-3">Проверь свой ПК прямо сейчас:</p>
          <div className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleScan()}
              placeholder="Введи название угрозы..."
              className="flex-1 bg-transparent border border-neutral-600 rounded-md px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-green-400 transition-colors"
            />
            <Button
              onClick={handleScan}
              disabled={scanning}
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6"
            >
              {scanning ? "Сканирую..." : "Сканировать"}
            </Button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-16 right-8 md:right-16 w-80 rounded-lg overflow-hidden shadow-2xl border border-neutral-700"
          >
            <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white font-bold text-sm tracking-wide">АНТИВИРУС — ПРЕДУПРЕЖДЕНИЕ</span>
              </div>
              <button onClick={() => setPopup(null)} className="text-white hover:text-red-200 transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="bg-neutral-900 px-4 py-4 space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="TriangleAlert" size={18} className="text-yellow-400 mt-0.5 shrink-0" />
                <p className="text-white font-semibold text-sm">Обнаружена подозрительная активность!</p>
              </div>
              <p className="text-neutral-400 text-sm">Угроза: <span className="text-red-400 font-mono">{popup.name}</span></p>
              <p className="text-neutral-500 text-xs font-mono">{popup.path}</p>
              <p className="text-neutral-400 text-sm">Уровень опасности: <span className={`font-semibold ${LEVEL_COLOR[popup.level]}`}>{popup.level}</span></p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white flex-1" onClick={() => setPopup(null)}>
                  Сканировать сейчас
                </Button>
                <Button size="sm" variant="outline" className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 flex-1" onClick={() => setPopup(null)}>
                  Игнорировать
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
