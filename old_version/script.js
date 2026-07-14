document.addEventListener("DOMContentLoaded", () => {
    listeleGecmis();
    renderTrendChart();
});

function toggleOzel(id) {
    const input = document.getElementById(id);
    input.style.display = (input.style.display === "block") ? "none" : "block";
}

// CBAM KATSAYILARI (2024 GÜNCEL DEĞERLER - Örnek)
const CBAM = {
    petrol: 2.68, // kg CO2e / Litre
    gaz: 2.02,    // kg CO2e / m3
    elek: 0.43,   // kg CO2e / kWh
    uretim: 1.50  // Ton CO2e / Ton Ürün
};

// GÜNCEL AB KARBON FİYATLAMASI
const CARBON_PRICE_EUR = 85.50; // Güncel AB karbon fiyatı (Euro / Ton CO2e)
const EXCHANGE_RATE_EUR_TRY = 35.00; // Güncel Euro kuru (TRY / EUR)

// DOĞRULAMA VE HATA MİNİMİZASYONU FONKSİYONU
function verileriDogrula(p, g, e, u) {
    let petrol = parseFloat(p);
    let gaz = parseFloat(g);
    let elek = parseFloat(e);
    let uretim = parseFloat(u);

    // Hata payını minimize etme (NaN veya negatifleri 0 yapma)
    if (isNaN(petrol) || petrol < 0) petrol = 0;
    if (isNaN(gaz) || gaz < 0) gaz = 0;
    if (isNaN(elek) || elek < 0) elek = 0;
    if (isNaN(uretim) || uretim < 0) uretim = 0;

    return { petrol, gaz, elek, uretim };
}

// ARŞİVLEME VE TREND GÜNCELLEME
document.getElementById("btnKaydet").addEventListener("click", function() {
    const tarih = new Date().toLocaleDateString('tr-TR');
    const pOzel = document.getElementById("petrolOzel").value;
    const gOzel = document.getElementById("gazOzel").value;
    const eOzel = document.getElementById("elekOzel").value;
    const uOzel = document.getElementById("uretimOzel") ? document.getElementById("uretimOzel").value : 0;

    const dogrulanmis = verileriDogrula(pOzel, gOzel, eOzel, uOzel);
    const yeniKayit = { tarih, petrol: dogrulanmis.petrol, gaz: dogrulanmis.gaz, elek: dogrulanmis.elek, uretim: dogrulanmis.uretim };
    
    let gecmis = JSON.parse(localStorage.getItem("resmiKarbonGecmis")) || [];
    gecmis.push(yeniKayit);
    localStorage.setItem("resmiKarbonGecmis", JSON.stringify(gecmis));
    
    alert("Veriler resmi beyan için mühürlendi ve trende eklendi.");
    listeleGecmis();
    renderTrendChart();
});

function listeleGecmis() {
    const gecmis = JSON.parse(localStorage.getItem("resmiKarbonGecmis")) || [];
    const gvde = document.getElementById("gecmisGövde");
    gvde.innerHTML = "";
    gecmis.forEach((k, i) => {
        gvde.innerHTML += `<tr>
            <td>${k.tarih}</td>
            <td>${k.petrol} L</td>
            <td>${k.gaz} m³</td>
            <td>${k.elek} kWh</td>
            <td><button onclick="kayitSil(${i})" style="color:var(--danger); border:none; background:none; cursor:pointer; font-weight:bold;">Sil</button></td>
        </tr>`;
    });
}

function kayitSil(i) {
    let gecmis = JSON.parse(localStorage.getItem("resmiKarbonGecmis"));
    gecmis.splice(i, 1);
    localStorage.setItem("resmiKarbonGecmis", JSON.stringify(gecmis));
    listeleGecmis();
    renderTrendChart();
}

// TREND ANALİZİ ÇİZİMİ
function renderTrendChart() {
    const gecmis = JSON.parse(localStorage.getItem("resmiKarbonGecmis")) || [];
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    if(window.myTrendChart) window.myTrendChart.destroy();
    
    const etiketler = gecmis.map(k => k.tarih);
    const veriler = gecmis.map(k => {
        const dogru = verileriDogrula(k.petrol, k.gaz, k.elek, k.uretim);
        const pTon = (dogru.petrol * CBAM.petrol) / 1000;
        const gTon = (dogru.gaz * CBAM.gaz) / 1000;
        const eTon = (dogru.elek * CBAM.elek) / 1000;
        const uTon = (dogru.uretim * CBAM.uretim);
        return pTon + gTon + eTon + uTon;
    });

    window.myTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: etiketler,
            datasets: [{
                label: 'Aylık Emisyon (Ton CO2)',
                data: veriler,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

// HESAPLAMA MOTORU
document.getElementById("analizForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const pOzel = document.getElementById("petrolOzel").value;
    const gOzel = document.getElementById("gazOzel").value;
    const eOzel = document.getElementById("elekOzel").value;
    const uOzel = document.getElementById("uretimOzel") ? document.getElementById("uretimOzel").value : 0;
    const sektor = document.getElementById("sektorOzel").value || document.getElementById("sektor").value;
    
    const dogru = verileriDogrula(pOzel, gOzel, eOzel, uOzel);
    
    const petrolTon = (dogru.petrol * CBAM.petrol) / 1000;
    const gazTon = (dogru.gaz * CBAM.gaz) / 1000;
    const elekTon = (dogru.elek * CBAM.elek) / 1000;
    const uretimTon = (dogru.uretim * CBAM.uretim);
    const toplamTon = petrolTon + gazTon + elekTon + uretimTon;

    const currency = document.getElementById("currency").value;
    const isEur = currency === "EUR";
    const vergi = toplamTon * CARBON_PRICE_EUR * (isEur ? 1 : EXCHANGE_RATE_EUR_TRY);
    const sembol = isEur ? "€" : "₺";

    document.getElementById("vergiKart").style.display = "block";
    document.getElementById("taxAmount").innerText = sembol + Math.round(vergi).toLocaleString('tr-TR');
    document.getElementById("firmaRaporAd").innerText = (document.getElementById("firmaUnvan").value || "Firma") + " Analiz Özeti";

    renderRadar(petrolTon, gazTon, elekTon, uretimTon);
    renderRiskGauge(sektor, vergi);
});

function renderRadar(p, g, e, u) {
    const ctx = document.getElementById('kategoriGrafik').getContext('2d');
    if(window.myChart) window.myChart.destroy();
    
    // Yüzde hesaplama (Tooltip için)
    const total = p + g + e + u;

    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Akaryakıt', 'Doğalgaz', 'Elektrik', 'Üretim Süreci'],
            datasets: [{
                data: [p, g, e, u],
                backgroundColor: [
                    '#2f3640', // Antrasit Koyu
                    '#718093', // Antrasit Açık
                    '#0abde3', // Buz Mavisi Canlı
                    '#c7ecee'  // Buz Mavisi Açık
                ],
                borderWidth: 2,
                borderColor: '#ffffff', // Minimalist görünüm için beyaz kenarlık
                hoverOffset: 4
            }]
        },
        options: {
            cutout: '75%', // Daha ince, minimalist bir halka
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let val = context.raw || 0;
                            let percentage = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                            return ` ${context.label}: ${val.toFixed(2)} Ton (%${percentage})`;
                        }
                    }
                }
            }
        }
    });
}

function checkSectorRisk() {
    const s1 = document.getElementById("sektor").value.toLowerCase();
    const s2 = document.getElementById("sektorOzel").value.toLowerCase();
    const combined = s1 + " " + s2;
    const warningDiv = document.getElementById("sectorWarning");
    
    if (combined.includes("demir") || combined.includes("çelik") || combined.includes("celik") || 
        combined.includes("cimento") || combined.includes("çimento") || 
        combined.includes("gübre") || combined.includes("gubre") || 
        combined.includes("alüminyum") || combined.includes("aluminyum") || 
        combined.includes("elektrik") || combined.includes("hidrojen")) {
        
        warningDiv.style.display = "block";
        warningDiv.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
        warningDiv.style.borderLeft = "4px solid #e74c3c";
        warningDiv.style.color = "#c0392b";
        warningDiv.innerHTML = "<strong>⚠️ Yüksek CBAM Riski:</strong> Seçtiğiniz sektör AB Sınırda Karbon Düzenleme Mekanizması (CBAM) kapsamında <u>öncelikli denetime</u> tabidir. İhracat süreçlerinizde doğrudan finansal vergi yükümlülüğü doğurabilir.";
        
    } else if (combined.includes("üretim") || combined.includes("uretim") || combined.includes("imalat")) {
        
        warningDiv.style.display = "block";
        warningDiv.style.backgroundColor = "rgba(241, 196, 15, 0.1)";
        warningDiv.style.borderLeft = "4px solid #f1c40f";
        warningDiv.style.color = "#d35400";
        warningDiv.innerHTML = "<strong>⚠️ Orta Risk:</strong> Genel üretim sektörleri dolaylı CBAM etkilerine veya yerel emisyon ticaret sistemine (ETS) tabi olabilir.";
        
    } else {
        warningDiv.style.display = "none";
    }
}

function calculateRiskScore(sektor, vergi) {
    const s = (sektor || "").toLowerCase();
    let multiplier = 1.0;
    
    // CBAM Öncelikli Sektörleri (Yüksek Riskli)
    if (s.includes("demir") || s.includes("çelik") || s.includes("celik") || s.includes("cimento") || s.includes("çimento") || s.includes("gübre") || s.includes("gubre") || s.includes("alüminyum") || s.includes("aluminyum")) {
        multiplier = 2.0;
    } else if (s.includes("üretim") || s.includes("uretim") || s.includes("imalat")) {
        multiplier = 1.5;
    }
    
    // Basit bir risk skoru 0 - 100 (Örnek: 100.000 TL vergi + Çimento Sektörü = Yüksek risk)
    // Vergi bazlı skor: EUR ise 90 katı olduğu için TL/EUR farkını normalize edelim.
    // Örnek: 10,000 EUR veya 300,000 TL üzeri yüksek riskli sayılabilir.
    // Biz 'vergi' miktarını doğrudan kullanırsak çok büyük sayılar çıkar.
    // 'vergi' miktarını TL gibi varsayıp, (EUR/TL farkı hesaba katılmıştır) 500,000 e bölebiliriz.
    
    let rawScore = (vergi * multiplier) / 5000; 
    if (rawScore > 100) rawScore = 100;
    if (rawScore < 1) rawScore = 1;
    
    return rawScore;
}

function renderRiskGauge(sektor, vergi) {
    const riskScore = calculateRiskScore(sektor, vergi);
    const ctx = document.getElementById('riskGaugeChart').getContext('2d');
    
    if(window.myGaugeChart) window.myGaugeChart.destroy();
    
    let color = '#2ecc71'; 
    let label = 'Düşük Risk';
    if (riskScore > 33 && riskScore <= 66) {
        color = '#f1c40f'; 
        label = 'Orta Risk';
    } else if (riskScore > 66) {
        color = '#e74c3c'; 
        label = 'Yüksek Risk';
    }

    window.myGaugeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [label, 'Diğer'],
            datasets: [{
                data: [riskScore, 100 - riskScore],
                backgroundColor: [color, '#ecf0f1'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '80%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        },
        plugins: [{
            id: 'textCenter',
            beforeDraw: function(chart) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
        
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = "bold " + fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = color;
        
                var text = label,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 1.5;
        
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

// PDF OLUŞTURUCU
document.getElementById("indirPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const firma = document.getElementById("firmaUnvan").value || "BELİRTİLMEMİŞ A.Ş.";
    const sektor = document.getElementById("sektorOzel").value || document.getElementById("sektor").value;
    const belge = document.getElementById("belgeSelect").value;
    const tarih = new Date().toLocaleDateString('tr-TR');

    // 1. KURUMSAL LOGO ALANI
    doc.setDrawColor(200);
    doc.setFillColor(245, 245, 245);
    doc.rect(15, 15, 40, 20, 'FD'); // Logo dikdörtgeni
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("[KURUMSAL LOGO]", 35, 26, { align: "center" });

    // 2. RESMİ BAŞLIK VE BİLGİLER
    doc.setFontSize(22);
    doc.setTextColor(41, 128, 185); // Resmi mavi ton
    doc.setFont(undefined, 'bold');
    doc.text("KARBON BEYAN RAPORU", 105, 25, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);
    doc.text("Rapor No: CRB-" + Math.floor(Math.random() * 1000000), 150, 20);
    doc.text("Tarih: " + tarih, 150, 26);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(41, 128, 185);
    doc.line(15, 40, 195, 40); // Ayırıcı çizgi

    // 3. FİRMA VE KAPSAM TABLOSU
    doc.autoTable({
        startY: 45,
        head: [['Firma Unvani', 'Sektor', 'ISO 14064']],
        body: [[firma, sektor, belge]],
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { fontSize: 11, cellPadding: 4 }
    });

    // 4. EMİSYON VERİLERİ (GÜNCEL)
    const pOzel = document.getElementById("petrolOzel").value;
    const gOzel = document.getElementById("gazOzel").value;
    const eOzel = document.getElementById("elekOzel").value;
    const uOzel = document.getElementById("uretimOzel") ? document.getElementById("uretimOzel").value : 0;
    
    const dogru = verileriDogrula(pOzel, gOzel, eOzel, uOzel);

    const petrolTon = (dogru.petrol*CBAM.petrol)/1000;
    const gazTon = (dogru.gaz*CBAM.gaz)/1000;
    const elekTon = (dogru.elek*CBAM.elek)/1000;
    const uretimTon = (dogru.uretim*CBAM.uretim);
    const toplamTon = petrolTon + gazTon + elekTon + uretimTon;

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Emisyon Kaynagi', 'Miktar', 'Birim', 'Sera Gazi (Ton CO2e)']],
        body: [
            ['Akaryakit (Scope 1)', dogru.petrol.toLocaleString('tr-TR'), 'Litre', petrolTon.toFixed(2)],
            ['Dogalgaz (Scope 1)', dogru.gaz.toLocaleString('tr-TR'), 'm3', gazTon.toFixed(2)],
            ['Uretim Sureci (Scope 1)', dogru.uretim.toLocaleString('tr-TR'), 'Ton', uretimTon.toFixed(2)],
            ['Elektrik (Scope 2)', dogru.elek.toLocaleString('tr-TR'), 'kWh', elekTon.toFixed(2)]
        ],
        foot: [['TOPLAM', '', '', toplamTon.toFixed(2) + ' Ton CO2e']],
        theme: 'striped',
        headStyles: { fillColor: [39, 174, 96] },
        footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 4 }
    });

    // 5. FİNANSAL RİSK ÖNGÖRÜSÜ (GEÇMİŞ İLE KIYAS)
    let y = doc.lastAutoTable.finalY + 15;
    
    let gecmis = JSON.parse(localStorage.getItem("resmiKarbonGecmis")) || [];
    let riskMetni = "";
    const currency = document.getElementById("currency").value;
    const isEur = currency === "EUR";
    const vergiCarpani = CARBON_PRICE_EUR * (isEur ? 1 : EXCHANGE_RATE_EUR_TRY);
    const sembol = isEur ? "€" : "TL";
    
    const guncelVergi = toplamTon * vergiCarpani;

    if (gecmis.length > 0) {
        // Son kayit ile kiyas
        const son = gecmis[gecmis.length - 1];
        const sonDogru = verileriDogrula(son.petrol, son.gaz, son.elek, son.uretim || 0);
        const sonToplam = ((sonDogru.petrol*CBAM.petrol) + (sonDogru.gaz*CBAM.gaz) + (sonDogru.elek*CBAM.elek))/1000 + (sonDogru.uretim*CBAM.uretim);
        const sonVergi = sonToplam * vergiCarpani;
        
        const farkTon = toplamTon - sonToplam;
        const farkYuzde = sonToplam > 0 ? (farkTon / sonToplam) * 100 : 0;

        if (farkTon > 0) {
            riskMetni = `Risk Analizi: Onceki doneme kiyasla emisyonlarinizda %${Math.abs(farkYuzde).toFixed(1)} artis gozlemlenmistir. AB SKDM ve yerel vergi politikalarina gore sirketinizin maruz kaldigi tahmini finansal risk yuku artarak ${Math.round(guncelVergi).toLocaleString('tr-TR')} ${sembol} seviyesine ulasmistir. Karbon azaltim projelerine yatirim yapilmasi tavsiye edilir.`;
        } else {
            riskMetni = `Risk Analizi: Onceki doneme kiyasla emisyonlarinizda %${Math.abs(farkYuzde).toFixed(1)} dusus gozlemlenmistir. Sirketinizin uyguladigi surdurulebilirlik politikalari sayesinde tahmini finansal vergi yuku ${Math.round(guncelVergi).toLocaleString('tr-TR')} ${sembol} seviyesine inmistir. AB SKDM rekabet gucunuz artis trendindedir.`;
        }
    } else {
        riskMetni = `Risk Analizi: Ilk beyaniniz gerceklestirilmistir. AB SKDM mekanizmasi kapsaminda mevcut tuketim aliskanliklariniza gore yillik tahmini finansal karbon vergisi riskiniz ${Math.round(guncelVergi).toLocaleString('tr-TR')} ${sembol} olarak hesaplanmistir. Gelecek donemlerde bu veriyi dusurmek rekabet avantaji saglayacaktir.`;
    }

    doc.setFontSize(12);
    doc.setTextColor(41, 128, 185);
    doc.setFont(undefined, 'bold');
    doc.text("Finansal Risk Ongorusu", 15, y);
    
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.setFont(undefined, 'normal');
    const splitText = doc.splitTextToSize(riskMetni, 180);
    doc.text(splitText, 15, y);

    // AZALTIM ÖNERİLERİ
    y += (splitText.length * 5) + 10;
    let oneriler = [];
    const maxEmisyon = Math.max(petrolTon, gazTon, elekTon, uretimTon);
    
    if (toplamTon === 0) {
        oneriler.push("- Henuz yeterli veri girisi yapilmamistir.");
    } else {
        if (maxEmisyon === petrolTon) {
            oneriler.push("- Lojistik filonuzda elektrikli araclari (EV) tercih ederek Scope 1 emisyonlarinizi dusurebilirsiniz.");
            oneriler.push("- Rota optimizasyon yazilimlari ile akaryakit tuketiminizi minimize edin.");
        } else if (maxEmisyon === gazTon) {
            oneriler.push("- Isitma sistemlerinizde dogalgaz yerine endustriyel isi pompalari kullanimi degerlendirilmelidir.");
            oneriler.push("- Atik isi geri kazanim (Heat Recovery) sistemleri ile enerji verimliligini artirin.");
        } else if (maxEmisyon === elekTon) {
            oneriler.push("- Tesis catiniza Gunes Enerjisi Santrali (GES) kurarak Scope 2 emisyonlarinizi buyuk olcude sifirlayabilirsiniz.");
            oneriler.push("- Yuksek tuketimli cihaz ve motorlarinizi daha verimli (Orn: IE4/IE5) teknolojilerle degistirin.");
        } else if (maxEmisyon === uretimTon) {
            oneriler.push("- Uretim surecindeki dogrudan emisyonlari azaltmak icin dusuk karbonlu alternatif hammadde ikamesi yapilabilir.");
            oneriler.push("- Dongusel ekonomi prensipleriyle uretimde geri donusturulmus materyal kullanim oranini artirin.");
        }
    }

    doc.setFontSize(12);
    doc.setTextColor(39, 174, 96);
    doc.setFont(undefined, 'bold');
    doc.text("Karbon Azaltim ve Eylem Onerileri", 15, y);
    
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.setFont(undefined, 'normal');
    oneriler.forEach(oneri => {
        const oneriText = doc.splitTextToSize(oneri, 180);
        doc.text(oneriText, 15, y);
        y += (oneriText.length * 5) + 2;
    });

    // 6. DİJİTAL İMZA VE ONAY ALANI
    y += 15;
    if (y > 270) {
        doc.addPage();
        y = 30;
    }

    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    
    y += 10;
    doc.setFont(undefined, 'bold');
    doc.text("Hazirlayan (Sorumlu Uzman)", 25, y);
    doc.text("Onaylayan (Yonetici)", 140, y);
    
    y += 20;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(150);
    doc.text("Dijital Imza / Kase Alani", 25, y);
    doc.text("Dijital Imza / Kase Alani", 140, y);
    
    // Alt Bilgi
    doc.setFontSize(8);
    doc.setTextColor(180);
    doc.text("Bu belge CarbonPro Platformu uzerinden otomatik uretilmistir. Hukuki gecerliligi islak imza veya e-imza ile saglanir.", 105, 290, { align: "center" });

    doc.save(`${firma.replace(/\s+/g, '_')}_Karbon_Raporu.pdf`);
});