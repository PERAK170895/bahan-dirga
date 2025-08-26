// Ganti dengan URL dan API KEY Supabase kamu
const SUPABASE_URL = 'https://ciashuymvwhmfuxqgqlr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpYXNodXltdndobWZ1eHFncWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTQyOTEsImV4cCI6MjA2MzAzMDI5MX0.CfmfbISXd_T941XE0j8pAMqrgCUFa9ocBhuQ3B6gUY8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); // ✅

// Clock (tetap)
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

// Format rupiah
function formatRupiah(angka) {
  if (!angka || isNaN(angka)) return 'Rp. 0';
  return 'Rp. ' + Number(angka).toLocaleString('id-ID');
}

// Hitung total (memastikan nilai hanya angka murni)
function hitungTotal() {
  const inputTelkomsel = document.querySelectorAll('input[id^="t"]');
  const inputXL = document.querySelectorAll('input[id^="x"]');

  let totalTelkomsel = 0;
  let totalXL = 0;

  inputTelkomsel.forEach(input => {
    const raw = String(input.value).replace(/[^0-9]/g, '');
    const val = raw === '' ? 0 : Number(raw);
    if (!isNaN(val)) totalTelkomsel += val;
  });

  inputXL.forEach(input => {
    const raw = String(input.value).replace(/[^0-9]/g, '');
    const val = raw === '' ? 0 : Number(raw);
    if (!isNaN(val)) totalXL += val;
  });

  const elTel = document.getElementById('totelkomsel');
  const elXl = document.getElementById('toxl');
  if (elTel) elTel.textContent = formatRupiah(totalTelkomsel);
  if (elXl) elXl.textContent = formatRupiah(totalXL);
}

// Pastikan event listener untuk setiap input: bersihkan input dan update total
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', e => {
      const cleaned = String(e.target.value).replace(/[^0-9]/g, '');
      if (e.target.value !== cleaned) e.target.value = cleaned;
      hitungTotal();
    });
  });

  // Hitung awal saat halaman siap
  hitungTotal();
});