!(function (t, i) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = i())
        : 'function' == typeof define && define.amd
        ? define([], i)
        : 'object' == typeof exports
        ? (exports.vueSeamlessScroll = i())
        : (t.vueSeamlessScroll = i());
})('undefined' != typeof self ? self : this, function () {
    return (function (t) {
        function i(o) {
            if (e[o]) return e[o].exports;
            var n = (e[o] = { i: o, l: !1, exports: {} });
            return t[o].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
        }
        var e = {};
        return (
            (i.m = t),
            (i.c = e),
            (i.d = function (t, e, o) {
                i.o(t, e) ||
                    Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: o });
            }),
            (i.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return i.d(e, 'a', e), e;
            }),
            (i.o = function (t, i) {
                return Object.prototype.hasOwnProperty.call(t, i);
            }),
            (i.p = ''),
            i((i.s = 1))
        );
    })([
        function (t, i, e) {
            'use strict';
            Object.defineProperty(i, '__esModule', { value: !0 }), e(4)();
            var o = e(5),
                n = e(6);
            i.default = {
                name: 'vue-seamless-scroll',
                data: function () {
                    return {
                        xPos: 0,
                        yPos: 0,
                        delay: 0,
                        copyHtml: '',
                        height: 0,
                        width: 0,
                        realBoxWidth: 0,
                    };
                },
                props: {
                    data: {
                        type: Array,
                        default: function () {
                            return [];
                        },
                    },
                    classOption: {
                        type: Object,
                        default: function () {
                            return {};
                        },
                    },
                },
                computed: {
                    leftSwitchState: function () {
                        return this.xPos < 0;
                    },
                    rightSwitchState: function () {
                        return Math.abs(this.xPos) < this.realBoxWidth - this.width;
                    },
                    leftSwitchClass: function () {
                        return this.leftSwitchState ? '' : this.options.switchDisabledClass;
                    },
                    rightSwitchClass: function () {
                        return this.rightSwitchState ? '' : this.options.switchDisabledClass;
                    },
                    leftSwitch: function () {
                        return {
                            position: 'absolute',
                            margin: this.height / 2 + 'px 0 0 -' + this.options.switchOffset + 'px',
                            transform: 'translate(-100%,-50%)',
                        };
                    },
                    rightSwitch: function () {
                        return {
                            position: 'absolute',
                            margin:
                                this.height / 2 +
                                'px 0 0 ' +
                                (this.width + this.options.switchOffset) +
                                'px',
                            transform: 'translateY(-50%)',
                        };
                    },
                    float: function () {
                        return this.isHorizontal
                            ? { float: 'left', overflow: 'hidden' }
                            : { overflow: 'hidden' };
                    },
                    pos: function () {
                        return {
                            transform: 'translate(' + this.xPos + 'px,' + this.yPos + 'px)',
                            transition: 'all ' + this.ease + ' ' + this.delay + 'ms',
                            overflow: 'hidden',
                        };
                    },
                    defaultOption: function () {
                        return {
                            step: 1,
                            limitMoveNum: 5,
                            hoverStop: !0,
                            direction: 1,
                            openTouch: !0,
                            singleHeight: 0,
                            singleWidth: 0,
                            waitTime: 1e3,
                            switchOffset: 30,
                            autoPlay: !0,
                            navigation: !1,
                            switchSingleStep: 134,
                            switchDelay: 400,
                            switchDisabledClass: 'disabled',
                            isSingleRemUnit: !1,
                        };
                    },
                    options: function () {
                        return n({}, this.defaultOption, this.classOption);
                    },
                    navigation: function () {
                        return this.options.navigation;
                    },
                    autoPlay: function () {
                        return !this.navigation && this.options.autoPlay;
                    },
                    scrollSwitch: function () {
                        return this.data.length >= this.options.limitMoveNum;
                    },
                    hoverStopSwitch: function () {
                        return this.options.hoverStop && this.autoPlay && this.scrollSwitch;
                    },
                    canTouchScroll: function () {
                        return this.options.openTouch;
                    },
                    isHorizontal: function () {
                        return this.options.direction > 1;
                    },
                    baseFontSize: function () {
                        return this.options.isSingleRemUnit
                            ? parseInt(
                                  window.getComputedStyle(document.documentElement, null).fontSize
                              )
                            : 1;
                    },
                    realSingleStopWidth: function () {
                        return this.options.singleWidth * this.baseFontSize;
                    },
                    realSingleStopHeight: function () {
                        return this.options.singleHeight * this.baseFontSize;
                    },
                    step: function () {
                        var t = this.options.step;
                        return (
                            this.isHorizontal
                                ? this.realSingleStopWidth
                                : this.realSingleStopHeight,
                            t
                        );
                    },
                },
                methods: {
                    reset: function () {
                        this._cancle(), this._initMove();
                    },
                    leftSwitchClick: function () {
                        if (this.leftSwitchState)
                            return Math.abs(this.xPos) < this.options.switchSingleStep
                                ? void (this.xPos = 0)
                                : void (this.xPos += this.options.switchSingleStep);
                    },
                    rightSwitchClick: function () {
                        if (this.rightSwitchState)
                            return this.realBoxWidth - this.width + this.xPos <
                                this.options.switchSingleStep
                                ? void (this.xPos = this.width - this.realBoxWidth)
                                : void (this.xPos -= this.options.switchSingleStep);
                    },
                    _cancle: function () {
                        cancelAnimationFrame(this.reqFrame || '');
                    },
                    touchStart: function (t) {
                        var i = this;
                        if (this.canTouchScroll) {
                            var e = void 0,
                                o = t.targetTouches[0],
                                n = this.options,
                                s = n.waitTime,
                                r = n.singleHeight,
                                a = n.singleWidth;
                            (this.startPos = { x: o.pageX, y: o.pageY }),
                                (this.startPosY = this.yPos),
                                (this.startPosX = this.xPos),
                                r && a
                                    ? (e && clearTimeout(e),
                                      (e = setTimeout(function () {
                                          i._cancle();
                                      }, s + 20)))
                                    : this._cancle();
                        }
                    },
                    touchMove: function (t) {
                        if (
                            !(
                                !this.canTouchScroll ||
                                t.targetTouches.length > 1 ||
                                (t.scale && 1 !== t.scale)
                            )
                        ) {
                            var i = t.targetTouches[0],
                                e = this.options.direction;
                            (this.endPos = {
                                x: i.pageX - this.startPos.x,
                                y: i.pageY - this.startPos.y,
                            }),
                                event.preventDefault();
                            var o = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0;
                            1 === o && e < 2
                                ? (this.yPos = this.startPosY + this.endPos.y)
                                : 0 === o && e > 1 && (this.xPos = this.startPosX + this.endPos.x);
                        }
                    },
                    touchEnd: function () {
                        var t = this;
                        if (this.canTouchScroll) {
                            var i = void 0,
                                e = this.options.direction;
                            if (((this.delay = 50), 1 === e)) this.yPos > 0 && (this.yPos = 0);
                            else if (0 === e) {
                                var o = (this.realBoxHeight / 2) * -1;
                                this.yPos < o && (this.yPos = o);
                            } else if (2 === e) this.xPos > 0 && (this.xPos = 0);
                            else if (3 === e) {
                                var n = -1 * this.realBoxWidth;
                                this.xPos < n && (this.xPos = n);
                            }
                            i && clearTimeout(i),
                                (i = setTimeout(function () {
                                    (t.delay = 0), t._move();
                                }, this.delay));
                        }
                    },
                    enter: function () {
                        this.hoverStopSwitch && this._stopMove();
                    },
                    leave: function () {
                        this.hoverStopSwitch && this._startMove();
                    },
                    _move: function () {
                        this.isHover ||
                            (this._cancle(),
                            (this.reqFrame = requestAnimationFrame(
                                function () {
                                    var t = this,
                                        i = this.realBoxHeight / 2,
                                        e = this.realBoxWidth / 2,
                                        o = this.options,
                                        n = o.direction,
                                        s = o.waitTime,
                                        r = this.step;
                                    1 === n
                                        ? (Math.abs(this.yPos) >= i &&
                                              (this.$emit('ScrollEnd'), (this.yPos = 0)),
                                          (this.yPos -= r))
                                        : 0 === n
                                        ? (this.yPos >= 0 &&
                                              (this.$emit('ScrollEnd'), (this.yPos = -1 * i)),
                                          (this.yPos += r))
                                        : 2 === n
                                        ? (Math.abs(this.xPos) >= e &&
                                              (this.$emit('ScrollEnd'), (this.xPos = 0)),
                                          (this.xPos -= r))
                                        : 3 === n &&
                                          (this.xPos >= 0 &&
                                              (this.$emit('ScrollEnd'), (this.xPos = -1 * e)),
                                          (this.xPos += r)),
                                        this.singleWaitTime && clearTimeout(this.singleWaitTime),
                                        this.realSingleStopHeight
                                            ? Math.abs(this.yPos) % this.realSingleStopHeight < r
                                                ? (this.singleWaitTime = setTimeout(function () {
                                                      t._move();
                                                  }, s))
                                                : this._move()
                                            : this.realSingleStopWidth &&
                                              Math.abs(this.xPos) % this.realSingleStopWidth < r
                                            ? (this.singleWaitTime = setTimeout(function () {
                                                  t._move();
                                              }, s))
                                            : this._move();
                                }.bind(this)
                            )));
                    },
                    _initMove: function () {
                        var t = this;
                        this.$nextTick(function () {
                            var i = t.options.switchDelay,
                                e = t.autoPlay,
                                o = t.isHorizontal;
                            if ((t._dataWarm(t.data), (t.copyHtml = ''), o)) {
                                (t.height = t.$refs.wrap.offsetHeight),
                                    (t.width = t.$refs.wrap.offsetWidth);
                                var n = t.$refs.slotList.offsetWidth;
                                e && (n = 2 * n + 1),
                                    (t.$refs.realBox.style.width = n + 'px'),
                                    (t.realBoxWidth = n);
                            }
                            if (!e) return (t.ease = 'linear'), void (t.delay = i);
                            if (((t.ease = 'ease-in'), (t.delay = 0), t.scrollSwitch)) {
                                (t.copyHtml = t.$refs.slotList.innerHTML),
                                    setTimeout(function () {
                                        (t.realBoxHeight = t.$refs.realBox.offsetHeight), t._move();
                                    }, 0);
                            } else t._cancle(), (t.yPos = t.xPos = 0);
                        });
                    },
                    _dataWarm: function (t) {
                        t.length;
                    },
                    _startMove: function () {
                        (this.isHover = !1), this._move();
                    },
                    _stopMove: function () {
                        (this.isHover = !0),
                            this.singleWaitTime && clearTimeout(this.singleWaitTime),
                            this._cancle();
                    },
                },
                mounted: function () {
                    this._initMove();
                },
                watch: {
                    data: function (t, i) {
                        this._dataWarm(t), o(t, i) || this.reset();
                    },
                    autoPlay: function (t) {
                        t ? this.reset() : this._stopMove();
                    },
                },
                beforeCreate: function () {
                    (this.reqFrame = null),
                        (this.singleWaitTime = null),
                        (this.isHover = !1),
                        (this.ease = 'ease-in');
                },
                beforeDestroy: function () {
                    this._cancle(), clearTimeout(this.singleWaitTime);
                },
            };
        },
        function (t, i, e) {
            'use strict';
            Object.defineProperty(i, '__esModule', { value: !0 });
            var o = e(2),
                n = (function (t) {
                    return t && t.__esModule ? t : { default: t };
                })(o);
            (n.default.install = function (t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                t.component(i.componentName || n.default.name, n.default);
            }),
                'undefined' != typeof window &&
                    window.Vue &&
                    Vue.component(n.default.name, n.default),
                (i.default = n.default);
        },
        function (t, i, e) {
            'use strict';
            Object.defineProperty(i, '__esModule', { value: !0 });
            var o = e(0),
                n = e.n(o);
            for (var s in o)
                'default' !== s &&
                    (function (t) {
                        e.d(i, t, function () {
                            return o[t];
                        });
                    })(s);
            var r = e(7),
                a = e(3),
                h = a(n.a, r.a, !1, null, null, null);
            i.default = h.exports;
        },
        function (t, i) {
            t.exports = function (t, i, e, o, n, s) {
                var r,
                    a = (t = t || {}),
                    h = typeof t.default;
                ('object' !== h && 'function' !== h) || ((r = t), (a = t.default));
                var l = 'function' == typeof a ? a.options : a;
                i &&
                    ((l.render = i.render),
                    (l.staticRenderFns = i.staticRenderFns),
                    (l._compiled = !0)),
                    e && (l.functional = !0),
                    n && (l._scopeId = n);
                var c;
                if (
                    (s
                        ? ((c = function (t) {
                              (t =
                                  t ||
                                  (this.$vnode && this.$vnode.ssrContext) ||
                                  (this.parent &&
                                      this.parent.$vnode &&
                                      this.parent.$vnode.ssrContext)),
                                  t ||
                                      'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                                      (t = __VUE_SSR_CONTEXT__),
                                  o && o.call(this, t),
                                  t && t._registeredComponents && t._registeredComponents.add(s);
                          }),
                          (l._ssrRegister = c))
                        : o && (c = o),
                    c)
                ) {
                    var u = l.functional,
                        f = u ? l.render : l.beforeCreate;
                    u
                        ? ((l._injectStyles = c),
                          (l.render = function (t, i) {
                              return c.call(i), f(t, i);
                          }))
                        : (l.beforeCreate = f ? [].concat(f, c) : [c]);
                }
                return { esModule: r, exports: a, options: l };
            };
        },
        function (t, i) {
            var e = function () {
                (window.cancelAnimationFrame = (function () {
                    return (
                        window.cancelAnimationFrame ||
                        window.webkitCancelAnimationFrame ||
                        window.mozCancelAnimationFrame ||
                        window.oCancelAnimationFrame ||
                        window.msCancelAnimationFrame ||
                        function (t) {
                            return window.clearTimeout(t);
                        }
                    );
                })()),
                    (window.requestAnimationFrame = (function () {
                        return (
                            window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function (t) {
                                return window.setTimeout(t, 1e3 / 60);
                            }
                        );
                    })());
            };
            t.exports = e;
        },
        function (t, i) {
            var e = function (t, i) {
                if (t === i) return !0;
                if (t.length !== i.length) return !1;
                for (var e = 0; e < t.length; ++e) if (t[e] !== i[e]) return !1;
                return !0;
            };
            t.exports = e;
        },
        function (t, i) {
            function e() {
                Array.isArray ||
                    (Array.isArray = function (t) {
                        return '[object Array]' === Object.prototype.toString.call(t);
                    });
                var t = void 0,
                    i = void 0,
                    n = void 0,
                    s = void 0,
                    r = void 0,
                    a = void 0,
                    h = 1,
                    l = arguments[0] || {},
                    c = !1,
                    u = arguments.length;
                if (
                    ('boolean' == typeof l && ((c = l), (l = arguments[1] || {}), h++),
                    'object' !== (void 0 === l ? 'undefined' : o(l)) &&
                        'function' != typeof l &&
                        (l = {}),
                    h === u)
                )
                    return l;
                for (; h < u; h++)
                    if (null != (i = arguments[h]))
                        for (t in i)
                            (n = l[t]),
                                (s = i[t]),
                                (r = Array.isArray(s)),
                                c && s && ('object' === (void 0 === s ? 'undefined' : o(s)) || r)
                                    ? (r
                                          ? ((r = !1), (a = n && Array.isArray(n) ? n : []))
                                          : (a =
                                                n &&
                                                'object' === (void 0 === n ? 'undefined' : o(n))
                                                    ? n
                                                    : {}),
                                      (l[t] = e(c, a, s)))
                                    : void 0 !== s && (l[t] = s);
                return l;
            }
            var o =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      };
            t.exports = e;
        },
        function (t, i, e) {
            'use strict';
            var o = function () {
                    var t = this,
                        i = t.$createElement,
                        e = t._self._c || i;
                    return e('div', { ref: 'wrap' }, [
                        t.navigation
                            ? e(
                                  'div',
                                  {
                                      class: t.leftSwitchClass,
                                      style: t.leftSwitch,
                                      on: { click: t.leftSwitchClick },
                                  },
                                  [t._t('left-switch')],
                                  2
                              )
                            : t._e(),
                        t._v(' '),
                        t.navigation
                            ? e(
                                  'div',
                                  {
                                      class: t.rightSwitchClass,
                                      style: t.rightSwitch,
                                      on: { click: t.rightSwitchClick },
                                  },
                                  [t._t('right-switch')],
                                  2
                              )
                            : t._e(),
                        t._v(' '),
                        e(
                            'div',
                            {
                                ref: 'realBox',
                                style: t.pos,
                                on: {
                                    mouseenter: t.enter,
                                    mouseleave: t.leave,
                                    touchstart: t.touchStart,
                                    touchmove: t.touchMove,
                                    touchend: t.touchEnd,
                                },
                            },
                            [
                                e('div', { ref: 'slotList', style: t.float }, [t._t('default')], 2),
                                t._v(' '),
                                e('div', {
                                    style: t.float,
                                    domProps: { innerHTML: t._s(t.copyHtml) },
                                }),
                            ]
                        ),
                    ]);
                },
                n = [],
                s = { render: o, staticRenderFns: n };
            i.a = s;
        },
    ]).default;
});
