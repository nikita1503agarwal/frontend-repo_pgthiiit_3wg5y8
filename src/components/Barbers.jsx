import { useEffect, useState } from 'react'

function Barbers() {
  const [barbers, setBarbers] = useState([])

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/barbers`)
        const data = await res.json()
        setBarbers(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchBarbers()
  }, [])

  return (
    <section id="team" className="bg-slate-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">The Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbers.map(b => (
            <div key={b._id} className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" src={b.avatar || 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop'} alt={b.name} />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{b.name}</h3>
                <p className="text-blue-200/80 text-sm mt-1">{b.bio || 'Barber'}</p>
                {b.specialties?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {b.specialties.map((s, i) => (
                      <span key={i} className="text-xs bg-white/10 border border-white/10 rounded-full px-2 py-1 text-blue-200/90">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Barbers
