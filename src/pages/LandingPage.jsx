import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Cpu, BarChart3, ChevronRight, Globe, Lock, Zap, Mail, MapPin, Phone, ArrowUpRight, Droplets, Package, LineChart } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#0B1120', color: '#F8FAFC', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(11, 17, 32, 0.8)', backdropFilter: 'blur(12px)', position: 'fixed', width: '100%', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
          <Leaf color="#10b981" size={28} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Yeşil<span style={{color: '#10b981'}}>Defter</span></h1>
        </div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '0.95rem', fontWeight: 500, color: '#94a3b8' }}>
          <span onClick={() => scrollToSection('standartlar')} style={{cursor: 'pointer', transition: 'color 0.2s'}} className="hover-white">Standartlar</span>
          <span onClick={() => scrollToSection('platform')} style={{cursor: 'pointer', transition: 'color 0.2s'}} className="hover-white">Platform</span>
          <span onClick={() => scrollToSection('cozumler')} style={{cursor: 'pointer', transition: 'color 0.2s'}} className="hover-white">Çözümler</span>
          <span onClick={() => scrollToSection('surdurulebilirlik')} style={{cursor: 'pointer', transition: 'color 0.2s'}} className="hover-white">Sürdürülebilirlik</span>
          <span onClick={() => scrollToSection('iletisim')} style={{cursor: 'pointer', transition: 'color 0.2s'}} className="hover-white">İletişim</span>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
        >
          Sisteme Giriş Yap <ArrowRight size={16} />
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{ paddingTop: '180px', paddingBottom: '80px', paddingLeft: '48px', paddingRight: '48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
          <div style={{display: 'inline-block', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', padding: '6px 16px', borderRadius: '20px', color: '#10b981', fontWeight: 600, fontSize: '0.85rem', marginBottom: '24px'}}>
            TSRS ve SKDM (CBAM) %100 Uyumlu
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
            Karbon Ayak İzinizi <br />
            <span style={{ background: 'linear-gradient(to right, #10b981, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dijitalleştirin.
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            Üretimden tedarik zincirine kadar tüm sürdürülebilirlik verilerinizi ölçün, analiz edin ve EEX entegrasyonuyla finansal risklerinizi tek bir platformdan yönetin.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: '#F8FAFC', color: '#0F172A', border: 'none', padding: '16px 32px', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'transform 0.2s' }}>
              Platformu Keşfedin
            </button>
            <button onClick={() => scrollToSection('iletisim')} style={{ background: 'transparent', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '8px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} className="btn-secondary">
              Danışmanla Görüş <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 0.5}} style={{ marginTop: '100px', textAlign: 'center', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 600 }}>Güvenilir Ekosistem Ortakları</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '60px', flexWrap: 'wrap', opacity: 0.6, filter: 'grayscale(100%) brightness(200%)' }}>
            {[
              { name: 'SAP S/4HANA', domain: 'sap.com' },
              { name: 'EEX Exchange', domain: 'eex.com' },
              { name: 'Logo Yazılım', domain: 'logo.com.tr' },
              { name: 'Mikro', domain: 'mikro.com.tr' },
              { name: 'TSE Onaylı', domain: 'tse.org.tr' }
            ].map((partner, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={`https://logo.clearbit.com/${partner.domain}`} 
                  alt={partner.name} 
                  style={{ height: '32px', objectFit: 'contain' }} 
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
                />
                <h2 style={{fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'none'}}>{partner.name}</h2>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Standards Section */}
      <div id="standartlar" style={{ padding: '100px 48px', backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Uluslararası <span style={{color: '#10b981'}}>ISO Standartları</span> Uyumluluğu</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>YeşilDefter platformu, sürdürülebilirlik hedeflerinize ulaşırken dünyanın en saygın çevre standartlarına %100 uyumlu hesaplama altyapısı sunar.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { 
                title: 'ISO 14064-1 Kurumsal Karbon Ayak İzi', 
                desc: 'Bir şirketin faaliyetlerinden kaynaklanan sera gazı emisyonlarını hesaplar. Ofislerdeki elektrikten araç yakıtına kadar kurumsal etkiyi ölçer.',
                icon: <BarChart3 size={32} color="#10b981" />
              },
              { 
                title: 'ISO 14064-2 Karbon Azaltımı', 
                desc: 'Yenilenebilir enerji veya ağaçlandırma gibi "karbon azaltım projelerinin" başarısını kanıtlamasını ve karbon kredisi üretilmesini sağlar.',
                icon: <LineChart size={32} color="#0ea5e9" />
              },
              { 
                title: 'ISO 14046 Su Ayak İzi', 
                desc: 'Sadece tüketilen suyu değil, kullanılan suyun tatlı su kaynaklarına ve su kıtlığına olan doğrudan çevresel etkisini LCA ilkeleriyle analiz eder.',
                icon: <Droplets size={32} color="#f59e0b" />
              },
              { 
                title: 'ISO 14067 Ürün Karbon Ayak İzi', 
                desc: 'Bir ürünün ham maddesinden atık haline gelmesine kadar (beşikten mezara) tüm süreçteki sera gazı maliyetini CO2 eşdeğeri olarak hesaplar.',
                icon: <Package size={32} color="#ec4899" />
              }
            ].map((std, i) => (
              <div key={i} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none';}}>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', display: 'inline-flex', marginBottom: '24px', width: 'fit-content' }}>
                  {std.icon}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 700, lineHeight: 1.4 }}>{std.title}</h3>
                
                <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '32px', flex: 1 }}>{std.desc}</p>
                
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 'auto' }}>
                  <ArrowUpRight size={20} color="#F8FAFC" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Section */}
      <div id="platform" style={{ padding: '100px 48px', backgroundColor: '#0B1120', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Tek Platform, Sınırsız Kontrol</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>YeşilDefter, işletmenizin tüm çevresel verilerini tek bir merkezde toplar ve global standartlara uygun raporlar üretir.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {[
              { icon: <Cpu color="#10b981" size={32}/>, title: 'Otomatik Veri Akışı', desc: 'ERP sistemlerinizle (SAP, Logo) entegre olarak fatura ve üretim verilerinizi anlık olarak çeker. Manuel veri girişine son verir.' },
              { icon: <ShieldCheck color="#0ea5e9" size={32}/>, title: 'Blockchain Güvenliği', desc: 'Satın aldığınız karbon kredileri ve I-REC sertifikaları blockchain altyapısı ile dijital cüzdanınızda güvenle saklanır.' },
              { icon: <Globe color="#f59e0b" size={32}/>, title: 'Global Uyum (CBAM)', desc: 'Avrupa Yeşil Mutabakatı Sınırda Karbon Düzenlemesi (SKDM) kurallarına göre ihracat risklerinizi simüle eder.' }
            ].map((feature, i) => (
              <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', display: 'inline-block', marginBottom: '24px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="cozumler" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Finansal <span style={{color: '#10b981'}}>Karbon Yönetimi</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
              Karbon sadece çevresel bir risk değil, aynı zamanda finansal bir maliyettir. YeşilDefter'in gelişmiş finansal çözümleriyle tanışın:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '4px' }}><Lock color="#0ea5e9" size={20} /></div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>CBAM Maliyet Sabitleme (Hedging)</strong>
                  <span style={{ color: '#94a3b8' }}>Gelecekteki karbon vergi riskinizi EEX borsası üzerinden bugünden sabitleyin.</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '4px' }}><Zap color="#10b981" size={20} /></div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Dijital Pazar Yeri</strong>
                  <span style={{ color: '#94a3b8' }}>Onaylı yenilenebilir enerji (I-REC) ve VCS karbon kredilerini tek tıkla satın alın.</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '4px' }}><BarChart3 color="#f59e0b" size={20} /></div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Sektörel Benchmarking</strong>
                  <span style={{ color: '#94a3b8' }}>Enerji yoğunluğunuzu sektörünüzdeki diğer 150+ firma ile anonim olarak kıyaslayın.</span>
                </div>
              </li>
            </ul>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(14,165,233,0.1))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '24px', padding: '40px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#10b981', color: '#0B1120', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
              Yapay Zeka Destekli
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Örnek Maliyet Analizi</h3>
            <div style={{ background: 'rgba(11,17,32,0.6)', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{color: '#94a3b8'}}>Anlık CBAM Vergisi</span>
                <strong>75.36 EUR / Ton</strong>
              </div>
              <div style={{ width: '100%', background: '#334155', height: '6px', borderRadius: '3px' }}>
                <div style={{ width: '100%', background: '#ef4444', height: '100%', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div style={{ background: 'rgba(11,17,32,0.6)', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{color: '#10b981'}}>YeşilDefter Sabitlenmiş Risk</span>
                <strong style={{color: '#10b981'}}>69.80 EUR / Ton</strong>
              </div>
              <div style={{ width: '100%', background: '#334155', height: '6px', borderRadius: '3px' }}>
                <div style={{ width: '70%', background: '#10b981', height: '100%', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div id="surdurulebilirlik" style={{ padding: '100px 48px', backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Leaf color="#10b981" size={48} style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Gelecek İçin Net Sıfır Vizyonu</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '40px' }}>
            Biz sadece bir yazılım şirketi değiliz. Amacımız, Türk sanayisinin rekabet gücünü korurken gezegenimiz için çevresel etkileri en aza indirmektir. TSRS standartlarında şeffaf raporlama, su yönetimi ve kadın istihdamı gibi ESG metriklerini destekleyerek şirketlerin daha iyi bir yarına hazırlanmalarını sağlıyoruz.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981' }}>1M+</h3>
              <p style={{ color: '#64748b' }}>Yönetilen Emisyon (Ton)</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0ea5e9' }}>500+</h3>
              <p style={{ color: '#64748b' }}>Aktif KOBİ</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b' }}>%100</h3>
              <p style={{ color: '#64748b' }}>TSRS & CBAM Uyumu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="iletisim" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Bizimle İletişime Geçin</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '40px' }}>
              Kurumsal deneme sürümü, tek tıkla Excel/CSV veri aktarımı detayları ve fiyatlandırma için çevre mühendislerimizden oluşan uzman ekibimize ulaşın.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px' }}><Mail color="#10b981" /></div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>E-Posta</h4>
                  <a href="mailto:korfuco@gmail.com" style={{ color: '#10b981', textDecoration: 'none', transition: 'color 0.2s' }} className="hover-white">korfuco@gmail.com</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px' }}><Phone color="#10b981" /></div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Telefon</h4>
                  <span style={{ color: '#94a3b8' }}>+90 (212) 555 01 23</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px' }}><MapPin color="#10b981" /></div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Genel Merkez</h4>
                  <span style={{ color: '#10b981' }}>Dijital Ofis (Türkiye'nin Her Yerindeyiz)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Demo Talebi Oluşturun</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Ad Soyad" style={{ width: '100%', padding: '16px', background: 'rgba(11,17,32,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <input type="email" placeholder="Şirket E-Posta Adresi" style={{ width: '100%', padding: '16px', background: 'rgba(11,17,32,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <input type="text" placeholder="Firma Adı (İsteğe Bağlı)" style={{ width: '100%', padding: '16px', background: 'rgba(11,17,32,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Gönder</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Leaf color="#64748b" size={20} />
          <span style={{ fontWeight: 600 }}>© 2026 YeşilDefter Teknolojileri. Tüm hakları saklıdır.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span onClick={() => navigate('/yasal/gizlilik')} style={{cursor: 'pointer'}} className="hover-white">Gizlilik Politikası</span>
          <span onClick={() => navigate('/yasal/kosullar')} style={{cursor: 'pointer'}} className="hover-white">Kullanım Koşulları</span>
          <span onClick={() => navigate('/yasal/kvkk')} style={{cursor: 'pointer'}} className="hover-white">KVKK Metni</span>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
