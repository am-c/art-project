// slider

window.Slider = function(container_div, callback, style_prefix, default_value) {
    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "0";
    container.style.position = "relative";
    container.classList.add("slider_container");
    if (style_prefix)
        container.classList.add(style_prefix + "slider_container");

    var left_gutter = document.createElement("div");
    left_gutter.classList.add("slider_left_gutter");


    var right_gutter = document.createElement("div");
    right_gutter.classList.add("slider_right_gutter");

    var knob_container = document.createElement("div");
    knob_container.style.width = "0";
    knob_container.style.height = "0";
    knob_container.style.top = "0"
    knob_container.style.position = "absolute";

    var knob = document.createElement("div");
    knob.classList.add("slider_knob");
    if (style_prefix)
        knob.classList.add(style_prefix + "slider_knob");

    knob.onmousedown = mouse_down;

    container_div.appendChild(container);
    container.appendChild(left_gutter);
    container.appendChild(right_gutter);
    container.appendChild(knob_container);
    knob_container.appendChild(knob);


    this.dragged = false;
    let self = this;

    var percentage = default_value === undefined ? 0.5 : default_value;

    layout();
    callback(percentage);

    this.set_value = function(p) {
        percentage = p;
        layout();
    }

    this.knob_div = function() {
        return knob;
    }

    function layout() {
        var width = container.getBoundingClientRect().width;

        left_gutter.style.width = width * percentage + "px";
        left_gutter.style.left = "0";

        right_gutter.style.width = (width * (1.0 - percentage)) + "px";
        right_gutter.style.left = width * percentage + "px";

        knob_container.style.left = (width * percentage) + "px"
    }

    var selection_offset;

    var move_handler;

    function mouse_down(e) {

        if (window.bc_touch_down_state)
            return false;

        e == e || window.event;
        var knob_rect = knob_container.getBoundingClientRect();
        selection_offset = e.clientX - knob_rect.left - knob_rect.width / 2;

        window.addEventListener("mousemove", mouse_move, false);
        window.addEventListener("mouseup", mouse_up, false);

        window.addEventListener("touchmove", move_handler, false);
        window.addEventListener("touchend", mouse_up, false);
        window.addEventListener("touchcancel", mouse_up, false);

        self.dragged = true;

        if (e.preventDefault)
            e.preventDefault();
        return true;
    }

    function mouse_move(e) {
        var container_rect = container.getBoundingClientRect();
        var x = e.clientX - selection_offset - container_rect.left;

        var p = Math.max(0, Math.min(1.0, x / container_rect.width));

        if (percentage != p) {
            percentage = p;
            layout();
            callback(p);
        }

        return true;
    }

    function mouse_up(e) {
        self.dragged = false;

        window.removeEventListener("mousemove", mouse_move, false);
        window.removeEventListener("mouseup", mouse_up, false);

        window.removeEventListener("touchmove", move_handler, false);
        window.removeEventListener("touchend", mouse_up, false);
        window.removeEventListener("touchcancel", mouse_up, false);
    }

    
}





