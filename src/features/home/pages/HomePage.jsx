import React from 'react'
import PageShell from '../../../shared/ui/PageShell.jsx'
import HomeHeader from '../components/HomeHeader.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import SpecialSection from '../components/SpecialSections.jsx'
import HomeCategories from '../components/HomeCategories.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import HomeFooter from '../components/HomeFooter.jsx'

export default function HomePage() {
  return (
    <PageShell title="">
      <div className="-mx-4 -mt-10 min-h-screen bg-slate-50">
        <section className="relative w-full overflow-hidden">
          <HomeHeader />
          <HeroCarousel />
        </section>
        <SpecialSection />
        <HomeCategories />
        <FaqAccordion />
        <HomeFooter />
      </div>
    </PageShell>
  )
}