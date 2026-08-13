import React, {useState} from 'react'
import {faqs} from '../data/faqs.js'

export default function  FaqAccordion() {
  const [openId, setOpenId] = useState(null)
  const toggleFaq = (id) => {
    setOpenId(openId === id? null: id)
  }
  return (
    <section className="px-1 py-4">
      <div className="bg-white">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div key={faq.id} className="border-b border-slate-200">
              <button type="button" onClick={() => toggleFaq(faq.id)} className="flex w-full items-center justify-between py-4 text-left focus:outline-none">
                <span className="text-sm font-semibold">{faq.question}</span>
                <svg className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.55.55 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.55.55 0 0 0-.771 0" />
                </svg>
              </button>
              {isOpen && (
                <div className="pb-4 text-xs leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}