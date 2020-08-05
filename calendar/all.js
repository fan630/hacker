let date = new Date();
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();
let firstDay = new Date(currentYear, currentMonth, 1).getDay() // 星期六
let monthDay = new Date(currentYear, currentMonth + 1, 0).getDate() // 31
let dayCount = 1; // 日期變數
let tbody = document.querySelector('tbody')

function init() {
    tbody.innerHTML = '';
    dayCount = 1;
    document.querySelector('.month').innerHTML = `${currentYear} ${currentMonth + 1}月份`
    // 先長出第一列
    let FirstTr = document.createElement('tr');

    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td');
        if (i >= firstDay) {
            td.textContent = dayCount
            dayCount++
            td.classList.add('tdHover')
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
                td.classList.add('tdHover')
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
    if(currentMonth < 0){
        currentMonth = 11
        currentYear = currentYear - 1
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay()
    monthDay = new Date(currentYear, currentMonth + 1, 0).getDate()
    init()
}

function nextMonth() {
    currentMonth = currentMonth + 1;
    if (currentMonth >= 12) {
        currentMonth = 0
        currentYear = currentYear + 1
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay()
    monthDay = new Date(currentYear, currentMonth + 1, 0).getDate()
    init()
}