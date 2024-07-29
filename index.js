var currentIndex = 1;
var audio;
var updateInterval;

$("#ctrl").click(function() {
    playpause();
});

function playpause() {
    if ($("#ctrl").hasClass("fa-pause")) {
        $("#ctrl").removeClass("fa-pause").addClass("fa-play");
        pausesong();
    } else {
        $("#ctrl").removeClass("fa-play").addClass("fa-pause");
        playsong(currentIndex);
    }
}

function playsong(index) {
    var songUrl = "songs/" + index + ".mp3";

    if (audio && audio.src === songUrl) {
        audio.play();
    } else {
        if (audio) {
            audio.pause();
        }
        audio = new Audio(songUrl);

        audio.onloadedmetadata = function() {
            $("#progress").attr("max", audio.duration);
        };

        audio.onended = function() {
            if (currentIndex < 7) {
                currentIndex++;
            } else {
                currentIndex = 1;
            }
            $("#cvr").attr("src", "images/" + currentIndex + ".jpg");
            updateSongInfo();
            playsong(currentIndex);
        };

        audio.onerror = function() {
            console.error("Error loading audio: " + songUrl);
        };

        audio.play().catch(function(error) {
            console.error("Error playing audio: " + error);
        });
    }

    if (updateInterval) {
        clearInterval(updateInterval);
    }

    updateInterval = setInterval(() => {
        if (audio) {
            $("#progress").val(audio.currentTime);
        }
    }, 500);
}

function pausesong() {
    if (audio) {
        audio.pause();
    }
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}

$("#forward").click(function() {
    if (currentIndex < 7) {
        currentIndex++;
    } else {
        currentIndex = 1;
    }

    $("#cvr").attr("src", "images/" + currentIndex + ".jpg");
    updateSongInfo();

    playsong(currentIndex);
});

$("#backward").click(function() {
    if (currentIndex > 1) {
        currentIndex--;
    } else {
        currentIndex = 7;
    }

    $("#cvr").attr("src", "images/" + currentIndex + ".jpg");
    updateSongInfo();

    playsong(currentIndex);
});

function updateSongInfo() {
    switch (currentIndex) {
        case 1:
            $("#songName").text("Counting Stars");
            $("#rapper").text("One Republic");
            break;
        case 2:
            $("#songName").text("Destiny");
            $("#rapper").text("NEFFEX");
            break;
        case 3:
            $("#songName").text("comethru");
            $("#rapper").text("Jeremy Zucker");
            break;
        case 4:
            $("#songName").text("Adonis Interlude");
            $("#rapper").text("Dreamville,J.Cole");
            break;
        case 5:
            $("#songName").text("One Dance");
            $("#rapper").text("Drake,Wizkid,Kyla");
            break;
        case 6:
            $("#songName").text("Sunflower-Spider-Man");
            $("#rapper").text("Post Malone,Swae Lee");
            break;
        case 7:
            $("#songName").text("Grateful");
            $("#rapper").text("NEFFEX");
            break;
        default:
            break;
    }
}

$("#progress").on("input", function() {
    if (audio) {
        audio.currentTime = this.value;
    }
});