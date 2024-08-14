document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

   
    if (!day || !month || !year) {
        alert("Please fill in all fields.");
        return;
    }

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        alert("Invalid day or month.");
        return;
    }

    if (inputDate > currentDate) {
        alert("The date cannot be in the future.");
        return;
    }

    if (isNaN(inputDate.getTime())) {
        alert("Invalid date.");
        return;
    }

    
    let years = currentDate.getFullYear() - inputDate.getFullYear();
    let months = currentDate.getMonth() - inputDate.getMonth();
    let days = currentDate.getDate() - inputDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(year, month, 0).getDate();  // Get days in the previous month
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    
    animateValue('years', 0, years, 1000);
    animateValue('months', 0, months, 1000);
    animateValue('days', 0, days, 1000);
});


function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = currentTime - startTime;
        const currentValue = Math.min(Math.round((progress / duration) * (end - start) + start), end);
        obj.textContent = currentValue;
        if (progress < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
