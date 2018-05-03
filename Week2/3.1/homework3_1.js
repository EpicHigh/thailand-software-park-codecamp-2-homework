fetch('homework2_1.json').then(response => {
    return response.json();
})
    .then(employees => {
        let myTable = '';

        function addYearSalary(row) {
            return row['yearSalary'] = `${row['salary'] * 12}`;
        }

        function addNextSalary(row) {
            return row['nextSalary'] = [parseInt(row['salary']), parseInt(row['salary']) + (row['salary'] * 0.1), parseInt(row['salary']) + (row['salary'] * 0.21)];
        }

        function addAdditionalFields(employees) {
            for (let i in employees) {
                addYearSalary(employees[i]);
                addNextSalary(employees[i]);
            }
        }

        addAdditionalFields(employees);
        const tableHeader = employees[0];
        myTable += `<tr>`;
        for (let i in tableHeader) {
            myTable += `<th>${i}</th>`
        }
        myTable += `</tr>`;
        for (let i in employees) {
            myTable += `<tr>`;
            for (j in tableHeader) {

                if (j !== 'nextSalary') {
                    myTable += `<td>${employees[i][j]}</td>`;
                }
                if (j === 'nextSalary') {
                    let nextSalaryOrderList = ``;
                    nextSalaryOrderList += `<td><ol>`;
                    for (k in employees[i][j]) {
                        nextSalaryOrderList += `<li>${employees[i][j][k]}</li>`
                    }
                    nextSalaryOrderList += `</ol></td>`;
                    myTable += nextSalaryOrderList;
                }

            }
            myTable += `</tr>`;
        }
        document.getElementById('myTable').innerHTML = myTable;
    })
    .catch(error => {
        console.error('Error:', error);
    });