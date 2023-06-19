
let tasks = [

]

function getTasksFromLocalStoege() {
    let retriveTasks = JSON.parse(localStorage.getItem('tasksList'))
    if (retriveTasks == null) {
        tasks = []
    } else {
        tasks = retriveTasks
    }
}

getTasksFromLocalStoege()

function addToLocalStoge() {
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem('tasksList', tasksString)
}


function fallPageTasks() {

    console.log(tasks.length)
    console.log(100 / tasks.length)
    function priorityColor(pri) {
        if (pri === 'عالية') {
            return 'high';
        } else if (pri === 'متوسطة') {
            return 'medium'
        } else if (pri === 'منخفضة') {
            return 'low'
        } else if (pri === 'منخفضة جدا') {
            return 'very-low'
        }

    }

    document.querySelector('.tasks').innerHTML = ''

    for (let i = 0; i < tasks.length; i++) {


        let createTask = `
            <div class="task ${priorityColor(tasks[i].priority)}">

                <ul class="option">
                    <li class="done" onclick='btnOfDone(${i})'><img src="/image/done-mark.png" alt=""></li>
                    <li class="edit" onclick='editMsg(${i})'><img src="/image/edit.png" alt=""></li>
                    <li class="trash" onclick='btnOfTrash(${i})'><img src="/image/trash.png" alt=""></li>
                </ul>
        
                <div class="content-task">
                    
                    <p dir="rtl">${tasks[i].title}</p>
                    <div class="info">
                        <span class="date">${tasks[i].date}</span>
                        <span class="priority ${priorityColor(tasks[i].priority)}">${tasks[i].priority}</span>
                    </div>
                </div>
            </div>
        `

        document.querySelector('.tasks').innerHTML += createTask


        if (tasks[i].status === false) {
            document.querySelectorAll('.task')[i].classList.remove('complete')
        } else if (tasks[i].status === true) {
            document.querySelectorAll('.task')[i].classList.add('complete')
        }

    }


}

//  ================== Nav ==================

let getPriOpt = document.querySelectorAll('header .nav-list li')

console.log(getPriOpt)

fallPageTasks()


function btnOfDone(num) {
    document.querySelectorAll('.task ul')[num].parentElement.classList.toggle('complete')
    console.log(tasks[num].status === false)
    if (tasks[num].status === false) {
        tasks[num].status = true
        addToLocalStoge()
    } else if (tasks[num].status === true) {
        tasks[num].status = false
        addToLocalStoge()
    }
    addToLocalStoge()
    lineBar
}

function btnOfTrash(num) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
    console.log(num)
    document.querySelectorAll('.task ul')[num].parentElement.style.transform = 'translateX(-200%)';
    setTimeout(() => {
        document.querySelectorAll('.task ul')[num].parentElement.remove()
        tasks.splice(num, 1)
        addToLocalStoge()
    }, 10)
    console.log(tasks)
    fallPageTasks()
}


// Show Add Massge


function removeParAdd() {
    let x = document.querySelector('.add-msg')
    x.remove()
}
function removeParEdit() {
    let x = document.querySelector('.edit-msg')
    x.remove()
}

function addMsg() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })

    function makeNewTask() {
        let addMsg = `
        <div class="add-msg">
            <div>
                <p>إنشاء مهمة<span> جديدة  </span></p>
                <input type="text" id="add-text" placeholder="عنوان المهمة" dir="rtl">
            </div>
            <div class="opt-priority"> 
                <h2>أختيار الأولوية</h2>
                <ul>
                    <li class="opt high">عالية</li>
                    <li class="opt medium opt-active">متوسطة</li>
                    <li class="opt low">منخفضة</li>
                    <li class="opt very-low">منخفضة جدا</li>
                </ul>
            </div>
            <div class="btns">
                <button class='close-add-opt' onclick='removeParAdd()'>غلق</button>
                <button>إنشاء مهمة</button>
            </div>
        </div>
        `
        document.body.innerHTML += addMsg
    }
    makeNewTask()
    document.querySelectorAll('.add-msg ul li').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.add-msg ul li').forEach((re) => {
                re.classList.remove('opt-active')
            })
            el.classList.add('opt-active')
        })
    })
    document.querySelectorAll('.add-msg button')[1].addEventListener('click', () => {
        if (document.querySelector('.add-msg input').value === '') {
            document.querySelector('.add-msg input').value = 'مهمة جديدة'
        }
        let setNow = new Date;
        let tody = setNow.getUTCDate() + '/' + (setNow.getMonth() + 1) + '/' + setNow.getFullYear() + ' ' + '|' + ' ' + setNow.getHours() + ':' + setNow.getMinutes()
        newTask = new Object({
            title: `${document.querySelector('.add-msg input').value}`,
            priority: `${document.querySelector('.add-msg .opt-active').innerHTML}`,
            date: tody,
            status: false,
        })
        tasks.push(newTask)
        addToLocalStoge()
        fallPageTasks()
        let x = document.querySelector('.add-msg')
        x.remove()
    })


}

// Show Edit Massge
function editMsg(num) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
    function makeEditMsg() {
        let editMsg = `
        <div class="edit-msg">
            <div>
                <p>تعديل <span>مهمة</span></p>
                <input type="text" id="add-text" placeholder="تعديل العنوان" dir="rtl" value='${tasks[num].title}'>
            </div>
            <div class="opt-priority"> 
                <h2>تعديل الأولوية</h2>
                <ul>
                    <li class="opt high">عالية</li>
                    <li class="opt medium opt-active">متوسطة</li>
                    <li class="opt low">منخفضة</li>
                    <li class="opt very-low">منخفضة جدا</li>
                </ul>
            </div>
            <div class="btns">
                <button onclick='removeParEdit()'>غلق</button>
                <button>تعديل المهمة</button>
            </div>
        </div>
        `
        document.body.innerHTML += editMsg
    }
    makeEditMsg()

    function chosePriFromArr(pri) {
        switch (pri) {
            case 'عالية':
                document.querySelectorAll('.edit-msg ul li').forEach((re) => {
                    re.classList.remove('opt-active')
                })
                document.querySelector('.edit-msg ul .high').classList.add('opt-active')
                break;
            case 'متوسطة':
                document.querySelectorAll('.edit-msg ul li').forEach((re) => {
                    re.classList.remove('opt-active')
                })
                document.querySelector('.edit-msg ul .medium').classList.add('opt-active')
                break;
            case 'منخفضة':
                document.querySelectorAll('.edit-msg ul li').forEach((re) => {
                    re.classList.remove('opt-active')
                })
                document.querySelector('.edit-msg ul .low').classList.add('opt-active')
                break;
            case 'منخفضة جدا':
                document.querySelectorAll('.edit-msg ul li').forEach((re) => {
                    re.classList.remove('opt-active')
                })
                document.querySelector('.edit-msg ul .very-low').classList.add('opt-active')
                break;
        }
    }

    chosePriFromArr(tasks[num].priority)

    document.querySelectorAll('.edit-msg ul li').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.edit-msg ul li').forEach((re) => {
                re.classList.remove('opt-active')
            })
            el.classList.add('opt-active')
        })
    })


    document.querySelectorAll('.edit-msg button')[1].addEventListener('click', () => {
        tasks[num].title = document.querySelector('.edit-msg #add-text').value;
        tasks[num].priority = document.querySelector('.edit-msg ul .opt-active').innerHTML;
        addToLocalStoge()
        fallPageTasks()
        let x = document.querySelector('.edit-msg')
        x.remove()
    })
}



