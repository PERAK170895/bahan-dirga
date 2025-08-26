// Ganti dengan URL dan API KEY Supabase kamu
const SUPABASE_URL = 'https://ciashuymvwhmfuxqgqlr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpYXNodXltdndobWZ1eHFncWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTQyOTEsImV4cCI6MjA2MzAzMDI5MX0.CfmfbISXd_T941XE0j8pAMqrgCUFa9ocBhuQ3B6gUY8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); // ✅

// Flash Sale Timer
function updateTimer() {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999); // End of day

    const diff = endTime - now;

    if (diff <= 0) {
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

// Logout
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn?.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        alert("Terjadi kesalahan saat logout!");
    } else {
        alert("Logout berhasil!");
        window.location.href = "../data base/index.html"; // Sesuaikan path login
    }
});

