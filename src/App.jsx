import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Barbers from './components/Barbers'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'

function App() {
  const [shop, setShop] = useState(null)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' }).catch(()=>{})
        const res = await fetch(`${baseUrl}/api/shop`)
        const data = await res.json()
        setShop(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchShop()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero shop={shop} />
      <Services />
      <Barbers />
      <Testimonials />
      <Booking />
      <footer className="bg-slate-950 text-blue-200/70 border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {shop?.name || 'Blue Flame Barbers'}</p>
          <a href="/test" className="text-blue-300 hover:text-white">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
