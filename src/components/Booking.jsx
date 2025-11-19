import { useEffect, useMemo, useState } from 'react'

function Booking() {
  const [services, setServices] = useState([])
  const [barbers, setBarbers] = useState([])
  const [status, setStatus] = useState(null)

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sRes, bRes] = await Promise.all([
          fetch(`${baseUrl}/api/services`),
          fetch(`${baseUrl}/api/barbers`),
        ])
        setServices(await sRes.json())
        setBarbers(await bRes.json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchAll()
  }, [baseUrl])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    if (!payload.customer_name || !payload.date || !payload.time) {
      setStatus({ type: 'error', message: 'Please fill name, date and time.' })
      return
    }
    try {
      const res = await fetch(`${baseUrl}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create appointment')
      const data = await res.json()
      setStatus({ type: 'success', message: 'Appointment booked! Check your email for details.' })
      e.currentTarget.reset()
    } catch (e) {
      setStatus({ type: 'error', message: e.message })
    }
  }

  return (
    <section id="booking" className="relative bg-slate-950 text-white py-20">
      <div className="absolute inset-0 pointer-events-none opacity-[.04]" style={{backgroundImage:'url(/noise.png)'}}></div>
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">Book your seat</h2>
        <p className="text-blue-200/80 mb-10">Pick a service, choose your barber, lock your time. We'll be ready.</p>

        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Name</label>
              <input name="customer_name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Email</label>
              <input type="email" name="customer_email" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Phone</label>
              <input name="customer_phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-blue-200/80 mb-1">Date</label>
                <input type="date" name="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-blue-200/80 mb-1">Time</label>
                <input type="time" name="time" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-blue-200/80 mb-1">Service</label>
                <select name="service_id" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <option value="">Select service</option>
                  {services.map(s => (
                    <option key={s._id} value={s._id}>{s.name} — ${s.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-200/80 mb-1">Barber</label>
                <select name="barber_id" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <option value="">No preference</option>
                  {barbers.map(b => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Notes</label>
              <textarea name="notes" rows="3" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2" placeholder="Any specific requests?" />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="rounded-lg bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold shadow-lg shadow-blue-500/25">Confirm booking</button>
              {status && (
                <p className={`${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'} text-sm`}>{status.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Booking
