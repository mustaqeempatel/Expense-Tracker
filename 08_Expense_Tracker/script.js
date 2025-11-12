const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  listEl.innerHTML = "";
  let balance = 0;

  transactions.forEach((t, index) => {
    const sign = t.type === "income" ? "+" : "-";
    const item = document.createElement("div");
    item.classList.add("transaction", t.type);
    item.innerHTML = `
          <span>${t.text}</span>
          <span>${sign} ₹${t.amount}</span>
          <div>
            <button onclick="editTransaction(${index})">✏️</button>
            <button onclick="deleteTransaction(${index})">🗑️</button>
          </div>
        `;
    listEl.appendChild(item);
    balance += t.type === "income" ? t.amount : -t.amount;
  });

  balanceEl.textContent = balance;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(type) {
  const text = document.getElementById("text").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  if (!text || isNaN(amount)) return alert("Please enter valid details");

  transactions.push({ text, amount, type });
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

function editTransaction(index) {
  const t = transactions[index];
  document.getElementById("text").value = t.text;
  document.getElementById("amount").value = t.amount;
  transactions.splice(index, 1);
  updateUI();
}

updateUI();
