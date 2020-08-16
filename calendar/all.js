let date = new Date();
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();
let currentDate = date.getDate();

let dataTransfer = `${currentYear}-${currentMonth + 1}-${currentDate}`
let firstDay = new Date(currentYear, currentMonth, 1).getDay() // 星期六
let monthDay = new Date(currentYear, currentMonth + 1, 0).getDate() // 31
let dayCount = 1; // 日期變數

let tbody = document.querySelector('tbody')
let li = document.querySelector('.list-group-item')
let ul = document.querySelector('.list-group')
let address = document.querySelector('.address')
let pre = document.querySelector('.pre')
let next = document.querySelector('.next')
let deleteData = document.querySelector('.deleteData')
let reviseData = document.querySelector('.reviseData')
let saveData = document.querySelector('.saveData')


let todoList = []

function reviseDigits(digit) {
    if (digit.toString().length < 2) {
        return `0${digit}`
    } else {
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
    render()
}

init()

function preMonth() {
    currentMonth = currentMonth - 1;
    if (currentMonth < 0) {
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

function switchMonth(x) {
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


localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'))

// function initMap() {
//     var myLatlng = { lat: 25.0424604, lng: 121.5356504 };

//     var map = new google.maps.Map(
//         document.getElementById('map'), { zoom: 16, center: myLatlng });

//     // 有中心點但是沒有秀出來
//     var marker = new google.maps.Marker(
//         { position: myLatlng });

//     var infoWindow = new google.maps.InfoWindow(
//         { content: 'Click the map to get Lat/Lng!', position: myLatlng });

//     infoWindow.open(map);

//     map.addListener('click', function (mapsMouseEvent) {

//         marker.setMap(null);
//         infoWindow.close(map);

//         infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
//         marker = new google.maps.Marker({ position: mapsMouseEvent.latLng, map: map });
//         transfer(mapsMouseEvent.latLng.toString().replace(/[()]/g, ''))
//     });
// }

// function transfer(Location) {
//     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Location}&key=AIzaSyBGUJ4osCN5Wb5_aPKacYdOCC2qKClAKjQ`)
//         .then(resp => resp.json())
//         .then(res => {
//             address.value = res.results[0].formatted_address
//         })
// }

function addTodo() {
    let datePick = document.querySelector('.datePick').value
    let inputText = document.querySelector('.inputText').value
    let id = Math.random(date.getTime()*10)
    todoList.push({
        id,
        datePick,
        inputText,
        address: address.value
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
    $('#exampleModal').modal('hide')
    init()
}
// 存到特定的欄位格子裡面的dataset.today -> dataset 每一個格子都有專屬日期
// 存進去的時候找那個日期 -> 找年, 月, 日

function render() {
    localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'))
    // 選定日期的作法
    let ulAry = []
    let ul = Array.from(document.querySelectorAll('.list-group'))
    ul.forEach(item => ulAry.push(item.dataset.today))

    let str = ''
    todoList.forEach(function (item, i) {
        let index = ulAry.findIndex(x => x == item.datePick)
        if (index != -1) {
            ul[index].innerHTML += 
                `<li class="list-group-item" onclick="ShowMeDate(${item.id})" data-check=${item.id} 
                    data-toggle="modal" data-target="#secondModal">
                        ${item.inputText}
                    </li>`
        }
      }
    )
}

function ShowMeDate(id){
    

    $(".deleteData").attr('data-check', id)
    $(".reviseData").attr('data-check', id)

}

function removeTodo(){
    todoList.forEach(function(item, i){
        if ($(".deleteData").attr('data-check') === String(item.id)){
            todoList.splice(i, 1)
            localStorage.setItem('todoList', JSON.stringify(todoList))
        }
        init()
    })
    $('#secondModal').modal('hide')
}

function editTodo(){
    console.log($(".reviseData").attr('data-check'))
}

pre.addEventListener('click', preMonth)
next.addEventListener('click', nextMonth)
saveData.addEventListener('click', addTodo)
deleteData.addEventListener('click', removeTodo)
reviseData.addEventListener('click', editTodo)
// saveData.addEventListener('click', openModal(false))
// insertTodo.addEventListener('click', openModal(true))