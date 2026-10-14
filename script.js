/**
 * Kaleem Solar Installer - DG Khan
 * Interactive Logic & Solar Calculator
 * Phone: 0341-3394184 | Address: Piyary Wali Pull, DG Khan
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Solar Load Calculator Elements
    const fansRange = document.getElementById('fansRange');
    const lightsRange = document.getElementById('lightsRange');
    const fridgeRange = document.getElementById('fridgeRange');
    const acRange = document.getElementById('acRange');
    const pumpRange = document.getElementById('pumpRange');
    const ironCheck = document.getElementById('ironCheck');

    const fansValText = document.getElementById('fansValText');
    const lightsValText = document.getElementById('lightsValText');
    const fridgeValText = document.getElementById('fridgeValText');
    const acValText = document.getElementById('acValText');
    const pumpValText = document.getElementById('pumpValText');

    const calcSystemTitle = document.getElementById('calcSystemTitle');
    const calcTypeRecommend = document.getElementById('calcTypeRecommend');
    const calcTotalWatts = document.getElementById('calcTotalWatts');
    const calcPlatesCount = document.getElementById('calcPlatesCount');
    const calcInverter = document.getElementById('calcInverter');
    const calcMonthlySaving = document.getElementById('calcMonthlySaving');
    const calcMoneySaving = document.getElementById('calcMoneySaving');
    const bookCalculatedSystemBtn = document.getElementById('bookCalculatedSystemBtn');

    let currentCalculatedLoad = 2980;
    let currentRecommendedSystem = "5 kW Solar System";

    function updateCalculator() {
        if (!fansRange) return;

        const fans = parseInt(fansRange.value, 10);
        const lights = parseInt(lightsRange.value, 10);
        const fridges = parseInt(fridgeRange.value, 10);
        const acs = parseInt(acRange.value, 10);
        const pumps = parseInt(pumpRange.value, 10);
        const hasIron = ironCheck ? ironCheck.checked : false;

        // Update Labels
        fansValText.textContent = `${fans} پنکھے`;
        lightsValText.textContent = `${lights} لائٹس`;
        fridgeValText.textContent = `${fridges} فریج`;
        acValText.textContent = `${acs} انورٹر AC`;
        pumpValText.textContent = `${pumps} موٹر`;

        // Calculate wattage
        // Fans ~ 80W, Lights ~ 20W, Fridge ~ 350W, AC ~ 1500W, Pump ~ 800W, Iron ~ 1000W
        let totalWatts = (fans * 80) + (lights * 20) + (fridges * 350) + (acs * 1500) + (pumps * 800);
        if (hasIron) {
            totalWatts += 1000;
        }

        currentCalculatedLoad = totalWatts;
        calcTotalWatts.textContent = `${totalWatts.toLocaleString()} Watts (${(totalWatts / 1000).toFixed(1)} kW)`;

        // System sizing logic
        if (totalWatts <= 2200) {
            currentRecommendedSystem = "3 kW Smart Solar System";
            calcSystemTitle.textContent = "3 kW Solar System";
            calcTypeRecommend.innerHTML = '<i class="fa-solid fa-circle-check"></i> ہائبرڈ / آف گرڈ سسٹم (بیٹری سپورٹ)';
            calcPlatesCount.textContent = "5 سے 6 پلیٹس (580W-600W Tier-1)";
            calcInverter.textContent = "3.2 kW MPPT Solar Inverter";
            calcMonthlySaving.textContent = "350 سے 450 یونٹس ماہانہ";
            calcMoneySaving.textContent = "Rs. 20,000 - 28,000/ماہ";
        } else if (totalWatts <= 4500) {
            currentRecommendedSystem = "5 kW / 6 kW Family Solar System";
            calcSystemTitle.textContent = "5 kW / 6 kW Solar System";
            calcTypeRecommend.innerHTML = '<i class="fa-solid fa-circle-check"></i> ہائبرڈ سسٹم (1.5 Ton AC اور بیٹری کے لیے بہترین)';
            calcPlatesCount.textContent = "8 سے 10 پلیٹس (580W-600W Tier-1)";
            calcInverter.textContent = "5 kW یا 6 kW Hybrid Inverter";
            calcMonthlySaving.textContent = "550 سے 750 یونٹس ماہانہ";
            calcMoneySaving.textContent = "Rs. 32,000 - 48,000/ماہ";
        } else if (totalWatts <= 8000) {
            currentRecommendedSystem = "10 kW Heavy Solar System";
            calcSystemTitle.textContent = "10 kW Solar System";
            calcTypeRecommend.innerHTML = '<i class="fa-solid fa-circle-check"></i> آن گرڈ نیٹ میٹرنگ یا 10kW تھری فیز ہائبرڈ';
            calcPlatesCount.textContent = "16 سے 18 پلیٹس (580W-600W Bifacial)";
            calcInverter.textContent = "10 kW On-Grid / Hybrid Inverter";
            calcMonthlySaving.textContent = "1,100 سے 1,400 یونٹس ماہانہ";
            calcMoneySaving.textContent = "Rs. 65,000 - 85,000/ماہ";
        } else {
            currentRecommendedSystem = "15 kW+ کمرشل / زرعی ٹیوب ویل سسٹم";
            calcSystemTitle.textContent = "15 kW - 25 kW / Tubewell";
            calcTypeRecommend.innerHTML = '<i class="fa-solid fa-circle-check"></i> تھری فیز نیٹ میٹرنگ یا ہیوی VFD زرعی ٹیوب ویل';
            calcPlatesCount.textContent = "24 سے 36+ بائیفیشل پلیٹس";
            calcInverter.textContent = "15kW-25kW Inverter / VFD Controller";
            calcMonthlySaving.textContent = "1,800 سے 2,600+ یونٹس ماہانہ";
            calcMoneySaving.textContent = "Rs. 100,000+ ہر ماہ بچت";
        }
    }

    // Attach Calculator Listeners
    [fansRange, lightsRange, fridgeRange, acRange, pumpRange].forEach(input => {
        if (input) {
            input.addEventListener('input', updateCalculator);
        }
    });

    if (ironCheck) {
        ironCheck.addEventListener('change', updateCalculator);
    }

    // Initial Calculation Run
    updateCalculator();

    // Booking Calculated System via WhatsApp
    if (bookCalculatedSystemBtn) {
        bookCalculatedSystemBtn.addEventListener('click', () => {
            const fans = fansRange ? fansRange.value : 0;
            const lights = lightsRange ? lightsRange.value : 0;
            const fridges = fridgeRange ? fridgeRange.value : 0;
            const acs = acRange ? acRange.value : 0;
            const pumps = pumpRange ? pumpRange.value : 0;

            const text = `Assalam o Alaikum Kaleem Bhai!\nMaine aapki website par solar calculator use kiya hai.\n\n*Mera Load:* ${currentCalculatedLoad} Watts\n*Tajweez Kardah System:* ${currentRecommendedSystem}\n\n*Aalaat:* ${fans} Fans, ${lights} Lights, ${fridges} Fridge, ${acs} Inverter AC, ${pumps} Water Motor.\n\nMeherbani farma kar mujhy is system ka mukammal rate aur quotation bata den. (DG Khan)`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/923413394184?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 3. Free Site Survey Form Submission (Hero Section)
    const heroLeadForm = document.getElementById('heroLeadForm');
    if (heroLeadForm) {
        heroLeadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('leadName').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const type = document.getElementById('leadType').value;
            const capacity = document.getElementById('leadCapacity').value;
            const area = document.getElementById('leadArea').value.trim() || 'DG Khan Area';

            const message = `Assalam o Alaikum Kaleem Solar Installer!\n\nMujhy Solar System lagwana hai. Meri details ye hain:\n*Naam:* ${name}\n*Phone:* ${phone}\n*System Type:* ${type}\n*Capacity:* ${capacity}\n*Area / Address:* ${area}\n\nMeherbani farma kar Free Site Survey aur rate k liye rabta farmayen. Shukriya!`;

            const encodedMsg = encodeURIComponent(message);
            const targetUrl = `https://wa.me/923413394184?text=${encodedMsg}`;
            window.open(targetUrl, '_blank');
        });
    }

    // 4. FAQs Accordion Toggle
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isCurrentlyOpen = !content.classList.contains('hidden');

            // Close all
            document.querySelectorAll('.faq-content').forEach(item => item.classList.add('hidden'));
            document.querySelectorAll('.faq-btn').forEach(item => item.classList.remove('active'));

            // Toggle current if it was closed
            if (!isCurrentlyOpen) {
                content.classList.remove('hidden');
                btn.classList.add('active');
            }
        });
    });

});
