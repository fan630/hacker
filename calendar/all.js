let date = new Date();
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();
let currentDate = date.getDate();

let dataTransfer = `${currentYear}-${currentMonth+1}-${currentDate}`
// console.log(typeof(dataTransfer), dataTransfer)
// let today = currentYear-(currentMonth+1)- 
// console.log(today)
let firstDay = new Date(currentYear, currentMonth, 1).getDay() // 星期六
let monthDay = new Date(currentYear, currentMonth + 1, 0).getDate() // 31
let dayCount = 1; // 日期變數
// let dateCount = 1;
let tbody = document.querySelector('tbody')
let li = document.querySelector('.list-group-item')
let ul = document.querySelector('.list-group')

function init() {
    tbody.innerHTML = '';
    dayCount = 1;
    document.querySelector('.month').innerHTML = `${currentYear} ${switchMonth(currentMonth + 1)}`
    // 先長出第一列
    let FirstTr = document.createElement('tr');

    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td');
        if (i >= firstDay) {
            td.textContent = dayCount
            td.setAttribute('data-today', `${currentYear}-0${currentMonth + 1}-${dayCount}`)
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
                td.innerHTML = `${dayCount}<ul></ul>`
                td.setAttribute('data-today', `${currentYear}-0${currentMonth+1}-${dayCount}`)
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

function switchMonth(x){
    switch (true) {
        case x == 1:
            return x = 'January';
        case x == 2:
            return x = 'February';
        case x == 3:
            return x = 'March';
        case x == 4:
            return x = 'April';
        case x == 5:
            return x = 'May';
        case x == 6:
            return x = 'June';
        case x == 7:
            return x = 'July';
        case x == 8:
            return x = 'August';
        case x == 9:
            return x = 'September';
        case x == 10:
            return x = 'October';
        case x == 11:
            return x = 'November';
        default:
            return x = 'December';
            break;
    }
}

let saveData = document.querySelector('.saveData')
saveData.addEventListener('click', addTodo)

let todoList = []
localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'))

function addTodo(){
    let datePick = document.querySelector('.datePick').value
    let inputText = document.querySelector('.inputText').value
    let id = date.getTime()
    todoList.push({
        id,
        datePick,
        inputText
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
    $('#exampleModal').modal('hide')
    render()
}
// 存到特定的欄位格子裡面的dataset.today -> dataset 每一個格子都有專屬日期
// 存進去的時候找那個日期 -> 找年, 月, 日

function render(){
    let str = ''
    let tdHoverAry = []
    
    let tdHover = document.querySelectorAll('td.tdHover')
    tdHover.forEach(item => tdHoverAry.push(item.dataset.today))
    // console.log(tdHoverAry)

    // return tdHoverAry.filter((item) => {
    //     return item === (todoList.forEach(function (todo) { `${todo.datePick}`}))
    // })

    // console.log(tdHoverAry)

    // 取到那個tdHoverAry所在的td底下的ul
    // 取到哪一個tdHoverAry?
    

    todoList.forEach((item, i) => {
        if (tdHoverAry.includes(`${todoList[i].datePick}`)){
            console.log(123)
            str += `<li>${todoList[i].inputText}</li>`
        }
    })
    // ul.innerHTML = str
}

render()

// let deleteItem = document.querySelector('.deleteItem')
// deleteItem.addEventListener('click', remove)
// function remove(){
//     console.log(123)
// }
