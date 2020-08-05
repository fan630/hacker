let date = new Date();
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();
console.log(currentMonth)

let firstDay = new Date(currentYear, currentMonth, 1).getDay() // 星期六
let monthDay = new Date(currentYear, currentMonth + 1, 0).getDate() // 31

let dayCount = 1; // 日期變數
let tbody = document.querySelector('tbody')

function init() {
    // 先長出第一列
    let FirstTr = document.createElement('tr');

    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td');
        if (i >= firstDay) {
            td.textContent = dayCount
            dayCount++
        }
        FirstTr.appendChild(td)
    }

    tbody.appendChild(FirstTr)

    // 其餘列數
    for (let i = 0; i < Math.ceil(monthDay / 7); i++) {
        let tr = document.createElement('tr')
        for (let i = 0; i < 7; i++) {
            let td = document.createElement('td')
            if (dayCount <= monthDay) {
                td.innerText = dayCount
                dayCount++
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
}

init()

document.querySelector('.pre').addEventListener('click', preMonth)
document.querySelector('.next').addEventListener('click',nextMonth)

function preMonth(){
    currentMonth = currentMonth - 1;
    firstDay = new Date(currentYear, currentMonth, 1).getDay()
    monthDay = new Date(currentYear, currentMonth + 1, 0).getDate()
    init()
    console.log(currentMonth, firstDay, monthDay)
}

function nextMonth() {
    console.log(456)
}