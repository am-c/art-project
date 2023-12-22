


let all_drawers = [];

let water_fill_style = "rgb(44 72 81 / 78%)";
let water_stroke_style = "#6591B1";
let container_stroke_style = "#9A9EAA";
let container_inner_stroke_style = "#090204";
let container_outer_stroke_style = "#402909";
let container_top_stroke_style = "#402909";
let container_fill_style = "rgba(0,0,0,0.028)";


let buoy_fill_style = "#2d4a53";
let buoy_stroke_style = "#2d4a53";


(function () {
    let scale = window.devicePixelRatio || 1;
    scale = scale > 1.75 ? 2 : 1;

    class Drawer {
        constructor(container, mode) {

            let self = this;

            all_drawers.push(self);

            let wrapper = document.createElement("div");
            wrapper.classList.add("canvas_container");
            wrapper.classList.add("non_selectable");

            let canvas = document.createElement("canvas");
            canvas.classList.add("non_selectable");
            canvas.style.position = "absolute";
            canvas.style.top = "0";
            canvas.style.left = "0";

            wrapper.appendChild(canvas);
            container.appendChild(wrapper);

            this.paused = true;
            this.requested_repaint = false;

            let simulated = mode === "slide";

            let width, height;

            function request_repaint() {
                if (self.paused && !self.requested_repaint) {
                    self.requested_repaint = true;
                    window.requestAnimationFrame(function () {
                        self.repaint();
                    });
                }
            }


            let arg0 = 0;

            this.set_arg0 = function (x) { arg0 = x; if (simulated) self.set_paused(false); request_repaint(); };

            let aspect = width / height;

            let proj_w;
            let proj_h;
            let proj;

            this.on_resize = function () {
                let new_width = wrapper.clientWidth;
                let new_height = wrapper.clientHeight;

                if (new_width != width || new_height != height) {

                    width = new_width;
                    height = new_height;

                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.width = width * scale;
                    canvas.height = height * scale;

                    aspect = width / height;

                    proj_w = 15;
                    proj_h = proj_w / aspect;

                    proj = [1 / proj_w, 0, 0, 0,
                        0, 1 / proj_h, 0, 0,
                        0, 0, -0.00015, 0,
                        0, 0, 0, 1];

                    let pad = 5;
                    let size = Math.max(width, height) - pad * 2;
                   // arcball.set_viewport(width / 2 - size / 2 + pad, height / 2 - size / 2 + pad, size, size);

                    request_repaint();
                }
            };


            this.repaint = function (dt) {

                self.requested_repaint = false;

                let ctx = canvas.getContext("2d");

                ctx.resetTransform();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.scale(scale, scale);
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

    
                function draw_arrow(pos, angle, size) {

                    if (size == 0)
                        return;

                    ctx.save();
                    ctx.translate(pos[0], -pos[1]);
                    ctx.rotate(angle);
                    ctx.scale(size, size);


                    ctx.beginPath();
                    ctx.lineTo(0, 0);
                    ctx.lineTo(1.5, 3.5);
                    ctx.lineTo(0.5, 3.5);
                    ctx.lineTo(0.5, 6);
                    ctx.lineTo(-0.5, 6);
                    ctx.lineTo(-0.5, 3.5);
                    ctx.lineTo(-1.5, 3.5);
                    ctx.closePath();
                    ctx.fill();

                    // ctx.strokeStyle = ctx.fillStyle;
                    ctx.lineWidth = Math.min(1.5 / size, 1 / Math.sqrt(size));
                    ctx.stroke();

                    ctx.restore();
                }

        
                    ctx.translate(Math.round(width * 0.5), Math.round(height * 0.5));

                    let w = Math.round(width * 0.5) - 8;
                    let h = w * 2;
                    let wh = h * 0.95 * arg0;

                    ctx.beginPath();

                    ctx.arc(0, 0, w, -1.4, Math.PI + 1.4);


                    ctx.fillStyle = water_fill_style;
                    ctx.fill();

                    ctx.fillStyle = water_stroke_style;
                    ctx.fillRect(-w, -h * 6.5 + h - wh, w * 2, 2);

                    ctx.globalCompositeOperation = "destination-out";

                    ctx.fillRect(-width, -h * 0.5, width * 2, h - wh);

                    ctx.globalCompositeOperation = "destination-in";
                    ctx.fill();

                    ctx.globalCompositeOperation = "source-over";

                   // ctx.lineCap = "butt";

                    ctx.lineWidth = 7.0;
                    ctx.strokeStyle = container_top_stroke_style;
                    ctx.beginPath();
                    ctx.lineTo(-w * Math.cos(1.4), -h * 0.5 - 0.5);
                    ctx.lineTo(+w * Math.cos(1.4), -h * 0.5 - 0.5);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.lineTo(-w * Math.cos(1.4), -h * 0.5 + 5.5);
                    ctx.lineTo(+w * Math.cos(1.4), -h * 0.5 + 5.5);
                    ctx.stroke();

                    ctx.beginPath();

                    ctx.arc(0, 0, w, -1.4, Math.PI + 1.4);

           
                    ctx.fillStyle = container_fill_style;
                    ctx.fill();


                    ctx.lineCap = "square";
                    ctx.lineWidth = 18.0;
                    ctx.strokeStyle = container_outer_stroke_style;
                    ctx.stroke();

                    ctx.lineWidth = 10.0;
                    ctx.strokeStyle = container_inner_stroke_style;
                    ctx.stroke();



                    ctx.fillStyle = "#eee";
                    ctx.strokeStyle = "#777";
                    let n = 60;
                    let r = w - 4;
                    for (let i = 0; i < n; i++) {
                        let a = 2 * Math.PI * i / n;
                        let c = Math.cos(a);
                        let s = Math.sin(a);

                        let p = [s * r, c * r];

                        ctx.fillStyle = buoy_fill_style;
                        ctx.strokeStyle = "#416275";

                        draw_arrow(p, a, width * 0.015 * Math.max(0, -h * 0.5 + wh - p[1]) / h);
                    }

            };

            this.on_resize();

        }
    }
// slider
    document.addEventListener("DOMContentLoaded", function () {

        function make_drawer(name, slider_count, args) {
            let ret = [];

            let drawer = new Drawer(document.getElementById("na_" + name), name);
            ret.push(drawer);

            if (slider_count === undefined)
                slider_count = 0;

            for (let i = 0; i < slider_count; i++) {
                let slider = new Slider(document.getElementById("na_" + name + "_sl" + i), function (x) {

                        drawer.set_arg0(x);
                   
                }, undefined, args ? args[i] : 0.5);
                ret.push(slider);
            }

            return ret;
        }

    
        make_drawer("shapes", 1);
        make_drawer("water_level", 1);
     


    });
})();


