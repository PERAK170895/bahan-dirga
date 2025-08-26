// Supabase Setup
const SUPABASE_URL = 'https://ciashuymvwhmfuxqgqlr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpYXNodXltdndobWZ1eHFncWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTQyOTEsImV4cCI6MjA2MzAzMDI5MX0.CfmfbISXd_T941XE0j8pAMqrgCUFa9ocBhuQ3B6gUY8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); // ✅

// Clock
function updateClock() {
  const now = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('id-ID', dateOptions);
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedTime = now.toLocaleTimeString('id-ID', timeOptions);
  const el = document.getElementById('clock');
  if (el) el.textContent = `⏰ ${formattedDate}, ${formattedTime}`;
}
setInterval(updateClock, 1000);
updateClock();

// Format
function formatRupiah(angka) {
  if (!angka || isNaN(angka)) return 'Rp. 0';
  return 'Rp. ' + Number(angka).toLocaleString('id-ID');
}

function cleanInput(e) {
  const cleaned = e.target.value.replace(/[^0-9]/g, '');
  if (e.target.value !== cleaned) e.target.value = cleaned;
}

// Cek Bonus Maksimal
function cekMaksimalBonus(elemenArr, nilaiAsliArr) {
  const batasMaks = 500000;
  let adaMaksimal = false;

  elemenArr.forEach((el, i) => {
    if (!el) return;
    const nilaiAsli = nilaiAsliArr[i];

    if (nilaiAsli > batasMaks) {
      el.style.backgroundColor = '#f44336';
      el.style.color = '#fff';
      adaMaksimal = true;
    } else {
      el.style.backgroundColor = '';
      el.style.color = '';
    }
  });

  if (adaMaksimal) {
    alert("⚠️ BONUS MAKSIMAL: Maksimal Rp 500.000!");
  }
}

function hitungBonus() {
  const fmurni = parseFloat(document.getElementById('fmurni')?.value) || 0;
  const fbuy = parseFloat(document.getElementById('fbuy')?.value) || 0;
  const pfbuy = parseFloat(document.getElementById('pfbuy')?.value) || 0;

  const tfmurni = document.getElementById('tfmurni');
  const tbf = document.getElementById('tbf');
  const bc = document.getElementById('bc');
  const bff = document.getElementById('bff');

  // Jika semua input kosong, kosongkan semua output dan keluar
  if (fmurni === 0 && fbuy === 0 && pfbuy === 0) {
    [tfmurni, tbf, bc, bff].forEach(el => {
      if (el) {
        el.textContent = '';
        el.style.backgroundColor = '';
        el.style.color = '';
      }
    });
    return;
  }

  // Cek minimal untuk fmurni, TAPI hanya jika dia bukan 0
  if (fmurni > 0 && fmurni < 200000) {
    alert("⚠️ KURANG HASIL: minimal pendapatan Rp 200.000!");
    [tfmurni, bc].forEach(el => {
      if (el) {
        el.textContent = '';
        el.style.backgroundColor = '';
        el.style.color = '';
      }
    });
    return;
  }

  // Hitung Bonus
  const bonusFreeSpinAsli = fmurni * 0.25;
  const bonusBuySpinAsli = Math.max((fbuy - pfbuy) * 0.15, 0); // tidak boleh negatif

  const bonusFreeSpin = Math.min(bonusFreeSpinAsli, 500000);
  const bonusBuySpin = Math.min(bonusBuySpinAsli, 500000);

  if (tfmurni) tfmurni.textContent = formatRupiah(bonusFreeSpin);
  if (tbf) tbf.textContent = formatRupiah(bonusBuySpin);
  if (bc) bc.textContent = Math.floor(bonusFreeSpin);
  if (bff) bff.textContent = Math.floor(bonusBuySpin); // <- tampil tanpa Rp/koma

  // Cek batas maksimal untuk semua hasil
  cekMaksimalBonus(
    [tfmurni, bc, tbf, bff],
    [bonusFreeSpinAsli, bonusFreeSpinAsli, bonusBuySpinAsli, bonusBuySpinAsli]
  );
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const inputIds = ['fmurni', 'fbuy', 'pfbuy'];
  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('change', (e) => {
        cleanInput(e);
        hitungBonus();
      });
    }
  });

  hitungBonus();
});

console.log("✅ Script aktif!");