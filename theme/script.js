var func = function () {
    var today = new Date();

    var montharray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month, day, year, hours, minutes, min, hr,sec;
    month = today.getMonth();
    day = today.getDate();
    year = today.getFullYear();
    hr = today.getHours();
    sec = today.getSeconds(); 
    if (hr.toString().length === 1) {
        hours = '0' + hr;
    } else {
        hours = hr;
    }
    if (sec.toString().length === 1) {
        sec = '0' + sec;
    } else {
        sec = sec;
    }
    min = today.getMinutes();
    if (min.toString().length === 1) {
        minutes = '0' + min;
    } else {
        minutes = min;
    }

    document.querySelector('.month').textContent = montharray[month];

    document.querySelector('.year').textContent = year;

    document.querySelector('.day').textContent = day + ',';

    document.querySelector('.hours').textContent = hours + ' :';
    document.querySelector('.minutes').textContent = minutes + ' :';
    document.querySelector('.seconds').textContent = sec;
};
setInterval(func, 1);

// focus on search box
document.addEventListener('keypress', function(e){
        document.querySelector('.searchb').focus();
});