"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { BedDoubleIcon, BathIcon, LandPlotIcon, BadgeCheckIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "./icons"
import { ChevronLeft, ChevronRight } from "lucide-react"

function formatIDR(value: number) {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
}

function SimulasiKPRContent({
  harga,
  dp,
  tahun,
  bunga,
  onHargaChange,
  onDpChange,
  onTahunChange,
  onBungaChange,
}: {
  harga: string
  dp: string
  tahun: string
  bunga: string
  onHargaChange: (value: string) => void
  onDpChange: (value: string) => void
  onTahunChange: (value: string) => void
  onBungaChange: (value: string) => void
}) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  function formatNumberWithDots(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function formatInputValue(value: string): string {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')
    // Add dots for thousands separator
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function parseInputValue(value: string): string {
    // Remove all dots to get raw number
    return value.replace(/\./g, '')
  }

  const hargaNum = parseFloat(harga.replace(/\./g, '')) || 0
  const dpNum = parseFloat(dp.replace(/\./g, '')) || 0
  const tahunNum = parseFloat(tahun) || 0
  const bungaNum = parseFloat(bunga) || 0

  const jumlahPinjaman = useMemo(() => Math.max(0, hargaNum - dpNum), [hargaNum, dpNum])

  const cicilanPerBulan = useMemo(() => {
    if (tahunNum <= 0) return 0
    const bulan = tahunNum * 12

    if (bungaNum === 0) {
      return jumlahPinjaman / bulan
    } else {
      const bungaPerBulan = bungaNum / 100 / 12
      const pembilang = jumlahPinjaman * bungaPerBulan * Math.pow(1 + bungaPerBulan, bulan)
      const penyebut = Math.pow(1 + bungaPerBulan, bulan) - 1
      return pembilang / penyebut
    }
  }, [jumlahPinjaman, tahunNum, bungaNum])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      paddingTop: '16px'
    }} className="kpr-grid-responsive">
      {/* CSS for pointer styling */}
      <style>{`
        .kpr-editable-field {
          cursor: text;
          position: relative;
        }
        .kpr-editable-field::after {
          content: '✎';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .kpr-editable-field:hover::after {
          opacity: 1;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px',
            fontFamily: 'inherit'
          }}>Harga Properti</label>
          <div className="kpr-editable-field" style={{ position: 'relative' }}>
            <input
              type="text"
              value={harga}
              onChange={(e) => {
                const formatted = formatInputValue(e.target.value)
                onHargaChange(formatted)
              }}
              onFocus={() => setFocusedField('harga')}
              onBlur={() => setFocusedField(null)}
              placeholder="masukan harga rumah"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: focusedField === 'harga' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#334155',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                cursor: 'text'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '6px',
            fontFamily: 'inherit'
          }}>
            Uang Muka (DP)
          </label>
          <div className="kpr-editable-field" style={{ position: 'relative' }}>
            <input
              type="text"
              value={dp}
              onChange={(e) => {
                const formatted = formatInputValue(e.target.value)
                onDpChange(formatted)
              }}
              onFocus={() => setFocusedField('dp')}
              onBlur={() => setFocusedField(null)}
              placeholder="masukan uang muka yang anda miliki"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: focusedField === 'dp' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#334155',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                cursor: 'text'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '6px',
              fontFamily: 'inherit'
            }}>
              Jangka Waktu (Tahun)
            </label>
            <div className="kpr-editable-field" style={{ position: 'relative' }}>
              <input
                type="number"
                value={tahun}
                onChange={(e) => onTahunChange(e.target.value)}
                onFocus={() => setFocusedField('tahun')}
                onBlur={() => setFocusedField(null)}
                placeholder="masukan jangka waktu dalam tahun"
                min="1"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: focusedField === 'tahun' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#334155',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  cursor: focusedField === 'tahun' ? 'text' : 'default'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '6px',
              fontFamily: 'inherit'
            }}>
              Suku Bunga (%)
            </label>
            <div className="kpr-editable-field" style={{ position: 'relative' }}>
              <input
                type="number"
                value={bunga}
                onChange={(e) => onBungaChange(e.target.value)}
                onFocus={() => setFocusedField('bunga')}
                onBlur={() => setFocusedField(null)}
                placeholder="masukan contoh 5,5%"
                min="0"
                step="0.1"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: focusedField === 'bunga' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#334155',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  cursor: focusedField === 'bunga' ? 'text' : 'default'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          backgroundColor: '#831016',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'inherit',
            margin: 0,
            marginBottom: '6px'
          }}>
            Cicilan Per Bulan
          </p>
          <p style={{
            fontSize: '28px',
            fontWeight: '800',
            fontFamily: 'inherit',
            margin: '8px 0 0 0',
            lineHeight: 1
          }}>
            {hargaNum > 0 ? `Rp ${Math.round(cicilanPerBulan).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-'}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
            margin: 0,
            fontFamily: 'inherit'
          }}>
            Jumlah Pinjaman
          </p>
          <p style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            margin: '6px 0 0 0',
            fontFamily: 'inherit'
          }}>
            {hargaNum > 0 ? `Rp ${Math.round(jumlahPinjaman).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Properties() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [activeType, setActiveType] = useState("tipe-rumah")
  const [isSiteplanModalOpen, setIsSiteplanModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [siteplanZoom, setSiteplanZoom] = useState(1)
  const [locationZoom, setLocationZoom] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [touchStart, setTouchStart] = useState<{ [key: number]: number }>({})
  const [isDragging, setIsDragging] = useState<{ [key: number]: boolean }>({})
  const [dragStart, setDragStart] = useState<{ [key: number]: number }>({})
  const [modalTab, setModalTab] = useState<'detail' | 'simulasi'>('detail')
  const [kprHarga, setKprHarga] = useState<string>('')
  const [kprDp, setKprDp] = useState<string>('')
  const [kprTahun, setKprTahun] = useState<string>('')
  const [kprBunga, setKprBunga] = useState<string>('')
  const [showAllSpecs, setShowAllSpecs] = useState(false)

  const propertyTypes: PropertyType[] = [
    { id: "tipe-rumah", label: "Tipe Rumah", active: true },
    { id: "siteplan", label: "Siteplan", active: false },
    { id: "spesifikasi", label: "Spesifikasi", active: false },
    { id: "lokasi", label: "Lokasi", active: false },
  ]

  const properties = [
    {
      id: 1,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966591/regal35-1_gfcbgb.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966592/regal35-2_fsfise.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273217/Screenshot_2025-11-04_at_23.03.26_entdmw.avif",
      name: "Tipe 35/84",
      price: "350.000.000",
      bedrooms: 1,
      bathrooms: 1,
      area: "35",
      description:
        "Tipe 35/84 dengan luas bangunan 35 m² adalah pilihan sempurna untuk investasi atau hunian pertama. Desain compact namun fungsional dengan layout yang efisien untuk memaksimalkan setiap ruang.",
      certificate: "SHM",
    },
    {
      id: 2,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966592/regal35-2_fsfise.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966591/regal35-1_gfcbgb.avif",
        
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273217/Screenshot_2025-11-04_at_23.03.49_jcqiub.avif",
      name: "Tipe 38/84",
      price: "380.000.000",
      bedrooms: 1,
      bathrooms: 1,
      area: "38",
      description:
        "Tipe 38/84 dengan luas bangunan 38 m² menawarkan ruang yang nyaman untuk investasi properti. Dilengkapi dengan desain modern yang optimal dan tata letak yang efisien.",
      certificate: "SHM",
    },
    {
      id: 3,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966591/regal35-1_gfcbgb.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966592/regal35-2_fsfise.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273217/Screenshot_2025-11-04_at_23.03.56_uu3mis.avif",
      name: "Tipe 38/77",
      price: "380.000.000",
      bedrooms: 1,
      bathrooms: 1,
      area: "38",
      description:
        "Tipe 38/77 dengan luas bangunan 38 m² memberikan ruang yang terencana dengan baik. Ideal untuk penghuni yang mencari hunian dengan layout compact namun nyaman.",
      certificate: "SHM",
    },
    {
      id: 4,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966592/regal35-2_fsfise.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/w_800,h_450,c_fill,f_auto,q_40/v1762966591/regal35-1_gfcbgb.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273218/Screenshot_2025-11-04_at_23.04.03_onhxp8.avif",
      name: "Tipe 38/80",
      price: "380.000.000",
      bedrooms: 1,
      bathrooms: 1,
      area: "38",
      description:
        "Tipe 38/80 dengan luas bangunan 38 m² menawarkan hunian yang efisien dan nyaman. Desain modern dengan penataan ruang yang memaksimalkan fungsi setiap area.",
      certificate: "SHM",
    },
    {
      id: 5,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966591/regal44-1_kenrgc.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal44-2_jv9ipg.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273220/Screenshot_2025-11-04_at_23.04.08_onyttt.avif",
      name: "Tipe 44/80",
      price: "440.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "44",
      description:
        "Tipe 44/80 dengan luas bangunan 44 m² adalah pilihan sempurna untuk keluarga muda. Dilengkapi dengan 2 kamar tidur dan desain modern yang optimal.",
      certificate: "SHM",
    },
    {
      id: 6,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966591/regal44-1_kenrgc.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal44-2_jv9ipg.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273218/Screenshot_2025-11-04_at_23.04.14_bgp87j.avif",
      name: "Tipe 47/84",
      price: "470.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "47",
      description:
        "Tipe 47/84 dengan luas bangunan 47 m² menawarkan ruang yang lebih luas untuk keluarga. Desain modern dengan layout yang memberikan fleksibilitas maksimal.",
      certificate: "SHM",
    },
    {
      id: 7,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966591/regal44-1_kenrgc.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal44-2_jv9ipg.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273219/Screenshot_2025-11-04_at_23.04.22_qfnpea.avif",
      name: "Tipe 47/112",
      price: "470.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "47",
      description:
        "Tipe 47/112 dengan luas bangunan 47 m² memberikan kenyamanan maksimal dengan ruang yang terencana. Ideal untuk keluarga yang menginginkan hunian berkualitas.",
      certificate: "SHM",
    },
    {
      id: 8,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal52-1_h5sdiy.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal52-2_aj63bf.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273218/Screenshot_2025-11-04_at_23.04.29_wkvgp6.avif",
      name: "Tipe 52/84",
      price: "520.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "52",
      description:
        "Tipe 52/84 dengan luas bangunan 52 m² menawarkan hunian yang spacious dan nyaman. Desain modern dengan layout terbuka yang memberikan fleksibilitas maksimal.",
      certificate: "SHM",
    },
    {
      id: 9,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966594/regal53-2_cvintq.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966593/regal53-1_eyexnl.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273220/Screenshot_2025-11-04_at_23.04.37_ouolvw.avif",
      name: "Tipe 53/84",
      price: "530.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "53",
      description:
        "Tipe 53/84 dengan luas bangunan 53 m² adalah pilihan sempurna untuk keluarga modern. Dilengkapi dengan 2 kamar tidur dan desain yang optimal untuk kebutuhan keluarga.",
      certificate: "SHM",
    },
    {
      id: 10,
      images: [
         "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966594/regal53-2_cvintq.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966593/regal53-1_eyexnl.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273219/Screenshot_2025-11-04_at_23.04.43_oqnoo4.avif",
      name: "Tipe 57/96",
      price: "570.000.000",
      bedrooms: 2,
      bathrooms: 1,
      area: "57",
      description:
        "Tipe 57/96 dengan luas bangunan 57 m² menawarkan ruang yang nyaman untuk keluarga. Desain modern dengan layout yang memberikan fleksibilitas maksimal.",
      certificate: "SHM",
    },
    {
      id: 11,
      images: [
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966594/regal53-2_cvintq.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966593/regal53-1_eyexnl.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273219/Screenshot_2025-11-04_at_23.04.50_szhjno.avif",
      name: "Tipe 67/112",
      price: "670.000.000",
      bedrooms: 3,
      bathrooms: 2,
      area: "67",
      description:
        "Tipe 67/112 dengan luas bangunan 67 m² memberikan kenyamanan maksimal dengan ruang yang lebih luas. Ideal untuk keluarga yang menginginkan hunian berkualitas premium.",
      certificate: "SHM",
    },
    {
      id: 12,
      images: [
         "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966594/regal53-2_cvintq.avif",
        "https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966593/regal53-1_eyexnl.avif",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273220/Screenshot_2025-11-04_at_23.04.56_cjss5m.avif",
      name: "Tipe 69/112",
      price: "690.000.000",
      bedrooms: 3,
      bathrooms: 2,
      area: "69",
      description:
        "Tipe 69/112 dengan luas bangunan 69 m² menawarkan hunian yang spacious dan nyaman. Desain modern dengan layout terbuka yang memberikan fleksibilitas maksimal untuk keluarga Anda.",
      certificate: "SHM",
    },
  ]

  const siteplan = {
    id: "siteplan-1",
    image: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762273217/Screenshot_2025-11-04_at_23.03.10_lgbbln.avif",
    name: "Siteplan Sapphire Residence Tegal III & IV",
    description:
      "Masterplan perumahan Sapphire Residence Tegal dengan layout, jalan, ruang terbuka hijau, dan fasilitas umum yang lengkap.",
  }

  const specifications = {
    pondasi: "Batu kali",
    dinding: "Bata Merah/Hebel",
    lantai: "Granit tile 60x60",
    atap: "Rangka baja ringan, genteng multiroof dan spandek",
    kamarMandi: "Closet American Standard / Setara",
    septicTank: "Buis beton 80cm",
    kusenPintu: "Aluminium 4 Inch setara Alexindo & HPL Eksterior CT",
    jendela: "Kaca",
    plafon: "Rangka hollow, gypsum, list gypsum",
    air: "PDAM",
    listrik: "1300 watt",
    carport: "Batu Andesit",
    mejaDapur: "50cm",
    stopKontak: "Panasonic",
    lampu: "Model Downlight Warmlight",
    fiturRumah: "Smart Door Lock",
  }

  const location = {
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.993015780065!2d109.1577698!3d-6.891437799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9006aba1ba5%3A0x468a60f332ea6b74!2sSapphire%20Residence%20Tegal!5e0!3m2!1sen!2sid!4v1762273892545!5m2!1sen!2sid" style="border:0; width: 100%; height: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    name: "Lokasi Sapphire Residence Tegal III & IV",
    description: "Lokasi strategis di jantung kota Tegal dengan akses mudah ke berbagai fasilitas umum, pendidikan, dan kesehatan.",
  }

  interface Property {
    id: number
    images: string[]
    floorPlan: string
    name: string
    price: string
    bedrooms: number
    bathrooms: number
    area: string
    description: string
    certificate: string
  }

  const handleTouchStart = (propertyId: number, e: React.TouchEvent) => {
    setTouchStart((prev) => ({ ...prev, [propertyId]: e.targetTouches[0].clientX }))
  }

  const handleTouchEnd = (propertyId: number, e: React.TouchEvent, totalImages: number) => {
    const start = touchStart[propertyId]
    const end = e.changedTouches[0].clientX

    if (!start) return

    const distance = start - end
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swipe left - next image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
        }))
      } else {
        // Swipe right - previous image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
        }))
      }
    }

    setTouchStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const handleMouseDown = (propertyId: number, e: React.MouseEvent) => {
    setIsDragging((prev) => ({ ...prev, [propertyId]: true }))
    setDragStart((prev) => ({ ...prev, [propertyId]: e.clientX }))
  }

  const handleMouseMove = (propertyId: number, e: React.MouseEvent) => {
    if (!isDragging[propertyId]) return
    e.preventDefault()
  }

  const handleMouseUp = (propertyId: number, e: React.MouseEvent, totalImages: number) => {
    if (!isDragging[propertyId]) return

    const start = dragStart[propertyId]
    const end = e.clientX

    if (!start) {
      setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
      return
    }

    const distance = start - end
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Drag left - next image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
        }))
      } else {
        // Drag right - previous image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
        }))
      }
    }

    setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
    setDragStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const handleMouseLeave = (propertyId: number) => {
    setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
    setDragStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const goToImage = (propertyId: number, index: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: index,
    }))
  }

  const openModal = (property: Property): void => {
    setSelectedProperty(property)
    setIsModalOpen(true)
    setModalTab('detail')
    // Keep KPR simulator empty for user input
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalTab('detail')
    setTimeout(() => {
      setSelectedProperty(null)
    }, 300)
  }

  const openSiteplanModal = () => {
    setIsSiteplanModalOpen(true)
    setSiteplanZoom(1)
    document.body.style.overflow = "hidden"
  }

  const closeSiteplanModal = () => {
    setIsSiteplanModalOpen(false)
    setSiteplanZoom(1)
    document.body.style.overflow = "auto"
  }

  const openLocationModal = () => {
    setIsLocationModalOpen(true)
    setLocationZoom(1)
    document.body.style.overflow = "hidden"
  }

  const closeLocationModal = () => {
    setIsLocationModalOpen(false)
    setLocationZoom(1)
    document.body.style.overflow = "auto"
  }

  const handleSiteplanZoomIn = () => {
    setSiteplanZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleSiteplanZoomOut = () => {
    setSiteplanZoom((prev) => Math.max(prev - 0.5, 1))
  }

  const handleLocationZoomIn = () => {
    setLocationZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleLocationZoomOut = () => {
    setLocationZoom((prev) => Math.max(prev - 0.5, 1))
  }

  type PropertyTypeId = "tipe-rumah" | "siteplan" | "spesifikasi" | "lokasi"

  interface PropertyType {
    id: PropertyTypeId
    label: string
    active: boolean
  }

  const handleTypeChange = (typeId: PropertyTypeId): void => {
    setActiveType(typeId)
  }

  return (
    <section id="tipe-rumah" className="section">
      <div className="container">
        <h2 className="section-title">Siteplan & Tipe Rumah</h2>
        <p className="section-subtitle">
          Temukan rumah impian Anda di Sapphire Residence Tegal III & IV dengan berbagai tipe yang dirancang khusus untuk memenuhi kebutuhan dan gaya hidup Anda.
        </p>

        <div className="property-type-container">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`property-type-button ${activeType === type.id ? "property-type-button-active" : "property-type-button-inactive"
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {activeType === "tipe-rumah" ? (
          <div className="property-grid">
            {properties.map((property) => {
              const currentIndex = currentImageIndex[property.id] || 0
              return (
                <div key={property.id} className="property-card">
                  <div
                    className="property-image-container property-slider"
                    onTouchStart={(e) => handleTouchStart(property.id, e)}
                    onTouchEnd={(e) => handleTouchEnd(property.id, e, property.images.length)}
                    onMouseDown={(e) => handleMouseDown(property.id, e)}
                    onMouseMove={(e) => handleMouseMove(property.id, e)}
                    onMouseUp={(e) => handleMouseUp(property.id, e, property.images.length)}
                    onMouseLeave={() => handleMouseLeave(property.id)}
                    style={{ cursor: isDragging[property.id] ? "grabbing" : "grab" }}
                  >
                    <Image
                      src={property.images[currentIndex] || "/placeholder.svg"}
                      alt={`${property.name} - Image ${currentIndex + 1}`}
                      fill
                      className="property-image"
                      draggable={false}
                    />

                    {property.images.length > 1 && (
                      <>
                        <button
                          className="property-slider-arrow property-slider-arrow-prev"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [property.id]: ((prev[property.id] || 0) - 1 + property.images.length) % property.images.length,
                            }))
                          }}
                          title="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          className="property-slider-arrow property-slider-arrow-next"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [property.id]: ((prev[property.id] || 0) + 1) % property.images.length,
                            }))
                          }}
                          title="Next image"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {property.images.length > 1 && (
                      <div className="property-slider-dots">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            className={`property-slider-dot ${currentIndex === index ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              goToImage(property.id, index)
                            }}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="property-content">
                    <div className="property-header">
                      <h3 className="property-name">{property.name}</h3>
                      <button onClick={() => openModal(property)} className="property-detail-button">
                        Lihat Detail
                      </button>
                    </div>

                    <div className="property-features">
                      <div className="property-feature">
                        <BedDoubleIcon className="property-feature-icon" />
                        <span>{property.bedrooms} Kamar</span>
                      </div>
                      <div className="property-feature">
                        <BathIcon className="property-feature-icon" />
                        <span>{property.bathrooms} Kamar Mandi</span>
                      </div>
                      <div className="property-feature">
                        <LandPlotIcon className="property-feature-icon" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : activeType === "siteplan" ? (
          <div className="siteplan-container">
            <div className="siteplan-image-container" onClick={openSiteplanModal} style={{ cursor: "pointer" }}>
              <Image
                src={siteplan.image || "/placeholder.svg"}
                alt={siteplan.name}
                width={1200}
                height={800}
                className="siteplan-image"
              />
            </div>
            <div className="siteplan-content">
              <h3 className="siteplan-title">{siteplan.name}</h3>
              <p>{siteplan.description}</p>
            </div>
          </div>
        ) : activeType === "spesifikasi" ? (
          <div className="specifications-container">
            <div className="specifications-image">
              <Image
                src="https://res.cloudinary.com/dx8w9qwl6/image/upload/v1761375414/D_01_4_-_Photo_mnwyke.avif"
                alt="Spesifikasi Rumah"
                width={600}
                height={800}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="specifications-content">
              <h3 className="specifications-title">Spesifikasi Rumah</h3>
              <div className="specifications-list" style={{ position: 'relative' }}>
                <div className="specification-item">
                  <span className="specification-label">Pondasi:</span>
                  <span className="specification-value">{specifications.pondasi}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Dinding:</span>
                  <span className="specification-value">{specifications.dinding}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Lantai:</span>
                  <span className="specification-value">{specifications.lantai}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Atap:</span>
                  <span className="specification-value">{specifications.atap}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Kamar Mandi/WC:</span>
                  <span className="specification-value">{specifications.kamarMandi}</span>
                </div>

                {!showAllSpecs && (
                  <div className="specification-item" style={{ position: 'relative' }}>
                    <span className="specification-label">Kusen & Pintu:</span>
                    <span className="specification-value">{specifications.kusenPintu}</span>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)',
                      pointerEvents: 'none',
                      borderRadius: 'inherit'
                    }}></div>
                  </div>
                )}

                {showAllSpecs && (
                  <>
                    <div className="specification-item">
                      <span className="specification-label">Kusen & Pintu:</span>
                      <span className="specification-value">{specifications.kusenPintu}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Jendela:</span>
                      <span className="specification-value">{specifications.jendela}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Plafon:</span>
                      <span className="specification-value">{specifications.plafon}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Air:</span>
                      <span className="specification-value">{specifications.air}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Listrik:</span>
                      <span className="specification-value">{specifications.listrik}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Septic tank:</span>
                      <span className="specification-value">{specifications.septicTank}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Carport:</span>
                      <span className="specification-value">{specifications.carport}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Meja Dapur:</span>
                      <span className="specification-value">{specifications.mejaDapur}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Stop Kontak:</span>
                      <span className="specification-value">{specifications.stopKontak}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Lampu:</span>
                      <span className="specification-value">{specifications.lampu}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Fitur Rumah:</span>
                      <span className="specification-value">{specifications.fiturRumah}</span>
                    </div>
                  </>
                )}
              </div>

              {!showAllSpecs && (
                <button
                  onClick={() => setShowAllSpecs(true)}
                  style={{
                    marginTop: '24px',
                    padding: '12px 24px',
                    backgroundColor: '#831016',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#6b0b12'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#831016'
                  }}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        ) : activeType === "lokasi" ? (
          <div className="location-container">
            <div className="location-image-wrapper" onClick={openLocationModal}>
              <div
                dangerouslySetInnerHTML={{ __html: location.embed }}
                style={{
                  width: '100%',
                  height: '450px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              />
            </div>
            <div className="location-content">
              <h3 className="location-title">{location.name}</h3>
              <p>{location.description}</p>
              <div className="location-button-container">
                <Link
                  href="https://maps.app.goo.gl/iy2JVmwEpdGm8YWT6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-gmaps-button"
                >
                  <svg className="location-gmaps-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                  Lihat Lokasi di Google Maps
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {isModalOpen && selectedProperty && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <XIcon />
            </button>

            {/* Modal Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: 0,
              marginBottom: 0,
              gap: '32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '24px'
            }}>
              <button
                onClick={() => setModalTab('detail')}
                style={{
                  padding: '12px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: modalTab === 'detail' ? '700' : '500',
                  color: modalTab === 'detail' ? '#831016' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: modalTab === 'detail' ? '2px solid #831016' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  marginBottom: '-1px'
                }}
              >
                Detail Properti
              </button>
              <button
                onClick={() => setModalTab('simulasi')}
                style={{
                  padding: '12px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: modalTab === 'simulasi' ? '700' : '500',
                  color: modalTab === 'simulasi' ? '#831016' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: modalTab === 'simulasi' ? '2px solid #831016' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  marginBottom: '-1px'
                }}
              >
                Simulasi KPR
              </button>
            </div>

            <div className="modal-content">
              {modalTab === 'detail' ? (
                <>
                  <h2 className="modal-title">{selectedProperty.name}</h2>
                  <div className="modal-image">
                    <Image
                      src={selectedProperty.floorPlan || "/placeholder.svg"}
                      alt={`Denah ${selectedProperty.name}`}
                      width={1200}
                      height={800}
                      style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="modal-description">
                    <p>{selectedProperty.description}</p>

                    <h3 className="modal-subtitle">Spesifikasi</h3>
                    <div className="modal-property-features">
                      <div className="modal-property-feature">
                        <BedDoubleIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Kamar Tidur</div>
                          <div className="modal-feature-value">{selectedProperty.bedrooms}</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <BathIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Kamar Mandi</div>
                          <div className="modal-feature-value">{selectedProperty.bathrooms}</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <LandPlotIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Luas Tanah</div>
                          <div className="modal-feature-value">{selectedProperty.area} m²</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <BadgeCheckIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Sertifikat</div>
                          <div className="modal-feature-value">{selectedProperty.certificate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-cta">
                      <Link
                        href="https://wa.me/628170031130?text=Halo,%20saya%20tertarik%20dengan%20properti%20Sapphire%20Residence%20Tegal%20III%20%26%20IV"
                        className="modal-cta-button"
                      >
                        Hubungi Kami
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <SimulasiKPRContent
                  harga={kprHarga}
                  dp={kprDp}
                  tahun={kprTahun}
                  bunga={kprBunga}
                  onHargaChange={setKprHarga}
                  onDpChange={setKprDp}
                  onTahunChange={setKprTahun}
                  onBungaChange={setKprBunga}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isSiteplanModalOpen && (
        <div className="concept-modal-overlay" onClick={closeSiteplanModal}>
          <div className="concept-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="concept-modal-close" onClick={closeSiteplanModal}>
              <XIcon size={24} />
            </button>
            <div className="gallery-zoom-controls">
              <button className="gallery-zoom-button" onClick={handleSiteplanZoomIn} disabled={siteplanZoom >= 3}>
                <ZoomInIcon size={20} />
              </button>
              <button className="gallery-zoom-button" onClick={handleSiteplanZoomOut} disabled={siteplanZoom <= 1}>
                <ZoomOutIcon size={20} />
              </button>
            </div>
            <div className="concept-modal-content">
              <div className="gallery-lightbox-image-wrapper">
                <Image
                  src={siteplan.image || "/placeholder.svg"}
                  alt={siteplan.name}
                  width={1800}
                  height={1200}
                  className="concept-modal-image"
                  style={{ transform: `scale(${siteplanZoom})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLocationModalOpen && (
        <div className="concept-modal-overlay" onClick={closeLocationModal}>
          <div className="concept-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="concept-modal-close" onClick={closeLocationModal}>
              <XIcon size={24} />
            </button>
            <div className="concept-modal-content">
              <div className="gallery-lightbox-image-wrapper" style={{ height: '600px' }}>
                <div
                  dangerouslySetInnerHTML={{ __html: location.embed }}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
