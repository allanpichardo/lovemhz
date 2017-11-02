var Timer = function () {
    var start, time, duration, callback, timer = this;

    function tick () {
        if(start===false) return;
        time = time + now() - start;
        timer.stop();
        callback.call(timer, timer.time());
        timer.start();
    }

    function now () {
        return window.performance ? window.performance.now() : Date.now();
    }

    this.init = function (callback, duration /* milliseconds */, autostart) {
        timer.callback(callback);
        timer.duration(duration);
        timer.reset();
        if(autostart) timer.start();
    };

    this.start = function (reset /* true to restart */) {
        if(reset) timer.reset(true);
        if(!callback || start || time > duration) return;
        start = now();
        requestAnimationFrame(tick);
    };

    this.stop = function () {
        start = false;
    };

    this.reset = function (stop) {
        if(stop) timer.stop();
        time = 0;
    };

    this.duration = function (ms) {
        if(ms) duration = ms;
        return duration;
    };

    this.callback = function (fn) {
        if(typeof fn === "function") callback = fn;
        return fn;
    };

    this.time = function (elapsed /* true for elapsed instead of remaining */) {
        return !!elapsed || !duration  ? time : Math.max(0, duration - time);
    };

    if(arguments.length) this.init.apply(this, arguments);
};
module.exports = Timer;