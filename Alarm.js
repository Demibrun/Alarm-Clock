function setAlarm() {
    const alarmTimeInput = document.getElementById("alarmTime");
    const alarmTime = alarmTimeInput.value;
    const alarmSoundInput = document.getElementById("alarmSound");
    const alarmAudio = document.getElementById("alarmAudio");

    if (alarmTime && alarmSoundInput.files.length > 0) {
        const currentTime = new Date();
        const alarmTimeArray = alarmTime.split(":");
        const alarmTimeDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), alarmTimeArray[0], alarmTimeArray[1], 0);

        const timeDiff = alarmTimeDate - currentTime;

        if (timeDiff > 0) {
            const selectedFile = alarmSoundInput.files[0];
            const objectURL = URL.createObjectURL(selectedFile);
            alarmAudio.src = objectURL;

            setTimeout(() => {
                document.getElementById("statusText").textContent = "Alarm!";
                alarmAudio.play();
            }, timeDiff);
            document.getElementById("statusText").textContent = "Alarm set for " + alarmTime;
        } else {
            document.getElementById("statusText").textContent = "Invalid alarm time";
        }
    } else {
        document.getElementById("statusText").textContent = "Please set a valid alarm time and select a sound file";
    }
}

function updateTime() {
    const timeElement = document.getElementById("time");
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    timeElement.textContent = formattedTime;
}

function snoozeAlarm() {
    const snoozeDuration = parseInt(document.getElementById("snoozeDuration").value, 10) * 60000;
    const currentTime = new Date();
    const newAlarmTime = new Date(currentTime.getTime() + snoozeDuration);

    const timeDiff = newAlarmTime - currentTime;

    if (timeDiff > 0) {
        setTimeout(() => {
            document.getElementById("statusText").textContent = "Alarm!";
            document.getElementById("alarmAudio").play();
        }, timeDiff);
        document.getElementById("statusText").textContent = "Snoozed for " + (snoozeDuration / 60000) + " minutes";
    } else {
        document.getElementById("statusText").textContent = "Invalid snooze duration";
    }
}

setInterval(updateTime, 1000);
updateTime();
