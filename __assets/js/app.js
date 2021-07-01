/*
* Todo List App - Javascript Project
* Author - MD Imam Hossain
* Contact - https://www.facebook.com/prantoislam.jim.3/
*           https://www.fiverr.com/imamhossain0049
*           https://github.com/mdimamhossain0049
*/


// Variable Initial
let formSubmit = document.getElementById('submit');
let projectTitle = document.getElementById('title');
let projectDate = document.getElementById('date');
let projectSection = document.getElementsByClassName('project-list')[0];
let projectDelete = document.getElementsByClassName('delete');
let projectStart = document.getElementsByClassName('start');
let projectPause = document.getElementsByClassName('pause');
let projectReset = document.getElementsByClassName('reset');
let interval = null;


// Initial Local Storage
let setStorage = function()
{
    let getStorage = JSON.parse(localStorage.getItem('project'));
    if(!getStorage)
    {
        localStorage.setItem('project', JSON.stringify([]));
    }
}


// Generate Project ID
let generateId = function()
{
    let getStorage = JSON.parse(localStorage.getItem('project'));
    let id = getStorage.length + 1;
    return id;
}


// Set Data To Local Storage
let setData = function(data)
{
    let getData = JSON.parse(localStorage.getItem('project'));
    let newData = [];
    for(let i of getData){
        newData.push(i);
    }
    newData.push(data);
    localStorage.setItem('project', JSON.stringify(newData));
    printData();
}


// Add New Project
let addProject = function(e)
{
    e.preventDefault();

    if(projectTitle.value != '' && projectDate.value != ''){
        let dataObj = {
            id : generateId(),
            title : projectTitle.value,
            date : projectDate.value,
            time : '0:0:0'
        }
        setData(dataObj);
        projectTitle.value = '';
        projectDate.value = '';
    }
}


// Update Time
let updateTime = function(id, time)
{
    let getData = JSON.parse(localStorage.getItem('project'));
    let newData = [];
    for(let i of getData){
        if(i.id == id)
        {
            let dataObj = {
                id : i.id,
                title : i.title,
                date : i.date,
                time : time
            }
            newData.push(dataObj);
        }
        else {
            newData.push(i);
        }
    }
    localStorage.setItem('project', JSON.stringify(newData));
}


// Delete Project
let deleteProject = function()
{
    let confirmStat = confirm("Do you want to delete this Project ?");
    let projectId = this.parentElement.parentElement.parentElement.getAttribute('data-id');
    if(confirmStat == true)
    {
        let getData = JSON.parse(localStorage.getItem('project'));
        let newData = [];
        for(let i of getData){
            if(i.id != projectId)
            {
                newData.push(i);
            }
        }
        localStorage.setItem('project', JSON.stringify(newData));
        printData();
    }
}


// Start Countdown
let startCountdown = function()
{
    let itemClass = this.parentElement.parentElement.parentElement;
    let id = itemClass.getAttribute('data-id');
    let hour = itemClass.getElementsByClassName('hour')[0];
    let minute = itemClass.getElementsByClassName('minute')[0];
    let second = itemClass.getElementsByClassName('second')[0];
 
    clearInterval(interval);

    interval = setInterval(function(){
        let countdownClass = itemClass.getElementsByClassName('countdown')[0];
        let countdownTime = countdownClass.getAttribute('data-time');
        let time = countdownTime.split(":");
        let newHour = parseInt(time[0]);
        let newMinute = parseInt(time[1]);
        let newSecond = parseInt(time[2]) + 1;
        let newTime = null;

        if(newSecond == 60)
        {
            newMinute += 1;
            newSecond = 0;
            if(newMinute == 60)
            {
                newHour += 1;
                newMinute = 0;
            }
        }

        hour.innerHTML = newHour;
        minute.innerHTML = newMinute;
        second.innerHTML = newSecond;
        newTime = newHour+":"+newMinute+":"+newSecond;
        countdownClass.setAttribute('data-time', newTime);
        updateTime(id, newTime);
    }, 1000);
}

// Pause Countdown
let pauseCountdown = function()
{
    clearInterval(interval);
}

// Reset Countdown
let resetCountdown = function()
{
    let itemClass = this.parentElement.parentElement.parentElement;
    let id = itemClass.getAttribute('data-id');
    let confirmStat = confirm("Do you want to reset this time ?");

    if(confirmStat == true)
    {
        clearInterval(interval);
        updateTime(id, "0:0:0");
        printData();
    }
}


// Print Data
let printData = function()
{
    clearInterval(interval);

    let getData = JSON.parse(localStorage.getItem('project'));
    projectSection.innerHTML = '';

    for(let i of getData)
    {

        let time = i.time.split(":");

        projectSection.innerHTML += '<div class="item row p-3 mb-3 m-0 align-items-center" data-id="'+ i.id +'">\n' +
        '<div class="col-6">\n' +
        '<span class="date d-block mb-2">'+ i.date +'</span>\n' +
        '<h5 class="title d-block mb-3">'+ i.title +'</h5>\n' +
        '</div>\n' +
        '<div class="col-4">\n' +
        '<div class="countdown d-flex align-items-center justify-content-evenly" data-time="'+i.time+'">\n' +
        '<div class="time text-center">\n' +
        '<span class="hour d-block">'+ time[0] +'</span>\n' +
        '<span class="text d-block">Hour</span>\n' +
        '</div>\n' +
        '<div class="colon">:</div>\n' +
        '<div class="time text-center">\n' +
        '<span class="minute d-block">'+ time[1] +'</span>\n' +
        '<span class="text d-block">Minute</span>\n' +
        '</div>\n' +
        '<div class="colon">:</div>\n' +
        '<div class="time text-center">\n' +
        '<span class="second d-block">'+ time[2] +'</span>\n' +
        '<span class="text d-block">Second</span>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="col-2">\n' +
        '<div class="d-grid gap-1">\n' +
        '<button type="button" class="btn btn-secondary btn-sm start">Start</button>\n' +
        '<button type="button" class="btn btn-secondary btn-sm pause">Pause</button>\n' +
        '<button type="button" class="btn btn-secondary btn-sm reset">Reset</button>\n' +
        '<button type="button" class="btn btn-secondary btn-sm delete">Delete</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n';
    }
    addEvent();
}


// Add Event Listener
let addEvent = function()
{
    for(let i of projectDelete)
    {
        i.addEventListener('click', deleteProject);
    }
    for(let i of projectStart)
    {
        i.addEventListener('click', startCountdown);
    }
    for(let i of projectPause)
    {
        i.addEventListener('click', pauseCountdown);
    }
    for(let i of projectReset)
    {
        i.addEventListener('click', resetCountdown);
    }
}

// Initial Command
setStorage();
printData();
formSubmit.addEventListener('submit', addProject);