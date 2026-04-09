"use client"

import { Clock, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface ScheduleItem {
  time: string
  activity: string
}

interface ScheduleData {
  day1?: ScheduleItem[]
  day2?: ScheduleItem[]
  day3?: ScheduleItem[]
  [key: string]: ScheduleItem[] | undefined
}

interface EventScheduleProps {
  schedule: ScheduleData | null
}

export default function EventSchedule({ schedule }: EventScheduleProps) {
  if (!schedule || Object.keys(schedule).length === 0) {
    return null
  }

  const days = Object.entries(schedule).filter(([_, items]) => items && items.length > 0)

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Event Schedule</h2>
          <p className="text-text-secondary">Detailed timeline of activities</p>
        </div>
      </div>

      <div className="space-y-8">
        {days.map(([day, items], dayIndex) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="bg-bg-primary rounded-xl border border-border overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
              <h3 className="text-xl font-semibold capitalize">
                {day.replace('day', 'Day ')}
              </h3>
            </div>
            
            <div className="divide-y divide-border">
              {items?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-bg-secondary/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.activity}</p>
                    </div>
                    <div className="sm:w-32 text-right">
                      <span className="text-sm text-text-tertiary">Duration: 1h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border">
        <h4 className="font-semibold mb-2">Important Notes</h4>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <span>All times are in local timezone (IST)</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <span>Check-in begins 30 minutes before the event start time</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <span>Meals and refreshments will be provided at designated times</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <span>Schedule is subject to change. Please check announcements</span>
          </li>
        </ul>
      </div>
    </div>
  )
}