let expenses = [];
let totalAmount = 0;

const characterSelect = document.getElementById('character-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function () {
    const character =  characterSelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if ( character === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = {  character, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const  characterCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button'); // New 'Edit' button

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn'); // New 'Edit' button style

    // Delete function: closure to maintain a reference to the specific row
    deleteBtn.addEventListener('click', function () {
        const rowIndex = Array.from(expensesTableBody.rows).indexOf(newRow);

        if (rowIndex !== -1) {
            const deletedExpense = expenses.splice(rowIndex, 1)[0];  // deleted expense
            totalAmount -= deletedExpense.amount;  // Subtract the amount from total
            totalAmountCell.textContent = totalAmount;
            expensesTableBody.deleteRow(rowIndex);  // Remove the row from the table
        }
    });

    // Edit function: allows editing of the existing expense
    editBtn.addEventListener('click', function () {
        const rowIndex = Array.from(expensesTableBody.rows).indexOf(newRow);

        if (rowIndex !== -1) {
            const expenseToEdit = expenses[rowIndex];
            // Fill input fields with existing data
            characterSelect.value = expenseToEdit. character;
            amountInput.value = expenseToEdit.amount;
            dateInput.value = expenseToEdit.date;

            // Remove the expense from the list and table
            totalAmount -= expenseToEdit.amount;  // Adjust total
            totalAmountCell.textContent = totalAmount;
            expenses.splice(rowIndex, 1);
            expensesTableBody.deleteRow(rowIndex);

            // Focus on the amount input for easy editing
            amountInput.focus();
        }
    });

    characterCell.textContent = expense. character;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    actionCell.appendChild(deleteBtn);
    actionCell.appendChild(editBtn); // Add 'Edit' button next to 'Delete'

    // Clear input fields after adding or editing expense
    characterSelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});