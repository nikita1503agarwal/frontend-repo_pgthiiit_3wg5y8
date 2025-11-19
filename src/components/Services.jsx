import { useEffect, useState } from 'react'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section id="services" className="relative bg-slate-950 text-white py-20">
      <div className="absolute inset-0 pointer-events-none opacity-[.04]" style={{backgroundImage:'url(/noise.png)'}}></div>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Services</h2>
            <p className="text-blue-200/80 mt-2">Simple menu, no guesswork. What are you getting today?</p>
          </div>
          <a href="#booking" className="hidden sm:inline-flex rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-semibold">Book now</a>
        </div>

        {loading ? (
          <p className="text-blue-200">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s._id} className={`rounded-2xl border ${s.popular ? 'border-amber-400/40 bg-amber-400/5' : 'border-white/10 bg-white/5'} p-6 backdrop-blur shadow-lg`}>
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  {s.popular && <span className="text-xs uppercase tracking-wide bg-amber-400/20 text-amber-300 border border-amber-300/30 rounded-full px-2 py-0.5">Popular</span>}
                </div>
                <p className="mt-2 text-blue-200/80 min-h-[3rem]">{s.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-extrabold">${s.price}</span>
                  <span className="text-blue-200/70">{s.duration_minutes} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Services
