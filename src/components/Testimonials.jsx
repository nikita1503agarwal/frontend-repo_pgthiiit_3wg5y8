import { useEffect, useState } from 'react'

function Testimonials() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/testimonials`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchItems()
  }, [])

  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">What clients say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <img src={t.avatar || 'https://i.pravatar.cc/80'} alt={t.author} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-amber-300 text-sm">{'★★★★★'.slice(0, t.rating)}</p>
                </div>
              </div>
              <p className="mt-4 text-blue-200/85">{t.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
