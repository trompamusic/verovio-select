$(document).ready(function () {
    var vrvToolkit = new verovio.toolkit();


    $.ajax({
        url: "Beethoven_WoO80-32-Variationen-c-Moll.mei"
        , dataType: "text"
        , success: function (data) {
            var svg = vrvToolkit.renderData(data, {});
            $("#svg_output").html(svg);
            enable_dragselect();
        }
    });
});

function enable_dragselect() {
    new DragSelect({
        selectables: document.querySelectorAll("g[class='note']"),
        area: document.getElementById('svg_output'),
        selectedClass: 'selected',
        onDragStartBegin: () => {
            document.body.classList.add('s-noselect');
        },
        callback: (elements) => {
            document.body.classList.remove('s-noselect');
        }
    });
}
