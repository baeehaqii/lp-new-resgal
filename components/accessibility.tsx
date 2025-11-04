import { School, Hospital, TreePine, ShoppingBag } from "lucide-react"

export default function Accessibility() {
  const facilities = [
    {
      icon: <School />,
      title: "Fasilitas Pendidikan",
      items: [
        "19 menit dari SMK N 1 Dukuhturi",
        "13 menit dari SMA N 1 Tegal",
        "17 menit dari Universitas Pancasakti Tegal",
      ],
    },
    {
      icon: <Hospital />,
      title: "Fasilitas Kesehatan",
      items: [
        "4 menit dari RSIA Pala Raya Tegal",
        "10 menit RSUD Kardinah",
        "14 menit RSU Islam Harapan Anda",
      ],
    },
    {
      icon: <ShoppingBag />,
      title: "Fasilitas Perbelanjaan",
      items: [
        "6 menit dari Pasar Langon",
        "15 menit dari Pacific Mall Tegal",
      ],
    },
    {
      icon: <TreePine />,
      title: "Fasilitas Umum",
      items: [
        "15 menit ke Alun-alun Tegal",
        "15 menit dari Stasiun Tegal",
      ],
    },
  ]

  return (
    <section id="aksesibilitas" className="accessibility-section">
      <div className="container">
        <h2 className="section-title">Akses Mudah</h2>
        <h3 className="accessibility-subtitle">Terhubung dengan Segala Kebutuhan</h3>

        <div className="accessibility-grid">
          {facilities.map((facility, index) => (
            <div key={index} className="accessibility-card about-stat-card">
              <div className="accessibility-header">
                <div className="accessibility-icon">{facility.icon}</div>
                <h3 className="accessibility-title">{facility.title}</h3>
              </div>

              <ul className="accessibility-list">
                {facility.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="accessibility-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
