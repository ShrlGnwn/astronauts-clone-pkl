import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {banners} from '../data/banners.js'

export default function HeroCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const carouselRef = useRef(null)
    const handleScroll = (e) => {
        const scrollPosition = e.target.scrollLeft
        const width = e.target.offsetWidth
        if (width > 0) {
            const index = Math.round(scrollPosition / width)
            setActiveIndex(index)
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
        if (!carouselRef.current) return
        const nextIndex = (activeIndex + 1) % banners.length
        const containerWidth = carouselRef.current.offsetWidth
        carouselRef.current.scrollTo({
            left: nextIndex * containerWidth,
            behavior: 'smooth',
        })
        setActiveIndex(nextIndex)
    }, 3000)
    return () => clearInterval(timer)
    }, [activeIndex])
    return (
        <div className="relative w-full overflow-hidden">
            <div ref={carouselRef} onScroll={handleScroll} className="flex w-full snap-x snap-mandatory overflow-x-auto scrollbar-none">
                {banners.map((banner) => (
                    <div key={banner.id} className="relative h-[333px] w-full flex-shrink-0 snap-center overflow-hidden">
                        <Link to={banner.href} className="block h-full w-full">
                            <img src={banner.image} alt={banner.title} className="absolute inset-0 block h-full w-full max-w-full text-transparent object-cover object-bottom" />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-1.5">
                {banners.map((_, index) => (
                    <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => {
                        if (!carouselRef.current) return
                        const containerWidth = carouselRef.current.offsetWidth
                        carouselRef.current.scrollTo({
                            left: index * containerWidth,
                            behavior: 'smooth',
                        })
                        setActiveIndex(index)
                        }} 
                        className={`h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index ? 'w-5 bg-sky-500' : 'w-2 bg-white/50'}`} />
                ))}
            </div>
        </div>
    )
}