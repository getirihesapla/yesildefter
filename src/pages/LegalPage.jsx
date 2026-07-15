import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

const texts = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    date: "Son Güncelleme: 15.07.2026",
    content: (
      <>
        <h3>1. Veri Sorumlusunun Kimliği</h3>
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, YeşilDefter Bilişim Teknolojileri A.Ş. ("Şirket") olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işleyebilecek, kaydedebilecek, saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere aktarabileceğiz.</p>
        
        <h3>2. Kişisel Verilerin İşlenme Amacı</h3>
        <p>Platformumuz (YeşilDefter) üzerinden paylaştığınız kimlik, iletişim, işlem güvenliği ve şirket/müşteri verileriniz; SaaS hizmetimizin sunulabilmesi, karbon emisyon hesaplamalarınızın yapılabilmesi, raporlamaların oluşturulması, sistem güvenliğinin sağlanması ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla işlenmektedir.</p>

        <h3>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h3>
        <p>Toplanan kişisel verileriniz; kanuni yükümlülüklerimizi yerine getirmek amacıyla yetkili kamu kurum ve kuruluşlarına, hukuki uyuşmazlıkların giderilmesi amacıyla avukatlarımıza, iş süreçlerinin yürütülmesi amacıyla bulut bilişim/sunucu altyapısı (örn. AWS, Vercel) hizmeti aldığımız tedarikçilerimize, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar dâhilinde aktarılabilecektir.</p>

        <h3>4. Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
        <p>Kişisel verileriniz, platformumuza kayıt olmanız, form doldurmanız ve sistemimizi kullanmanız sırasında tamamen dijital ortamlarda otomatik yöntemlerle toplanmaktadır. Bu veriler KVKK Madde 5/2-c (sözleşmenin kurulması ve ifası) ve Madde 5/2-f (veri sorumlusunun meşru menfaati) hukuki sebeplerine dayanılarak işlenmektedir.</p>

        <h3>5. İlgili Kişinin Hakları</h3>
        <p>KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir. Bu haklarınızı kullanmak için <strong>kurumsal@yesildefter.com.tr</strong> adresine e-posta gönderebilirsiniz.</p>
      </>
    )
  },
  gizlilik: {
    title: "Gizlilik Politikası",
    date: "Son Güncelleme: 15 Temmuz 2026",
    content: (
      <>
        <h3>1. İşlenen Kişisel Verileriniz ve Toplanma Yöntemleri</h3>
        <p>Biz, YeşilDefter (Bundan sonra "Platform" olarak anılacaktır) olarak, kullanıcılarımızın kişisel verilerinin güvenliğine ve gizliliğine azami önem veriyoruz. Bu Gizlilik Politikası ve Aydınlatma Metni; platformumuzu ziyaret eden, karbon ve su ayak izi hesaplama araçlarımızı kullanan veya bizimle iletişime geçen ziyaretçilerin kişisel verilerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve Genel Veri Koruma Yönetmeliği (“GDPR”) başta olmak üzere ilgili yasal mevzuata uygun olarak nasıl işlendiğini, saklandığını ve korunduğunu açıklamaktadır.</p>
        <p>Platformumuzu kullanımınız sırasında aşağıdaki verileriniz, tamamen otomatik olan veya otomatik olmayan yollarla (çerezler, form doldurma işlemleri vb.) toplanabilir:</p>
        <p><strong>Kimlik ve İletişim Bilgileri:</strong> İletişim veya bülten formunu doldurmanız halinde adınız, soyadınız ve e-posta adresiniz.</p>
        <p><strong>Hesaplama ve Kullanım Verileri:</strong> Karbon veya su ayak izi hesaplama araçlarımızı kullanırken girdiğiniz tüketim verileri (elektrik, yakıt, su miktarı vb.) ve bu girdilerden elde edilen hesaplama sonuçları.</p>
        <p><strong>Teknik ve Log Verileri:</strong> IP adresiniz, tarayıcı türünüz, işletim sisteminiz, platformda geçirilen süre, tıklama verileri ve cihaz bilgileri (çerezler vasıtasıyla).</p>

        <h3>2. Kişisel Verilerin İşlenme Amaçları</h3>
        <p>Toplanan kişisel verileriniz, aşağıdaki sınırlı ve meşru amaçlar doğrultusunda işlenmektedir:</p>
        <p>• Platform üzerinde sunduğumuz karbon ve su ayak izi hesaplama hizmetlerinin teknik olarak yürütülebilmesi,<br/>
        • Hesaplama geçmişinizin (tercih etmeniz halinde tarayıcı hafızasında veya veri tabanında) saklanarak size raporlanabilmesi,<br/>
        • Sorularınıza, taleplerinize veya destek isteklerinize geri dönüş sağlanabilmesi,<br/>
        • Platformun performansını analiz etmek, kullanıcı deneyimini iyileştirmek ve teknik hataları gidermek,<br/>
        • Yasal yükümlülüklerin yerine getirilmesi ve yetkili kamu kurum ve kuruluşlarının taleplerine yanıt verilmesi.</p>

        <h3>3. Kişisel Verilerin Aktarılması</h3>
        <p>Kişisel verileriniz, üçüncü kişilere ticari amaçlarla satılmaz veya kiralanmaz. Verileriniz yalnızca aşağıdaki durumlarda aktarılabilir:</p>
        <p><strong>Hizmet Sağlayıcılar:</strong> Web sitemizin barındırılması (hosting), veri tabanı yönetimi veya analitik araçların (örneğin Google Analytics) kullanılabilmesi amacıyla iş ortaklarımıza ve altyapı sağlayıcılarımıza (yalnızca hizmetin sınırları dahilinde),<br/>
        <strong>Yasal Zorunluluklar:</strong> Kanunlar, yönetmelikler veya mahkeme kararları doğrultusunda yetkili idari ve adli makamlara.</p>

        <h3>4. Çerezler (Cookies) ve Veri Güvenliği</h3>
        <p>Platformumuzda, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla çerezler kullanılmaktadır. Tarayıcınızın ayarlarını değiştirerek çerezlerin kullanımını kısıtlama veya tamamen engelleme hakkına sahipsiniz.</p>
        <p>Verilerinizin yetkisiz erişime, kayba, hırsızlığa veya ifşa edilmesine karşı korunması için endüstri standardı güvenlik önlemleri (SSL şifreleme vb.) uygulamaktayız. Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca veya yasal saklama süreleri elverdiği ölçüde muhafaza edilir.</p>

        <h3>5. Veri Sahiplerinin Hakları (KVKK md. 11 & GDPR md. 15-22)</h3>
        <p>Kişisel veri sahibi olarak dilediğiniz zaman bizimle iletişime geçerek; verilerinizin işlenip işlenmediğini öğrenme, yanlış işlenmiş verilerinizin düzeltilmesini isteme veya verilerinizin sistemlerimizden silinmesini talep etme hakkına sahipsiniz.</p>
        <p><strong>İrtibat Bilgileri:</strong><br/>
        E-posta: korfuco@gmail.com<br/>
        Web Sitesi: YeşilDefter.com</p>
      </>
    )
  },
  kosullar: {
    title: "Kullanım Koşulları (SaaS Sözleşmesi)",
    date: "Son Güncelleme: 15.07.2026",
    content: (
      <>
        <h3>1. Taraflar ve Konu</h3>
        <p>İşbu Kullanım Koşulları Sözleşmesi ("Sözleşme"), YeşilDefter Platformu'nu kullanan tüzel veya gerçek kişiler ("Kullanıcı") ile YeşilDefter Bilişim Teknolojileri A.Ş. arasında, platformun kullanım şartlarını belirlemek amacıyla düzenlenmiştir.</p>
        
        <h3>2. Hizmet Kapsamı</h3>
        <p>YeşilDefter, şirketlerin Karbon Ayak İzi (Kapsam 1, 2, 3), SKDM (CBAM) riskleri ve ESG parametrelerini dijital olarak takip ve raporlama yapmasını sağlayan "Hizmet Olarak Yazılım" (SaaS) modelidir. Platformun hesapladığı veriler, kullanıcının girdiği verilere dayandığından, doğacak hesaplama farklılıklarından dolayı şirketimiz hukuki sorumluluk kabul etmez.</p>

        <h3>3. Kullanıcı Yükümlülükleri</h3>
        <p>Kullanıcı, sisteme girdiği verilerin (fatura, miktar, şirket unvanı) doğru ve yasalara uygun olduğunu kabul eder. Platformun tersine mühendislik (reverse engineering) yöntemleriyle incelenmesi, kopyalanması veya zararlı yazılım (bot/script) ile sunucuların yorulması kesinlikle yasaktır.</p>

        <h3>4. Fikri Mülkiyet Hakları</h3>
        <p>YeşilDefter logosu, tasarımı, kaynak kodları, veri algoritmaları ve tüm fikri mülkiyet hakları şirketimize aittir. İzinsiz kullanılması veya üçüncü partilerle paylaşılması durumunda hukuki ve cezai işlem başlatılacaktır.</p>
      </>
    )
  }
};

function LegalPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  
  const currentText = texts[type] || texts.kvkk;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '24px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Leaf color="#10b981" size={28} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' }}>Yeşil<span style={{color: '#10b981'}}>Defter</span></h1>
        </div>
        
        <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.target.style.background = 'none'}>
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', paddingBottom: '100px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', color: 'white' }}>{currentText.title}</h1>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>{currentText.date}</div>
        
        <div className="legal-content" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
          <style>{`
            .legal-content h3 { color: white; font-size: 1.3rem; font-weight: 700; margin-top: 32px; margin-bottom: 16px; }
            .legal-content p { margin-bottom: 24px; text-align: justify; }
            .legal-content strong { color: white; }
          `}</style>
          {currentText.content}
        </div>
      </div>
    </div>
  );
}

export default LegalPage;
