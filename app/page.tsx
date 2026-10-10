'use client'

import { useMemo, useState } from 'react'
import { AtSign, ArrowRight, Check, Menu, Minus, Plus, ShoppingBag, X } from 'lucide-react'

const categories = [
  { id: 'best', label: 'Paling dicari' },
  { id: 'baso', label: 'Baso Aci' },
  { id: 'mie', label: 'Mie Ayam' },
  { id: 'batagor', label: 'Batagor' },
  { id: 'siomay', label: 'Siomay' },
  { id: 'cemilan', label: 'Cemilan' },
  { id: 'catering', label: 'Catering' },
  { id: 'snack', label: 'Snackbox' },
]

interface MenuItem {
  id: number
  category: string
  name: string
  desc: string
  price: number
  image?: string
  visual?: string
  tag: string
  details?: string[]
}

const menus: MenuItem[] = [
  // BASO ACI
  { id: 1, category: 'baso', name: 'Baso Aci Paket Hemat', desc: 'Isian komplit: cilok kenyal gurih, tahu kuning, siomay mini, & pilus cikur khas Garut.', price: 8000, image: '/poto_produk/baso-aci.jpeg', visual: 'baso', tag: 'Favorit' },
  { id: 2, category: 'baso', name: 'Baso Aci Paket Pas', desc: 'Lebih lengkap dengan cirawang gurih, tahu, siomay, pilus cikur & perasan jeruk nipis segar.', price: 10000, image: '/poto_produk/baso-aci.jpeg', visual: 'baso', tag: 'Best Seller' },
  { id: 3, category: 'baso', name: 'Baso Aci Paket Wareg', desc: 'Porsi wareg super kenyang! Baso urat besar empuk, cirawang, tahu, sukro & kuah pedas mantap.', price: 15000, image: '/poto_produk/baso-aci-wareg.jpeg', visual: 'baso', tag: 'Paling Wareg' },

  // MIE AYAM (CUMA SATU 10K)
  { id: 4, category: 'mie', name: 'Mie Ayam', desc: 'Mie kenyal gurih disajikan dengan topping cacahan ayam melimpah, sawi segar & saus khas.', price: 10000, image: '/poto_produk/mie-ayam.jpeg', visual: 'mie', tag: 'Paling Laris' },

  // BATAGOR (KUAH 8K, KERING 8K, TULANG 10K)
  { id: 5, category: 'batagor', name: 'Batagor Kuah', desc: 'Batagor tahu kenyal gurih disajikan dalam kuah kaldu hangat sedap, pas buat cuaca sejuk.', price: 8000, image: '/poto_produk/batagor-kuah.jpeg', visual: 'batagor', tag: 'Hangat Sedap' },
  { id: 6, category: 'batagor', name: 'Batagor Kering', desc: 'Batagor renyah disiram bumbu kacang gurih legit kental dengan perasan jeruk limau segar.', price: 8000, image: '/poto_produk/batagor.jpeg', visual: 'batagor', tag: 'Bumbu Kacang' },
  { id: 7, category: 'batagor', name: 'Batagor Tulang', desc: 'Porsi puas pol batagor dengan ekstra topping tulang rangu kenyal kriuk dan gurih mantap.', price: 10000, image: '/poto_produk/batagor.jpeg', visual: 'batagor', tag: 'Ekstra Tulang' },

  // SIOMAY (SECTION TERPISAH: 6K, 8K, 10K)
  { id: 8, category: 'siomay', name: 'Siomay Paket 6K', desc: 'Siomay lembut gurih bumbu kacang porsi hemat pas buat ganjal lapar di sela kuliah.', price: 6000, image: '/poto_produk/siomay.jpeg', visual: 'siomay', tag: 'Hemat 6K' },
  { id: 9, category: 'siomay', name: 'Siomay Paket 8K', desc: 'Siomay ikan kenyal lembut dengan guyuran saus kacang gurih legit dan jeruk limau harum.', price: 8000, image: '/poto_produk/siomay.jpeg', visual: 'siomay', tag: 'Pas 8K' },
  { id: 10, category: 'siomay', name: 'Siomay Paket 10K', desc: 'Porsi komplit kenyang! Siomay lembut mantap dengan bumbu kacang istimewa melimpah.', price: 10000, image: '/poto_produk/siomay.jpeg', visual: 'siomay', tag: 'Komplit 10K' },

  // CEMILAN (SEMUANYA 7000)
  { id: 11, category: 'cemilan', name: 'Jamur Krispi', desc: 'Jamur tiram dibalut tepung berbumbu gurih renyah garing, pas buat cemilan santai di kampus.', price: 7000, image: '/poto_produk/jamur-krispi.jpeg', visual: 'cemilan', tag: 'Super Krispi' },
  { id: 12, category: 'cemilan', name: 'Usus Krispi', desc: 'Usus goreng tepung kriuk tanpa rasa amis, gurih nagih sampai comotan terakhir.', price: 7000, image: '/poto_produk/usus-krispi.jpeg', visual: 'cemilan', tag: 'Gurih Nagih' },
  { id: 13, category: 'cemilan', name: 'Kentang Goreng', desc: 'French fries renyah keemasan bertabur bumbu gurih lezat, favorit mahasiswa nongkrong.', price: 7000, image: '/poto_produk/kentang-goreng.jpeg', visual: 'cemilan', tag: 'Favorit Ngemil' },

  // CATERING (4 PAKET: 9K, 11K, 15K, 20K SESUAI GAMBAR)
  {
    id: 14,
    category: 'catering',
    name: 'Catering Paket 9K',
    desc: 'Paket catering hemat mahasiswa: Nasi pulen, telur balado gurih pedas, dan lalap segar.',
    price: 9000,
    image: '/poto_produk/catering-9k.jpeg',
    visual: 'catering',
    tag: 'Paket 9K',
    details: ['Nasi', 'Telur Balado', 'Lalap'],
  },
  {
    id: 15,
    category: 'catering',
    name: 'Catering Paket 11K',
    desc: 'Paket catering lauk ayam lezat: Nasi pulen, ayam pilihan serundeng atau kecap, lalap & sambel.',
    price: 11000,
    image: '/poto_produk/catering-11k.jpeg',
    visual: 'catering',
    tag: 'Paket 11K',
    details: ['Nasi', 'Ayam (Serundeng / Kecap)', 'Lalap', 'Sambel'],
  },
  {
    id: 16,
    category: 'catering',
    name: 'Catering Paket 15K',
    desc: 'Paket catering lengkap acara kampus: Nasi, ayam serundeng/kecap, tempe goreng, kerupuk, lalap, sambel & air putih.',
    price: 15000,
    image: '/poto_produk/catering-15k.jpeg',
    visual: 'catering',
    tag: 'Paket 15K',
    details: ['Nasi', 'Ayam (Serundeng / Kecap)', 'Tempe Goreng', 'Kerupuk', 'Lalap', 'Sambel', 'Air Putih'],
  },
  {
    id: 17,
    category: 'catering',
    name: 'Catering Paket 20K',
    desc: 'Paket catering komplit istimewa: Nasi, ayam serundeng/kecap, tempe, tahu, kerupuk udang, oseng bihun, lalap, sambel & air putih.',
    price: 20000,
    image: '/poto_produk/catering-20k.jpeg',
    visual: 'catering',
    tag: 'Paket 20K',
    details: ['Nasi', 'Ayam (Serundeng / Kecap)', 'Tempe Goreng', 'Tahu Goreng', 'Kerupuk Udang', 'Oseng Bihun', 'Lalap', 'Sambel', 'Air Putih'],
  },

  // SNACKBOX
  {
    id: 18,
    category: 'snack',
    name: 'Snackbox Kampus Ceria',
    desc: 'Paket box snack praktis berisi risoles renyah, kue manis lezat, dan air mineral cup.',
    price: 10000,
    image: '/poto_produk/snackbox.jpeg',
    visual: 'snack',
    tag: 'Acara & Rapat',
  },
]

const price = (value: number) => `Rp${value.toLocaleString('id-ID')}`

const foodGradients: Record<string, string> = {
  mie: 'bg-gradient-to-br from-[#fed7aa] via-[#fb923c] to-[#ea580c]',
  batagor: 'bg-gradient-to-br from-[#fde68a] via-[#f59e0b] to-[#d97706]',
  siomay: 'bg-gradient-to-br from-[#fde68a] via-[#f59e0b] to-[#ea580c]',
  catering: 'bg-gradient-to-br from-[#fed7aa] via-[#f87171] to-[#dc2626]',
  snack: 'bg-gradient-to-br from-[#fbcfe8] via-[#f472b6] to-[#db2777]',
  cemilan: 'bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#d97706]',
}

function FoodVisual({
  image,
  alt,
  type,
  size = 'normal',
}: {
  image?: string
  alt?: string
  type?: string
  size?: 'normal' | 'small'
}) {
  const gradient = foodGradients[type || ''] || 'bg-gradient-to-br from-[#fde68a] via-[#f59e0b] to-[#ea580c]'
  const emoji = type === 'mie' ? '🍜' : type === 'batagor' || type === 'siomay' ? '🥟' : type === 'cemilan' ? '🍟' : type === 'snack' ? '🧁' : type === 'catering' ? '🍱' : '🥣'

  if (size === 'small') {
    if (image) {
      return (
        <div className="shrink-0 w-[60px] h-[60px] rounded-[18px] overflow-hidden border border-line bg-cream shadow-xs">
          <img
            src={image}
            alt={alt || 'Foto produk'}
            className="w-full h-full object-cover"
          />
        </div>
      )
    }
    return (
      <div className={`shrink-0 w-[60px] h-[60px] rounded-[18px] grid place-items-center overflow-hidden shadow-inner ${gradient}`} aria-hidden="true">
        <span className="text-[32px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)] -rotate-6 select-none">
          {emoji}
        </span>
      </div>
    )
  }

  if (image) {
    return (
      <div className="relative overflow-hidden w-full h-[180px] max-[720px]:h-[150px] max-[380px]:h-[135px] rounded-[22px] bg-amber-50/50 border border-line/60">
        <img
          src={image}
          alt={alt || 'Foto produk'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className={`relative grid place-items-center overflow-hidden min-h-[160px] rounded-[22px] max-[720px]:min-h-[130px] max-[380px]:min-h-[115px] ${gradient} shadow-inner group-hover:brightness-105 transition-all`} aria-hidden="true">
      <span className="relative z-20 text-[95px] drop-shadow-[0_16px_14px_rgba(40,22,21,0.18)] -rotate-6 select-none max-[720px]:text-[80px]">
        {emoji}
      </span>
    </div>
  )
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('best')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [timeTouched, setTimeTouched] = useState(false)

  const isFormValid = customerName.trim().length > 0 && pickupTime.trim().length > 0

  const visibleMenus = useMemo(() => {
    if (activeCategory === 'best') {
      return menus.filter((item) => [1, 2, 4, 6, 9, 11, 15, 16, 18].includes(item.id))
    }
    return menus.filter((item) => item.category === activeCategory)
  }, [activeCategory])
  const cartItems = menus.filter((item) => cart[item.id])
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const total = cartItems.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0)

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  }
  function changeCart(id: number, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta)
      const updated = { ...current }
      if (next === 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }

  return (
    <main className="overflow-hidden bg-cream min-h-screen text-ink font-sans pt-[86px] max-[720px]:pt-[70px]">

      {/* FIXED NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-line/70 shadow-[0_4px_20px_rgba(40,22,21,0.04)] transition-all">
        <nav className="flex items-center justify-between h-[86px] max-[720px]:h-[70px] max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]">
          <a className="inline-flex items-center gap-3 text-maroon group" href="#top" aria-label="Kantin Kopma Unsil beranda">
            <img
              src="/Logo_Kantin.png"
              alt="Logo Kantin KOPMA UNSIL"
              className="w-[72px] h-[72px] max-[720px]:w-[58px] max-[720px]:h-[58px] object-contain rounded-2xl group-hover:scale-105 transition-transform"
            />
            <div>
              <strong className="block leading-tight font-bubbly text-[16px] tracking-wide max-[380px]:text-[14px]">KANTIN KOPMA</strong>
              <small className="block mt-0.5 text-muted-custom font-bold text-[11px] max-[380px]:text-[9px]">
                UNSIL • Tasikmalaya
              </small>
            </div>
          </a>

          {/* CLEAN TEXT NAV LINKS (DESKTOP ONLY) */}
          <div className="flex items-center gap-1 text-ink text-[14px] font-bold max-[720px]:hidden">
            <a className="py-2 px-4 rounded-full hover:bg-orange-soft hover:text-maroon transition-all" href="#tentang">
              Tentang Kami
            </a>
            <a className="py-2 px-4 rounded-full hover:bg-orange-soft hover:text-maroon transition-all" href="#menu">
              Menu
            </a>
          </div>

          <div className="flex gap-2.5 items-center">
            <button
              className="inline-flex items-center gap-2.5 border-2 border-line bg-white hover:border-maroon/40 rounded-full py-2.5 px-4 text-ink text-[13px] font-bold cursor-pointer shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
              onClick={() => setCartOpen(true)}
              aria-label={`Buka keranjang, ${cartCount} item`}
            >
              <div className="relative">
                <ShoppingBag size={18} className="text-maroon" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 grid place-items-center w-[18px] h-[18px] rounded-full bg-orange-kopma text-maroon text-[10px] font-black font-bubbly border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="max-[720px]:hidden font-extrabold">Keranjang</span>
            </button>

            {/* HAMBURGER / CLOSE BUTTON TOGGLE */}
            <button
              className={`hidden max-[720px]:grid place-items-center w-11 h-11 rounded-full border-2 transition-all duration-200 cursor-pointer ${menuOpen
                  ? 'bg-maroon text-white border-maroon shadow-sm'
                  : 'bg-white text-ink border-line hover:border-maroon/50 shadow-xs'
                }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* BACKDROP BLUR FOR MOBILE MENU */}
      <div
        className={`fixed inset-0 z-30 bg-ink/30 backdrop-blur-xs transition-opacity duration-300 max-[720px]:block hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE SIDE DRAWER (SLIDE IN FROM RIGHT, COVERS 70% CONTENT) */}
      <div
        className={`fixed top-[70px] right-0 bottom-0 w-[70%] max-w-[320px] bg-white border-l-2 border-line shadow-2xl z-40 transition-transform duration-300 ease-out flex flex-col justify-between p-6 max-[720px]:flex hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
      >
        <div className="flex flex-col gap-2">

          <a
            className="flex items-center justify-between text-[15px] py-4 font-bubbly font-bold text-ink  hover:text-maroon transition-all border border-transparent"
            href="#tentang"
            onClick={() => setMenuOpen(false)}
          >
            <span>Tentang Kami</span>

          </a>
          <a
            className="flex items-center justify-between text-[15px] font-bubbly font-bold text-ink  hover:text-maroon transition-all border border-transparent"
            href="#menu"
            onClick={() => setMenuOpen(false)}
          >
            <span>Pilihan Menu</span>

          </a>
        </div>

        <div className="pt-4 border-t border-line/60">
          
          
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex items-center min-h-[540px] py-[44px] pb-[60px] max-lg:min-h-0 max-lg:py-[32px] max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]" id="top">
        <div className="relative z-10 w-full lg:w-[55%]">


          <h1 className="my-[12px] mb-[28px] text-maroon font-bubbly text-[clamp(44px,5.8vw,74px)] leading-[1.04] tracking-tight max-[720px]:text-[clamp(38px,12vw,56px)]">
            Enaknya makan,<br />
            <span className="text-orange-bright relative inline-block">
              gak perlu mikir!
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-kopma/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 12 Q 50 22 100 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="max-w-[460px] text-muted-custom text-[16px] leading-[1.7] max-[720px]:max-w-[340px] max-[720px]:mt-[14px] max-[720px]:text-[14px] max-[720px]:leading-[1.6]">
            Pilihan menu favorit mahasiswa UNSIL, harga ramah kantong, rasa enak, dan bisa langsung kamu order praktis lewat WhatsApp.
          </p>

          <div className="flex items-center gap-4 mt-[32px] max-[720px]:mt-[24px] max-[460px]:flex-col max-[460px]:items-stretch">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full py-2 px-7 bg-maroon text-white text-[14px] font-bubbly font-extrabold shadow-pop-maroon hover:-translate-y-1 active:translate-y-1 transition-all duration-200 cursor-pointer"
              href="#menu"
            >
              Cari Menu <ArrowRight size={18} />
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full py-2 px-6 bg-white border-2 border-line text-maroon text-[14px] font-extrabold hover:border-maroon/50 hover:bg-orange-soft/40 transition-all cursor-pointer shadow-sm active:translate-y-0.5"
              href="#tentang"
            >
              Tentang Kami
            </a>
          </div>


        </div>

        {/* HERO LOGO AREA (HIDDEN ON MOBILE & TABLET) */}
        <div className="hidden lg:flex relative w-[45%] items-center justify-center">
          <div className="relative w-full max-w-[410px] aspect-[4/5] rounded-[32px] p-0 flex items-center justify-center overflow-hidden">
            <img
              src="/Logo_Kantin.png"
              alt="Logo Kantin KOPMA Universitas Siliwangi"
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>
      </section>

      {/* TENTANG KAMI / CERITA KANTIN */}
      <section className="py-[76px] max-lg:py-[48px] border-t-2 border-line bg-cream-subtle/40" id="tentang">
        <div className="grid grid-cols-2 max-lg:grid-cols-1 items-center gap-14 max-lg:gap-8 max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]">
          {/* ABOUT LOGO (HIDDEN ON MOBILE & TABLET) */}
          <div className="hidden lg:flex items-center justify-center justify-self-center w-full max-w-[280px]">
            <img
              src="/Logo_Kantin.png"
              alt="Logo Kantin KOPMA UNSIL"
              className="w-full h-auto object-contain select-none"
            />
          </div>

          <div className="w-full">
            <h2 className="mt-2 text-maroon font-bubbly font-bold text-[clamp(28px,3.8vw,44px)] leading-[1.05]">
              KANTIN KOPMA UNSIL??
            </h2>
            <p className="max-w-[540px] my-4 text-muted-custom text-[15px] leading-[1.7] max-[720px]:text-[13px]">
              Kantin ini adalah salah satu bidang usaha KOPMA UNSIL yang bergerak di penyediaan makanan dan minuman. Menunya lengkap banget lho, mulai dari sistem prasmanan dengan aneka lauk pauk dan sayuran, sampai area cafeteria yang sedia baso aci, mie ayam, batagor, aneka cemilan, tahu bulat, plus berbagai pilihan minuman hangat dan dingin.
            </p>
            <a
              className="inline-flex items-center gap-2 py-3 px-5 rounded-full bg-white border-2 border-line text-maroon text-[13px] font-bubbly font-bold hover:border-maroon/50 hover:bg-orange-soft/40 transition-all shadow-xs"
              href="https://www.instagram.com/kantinkopma_/"
              target="_blank"
              rel="noreferrer"
            >
              <AtSign size={16} /> @kantinkopma_kopmaunsil
            </a>
          </div>
        </div>
      </section>

      {/* QUICK STRIP: ALUR PEMESANAN */}
      <section className="py-10 max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]">
        <div className="text-center mb-7">
          <span className="inline-block py-1 px-4 rounded-full bg-white border border-line text-maroon text-[11px] font-extrabold uppercase tracking-wider shadow-xs mb-2">
            Alur Pemesanan
          </span>
          <h2 className="text-maroon font-bubbly font-bold text-[clamp(22px,3.2vw,30px)] leading-tight">
            Cara Pesan Makanan di Kantin Kopma
          </h2>

        </div>

        <div className="grid grid-cols-3 gap-5 max-[720px]:grid-cols-1 max-[720px]:gap-3.5">
          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-pastel-yellow border-2 border-[#fef08a] shadow-sm hover:-translate-y-1 transition-all">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-maroon font-bubbly font-black text-[18px] shadow-sm shrink-0 border border-orange-soft">
              01
            </div>
            <div>

              <strong className="block text-[14px] font-bubbly font-bold text-ink">Pilih Menu Sesukamu</strong>
              <small className="block text-muted-custom text-[12px] mt-0.5">Dari baso aci sampai paket nasi 10K</small>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-pastel-yellow border-2 border-[#fef08a] shadow-sm hover:-translate-y-1 transition-all">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-maroon font-bubbly font-black text-[18px] shadow-sm shrink-0 border border-orange-soft">
              02
            </div>
            <div>

              <strong className="block text-[14px] font-bubbly font-bold text-ink">Kirim Pesan ke WhatsApp</strong>
              <small className="block text-muted-custom text-[12px] mt-0.5">Otomatis tersusun rapi tanpa repot ngetik</small>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-pastel-yellow border-2 border-[#fef08a] shadow-sm hover:-translate-y-1 transition-all">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-maroon font-bubbly font-black text-[18px] shadow-sm shrink-0 border border-orange-soft">
              03
            </div>
            <div>

              <strong className="block text-[14px] font-bubbly font-bold text-ink">Tinggal Ambil di Kantin</strong>
              <small className="block text-muted-custom text-[12px] mt-0.5">Makanan siap hangat saat kamu tiba</small>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="py-[72px] pb-[88px] max-[720px]:py-[48px] max-[720px]:pb-[58px] max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]" id="menu">
        <div className="flex items-end justify-between max-[720px]:items-start max-[720px]:flex-col max-[720px]:gap-3">
          <div>

            <h2 className="text-maroon font-bubbly font-bold text-[clamp(34px,4.2vw,50px)] leading-[1.05]">
              Lagi pengen ngemil <br className="hidden max-[720px]:inline" />
              <span className="text-orange-bright">atau makan berat?</span>
            </h2>
          </div>

        </div>

        {/* TEXT-ONLY CATEGORY PILLS */}
        <div className="flex gap-2.5 overflow-x-auto my-[32px] mb-[30px] max-[720px]:mt-[20px] no-scrollbar py-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                className={`shrink-0 border-2 rounded-full py-2 px-5 text-[13px] font-bubbly font-bold transition-all duration-200 cursor-pointer ${isActive
                  ? 'border-maroon bg-maroon text-white shadow-pop-sm -translate-y-0.5'
                  : 'border-line bg-white text-ink hover:border-maroon/50 hover:bg-orange-soft/30'
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-3 gap-[22px] max-[720px]:grid-cols-2 max-[720px]:gap-[14px] max-[380px]:grid-cols-1">
          {visibleMenus.map((item) => (
            <article
              className="group overflow-hidden border-2 border-line rounded-[30px] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_30px_rgba(40,22,21,0.08)] hover:border-orange-kopma/50 flex flex-col justify-between scale-100"
              key={item.id}
            >
              <div className="relative p-3">
                <FoodVisual image={item.image} alt={item.name} type={item.visual} />
                <span className="absolute top-[22px] left-[22px] rounded-full py-1 px-3 bg-white/95 text-maroon text-[10px] font-bubbly font-extrabold shadow-sm border border-line">
                  {item.tag}
                </span>
              </div>

              <div className="pt-1 px-5 pb-5 max-[720px]:px-4 max-[720px]:pb-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-ink font-bubbly text-[16px] font-bold max-[720px]:text-[14px] leading-snug">
                    {item.name}
                  </h3>
                  {item.details && item.details.length > 0 ? (
                    <div className="mt-2.5 p-2.5 rounded-2xl bg-orange-soft/30 border border-orange-soft/60">
                      <span className="block text-[10px] font-extrabold uppercase text-orange-bright tracking-wider mb-1 font-bubbly">
                        Isian Paket:
                      </span>
                      <ul className="grid grid-cols-1 gap-1">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-ink/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-bright shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="min-h-[36px] mt-1.5 text-muted-custom text-[12px] leading-[1.5] max-[720px]:text-[11px] max-[720px]:line-clamp-2">
                      {item.desc}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-line/60">
                  <strong className="text-maroon font-bubbly font-extrabold text-[19px] max-[720px]:text-[16px]">
                    {price(item.price)}
                  </strong>
                  <button
                    className="grid place-items-center w-10 h-10 rounded-full bg-orange-kopma text-maroon hover:bg-maroon hover:text-white transition-all duration-200 cursor-pointer shadow-sm active:translate-y-0.5"
                    onClick={() => addToCart(item.id)}
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-maroon text-white border-t-4 border-orange-kopma py-10">
        <div className="flex items-center justify-between max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-6 max-w-[1160px] w-[calc(100%-48px)] mx-auto max-[720px]:w-[calc(100%-28px)] max-[720px]:max-w-[560px]">
          <a className="inline-flex items-center gap-3 text-white" href="#top">
            <img
              src="/Logo_Kantin.png"
              alt="Logo Kantin KOPMA"
              className="w-[46px] h-[46px] object-contain rounded-2xl bg-white border-2 border-white/20 p-1"
            />
            <div>
              <strong className="block font-bubbly text-[16px]">KANTIN KOPMA</strong>
              <small className="block text-orange-soft text-[11px] font-bold">Universitas Siliwangi • Tasikmalaya</small>
            </div>
          </a>

          <p className="text-[13px] text-orange-soft/90 max-[720px]:text-[12px]">
            Sahabat setia perut mahasiswa di setiap jeda kuliah.
          </p>

          <a
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-white text-maroon text-[12px] font-bubbly font-black hover:bg-orange-soft transition-all shadow-sm"
            href="https://wa.me/6289665234461"
            target="_blank"
            rel="noreferrer"
          >
            Chat WhatsApp <ArrowRight size={15} />
          </a>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-ink/50 backdrop-blur-xs transition-opacity"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="w-[min(430px,100%)] h-full overflow-y-auto p-7 bg-cream shadow-2xl flex flex-col justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-line">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-orange-bright tracking-wider">
                    Keranjang Belanja
                  </span>
                  <h2 className="text-maroon font-bubbly font-bold text-[30px] leading-tight">
                    Pesanan Kamu
                  </h2>
                </div>
                <button
                  className="grid place-items-center w-10 h-10 rounded-full bg-white border border-line text-maroon cursor-pointer hover:bg-orange-soft transition-colors"
                  onClick={() => setCartOpen(false)}
                  aria-label="Tutup keranjang"
                >
                  <X size={18} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="grid place-items-center gap-3 py-24 text-muted-custom text-[14px] text-center">
                  <ShoppingBag size={42} className="text-muted-custom/60 mb-1" />
                  <p className="font-bubbly text-[16px] text-ink font-bold">Keranjangmu masih kosong</p>
                  <p className="text-[12px] text-muted-custom max-w-[220px]">Pilih jajanan atau makanan berat favoritmu sekarang.</p>
                  <button
                    className="mt-3 inline-flex items-center gap-2 rounded-full py-3 px-6 bg-maroon text-white text-[12px] font-bubbly font-bold shadow-pop-maroon cursor-pointer hover:-translate-y-0.5 transition-all"
                    onClick={() => setCartOpen(false)}
                  >
                    Pilih Menu Sekarang
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 mt-5">
                  {cartItems.map((item) => (
                    <div className="flex items-center gap-3.5 p-3 rounded-[22px] bg-white border border-line shadow-xs" key={item.id}>
                      <FoodVisual image={item.image} alt={item.name} type={item.visual} size="small" />
                      <div className="flex-1">
                        <strong className="block text-[13px] font-bubbly font-bold text-ink leading-tight">
                          {item.name}
                        </strong>
                        <span className="block mt-1 text-maroon text-[12px] font-extrabold">
                          {price(item.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-cream px-2 py-1 rounded-full border border-line">
                        <button
                          className="grid place-items-center w-6 h-6 rounded-full bg-white text-maroon hover:bg-maroon hover:text-white transition-colors cursor-pointer shadow-xs"
                          onClick={() => changeCart(item.id, -1)}
                          aria-label={`Kurangi ${item.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[12px] font-bubbly font-black min-w-[16px] text-center">
                          {cart[item.id]}
                        </span>
                        <button
                          className="grid place-items-center w-6 h-6 rounded-full bg-white text-maroon hover:bg-maroon hover:text-white transition-colors cursor-pointer shadow-xs"
                          onClick={() => changeCart(item.id, 1)}
                          aria-label={`Tambah ${item.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-6 pt-5 border-t border-line">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-custom font-bold text-[13px]">Total Pembayaran</span>
                  <strong className="text-maroon font-bubbly font-black text-[24px]">
                    {price(total)}
                  </strong>
                </div>

                {/* FORM DATA PEMESAN (WAJIB DIISI) */}
                <div className="mb-4 p-4 rounded-2xl bg-white border border-line shadow-xs space-y-3">
                  <div>
                    <label className="block text-[12px] font-bubbly text-ink mb-1">
                      Atas Nama Siapa? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                      placeholder="Contoh: Rafly / Cindy"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-[13px] bg-cream/40 focus:bg-white focus:outline-none transition-all ${nameTouched && !customerName.trim()
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-line focus:border-maroon'
                        }`}
                    />
                    {nameTouched && !customerName.trim() && (
                      <span className="block mt-1 text-[11px] text-red-500 font-medium">
                        Kolom ini wajib diisi yaa
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] font-bubbly text-ink mb-1">
                      Kapan Diambil di Kantin? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      onBlur={() => setTimeTouched(true)}
                      placeholder="Contoh: Jam 12.15"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-[13px] bg-cream/40 focus:bg-white focus:outline-none transition-all ${timeTouched && !pickupTime.trim()
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-line focus:border-maroon'
                        }`}
                    />
                    {timeTouched && !pickupTime.trim() && (
                      <span className="block mt-1 text-[11px] text-red-500 font-medium">
                        Kolom ini wajib diisi yaa
                      </span>
                    )}
                  </div>
                </div>

                {isFormValid ? (
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] shadow-md hover:-translate-y-0.5 active:translate-y-0.5 transition-all w-full cursor-pointer font-normal"
                    href={`https://wa.me/6289665234461?text=${encodeURIComponent(
                      `Halo, saya mau pesan:\n\n*Data Pemesan:*\n- Atas Nama: ${customerName.trim()}\n- Waktu Ambil: ${pickupTime.trim()}\n\n*Daftar Pesanan:*\n${cartItems.map((item) => `- ${item.name} x${cart[item.id]}`).join('\n')}\n\n*Total:* ${price(total)}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="font-normal">Kirim Pesanan ke WhatsApp</span> <ArrowRight size={18} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setNameTouched(true)
                      setTimeTouched(true)
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full py-4 px-6 bg-emerald-600/70 hover:bg-emerald-600/80 text-white text-[14px] shadow-sm transition-all w-full cursor-pointer font-normal"
                  >
                    <span className="font-normal">Kirim Pesanan ke WhatsApp</span> <ArrowRight size={18} />
                  </button>
                )}

                {!isFormValid && (nameTouched || timeTouched) && (
                  <p className="mt-2 text-center text-red-500 text-[11px] font-medium">
                    Mohon isi nama dan waktu pengambilan terlebih dahulu
                  </p>
                )}

                <p className="flex justify-center items-center gap-1.5 mt-3 text-muted-custom text-[11px] font-bold">
                  <Check size={14} className="text-emerald-600" /> Admin langsung balas & siapkan pesananmu
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}
