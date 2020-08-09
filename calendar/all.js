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
let address = document.querySelector('.address')

function reviseDigits(digit) {
    if (digit.toString().length < 2) {
        return `0${digit}`
    }else{
        return digit
    }
}

function init() {
    tbody.innerHTML = '';
    dayCount = 1;
    document.querySelector('.month').innerHTML = `${currentYear} ${switchMonth(currentMonth + 1)}`
    // 先長出第一列
    let FirstTr = document.createElement('tr');

    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td');
        if (i >= firstDay) {
            td.innerHTML = `${dayCount}<ul class="list-group"></ul>`
            td.childNodes[1].setAttribute('data-today', `${currentYear}-${reviseDigits(currentMonth + 1)}-${reviseDigits(dayCount)}`)
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
                td.innerHTML = `${dayCount}<ul class="list-group"></ul>`
                td.childNodes[1].setAttribute('data-today', `${currentYear}-${reviseDigits(currentMonth + 1)}-${reviseDigits(dayCount)}`)
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

function initMap() {
    var myLatlng = { lat: 25.0424604, lng: 121.5356504 };

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: myLatlng });

    // 有中心點但是沒有秀出來
    var marker = new google.maps.Marker(
        { position: myLatlng });

    var infoWindow = new google.maps.InfoWindow(
        { content: 'Click the map to get Lat/Lng!', position: myLatlng });

    infoWindow.open(map);

    map.addListener('click', function (mapsMouseEvent) {

        marker.setMap(null);
        infoWindow.close(map);

        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        marker = new google.maps.Marker({ position: mapsMouseEvent.latLng, map: map });
        transfer(mapsMouseEvent.latLng.toString().replace(/[()]/g, ''))
    });
}

function transfer(Location) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Location}&key=AIzaSyBGUJ4osCN5Wb5_aPKacYdOCC2qKClAKjQ`)
        .then(resp => resp.json())
        .then(res => {
            //console.log(res.results[0].formatted_address)
            address.value = res.results[0].formatted_address
        })
}

function addTodo(){
    let datePick = document.querySelector('.datePick').value
    let inputText = document.querySelector('.inputText').value
    let id = date.getTime()
    init()
    todoList.push({
        id,
        isNew:0,
        datePick,
        inputText, 
        address:address.value
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
    $('#exampleModal').modal('hide')
    render()
}
// 存到特定的欄位格子裡面的dataset.today -> dataset 每一個格子都有專屬日期
// 存進去的時候找那個日期 -> 找年, 月, 日


function render(){
    // 不選定特數日期的作法
    //let str = ''
    // todoList.forEach((item, i) => {
    //     str += `<li>${item.datePick}-${item.inputText} - ${item.address}</li>`
    //   }
    // )
    // ul.innerHTML = str

    // 選定日期的作法
    let ulAry = []
    let ul = Array.from(document.querySelectorAll('.list-group'))
    ul.forEach(item => ulAry.push(item.dataset.today))
    // console.log(ulAry)

    let str = ''
    todoList.forEach((item, i) => {
          if(ulAry.includes(item.datePick)){
              item.isNew = 1
              if(item.isNew !== 0){
                  item.datePick 
              }
            //   console.log(item.datePick)
              //str += `<li>${item.datePick}-${item.inputText} - ${item.address}</li>`
              str += `<li class="list-group-item" data-check=${item.id} data-toggle="modal" data-target="#exampleModal">
                        ${item.inputText}
                    </li>`
          }
        }
    )
    ul[2].innerHTML = str



    // tdHoverAry.forEach((item,i) => {
    //     if (item.includes('2020-08-23')){
    //          console.log(tdHoverAry[i])
    //     }
    // })

    // console.log(tdHoverAry)

    // 取到那個tdHoverAry所在的td底下的ul
    // 取到哪一個tdHoverAry?

    // tdHover.forEach((item, i) => {
    //     if(item.dataset.today === )
    // }

    // todoList.forEach((item, i) => {
    //     if (tdHoverAry.includes(`${todoList[i].datePick}`)){
    //         console.log(123)

    //         str += `<li>${todoList[i].inputText}</li>`
    //     }
    // })
    // ul.innerHTML = str

}

render()

// let deleteItem = document.querySelector('.deleteItem')
// deleteItem.addEventListener('click', remove)
// function remove(){
//     console.log(123)
// }


