// Import createClient dari CDN Supabase versi ESM
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

console.log('Supabase module loaded');

const supabaseUrl = 'https://fjamqiymnzhxadhonkow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYW1xaXltbnpoeGFkaG9ua293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTAwMjMsImV4cCI6MjA3MTcyNjAyM30.Xyv29V5SCiQYfZYQIBBNFy3ehcxljeJiAiaoQP40hxc';

// Buat client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchBanks() {
  const { data: banks, error } = await supabase
    .from('nomor_bank')
    .select('id, bank,kode');

  if (error) {
    console.error('Gagal mengambil data bank:', error);
    return [];
  }
  return banks;
}

function populateDropdown(selectElement, banks) {
  banks.forEach(bank => {
    const option = document.createElement('option');
    option.value = bank.id;
    option.textContent = bank.bank;
    selectElement.appendChild(option);
  });
}

function populateAllHeaderDropdowns(banks) {
  const selects = document.querySelectorAll('thead select');
  console.log('Jumlah select di thead:', selects.length); // Tambahan
  selects.forEach(select => {
    populateDropdown(select, banks);
  });
}


function addRow(no, namaRekening, id, banks) {
  const tbody = document.querySelector('#bankTable tbody');
  const row = document.createElement('tr');

  // Kolom nomor
  const cellNo = document.createElement('td');
  cellNo.textContent = no;
  row.appendChild(cellNo);

  // Kolom nama rekening
  const cellNama = document.createElement('td');
  cellNama.textContent = namaRekening;
  row.appendChild(cellNama);

  // Kolom ID
  const cellId = document.createElement('td');
  cellId.textContent = id;
  row.appendChild(cellId);

  // Buat 7 kolom td kosong (sel kosong)
  for (let i = 0; i < 7; i++) {
    const cell = document.createElement('td');
    cell.textContent = ''; // kosong, bisa diisi manual nanti
    row.appendChild(cell);
  }

  tbody.appendChild(row);
}

async function init() {
  const banks = await fetchBanks();
  if (banks.length === 0) return;
  populateAllHeaderDropdowns(banks);

  addRow(1, 'Rekening Contoh 1', 'ID001', banks);
  addRow(2, 'Rekening Contoh 2', 'ID002', banks);
}

window.addEventListener('DOMContentLoaded', init);