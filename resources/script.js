/* Nomad Lisp documentation scripts */

var FRAMES_KEY = "nomad-docs-noframes";

function applyFrames() {
    var noFrames = false;
    try { noFrames = window.localStorage.getItem(FRAMES_KEY) === "1"; } catch (e) {}
    if (noFrames) {
        document.body.className += " noFrames";
    }
}

function setFrames(enabled) {
    try { window.localStorage.setItem(FRAMES_KEY, enabled ? "0" : "1"); } catch (e) {}
    document.body.className = document.body.className.replace(/\s*noFrames/g, "");
    if (!enabled) {
        document.body.className += " noFrames";
    }
}

/* Function summary tabs: 0 shows all rows, n shows rows with data-kind="n". */
function show(type) {
    var rows = document.querySelectorAll("table.memberSummary tr[data-kind]");
    var visible = 0;
    for (var i = 0; i < rows.length; i++) {
        var match = type === 0 || rows[i].getAttribute("data-kind") === String(type);
        rows[i].className = match ? (visible++ % 2 === 0 ? "altColor" : "rowColor") : "hidden";
    }
    var tabs = document.querySelectorAll("table.memberSummary caption > span[id]");
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].className = tabs[j].id === "t" + type ? "activeTableTab" : "tableTab";
    }
}

window.onload = function () {
    var links = document.querySelectorAll(".framesToggle, .noFramesToggle");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function (e) {
            setFrames(this.className === "framesToggle");
            e.preventDefault();
        };
    }
};
