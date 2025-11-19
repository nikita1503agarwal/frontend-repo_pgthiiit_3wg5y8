import { useMemo } from 'react'

function Hero({ shop }) {
  const title = shop?.name || 'Blue Flame Barbers'
  const subtitle = shop?.about || 'Precision fades, classic cuts, and warm vibes.'
  const phone = shop?.phone || '(555) 123-4567'

  const gradient = useMemo(() => (
    'bg-[radial-gradient(1200px_600px_at_70%_-20%,rgba(59,130,246,.25),transparent),radial-gradient(800px_400px_at_20%_20%,rgba(147,197,253,.35),transparent)]'
  ), [])

  return (
    <section className={`relative overflow-hidden ${gradient} bg-slate-950 text-white`}> 
      <div className="absolute inset-0 pointer-events-none opacity-[.15]" style={{backgroundImage:'url(/noise.png)'}}></div>
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-200 rounded-full px-3 py-1 text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Book online. Walk out sharp.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {title}
            </h1>
            <p className="mt-4 text-blue-100/90 text-lg max-w-prose">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-6 py-3 font-semibold shadow-lg shadow-blue-500/25 transition">
                Book an appointment
              </a>
              <a href={`tel:${phone.replace(/[^\d+]/g,'')}`} className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white px-6 py-3 font-semibold border border-white/20 backdrop-blur">
                Call {phone}
              </a>
            </div>
            <div className="mt-6 text-sm text-blue-200/70">
              <p>{shop?.address || '123 Fade Ave, Suite 7, Your City'}</p>
              <p className="mt-1">{shop?.hours ? Object.entries(shop.hours).map(([k,v])=>`${k}: ${v}`).join(' • ') : 'Mon-Fri: 9-8 • Sat: 9-6 • Sun: Closed'}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/15 bg-gradient-to-br from-slate-800 to-slate-900">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop" alt="Barbershop" className="w-full h-full object-cover object-center mix-blend-luminosity"/>
            </div>
            <div className="absolute -bottom-6 left-6 right-6 bg-slate-900/70 border border-white/10 backdrop-blur rounded-xl p-4 text-sm flex items-center justify-between">
              <span className="text-blue-200">Walk-ins welcome</span>
              <span className="inline-flex items-center gap-2 text-amber-300">
                ★★★★★
                <span className="text-blue-200/70">4.9 rating</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
