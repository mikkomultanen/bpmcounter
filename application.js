(function() {
    var MAX_SAMPLES = 20;

    var displayNode = document.getElementById("display");
    var buttonNode = document.getElementById("button");

    var averageElapsed = 0;
    var samples = 0;
    var previousDate = new Date(0);

    function tap() {
        var now = new Date();
        var elapsed = now - previousDate;
        if (elapsed > 60000 || (samples > 0 && (elapsed > averageElapsed * 2 || elapsed < averageElapsed / 2))) {
            // reset counter
            samples = 0;
        } else {
            // calculate new average
            if (samples < MAX_SAMPLES) {
                samples++;
            }
            var w = 1 / samples;
            averageElapsed = w * elapsed + (1 - w) * averageElapsed;
        }
        previousDate = now;
        refreshDisplay();
    }

    function refreshDisplay() {
        displayNode.innerHTML = samples > 0 ? Math.round(60000 / averageElapsed) : "";
    }

    function down(event) {
        tap();
        buttonNode.className = "down";
        event.preventDefault();
        event.stopPropagation();
    }

    function up(event) {
        buttonNode.className = "";
        event.preventDefault();
        event.stopPropagation();
    }

    buttonNode.addEventListener('touchstart', down);
    buttonNode.addEventListener('mousedown', down);
    document.addEventListener('keydown', down);
    document.addEventListener('touchend', up);
    document.addEventListener('touchcancel', up);
    document.addEventListener('mouseup', up);
    document.addEventListener('keyup', up);
})();