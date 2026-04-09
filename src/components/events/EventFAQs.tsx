"use client"

import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQ {
  question: string
  answer: string
}

interface EventFAQsProps {
  faqs: FAQ[] | null
}

export default function EventFAQs({ faqs }: EventFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) {
    return null
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <HelpCircle className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-text-secondary">Find answers to common questions</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            className="bg-bg-primary rounded-xl border border-border overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-bg-secondary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                  <span className="text-primary font-semibold">Q{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                </div>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-text-tertiary" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <div className="pl-14">
                      <p className="text-text-secondary">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Additional Help */}
      <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/5 to-primary/5 rounded-xl border border-border">
        <h4 className="font-semibold mb-3">Still have questions?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-bg-primary border border-border">
            <p className="font-medium mb-2">Contact Organizers</p>
            <p className="text-sm text-text-secondary">Email: events@clubnexus.edu</p>
            <p className="text-sm text-text-secondary">Phone: +1 (555) 123-4567</p>
          </div>
          <div className="p-4 rounded-lg bg-bg-primary border border-border">
            <p className="font-medium mb-2">Visit Help Center</p>
            <p className="text-sm text-text-secondary">Find detailed guides and documentation</p>
            <a href="/help" className="text-primary text-sm font-medium hover:underline">
              Go to Help Center →
            </a>
          </div>
          <div className="p-4 rounded-lg bg-bg-primary border border-border">
            <p className="font-medium mb-2">Join Community</p>
            <p className="text-sm text-text-secondary">Connect with other participants on Discord</p>
            <a href="/discord" className="text-primary text-sm font-medium hover:underline">
              Join Discord Server →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}