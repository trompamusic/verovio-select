console.debug("before");
$(document).ready(function () {
    console.debug("hello!");
    var vrvToolkit = new verovio.toolkit();


    $.ajax({
        url: "Beethoven_WoO80-32-Variationen-c-Moll.mei"
        , dataType: "text"
        , success: function (data) {
            var svg = vrvToolkit.renderData(data, {});
            $("#svg_output").html(svg);
            enable_selectables();
        }
    });
});

function enable_selectables() {
        var dr = new Selectables({
        zone: '#svg_output',
        elements: "g[class='note']",
        selectedClass: 'selected',
    });
}
