"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react" // Tambahkan import ini
import { X } from "lucide-react" // Tambahkan import ini

export default function About() {
  // Tambahkan state untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked, opening modal');
    setIsModalOpen(true);
  }

  console.log('About component rendered, isModalOpen:', isModalOpen);

  return (
    <section id="tentang-kami" className="section about-section">
      <div className="container">
        <div className="about-grid">
          {/* Card utama dengan gambar dan teks */}
          <div className="about-main-card">
            {/* Container gambar */}
            <div className="about-image-container">
              <Image
                src="https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966592/regal52-2_aj63bf.avif"
                alt="Sapphire Residence Tegal III & IV"
                width={600}
                height={450}
                className="about-image"
                sizes="(max-width: 768px) 100vw, 600px"
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>

            {/* Konten teks */}
            <div className="about-content">
              <h2 className="about-title">Sapphire Residence Tegal</h2>
              <p className="about-description">
                Berada di Jl. Siklepuh Raya, Mejasem, Pacul–Talang, Kota Tegal, Sapphire Residence Tegal adalah perumahan Tegal yang sudah dipercaya 800++ keluarga. Kawasannya rapi, strategis, dan dekat ke banyak aktivitas harian, mulai dari pusat kota sampai area pendidikan dan komersial. 
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              </div>
              <div>
                {/* Ubah Link menjadi button untuk membuka modal */}
                <button
                  onClick={handleOpenModal}
                  className="about-link"
                  type="button"
                >
                  Baca Selengkapnya
                </button>
              </div>
            </div>
          </div>

          {/* Container statistik */}
          <div className="about-stats-grid">
            {/* Statistik - Perumahan Terbaik */}
            <div className="about-stat-card">
              <div className="about-stat-value">800+</div>
              <div className="about-stat-label">Masyarakat Tegal</div>
            </div>

            {/* Statistik - Awards */}
            <div className="about-stat-card">
              <div className="about-stat-value">10000+</div>
              <div className="about-stat-label">Keluarga Sapphire</div>
            </div>

            {/* Statistik - Satisfied Clients */}
            <div className="about-stat-card">
              <div className="about-stat-value">5+</div>
              <div className="about-stat-label">CCTV Kawasan</div>
            </div>

            {/* Statistik - Years of Experience */}
            <div className="about-stat-card">
              <div className="about-stat-value">19</div>
              <div className="about-stat-label">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
            <div className="modal-content">
              <h2 className="modal-title">Sapphire Residence Tegal III & IV</h2>
              <div className="modal-image">
                <Image
                  src="https://res.cloudinary.com/dx8w9qwl6/image/upload/v1762966591/regal35-1_gfcbgb.avif"
                  alt="Sapphire Residence Tegal III & IV"
                  width={700}
                  height={400}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
              <div className="modal-description">
                <p>
                  Berada di Jl. Siklepuh Raya, Mejasem, Pacul–Talang, Kota Tegal, Sapphire Residence Tegal adalah perumahan Tegal yang sudah dipercaya 800++ keluarga. Kawasannya rapi, strategis, dan dekat ke banyak aktivitas harian, mulai dari pusat kota sampai area pendidikan dan komersial. Jika Anda mencari hunian yang nyaman ditempati sekaligus menjanjikan untuk jangka panjang, kawasan ini memberi Anda alasan jelas kenapa begitu banyak keluarga memilih tinggal di sini.

                </p>

                <h3 className="modal-subtitle">Keunggulan Lokasi</h3>
                <ul className="modal-list">
                  <li>4 menit ke fasilitas kesehatan</li>
                  <li>9 menit ke fasilitas pendidikan</li>
                  <li>6 menit ke fasilitas perbelanjaan</li>
                  <li>Berada di jalur utama Pantura Tegal – Slawi</li>
                  <li>Lingkungan berkembang, strategis untuk hunian jangka panjang atau investasi</li>
                </ul>

                <h3 className="modal-subtitle">Fasilitas Premium</h3>
                <ul className="modal-list">
                  <li>Keamanan 24 jam dengan petugas sekuriti dan one gate system</li>
                  <li>Taman bermain dan area rekreasi keluarga</li>
                  <li>Ruang terbuka hijau yang luas</li>
                  <li>Fasilitas pendukung yang lengkap di dalam area perumahan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
