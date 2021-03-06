var FLIPBOOK = FLIPBOOK || {};
FLIPBOOK.Book = function(h, c) {
    var b = this,
        e, a = c.main;
    this.main = c.main;
    this.hasTouch = a.hasTouch;
    this.perspective = a.perspective;
    this.transform = a.transform;
    this.transformOrigin = a.transformOrigin;
    this.transformStyle = a.transformStyle;
    this.transition = a.transition;
    this.transitionDuration = a.transitionDuration;
    this.transitionDelay = a.transitionDelay;
    this.transitionProperty = a.transitionProperty;
    this.backfaceVisibility = a.backfaceVisibility;
    this.wrapper = typeof h == "object" ? h : document.getElementById(h);
    jQuery(this.wrapper).addClass("flipbook-book");
    this.options = {
        onTurnPageComplete: null,
        flipType: "2d",
        shadow1opacity: 0.7,
        shadow2opacity: 0.7
    };
    for (e in c) {
        this.options[e] = c[e]
    }
    this.pages = [];
    this.pageWidth = this.options.pageWidth;
    this.pageHeight = this.options.pageHeight;
    this.animating = false;
    this.rightIndex = 0;
    this.onTurnPageComplete = this.options.onTurnPageComplete;
    var g = this.wrapper.style;
    g.width = String(2 * this.pageWidth) + "px";
    g.height = String(this.pageHeight) + "px";
    this.flipType = this.options.flipType;
    this.shadow1opacity = this.options.shadow1opacity;
    this.shadow2opacity = this.options.shadow2opacity;
    var f, d;
    this.shadowL = document.createElement("div");
    jQuery(this.shadowL).addClass("flipbook-shadowLeft").css("width", String(this.pageWidth) + "px").css("height", String(this.pageHeight) + "px");
    this.wrapper.appendChild(this.shadowL);
    this.shadowLVisible = true;
    this.shadowR = document.createElement("div");
    jQuery(this.shadowR).addClass("flipbook-shadowRight").css("width", String(this.pageWidth) + "px").css("height", String(this.pageHeight) + "px");
    this.wrapper.appendChild(this.shadowR);
    this.shadowRVisible = true;
    this.shadowRight();
    for (e = 0; e < b.options.pages.length; e++) {
        this.addPage(e);
        jQuery(this.pages[e].wrapper).attr("title", e + 1).bind(b.main.CLICK_EV, function(l) {
            var p, i, n, o, m, k;
            p = b.main.scroll.x;
            i = b.xOnMouseDown;
            n = b.main.scroll.y;
            o = b.yOnMouseDown;
            m = b.zoomOnMouseUp;
            k = b.zoomOnMouseDown;

            function q(s, r) {
                return (Math.abs(s - r) < 10)
            }
            if (b.main.scroll.moved || b.main.scroll.animating || b.main.scroll.zoomed || (b.zoomOnMouseDown != b.main.scroll.scale)) {
                return
            }
            if (l.target.className == "flipbook-page-link") {
                return
            }
            if (q(p, i) && q(n, o) && m === k) {
                var j = Number(jQuery(this).attr("title")) - 1;
                if (j == b.rightIndex) {
                    b.nextPage()
                } else {
                    b.prevPage()
                }
            }
        }).bind(b.main.START_EV, function(i) {
            b.zoomOnMouseDown = b.main.scroll.scale;
            b.xOnMouseDown = b.main.scroll.x;
            b.yOnMouseDown = b.main.scroll.y
        }).bind(b.main.END_EV, function(i) {
            b.zoomOnMouseUp = b.main.scroll.scale;
            b.xOnMouseUp = b.main.scroll.x;
            b.yOnMouseUp = b.main.scroll.y
        })
    }
    this.pages[0].loadPage();
    this.pages[1].loadPage();
    if (this.pages.length > 2) {
        this.pages[2].loadPage()
    }
    this.updateVisiblePages();
    jQuery(this.wrapper).on("DOMMouseScroll", function(i) {
        i.preventDefault()
    });
    jQuery(this.wrapper).on("mousewheel", function(i) {
        i.preventDefault()
    })
};
FLIPBOOK.Book.prototype.constructor = FLIPBOOK.Book;
FLIPBOOK.Book.prototype = {
    addPage: function(a) {
        var b = new FLIPBOOK.Page(this.options.pages[a], this.pageWidth, this.pageHeight, this.pages.length, this);
        this.wrapper.appendChild(b.wrapper);
        this.pages.push(b)
    },
    goToPage: function(b) {
        if (b < 0 || b > this.pages.length) {
            return
        }
        if (this.animating) {
            return
        }
        if (isNaN(b)) {
            return
        }
        this.goingToPage = b;
        b = (b % 2 == 1) ? b + 1 : b;
        if (b == 0) {
            this.rightIndex == this.pages.length ? this.shadowNone() : this.shadowRight()
        } else {
            if (b == this.pages.length) {
                this.rightIndex == 0 ? this.shadowNone() : this.shadowLeft()
            }
        }
        var c, e, d, a;
        if (b < this.rightIndex) {
            c = this.pages[this.rightIndex - 1];
            e = this.pages[b];
            if (b > 0) {
                d = this.pages[b - 1];
                if (this.flipType == "2d") {
                    d.expand()
                }
                d.show()
            }
            if (this.flipType == "2d") {
                e.contract()
            }
            this.animatePages(c, e)
        } else {
            if (b > this.rightIndex) {
                c = this.pages[b - 1];
                e = this.pages[this.rightIndex];
                if (b < this.pages.length) {
                    a = this.pages[b];
                    if (this.flipType == "2d") {
                        a.expand()
                    }
                    a.show()
                }
                if (this.flipType == "2d") {
                    c.contract()
                }
                this.animatePages(e, c)
            }
        }
        this.rightIndex = b
    },
    animatePages: function(h, b) {
        this.animating = true;
        var a = this,
            g = a.options.time1,
            e = a.options.time2,
            d = a.options.transition1,
            c = a.options.transition2;
        h.show();
        jQuery(h.wrapper).css(a.transform, "rotateY(0deg)");
        if (this.flipType == "3d") {
            b.show();
            jQuery(b.wrapper).css("visibility", "hidden");
            jQuery(h.wrapper).css("visibility", "visible");
            jQuery(h.wrapper).css("text-indent", "0px");
            jQuery(h.wrapper).css(a.transform, "rotateY(0deg)");
            var f = (h.index < b.index) ? "-90" : "90";
            jQuery(h.overlay).animate({
                opacity: a.shadow1opacity
            }, {
                duration: g,
                easing: d
            });
            jQuery(h.wrapper).animate({
                textIndent: f
            }, {
                step: function(i, j) {
                    jQuery(this).css(a.transform, "rotateY(" + Math.round(i) + "deg)")
                },
                duration: g,
                easing: d,
                complete: function() {
                    h.hide();
                    h.hideVisibility();
                    jQuery(b.wrapper).css("visibility", "visible");
                    jQuery(b.overlay).css("opacity", a.shadow1opacity);
                    jQuery(b.overlay).animate({
                        opacity: 0
                    }, {
                        duration: e,
                        easing: c
                    });
                    jQuery(b.wrapper).css(a.transform, "rotateY(" + f + "deg)");
                    jQuery(b.wrapper).css("text-indent", String(-f) + "px");
                    jQuery(b.wrapper).animate({
                        textIndent: 0
                    }, {
                        step: function(i, j) {
                            jQuery(this).css(a.transform, "rotateY(" + Math.round(i) + "deg)")
                        },
                        complete: function() {
                            jQuery(h.wrapper).css(a.transform, "rotateY(0deg)");
                            jQuery(h.wrapper).css("visibility", "visible");
                            jQuery(b.wrapper).css(a.transform, "rotateY(0deg)");
                            jQuery(b.wrapper).css("visibility", "visible")
                        },
                        duration: e,
                        easing: c
                    })
                }
            })
        } else {
            jQuery(h.wrapper).animate({
                width: 0
            }, g, d, function() {
                b.show();
                jQuery(b.wrapper).animate({
                    width: b.width
                }, e, c)
            })
        }
        setTimeout(function() {
            if (a.onTurnPageComplete) {
                a.onTurnPageComplete.call(a)
            }
            a.main.updateCurrentPage();
            a.animating = false;
            a.updateVisiblePages();
            h.overlay.style.opacity = "0";
            jQuery(h.wrapper).css(a.transform, "rotateY(0deg)");
            jQuery(b.wrapper).css(a.transform, "rotateY(0deg)")
        }, Number(g) + Number(e))
    },
    updateVisiblePages: function() {
        if (this.animating) {
            return
        }
        for (var c = 0; c < this.pages.length; c++) {
            if ((c < (this.rightIndex - 1)) || (c > (this.rightIndex))) {
                if (this.flipType == "2d") {
                    this.pages[c].contract()
                }
                this.pages[c].hide()
            } else {
                if (this.flipType == "2d") {
                    this.pages[c].expand()
                }
                this.pages[c].show()
            }
            if (this.rightIndex == 0) {
                if (this.flipType == "2d") {
                    this.pages[1].contract()
                }
                this.pages[1].hide()
            }
        }
        var b = this.rightIndex,
            a = this.pages;
        if (b > 2) {
            a[b - 3].loadPage()
        }
        if (b > 0) {
            a[b - 2].loadPage()
        }
        if (b > 0) {
            a[b - 1].loadPage()
        }
        if (b < a.length) {
            a[b].loadPage()
        }
        if (b < a.length) {
            a[b + 1].loadPage()
        }
        if (b < a.length - 2) {
            a[b + 2].loadPage()
        }
        if (b > 0 && b < this.pages.length) {
            this.shadowBoth()
        } else {
            if (b == 0) {
                this.shadowRight()
            } else {
                this.shadowLeft()
            }
        }
    },
    nextPage: function() {
        if (this.rightIndex == this.pages.length || this.animating) {
            return
        }
        this.goToPage(this.rightIndex + 2)
    },
    prevPage: function() {
        if (this.rightIndex == 0 || this.animating) {
            return
        }
        this.goToPage(this.rightIndex - 2)
    },
    shadowRight: function() {
        if (this.shadowLVisible) {
            this.shadowLVisible = false;
            this.shadowL.style.display = "none"
        }
        if (!this.shadowRVisible) {
            this.shadowRVisible = true;
            this.shadowR.style.display = "block"
        }
    },
    shadowLeft: function() {
        if (this.shadowRVisible) {
            this.shadowRVisible = false;
            this.shadowR.style.display = "none"
        }
        if (!this.shadowLVisible) {
            this.shadowLVisible = true;
            this.shadowL.style.display = "block"
        }
    },
    shadowBoth: function() {
        if (!this.shadowRVisible) {
            this.shadowRVisible = true;
            this.shadowR.style.display = "block"
        }
        if (!this.shadowLVisible) {
            this.shadowLVisible = true;
            this.shadowL.style.display = "block"
        }
    },
    shadowNone: function() {
        if (this.shadowRVisible) {
            this.shadowRVisible = false;
            this.shadowR.style.display = "none"
        }
        if (this.shadowLVisible) {
            this.shadowLVisible = false;
            this.shadowL.style.display = "none"
        }
    }
};
Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function() {
        try {
            return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
        } catch (a) {
            return false
        }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var a = document.createElement("div");
        a.id = "webgl-error-message";
        a.style.fontFamily = "monospace";
        a.style.fontSize = "13px";
        a.style.fontWeight = "normal";
        a.style.textAlign = "center";
        a.style.background = "#fff";
        a.style.color = "#000";
        a.style.padding = "1.5em";
        a.style.width = "400px";
        a.style.margin = "5em auto 0";
        if (!this.webgl) {
            a.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")
        }
        return a
    },
    addGetWebGLMessage: function(c) {
        var b, d, a;
        c = c || {};
        b = c.parent !== undefined ? c.parent : document.body;
        d = c.id !== undefined ? c.id : "oldie";
        a = Detector.getWebGLErrorMessage();
        a.id = d;
        b.appendChild(a)
    }
};
(function(i, E) {
    var u = Math,
        n = E.createElement("div").style,
        z = (function() {
            var H = "t,webkitT,MozT,msT,OT".split(","),
                G, F = 0,
                m = H.length;
            for (; F < m; F++) {
                G = H[F] + "ransform";
                if (G in n) {
                    return H[F].substr(0, H[F].length - 1)
                }
            }
            return false
        })(),
        D = z ? "-" + z.toLowerCase() + "-" : "",
        l = s("transform"),
        x = s("transitionProperty"),
        k = s("transitionDuration"),
        o = s("transformOrigin"),
        B = s("transitionTimingFunction"),
        e = s("transitionDelay"),
        A = (/android/gi).test(navigator.appVersion),
        h = (/iphone|ipad/gi).test(navigator.appVersion),
        r = (/hp-tablet/gi).test(navigator.appVersion),
        j = s("perspective") in n,
        y = "ontouchstart" in i && !r,
        d = z !== false,
        f = s("transition") in n,
        g = "onorientationchange" in i ? "orientationchange" : "resize",
        b = y ? "touchstart" : "mousedown",
        t = y ? "touchmove" : "mousemove",
        c = y ? "touchend" : "mouseup",
        w = y ? "touchcancel" : "mouseup",
        a = (function() {
            if (z === false) {
                return false
            }
            var m = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return m[z]
        })(),
        q = (function() {
            return i.requestAnimationFrame || i.webkitRequestAnimationFrame || i.mozRequestAnimationFrame || i.oRequestAnimationFrame || i.msRequestAnimationFrame || function(m) {
                return setTimeout(m, 1)
            }
        })(),
        p = (function() {
            return i.cancelRequestAnimationFrame || i.webkitCancelAnimationFrame || i.webkitCancelRequestAnimationFrame || i.mozCancelRequestAnimationFrame || i.oCancelRequestAnimationFrame || i.msCancelRequestAnimationFrame || clearTimeout
        })(),
        C = j ? " translateZ(0)" : "",
        v = function(G, m) {
            var H = this,
                F;
            H.wrapper = typeof G == "object" ? G : E.getElementById(G);
            H.wrapper.style.overflow = "hidden";
            H.scroller = H.wrapper.children[0];
            H.options = {
                hScroll: true,
                vScroll: true,
                x: 0,
                y: 0,
                bounce: true,
                bounceLock: false,
                momentum: true,
                lockDirection: true,
                useTransform: true,
                useTransition: false,
                topOffset: 0,
                checkDOMChanges: false,
                handleClick: true,
                hScrollbar: true,
                vScrollbar: true,
                fixedScrollbar: A,
                hideScrollbar: h,
                fadeScrollbar: h && j,
                scrollbarClass: "",
                zoom: false,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: false,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function(I) {
                    I.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null,
                keepInCenterH: false,
                keepInCenterV: false
            };
            for (F in m) {
                H.options[F] = m[F]
            }
            H.x = H.options.x;
            H.y = H.options.y;
            H.options.useTransform = d && H.options.useTransform;
            H.options.hScrollbar = H.options.hScroll && H.options.hScrollbar;
            H.options.vScrollbar = H.options.vScroll && H.options.vScrollbar;
            H.options.zoom = H.options.useTransform && H.options.zoom;
            H.options.useTransition = f && H.options.useTransition;
            H.keepInCenterH = H.options.keepInCenterH;
            H.keepInCenterV = H.options.keepInCenterV;
            if (H.options.zoom && A) {
                C = ""
            }
            H.scroller.style[x] = H.options.useTransform ? D + "transform" : "top left";
            H.scroller.style[k] = "0";
            H.scroller.style[o] = "0 0";
            if (H.options.useTransition) {
                H.scroller.style[B] = "cubic-bezier(0.33,0.66,0.66,1)"
            }
            if (H.options.useTransform) {
                H.scroller.style[l] = "translate(" + H.x + "px," + H.y + "px)" + C
            } else {
                H.scroller.style.cssText += ";position:absolute;top:" + H.y + "px;left:" + H.x + "px"
            }
            if (H.options.useTransition) {
                H.options.fixedScrollbar = true
            }
            H.refresh();
            H._bind(g, i);
            H._bind(b);
            if (!y) {
                if (H.options.wheelAction != "none") {
                    H._bind("DOMMouseScroll");
                    H._bind("mousewheel")
                }
            }
            if (H.options.checkDOMChanges) {
                H.checkDOMTime = setInterval(function() {
                    H._checkDOMChanges()
                }, 500)
            }
        };
    v.prototype = {
        enabled: true,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(F) {
            var m = this;
            switch (F.type) {
                case b:
                    if (!y && F.button !== 0) {
                        return
                    }
                    m._start(F);
                    break;
                case t:
                    m._move(F);
                    break;
                case c:
                case w:
                    m._end(F);
                    break;
                case g:
                    m._resize();
                    break;
                case "DOMMouseScroll":
                case "mousewheel":
                    m._wheel(F);
                    break;
                case a:
                    m._transitionEnd(F);
                    break
            }
        },
        _checkDOMChanges: function() {
            if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
                return
            }
            this.refresh()
        },
        _scrollbar: function(m) {
            var G = this,
                F;
            if (!G[m + "Scrollbar"]) {
                if (G[m + "ScrollbarWrapper"]) {
                    if (d) {
                        G[m + "ScrollbarIndicator"].style[l] = ""
                    }
                    G[m + "ScrollbarWrapper"].parentNode.removeChild(G[m + "ScrollbarWrapper"]);
                    G[m + "ScrollbarWrapper"] = null;
                    G[m + "ScrollbarIndicator"] = null
                }
                return
            }
            if (!G[m + "ScrollbarWrapper"]) {
                F = E.createElement("div");
                if (G.options.scrollbarClass) {
                    F.className = G.options.scrollbarClass + m.toUpperCase()
                } else {
                    F.style.cssText = "position:absolute;z-index:100;" + (m == "h" ? "height:7px;bottom:1px;left:2px;right:" + (G.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (G.hScrollbar ? "7" : "2") + "px;top:2px;right:1px")
                }
                F.style.cssText += ";pointer-events:none;" + D + "transition-property:opacity;" + D + "transition-duration:" + (G.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (G.options.hideScrollbar ? "0" : "1");
                G.wrapper.appendChild(F);
                G[m + "ScrollbarWrapper"] = F;
                F = E.createElement("div");
                if (!G.options.scrollbarClass) {
                    F.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + D + "background-clip:padding-box;" + D + "box-sizing:border-box;" + (m == "h" ? "height:100%" : "width:100%") + ";" + D + "border-radius:3px;border-radius:3px"
                }
                F.style.cssText += ";pointer-events:none;" + D + "transition-property:" + D + "transform;" + D + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + D + "transition-duration:0;" + D + "transform: translate(0,0)" + C;
                if (G.options.useTransition) {
                    F.style.cssText += ";" + D + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"
                }
                G[m + "ScrollbarWrapper"].appendChild(F);
                G[m + "ScrollbarIndicator"] = F
            }
            if (m == "h") {
                G.hScrollbarSize = G.hScrollbarWrapper.clientWidth;
                G.hScrollbarIndicatorSize = u.max(u.round(G.hScrollbarSize * G.hScrollbarSize / G.scrollerW), 8);
                G.hScrollbarIndicator.style.width = G.hScrollbarIndicatorSize + "px";
                G.hScrollbarMaxScroll = G.hScrollbarSize - G.hScrollbarIndicatorSize;
                G.hScrollbarProp = G.hScrollbarMaxScroll / G.maxScrollX
            } else {
                G.vScrollbarSize = G.vScrollbarWrapper.clientHeight;
                G.vScrollbarIndicatorSize = u.max(u.round(G.vScrollbarSize * G.vScrollbarSize / G.scrollerH), 8);
                G.vScrollbarIndicator.style.height = G.vScrollbarIndicatorSize + "px";
                G.vScrollbarMaxScroll = G.vScrollbarSize - G.vScrollbarIndicatorSize;
                G.vScrollbarProp = G.vScrollbarMaxScroll / G.maxScrollY
            }
            G._scrollbarPos(m, true)
        },
        _resize: function() {
            var m = this;
            setTimeout(function() {
                m.refresh()
            }, A ? 200 : 0)
        },
        _pos: function(m, F) {
            if (this.zoomed) {
                return
            }
            if (this.scrollerW < this.wrapperW && this.keepInCenterH) {
                m = (this.wrapperW - this.scrollerW) / 2;
                this.moved = false
            }
            if (this.scrollerH < this.wrapperH && this.keepInCenterV) {
                F = (this.wrapperH - this.scrollerH) / 2;
                this.moved = false
            }
            m = u.round(m);
            F = u.round(F);
            if (this.options.useTransform) {
                this.scroller.style[l] = "translate(" + m + "px," + F + "px) scale(" + this.scale + ")" + C
            } else {
                this.scroller.style.left = m + "px";
                this.scroller.style.top = F + "px"
            }
            this.x = m;
            this.y = F;
            this._scrollbarPos("h");
            this._scrollbarPos("v")
        },
        _scrollbarPos: function(m, H) {
            var G = this,
                I = m == "h" ? G.x : G.y,
                F;
            if (!G[m + "Scrollbar"]) {
                return
            }
            I = G[m + "ScrollbarProp"] * I;
            if (I < 0) {
                if (!G.options.fixedScrollbar) {
                    F = G[m + "ScrollbarIndicatorSize"] + u.round(I * 3);
                    if (F < 8) {
                        F = 8
                    }
                    G[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = F + "px"
                }
                I = 0
            } else {
                if (I > G[m + "ScrollbarMaxScroll"]) {
                    if (!G.options.fixedScrollbar) {
                        F = G[m + "ScrollbarIndicatorSize"] - u.round((I - G[m + "ScrollbarMaxScroll"]) * 3);
                        if (F < 8) {
                            F = 8
                        }
                        G[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = F + "px";
                        I = G[m + "ScrollbarMaxScroll"] + (G[m + "ScrollbarIndicatorSize"] - F)
                    } else {
                        I = G[m + "ScrollbarMaxScroll"]
                    }
                }
            }
            G[m + "ScrollbarWrapper"].style[e] = "0";
            G[m + "ScrollbarWrapper"].style.opacity = H && G.options.hideScrollbar ? "0" : "1";
            G[m + "ScrollbarIndicator"].style[l] = "translate(" + (m == "h" ? I + "px,0)" : "0," + I + "px)") + C
        },
        _start: function(K) {
            var J = this,
                F = y ? K.touches[0] : K,
                G, m, L, I, H;
            if (!J.enabled) {
                return
            }
            if (J.options.onBeforeScrollStart) {
                J.options.onBeforeScrollStart.call(J, K)
            }
            if (J.options.useTransition || J.options.zoom) {
                J._transitionTime(0)
            }
            J.moved = false;
            J.animating = false;
            J.zoomed = false;
            J.distX = 0;
            J.distY = 0;
            J.absDistX = 0;
            J.absDistY = 0;
            J.dirX = 0;
            J.dirY = 0;
            if (J.options.zoom && y && K.touches.length > 1) {
                I = u.abs(K.touches[0].pageX - K.touches[1].pageX);
                H = u.abs(K.touches[0].pageY - K.touches[1].pageY);
                J.touchesDistStart = u.sqrt(I * I + H * H);
                J.originX = u.abs(K.touches[0].pageX + K.touches[1].pageX - J.wrapperOffsetLeft * 2) / 2 - J.x;
                J.originY = u.abs(K.touches[0].pageY + K.touches[1].pageY - J.wrapperOffsetTop * 2) / 2 - J.y;
                if (J.options.onZoomStart) {
                    J.options.onZoomStart.call(J, K)
                }
            }
            if (J.options.momentum) {
                if (J.options.useTransform) {
                    G = getComputedStyle(J.scroller, null)[l].replace(/[^0-9\-.,]/g, "").split(",");
                    m = +(G[12] || G[4]);
                    L = +(G[13] || G[5])
                } else {
                    m = +getComputedStyle(J.scroller, null).left.replace(/[^0-9-]/g, "");
                    L = +getComputedStyle(J.scroller, null).top.replace(/[^0-9-]/g, "")
                }
                if (m != J.x || L != J.y) {
                    if (J.options.useTransition) {
                        J._unbind(a)
                    }
                    J.steps = [];
                    J._pos(m, L);
                    if (J.options.onScrollEnd) {
                        J.options.onScrollEnd.call(J)
                    }
                }
            }
            J.absStartX = J.x;
            J.absStartY = J.y;
            J.startX = J.x;
            J.startY = J.y;
            J.pointX = F.pageX;
            J.pointY = F.pageY;
            J.startTime = K.timeStamp || Date.now();
            if (J.options.onScrollStart) {
                J.options.onScrollStart.call(J, K)
            }
            J._bind(t, i);
            J._bind(c, i);
            J._bind(w, i)
        },
        _move: function(M) {
            var K = this,
                N = y ? M.touches[0] : M,
                I = N.pageX - K.pointX,
                G = N.pageY - K.pointY,
                m = K.x + I,
                O = K.y + G,
                J, H, F, L = M.timeStamp || Date.now();
            if (K.options.onBeforeScrollMove) {
                K.options.onBeforeScrollMove.call(K, M)
            }
            if (K.options.zoom && y && M.touches.length > 1) {
                J = u.abs(M.touches[0].pageX - M.touches[1].pageX);
                H = u.abs(M.touches[0].pageY - M.touches[1].pageY);
                K.touchesDist = u.sqrt(J * J + H * H);
                K.zoomed = true;
                F = 1 / K.touchesDistStart * K.touchesDist * this.scale;
                if (F < K.options.zoomMin) {
                    F = 0.5 * K.options.zoomMin * Math.pow(2, F / K.options.zoomMin)
                } else {
                    if (F > K.options.zoomMax) {
                        F = 2 * K.options.zoomMax * Math.pow(0.5, K.options.zoomMax / F)
                    }
                }
                K.lastScale = F / this.scale;
                m = this.originX - this.originX * K.lastScale + this.x, O = this.originY - this.originY * K.lastScale + this.y;
                this.scroller.style[l] = "translate(" + m + "px," + O + "px) scale(" + F + ")" + C;
                if (K.options.onZoom) {
                    K.options.onZoom.call(K, M)
                }
                return
            }
            K.pointX = N.pageX;
            K.pointY = N.pageY;
            if (m > 0 || m < K.maxScrollX) {
                m = K.options.bounce ? K.x + (I / 2) : m >= 0 || K.maxScrollX >= 0 ? 0 : K.maxScrollX
            }
            if (O > K.minScrollY || O < K.maxScrollY) {
                O = K.options.bounce ? K.y + (G / 2) : O >= K.minScrollY || K.maxScrollY >= 0 ? K.minScrollY : K.maxScrollY
            }
            K.distX += I;
            K.distY += G;
            K.absDistX = u.abs(K.distX);
            K.absDistY = u.abs(K.distY);
            if (K.absDistX < 6 && K.absDistY < 6) {
                return
            }
            if (K.options.lockDirection) {
                if (K.absDistX > K.absDistY + 5) {
                    O = K.y;
                    G = 0
                } else {
                    if (K.absDistY > K.absDistX + 5) {
                        m = K.x;
                        I = 0
                    }
                }
            }
            K.moved = true;
            K._pos(m, O);
            K.dirX = I > 0 ? -1 : I < 0 ? 1 : 0;
            K.dirY = G > 0 ? -1 : G < 0 ? 1 : 0;
            if (L - K.startTime > 300) {
                K.startTime = L;
                K.startX = K.x;
                K.startY = K.y
            }
            if (K.options.onScrollMove) {
                K.options.onScrollMove.call(K, M)
            }
        },
        _end: function(M) {
            if (y && M.touches.length !== 0) {
                return
            }
            var K = this,
                S = y ? M.changedTouches[0] : M,
                N, R, G = {
                    dist: 0,
                    time: 0
                },
                m = {
                    dist: 0,
                    time: 0
                },
                J = (M.timeStamp || Date.now()) - K.startTime,
                O = K.x,
                L = K.y,
                Q, P, F, I, H;
            K._unbind(t, i);
            K._unbind(c, i);
            K._unbind(w, i);
            if (K.options.onBeforeScrollEnd) {
                K.options.onBeforeScrollEnd.call(K, M)
            }
            if (K.zoomed) {
                H = K.scale * K.lastScale;
                H = Math.max(K.options.zoomMin, H);
                H = Math.min(K.options.zoomMax, H);
                K.lastScale = H / K.scale;
                K.scale = H;
                K.x = K.originX - K.originX * K.lastScale + K.x;
                K.y = K.originY - K.originY * K.lastScale + K.y;
                K.scroller.style[k] = "200ms";
                K.scroller.style[l] = "translate(" + K.x + "px," + K.y + "px) scale(" + K.scale + ")" + C;
                K.zoomed = false;
                K.refresh();
                if (K.options.onZoomEnd) {
                    K.options.onZoomEnd.call(K, M, H)
                }
                return
            }
            if (!K.moved) {
                if (true) {
                    if (K.doubleTapTimer && K.options.zoom) {
                        clearTimeout(K.doubleTapTimer);
                        K.doubleTapTimer = null;
                        if (K.options.onZoomStart) {
                            K.options.onZoomStart.call(K, M)
                        }
                        if (K.options.onZoomEnd) {
                            setTimeout(function() {
                                K.options.onZoomEnd.call(K, M, H)
                            }, 200)
                        }
                    } else {
                        if (this.options.handleClick) {
                            K.doubleTapTimer = setTimeout(function() {
                                K.doubleTapTimer = null;
                                N = S.target;
                                while (N.nodeType != 1) {
                                    N = N.parentNode
                                }
                                if (N.tagName != "SELECT" && N.tagName != "INPUT" && N.tagName != "TEXTAREA") {
                                    R = E.createEvent("MouseEvents");
                                    R.initMouseEvent("click", true, true, M.view, 1, S.screenX, S.screenY, S.clientX, S.clientY, M.ctrlKey, M.altKey, M.shiftKey, M.metaKey, 0, null);
                                    R._fake = true;
                                    N.dispatchEvent(R)
                                }
                                if (K.options.onTouchEnd) {
                                    K.options.onTouchEnd.call(K, M)
                                }
                            }, K.options.zoom ? 250 : 0)
                        }
                    }
                }
                K._resetPos(400);
                return
            }
            if (J < 300 && K.options.momentum) {
                G = O ? K._momentum(O - K.startX, J, -K.x, K.scrollerW - K.wrapperW + K.x, K.options.bounce ? K.wrapperW : 0) : G;
                m = L ? K._momentum(L - K.startY, J, -K.y, (K.maxScrollY < 0 ? K.scrollerH - K.wrapperH + K.y - K.minScrollY : 0), K.options.bounce ? K.wrapperH : 0) : m;
                O = K.x + G.dist;
                L = K.y + m.dist;
                if ((K.x > 0 && O > 0) || (K.x < K.maxScrollX && O < K.maxScrollX)) {
                    G = {
                        dist: 0,
                        time: 0
                    }
                }
                if ((K.y > K.minScrollY && L > K.minScrollY) || (K.y < K.maxScrollY && L < K.maxScrollY)) {
                    m = {
                        dist: 0,
                        time: 0
                    }
                }
            }
            if (G.dist || m.dist) {
                F = u.max(u.max(G.time, m.time), 10);
                if (K.options.snap) {
                    Q = O - K.absStartX;
                    P = L - K.absStartY;
                    if (u.abs(Q) < K.options.snapThreshold && u.abs(P) < K.options.snapThreshold) {
                        K.scrollTo(K.absStartX, K.absStartY, 200)
                    } else {
                        I = K._snap(O, L);
                        O = I.x;
                        L = I.y;
                        F = u.max(I.time, F)
                    }
                }
                K.scrollTo(u.round(O), u.round(L), F);
                if (K.options.onTouchEnd) {
                    K.options.onTouchEnd.call(K, M)
                }
                return
            }
            if (K.options.snap) {
                Q = O - K.absStartX;
                P = L - K.absStartY;
                if (u.abs(Q) < K.options.snapThreshold && u.abs(P) < K.options.snapThreshold) {
                    K.scrollTo(K.absStartX, K.absStartY, 200)
                } else {
                    I = K._snap(K.x, K.y);
                    if (I.x != K.x || I.y != K.y) {
                        K.scrollTo(I.x, I.y, I.time)
                    }
                }
                if (K.options.onTouchEnd) {
                    K.options.onTouchEnd.call(K, M)
                }
                return
            }
            K._resetPos(200);
            if (K.options.onTouchEnd) {
                K.options.onTouchEnd.call(K, M)
            }
        },
        _resetPos: function(F) {
            var m = this;
            if (m.keepInCenterH && m.scrollerW < m.wrapperW) {
                resetX = m.x >= 0 ? (m.wrapperW - m.scrollerW) / 2 : m.x < m.maxScrollX ? m.maxScrollX : m.x
            } else {
                resetX = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x
            }
            if (m.keepInCenterV && m.scrollerH < m.wrapperH) {
                resetY = m.y >= m.minScrollY || m.maxScrollY > 0 ? m.minScrollY : m.y < m.maxScrollY ? m.maxScrollY : m.y;
                resetY = m.y > 0 ? (m.wrapperH - m.scrollerH) / 2 : resetY
            } else {
                resetY = m.y >= m.minScrollY || m.maxScrollY > 0 ? m.minScrollY : m.y < m.maxScrollY ? m.maxScrollY : m.y
            }
            if (resetX == m.x && resetY == m.y) {
                if (m.moved) {
                    m.moved = false;
                    if (m.options.onScrollEnd) {
                        m.options.onScrollEnd.call(m)
                    }
                }
                if (m.hScrollbar && m.options.hideScrollbar) {
                    if (z == "webkit") {
                        m.hScrollbarWrapper.style[e] = "300ms"
                    }
                    m.hScrollbarWrapper.style.opacity = "0"
                }
                if (m.vScrollbar && m.options.hideScrollbar) {
                    if (z == "webkit") {
                        m.vScrollbarWrapper.style[e] = "300ms"
                    }
                    m.vScrollbarWrapper.style.opacity = "0"
                }
                return
            }
            m.scrollTo(resetX, resetY, F || 0)
        },
        _wheel: function(J) {
            var H = this,
                I, G, F, m, K;
            if ("wheelDeltaX" in J) {
                I = J.wheelDeltaX / 12;
                G = J.wheelDeltaY / 12
            } else {
                if ("wheelDelta" in J) {
                    I = G = J.wheelDelta / 12
                } else {
                    if ("detail" in J) {
                        I = G = -J.detail * 3
                    } else {
                        return
                    }
                }
            }
            if (H.options.wheelAction == "zoom") {
                K = H.scale * Math.pow(2, 1 / 3 * (G ? G / Math.abs(G) : 0));
                if (K < H.options.zoomMin) {
                    K = H.options.zoomMin
                }
                if (K > H.options.zoomMax) {
                    K = H.options.zoomMax
                }
                if (K != H.scale) {
                    if (!H.wheelZoomCount && H.options.onZoomStart) {
                        H.options.onZoomStart.call(H, J)
                    }
                    H.wheelZoomCount++;
                    H.zoom(J.pageX, J.pageY, K, 400);
                    setTimeout(function() {
                        H.wheelZoomCount--;
                        if (!H.wheelZoomCount && H.options.onZoomEnd) {
                            H.options.onZoomEnd.call(H, J, H.scale)
                        }
                    }, 400)
                }
                return
            }
            F = H.x + I;
            m = H.y + G;
            if (F > 0) {
                F = 0
            } else {
                if (F < H.maxScrollX) {
                    F = H.maxScrollX
                }
            }
            if (m > H.minScrollY) {
                m = H.minScrollY
            } else {
                if (m < H.maxScrollY) {
                    m = H.maxScrollY
                }
            }
            if (H.maxScrollY < 0) {
                H.scrollTo(F, m, 0)
            }
        },
        _transitionEnd: function(F) {
            var m = this;
            if (F.target != m.scroller) {
                return
            }
            m._unbind(a);
            m._startAni()
        },
        _startAni: function() {
            var K = this,
                F = K.x,
                m = K.y,
                I = Date.now(),
                J, H, G;
            if (K.animating) {
                return
            }
            if (!K.steps.length) {
                K._resetPos(400);
                return
            }
            J = K.steps.shift();
            if (J.x == F && J.y == m) {
                J.time = 0
            }
            K.animating = true;
            K.moved = true;
            if (K.options.useTransition) {
                K._transitionTime(J.time);
                K._pos(J.x, J.y);
                K.animating = false;
                if (J.time) {
                    K._bind(a)
                } else {
                    K._resetPos(0)
                }
                return
            }
            G = function() {
                var L = Date.now(),
                    N, M;
                if (L >= I + J.time) {
                    K._pos(J.x, J.y);
                    K.animating = false;
                    if (K.options.onAnimationEnd) {
                        K.options.onAnimationEnd.call(K)
                    }
                    K._startAni();
                    return
                }
                L = (L - I) / J.time - 1;
                H = u.sqrt(1 - L * L);
                N = (J.x - F) * H + F;
                M = (J.y - m) * H + m;
                K._pos(N, M);
                if (K.animating) {
                    K.aniTime = q(G)
                }
            };
            G()
        },
        _transitionTime: function(m) {
            m += "ms";
            this.scroller.style[k] = m;
            if (this.hScrollbar) {
                this.hScrollbarIndicator.style[k] = m
            }
            if (this.vScrollbar) {
                this.vScrollbarIndicator.style[k] = m
            }
        },
        _momentum: function(L, F, J, m, N) {
            var K = 0.0006,
                G = u.abs(L) / F,
                H = (G * G) / (2 * K),
                M = 0,
                I = 0;
            if (L > 0 && H > J) {
                I = N / (6 / (H / G * K));
                J = J + I;
                G = G * J / H;
                H = J
            } else {
                if (L < 0 && H > m) {
                    I = N / (6 / (H / G * K));
                    m = m + I;
                    G = G * m / H;
                    H = m
                }
            }
            H = H * (L < 0 ? -1 : 1);
            M = G / K;
            return {
                dist: H,
                time: u.round(M)
            }
        },
        _offset: function(m) {
            var G = -m.offsetLeft,
                F = -m.offsetTop;
            while (m = m.offsetParent) {
                G -= m.offsetLeft;
                F -= m.offsetTop
            }
            if (m != this.wrapper) {
                G *= this.scale;
                F *= this.scale
            }
            return {
                left: G,
                top: F
            }
        },
        _snap: function(M, L) {
            var J = this,
                I, H, K, G, F, m;
            K = J.pagesX.length - 1;
            H = J.pagesX.length;
            for (I = 0; I < H; I++) {
                if (M >= J.pagesX[I]) {
                    K = I;
                    break
                }
            }
            if (K == J.currPageX && K > 0 && J.dirX < 0) {
                K--
            }
            M = J.pagesX[K];
            F = u.abs(M - J.pagesX[J.currPageX]);
            F = F ? u.abs(J.x - M) / F * 500 : 0;
            J.currPageX = K;
            K = J.pagesY.length - 1;
            for (I = 0; I < K; I++) {
                if (L >= J.pagesY[I]) {
                    K = I;
                    break
                }
            }
            if (K == J.currPageY && K > 0 && J.dirY < 0) {
                K--
            }
            L = J.pagesY[K];
            m = u.abs(L - J.pagesY[J.currPageY]);
            m = m ? u.abs(J.y - L) / m * 500 : 0;
            J.currPageY = K;
            G = u.round(u.max(F, m)) || 200;
            return {
                x: M,
                y: L,
                time: G
            }
        },
        _bind: function(G, F, m) {
            if (this.scroller.addEventListener) {
                (F || this.scroller).addEventListener(G, this, !!m)
            } else {
                (F || this.scroller).attachEvent(G, this, !!m)
            }
        },
        _unbind: function(G, F, m) {
            if (this.scroller.removeEventListener) {
                (F || this.scroller).removeEventListener(G, this, !!m)
            } else {
                (F || this.scroller).detachEvent(G, this, !!m)
            }
        },
        destroy: function() {
            var m = this;
            m.scroller.style[l] = "";
            m.hScrollbar = false;
            m.vScrollbar = false;
            m._scrollbar("h");
            m._scrollbar("v");
            m._unbind(g, i);
            m._unbind(b);
            m._unbind(t, i);
            m._unbind(c, i);
            m._unbind(w, i);
            if (!m.options.hasTouch) {
                m._unbind("DOMMouseScroll");
                m._unbind("mousewheel")
            }
            if (m.options.useTransition) {
                m._unbind(a)
            }
            if (m.options.checkDOMChanges) {
                clearInterval(m.checkDOMTime)
            }
            if (m.options.onDestroy) {
                m.options.onDestroy.call(m)
            }
        },
        refresh: function() {
            var H = this,
                J, G, m, F, K = 0,
                I = 0;
            if (H.scale < H.options.zoomMin) {
                H.scale = H.options.zoomMin
            }
            H.wrapperW = H.wrapper.clientWidth || 1;
            H.wrapperH = H.wrapper.clientHeight || 1;
            H.minScrollY = -H.options.topOffset || 0;
            H.scrollerW = u.round(H.scroller.offsetWidth * H.scale);
            H.scrollerH = u.round((H.scroller.offsetHeight + H.minScrollY) * H.scale);
            H.maxScrollX = H.wrapperW - H.scrollerW;
            H.maxScrollY = H.wrapperH - H.scrollerH + H.minScrollY;
            H.dirX = 0;
            H.dirY = 0;
            if (H.options.onRefresh) {
                H.options.onRefresh.call(H)
            }
            H.hScroll = H.options.hScroll && H.maxScrollX < 0;
            H.vScroll = H.options.vScroll && (!H.options.bounceLock && !H.hScroll || H.scrollerH > H.wrapperH);
            H.hScrollbar = H.hScroll && H.options.hScrollbar;
            H.vScrollbar = H.vScroll && H.options.vScrollbar && H.scrollerH > H.wrapperH;
            J = H._offset(H.wrapper);
            H.wrapperOffsetLeft = -J.left;
            H.wrapperOffsetTop = -J.top;
            if (typeof H.options.snap == "string") {
                H.pagesX = [];
                H.pagesY = [];
                F = H.scroller.querySelectorAll(H.options.snap);
                m = F.length;
                for (G = 0; G < m; G++) {
                    K = H._offset(F[G]);
                    K.left += H.wrapperOffsetLeft;
                    K.top += H.wrapperOffsetTop;
                    H.pagesX[G] = K.left < H.maxScrollX ? H.maxScrollX : K.left * H.scale;
                    H.pagesY[G] = K.top < H.maxScrollY ? H.maxScrollY : K.top * H.scale
                }
            } else {
                if (H.options.snap) {
                    H.pagesX = [];
                    while (K >= H.maxScrollX) {
                        H.pagesX[I] = K;
                        K = K - H.wrapperW;
                        I++
                    }
                    if (H.maxScrollX % H.wrapperW) {
                        H.pagesX[H.pagesX.length] = H.maxScrollX - H.pagesX[H.pagesX.length - 1] + H.pagesX[H.pagesX.length - 1]
                    }
                    K = 0;
                    I = 0;
                    H.pagesY = [];
                    while (K >= H.maxScrollY) {
                        H.pagesY[I] = K;
                        K = K - H.wrapperH;
                        I++
                    }
                    if (H.maxScrollY % H.wrapperH) {
                        H.pagesY[H.pagesY.length] = H.maxScrollY - H.pagesY[H.pagesY.length - 1] + H.pagesY[H.pagesY.length - 1]
                    }
                }
            }
            H._scrollbar("h");
            H._scrollbar("v");
            if (!H.zoomed) {
                H.scroller.style[k] = "0";
                H._resetPos(400)
            }
        },
        scrollTo: function(m, L, K, J) {
            var I = this,
                H = m,
                G, F;
            I.stop();
            if (!H.length) {
                H = [{
                    x: m,
                    y: L,
                    time: K,
                    relative: J
                }]
            }
            F = H.length;
            for (G = 0; G < F; G++) {
                if (H[G].relative) {
                    H[G].x = I.x - H[G].x;
                    H[G].y = I.y - H[G].y
                }
                I.steps.push({
                    x: H[G].x,
                    y: H[G].y,
                    time: H[G].time || 0
                })
            }
            I._startAni()
        },
        scrollToElement: function(m, G) {
            var F = this,
                H;
            m = m.nodeType ? m : F.scroller.querySelector(m);
            if (!m) {
                return
            }
            H = F._offset(m);
            H.left += F.wrapperOffsetLeft;
            H.top += F.wrapperOffsetTop;
            H.left = H.left > 0 ? 0 : H.left < F.maxScrollX ? F.maxScrollX : H.left;
            H.top = H.top > F.minScrollY ? F.minScrollY : H.top < F.maxScrollY ? F.maxScrollY : H.top;
            G = G === undefined ? u.max(u.abs(H.left) * 2, u.abs(H.top) * 2) : G;
            F.scrollTo(H.left, H.top, G)
        },
        scrollToPage: function(G, F, I) {
            var H = this,
                m, J;
            I = I === undefined ? 400 : I;
            if (H.options.onScrollStart) {
                H.options.onScrollStart.call(H)
            }
            if (H.options.snap) {
                G = G == "next" ? H.currPageX + 1 : G == "prev" ? H.currPageX - 1 : G;
                F = F == "next" ? H.currPageY + 1 : F == "prev" ? H.currPageY - 1 : F;
                G = G < 0 ? 0 : G > H.pagesX.length - 1 ? H.pagesX.length - 1 : G;
                F = F < 0 ? 0 : F > H.pagesY.length - 1 ? H.pagesY.length - 1 : F;
                H.currPageX = G;
                H.currPageY = F;
                m = H.pagesX[G];
                J = H.pagesY[F]
            } else {
                m = -H.wrapperW * G;
                J = -H.wrapperH * F;
                if (m < H.maxScrollX) {
                    m = H.maxScrollX
                }
                if (J < H.maxScrollY) {
                    J = H.maxScrollY
                }
            }
            H.scrollTo(m, J, I)
        },
        disable: function() {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(t, i);
            this._unbind(c, i);
            this._unbind(w, i)
        },
        enable: function() {
            this.enabled = true
        },
        stop: function() {
            if (this.options.useTransition) {
                this._unbind(a)
            }
            this.steps = [];
            this.moved = false;
            this.animating = false
        },
        zoom: function(m, J, I, H) {
            var F = this,
                G = I / F.scale;
            if (!F.options.useTransform) {
                return
            }
            F.zoomed = true;
            H = H === undefined ? 200 : H;
            m = m - F.wrapperOffsetLeft - F.x;
            J = J - F.wrapperOffsetTop - F.y;
            F.x = m - m * G + F.x;
            F.y = J - J * G + F.y;
            F.scale = I;
            F.refresh();
            F.x = F.x > 0 ? 0 : F.x < F.maxScrollX ? F.maxScrollX : F.x;
            F.y = F.y > F.minScrollY ? F.minScrollY : F.y < F.maxScrollY ? F.maxScrollY : F.y;
            if (F.keepInCenterH) {
                if (F.scrollerW < F.wrapperW) {
                    F.x = (F.wrapperW - F.scrollerW) / 2
                }
            }
            if (F.keepInCenterV) {
                if (F.scrollerH < F.wrapperH) {
                    F.y = (F.wrapperH - F.scrollerH) / 2
                }
            }
            F.scroller.style[k] = H + "ms";
            F.scroller.style[l] = "translate(" + F.x + "px," + F.y + "px) scale(" + I + ")" + C;
            F.zoomed = false
        },
        isReady: function() {
            return !this.moved && !this.zoomed && !this.animating
        },
        setX: function(m) {
            this.x = m
        }
    };

    function s(m) {
        if (z === "") {
            return m
        }
        m = m.charAt(0).toUpperCase() + m.substr(1);
        return z + m
    }
    n = null;
    if (typeof exports !== "undefined") {
        exports.iScroll = v
    } else {
        i.iScroll = v
    }
})(window, document);
var FLIPBOOK = FLIPBOOK || {};
FLIPBOOK.Lightbox = function(c, d, b) {
    var a = this;
    this.context = c;
    this.options = b;
    var e = (c.elem.nodeName.toLowerCase() === "div") ? c.$elem : c.$elem.find("div");
    e.css("cursor", "pointer").bind(c.START_EV, function() {
        a.openLightbox()
    });
    a.overlay = jQuery(document.createElement("div")).attr("class", "flipbook-overlay").css("visibility", "hidden").css("z-index", "999999").bind(c.START_EV, function(f) {
        if (jQuery(f.target).hasClass("flipbook-overlay")) {
            a.closeLightbox()
        }
    }).appendTo("body");
    a.wrapper = jQuery(document.createElement("div")).css("width", a.options.lightboxWidth).css("height", "auto").appendTo(a.overlay);
    if (a.options.lightboxTransparent == true) {
        a.wrapper.attr("class", "flipbook-wrapper-transparent").css("margin", "0px auto").css("padding", "0px").css("height", "100%").css("width", "100%")
    } else {
        a.wrapper.attr("class", "flipbook-wrapper").css("margin", String(a.options.lightboxMargin) + "px auto").css("padding", String(a.options.lightboxPadding) + "px");
        d.css("margin", String(a.options.lightboxPadding) + "px")
    }
    d.appendTo(a.wrapper);
    jQuery(document.createElement("span")).attr("aria-hidden", "true").appendTo(a.wrapper).addClass("icon-cross").addClass("icon-general").addClass("skin-color").css("right", "0").css("top", "0").css("position", "absolute").css("cursor", "pointer").bind(a.context.START_EV, function(f) {
        a.closeLightbox()
    });
    a.resize();
    jQuery(window).resize(function() {
        a.resize()
    });
    a.resize()
};
FLIPBOOK.Lightbox.prototype = {
    openLightbox: function() {
        var a = this;
        this.overlay.css("visibility", "visible");
        this.overlay.css("display", "none");
        this.wrapper.css("display", "none");
        this.overlay.fadeIn("fast", function() {
            a.wrapper.css("display", "block");
            a.context.lightboxStart()
        });
        jQuery("body").css("overflow", "hidden");
        a.context.lightboxStart()
    },
    closeLightbox: function() {
        var a = this;
        this.overlay.fadeOut("fast");
        jQuery("body").css("overflow", "visible");
        a.context.lightboxEnd()
    },
    resize: function() {
        var b = this;
        var d = jQuery(window),
            c = d.width(),
            a = d.height();
        if (b.options.lightboxTransparent == true) {
            b.wrapper.css("width", "100%")
        } else {
            b.wrapper.css("width", b.options.lightboxWidth);
            if ((b.wrapper.width() + 2 * b.options.lightboxMargin + 2 * b.options.lightboxPadding) < b.options.lightboxMinWidth) {
                b.wrapper.css("width", String(c - 2 * b.options.lightboxMargin - 2 * b.options.lightboxPadding) + "px")
            }
        }
    }
};
(function init(c, b, a, e) {
    c.fn.flipBook = function(f) {
        return this.each(function() {
            var g = new d();
            g.init(f, this)
        })
    };
    c.fn.flipBook.options = {
        css: "",
        pdf: "",
        pages: [],
        assets: {
            preloader: "/assets/jacob/images/menu/preloader.jpg",
            left: "/assets/jacob/images/menu/left.png",
            overlay: "/assets/jacob/images/menu/overlay.jpg"
        },
        startPage: 1,
        pageWidth: 1000,
        pageHeight: 1414,
        thumbnailWidth: 100,
        thumbnailHeight: 141,
        currentPage: true,
        btnNext: true,
        btnPrev: true,
        btnZoomIn: true,
        btnZoomOut: true,
        btnToc: true,
        btnThumbs: true,
        btnShare: true,
        btnExpand: true,
        flipType: "3d",
        zoom: 0.8,
        zoomMin: 0.7,
        zoomMax: 6,
        time1: 500,
        transition1: "easeInQuad",
        time2: 600,
        transition2: "easeOutQuad",
        social: [{
            name: "facebook",
            icon: "icon-facebook",
            url: "http://codecanyon.net"
        }, {
            name: "twitter",
            icon: "icon-twitter",
            url: "http://codecanyon.net"
        }, {
            name: "googleplus",
            icon: "icon-googleplus",
            url: "http://codecanyon.net"
        }, {
            name: "linkedin",
            icon: "icon-linkedin",
            url: "http://codecanyon.net"
        }, {
            name: "youtube",
            icon: "icon-youtube",
            url: "http://codecanyon.net"
        }],
        lightBox: false,
        lightboxTransparent: true,
        lightboxPadding: 0,
        lightboxMargin: 20,
        lightboxWidth: "75%",
        lightboxHeight: 600,
        lightboxMinWidth: 400,
        lightboxMinHeight: 100,
        lightboxMaxWidth: 9999,
        lightboxMaxHeight: 9999,
        lightboxAutoSize: true,
        lightboxAutoHeight: false,
        lightboxAutoWidth: false,
        webgl: false,
        cameraDistance: 2500,
        pan: 0,
        panMax: 5,
        panMin: -5,
        tilt: 0,
        tiltMax: 0,
        tiltMin: -60,
        bookX: 0,
        bookY: 0,
        bookZ: 0,
        pageMaterial: "phong",
        pageShadow: false,
        pageHardness: 1,
        coverHardness: 4,
        pageSegmentsW: 10,
        pageSegmentsH: 3,
        pageShininess: 25,
        pageFlipDuration: 2,
        pointLight: false,
        pointLightX: 0,
        pointLightY: 0,
        pointLightZ: 2000,
        pointLightColor: 16777215,
        pointLightIntensity: 0.1,
        directionalLight: false,
        directionalLightX: 0,
        directionalLightY: 0,
        directionalLightZ: 1000,
        directionalLightColor: 16777215,
        directionalLightIntensity: 0.3,
        ambientLight: true,
        ambientLightColor: 13421772,
        ambientLightIntensity: 0.2,
        spotLight: true,
        spotLightX: 0,
        spotLightY: 0,
        spotLightZ: 5000,
        spotLightColor: 16777215,
        spotLightIntensity: 0.2,
        spotLightShadowCameraNear: 0.1,
        spotLightShadowCameraFar: 10000,
        spotLightCastShadow: true,
        spotLightShadowDarkness: 0.5
    };
    var d = function() {};
    d.prototype = {
        init: function(h, C) {
            var s = this;
            s.elem = C;
            s.$elem = c(C);
            s.options = {};
            var q = a.createElement("div").style,
                D = (function() {
                    var J = "t,webkitT,MozT,msT,OT".split(","),
                        I, H = 0,
                        G = J.length;
                    for (; H < G; H++) {
                        I = J[H] + "ransform";
                        if (I in q) {
                            return J[H].substr(0, J[H].length - 1)
                        }
                    }
                    return false
                })(),
                v = function(G) {
                    if (D === "") {
                        return G
                    }
                    G = G.charAt(0).toUpperCase() + G.substr(1);
                    return D + G
                },
                F = (/android/gi).test(navigator.appVersion),
                m = (/iphone|ipad/gi).test(navigator.appVersion),
                u = (/hp-tablet/gi).test(navigator.appVersion),
                n = v("perspective") in q,
                B = "ontouchstart" in b && !u,
                l = "onorientationchange" in b ? "orientationchange" : "resize",
                f = B ? "touchend" : "click",
                g = B ? "touchstart" : "mousedown",
                w = B ? "touchmove" : "mousemove",
                k = B ? "touchend" : "mouseup",
                y = B ? "touchcancel" : "mouseup",
                p = v("transform"),
                t = v("perspective"),
                A = v("transition"),
                x = v("transitionProperty"),
                o = v("transitionDuration"),
                r = v("transformOrigin"),
                z = v("transformStyle"),
                E = v("transitionTimingFunction"),
                j = v("transitionDelay"),
                i = v("backfaceVisibility");
            s.has3d = n;
            s.hasWebGl = Detector.webgl;
            s.hasTouch = B;
            s.RESIZE_EV = l;
            s.CLICK_EV = f;
            s.START_EV = g;
            s.MOVE_EV = w;
            s.END_EV = k;
            s.CANCEL_EV = y;
            s.transform = p;
            s.transitionProperty = x;
            s.transitionDuration = o;
            s.transformOrigin = r;
            s.transitionTimingFunction = E;
            s.transitionDelay = j;
            s.perspective = t;
            s.transformStyle = z;
            s.transition = A;
            s.backfaceVisibility = i;
            s.options = c.extend({}, c.fn.flipBook.options, h);
            s.options.main = s;
            s.p = false;
            s.options.css == "" ? s.start() : s.loadCSS(s.options.css)
        },
        start: function() {
            this.started = true;
            this.createBook();
            this.Book.updateVisiblePages();
            this.createMenu();
            if (this.options.currentPage) {
                this.createCurrentPage();
                this.updateCurrentPage()
            }
            this.createToc();
            this.createThumbs();
            if (this.options.btnShare) {
                this.createShareButtons()
            }
            this.resize()
        },
        loadCSS: function(g) {
            c("#flipBookCSS").remove();
            var f = this;
            c('<link rel="stylesheet" type="text/css" href="' + g + '" id="flipBookCSS" />').appendTo("head");
            c.ajax({
                url: g,
                success: function(h) {
                    f.start()
                }
            })
        },
        reloadCSS: function(g) {
            c("#flipBookCSS").remove();
            c('<link rel="stylesheet" type="text/css" href="' + g + '" id="flipBookCSS" />').appendTo("head");
            var f = this;
            c.ajax({
                url: g,
                success: function(h) {
                    f.resize()
                }
            })
        },
        createBook: function() {
            var f = this;
            f.wrapper = c(a.createElement("div")).addClass("main-wrapper");
            f.bookLayer = c(a.createElement("div")).addClass("flipbook-bookLayer").appendTo(f.wrapper);
            f.bookLayer[0].style[f.transformOrigin] = "100% 100%";
            f.book = c(a.createElement("div")).addClass("book").appendTo(f.bookLayer);
            if (f.options.lightBox) {
                f.lightbox = new FLIPBOOK.Lightbox(this, f.wrapper, f.options);
                if (f.options.lightboxTransparent == true) {
                    f.wrapper.css("background", "none");
                    f.bookLayer.css("background", "none");
                    f.book.css("background", "none")
                }
            } else {
                f.wrapper.appendTo(f.$elem)
            }
            f.options.onTurnPageComplete = f.onTurnPageComplete;
            if (!f.has3d) {
                f.options.flipType = "2d"
            }
            if (f.options.webgl && f.hasWebGl) {
                var g = f.options;
                g.pagesArr = f.options.pages;
                g.scroll = f.scroll;
                g.parent = f;
                f.Book = new FLIPBOOK.BookWebGL(f.book[0], g);
                f.webglMode = true
            } else {
                f.Book = new FLIPBOOK.Book(f.book[0], f.options);
                f.scroll = new iScroll(f.bookLayer[0], {
                    wheelAction: "zoom",
                    zoom: true,
                    zoomMin: f.options.zoomMin,
                    zoomMax: f.options.zoomMax,
                    keepInCenterH: true,
                    keepInCenterV: true,
                    bounce: false
                });
                f.webglMode = false
            }
            f.Book.goToPage(Number(f.options.startPage) - 1);
            c(b).resize(function() {
                f.resize()
            })
        },
        createMenu: function() {
            var k = this;
            this.menuWrapper = c(a.createElement("div")).addClass("flipbook-menuWrapper").appendTo(this.wrapper);
            this.menu = c(a.createElement("div")).addClass("flipbook-menu").addClass("skin-color-bg").appendTo(this.menuWrapper);
            if (this.options.lightboxTransparent) {}
            if (k.options.btnPrev) {
                var j = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.Book.prevPage()
                }).addClass("icon-arrow-left").addClass("flipbook-menu-btn").addClass("icon-general").addClass("skin-color")
            }
            if (k.options.btnNext) {
                var h = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.Book.nextPage()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-arrow-right").addClass("skin-color")
            }
            if (k.options.btnZoomIn) {
                var f = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.zoomIn()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-zoom-in").addClass("skin-color")
            }
            if (k.options.btnZoomOut) {
                var l = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.zoomOut()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-zoom-out").addClass("skin-color")
            }
            if (k.options.btnToc) {
                var g = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.toggleToc()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-list").addClass("skin-color")
            }
            if (k.options.btnThumbs) {
                var i = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.toggleThumbs()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-layout").addClass("skin-color")
            }
            if (k.options.btnShare) {
                this.btnShare = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    k.toggleShare()
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-share").addClass("skin-color")
            }
            if (THREEx.FullScreen.available() && k.options.btnExpand) {
                var m = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(this.menu).bind(this.CLICK_EV, function() {
                    if (THREEx.FullScreen.available()) {
                        if (THREEx.FullScreen.activated()) {
                            THREEx.FullScreen.cancel();
                            c(this).removeClass("icon-resize-shrink").addClass("icon-resize-enlarge")
                        } else {
                            THREEx.FullScreen.request(k.wrapper[0]);
                            c(this).removeClass("icon-resize-enlarge").addClass("icon-resize-shrink")
                        }
                    }
                }).addClass("flipbook-menu-btn").addClass("icon-general").addClass("icon-resize-enlarge").addClass("skin-color")
            }
        },
        createShareButtons: function() {
            var g = this;
            this.shareButtons = c(a.createElement("span")).appendTo(this.bookLayer).addClass("flipbook-shareButtons").addClass("skin-color-bg").addClass("invisible").addClass("transition");
            var h;
            for (h = 0; h < g.options.social.length; h++) {
                f(g.options.social[h])
            }

            function f(j) {
                var i = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(g.shareButtons).addClass("flipbook-shareBtn").addClass(j.icon).addClass("icon-general").addClass("skin-color").bind(g.CLICK_EV, function(k) {
                    b.open(j.url, "_self")
                })
            }
        },
        zoomOut: function() {
            if (!this.webglMode) {
                var f = this.scroll.scale / 1.5 < this.scroll.options.zoomMin ? this.scroll.options.zoomMin : this.scroll.scale / 1.5;
                this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, f, 400)
            } else {
                this.Book.zoomTo(-2)
            }
        },
        zoomIn: function() {
            if (!this.webglMode) {
                var f = this.scroll.scale * 1.5 > this.scroll.options.zoomMax ? this.scroll.options.zoomMax : this.scroll.scale * 1.5;
                this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, f, 400)
            } else {
                this.Book.zoomTo(2)
            }
        },
        toggleShare: function() {
            this.shareButtons.toggleClass("invisible")
        },
        createCurrentPage: function() {
            var f = this;
            this.currentPage = c(a.createElement("input")).addClass("flipbook-currentPage").attr("type", "text").addClass("skin-color").appendTo(this.menuWrapper).keyup(function(h) {
                if (h.keyCode == 13) {
                    var g = parseInt(c(this).val()) - 1;
                    f.updateCurrentPage();
                    f.Book.goToPage(g)
                }
            }).focus(function(g) {
                c(this).val("")
            }).focusout(function(h) {
                var g = parseInt(c(this).val()) - 1;
                f.updateCurrentPage();
                f.Book.goToPage(g)
            })
        },
        createToc: function() {
            var g = this;
            this.tocHolder = c(a.createElement("div")).addClass("flipbook-tocHolder").addClass("invisible").appendTo(this.wrapper);
            this.toc = c(a.createElement("div")).addClass(".flipbook-toc").appendTo(this.tocHolder);
            g.tocScroll = new iScroll(g.tocHolder[0], {
                bounce: false
            });
            var j = c(a.createElement("span")).addClass("flipbook-tocTitle").addClass("skin-color-bg").addClass("skin-color").appendTo(this.toc);
            var k = c(a.createElement("span")).attr("aria-hidden", "true").appendTo(j).css("float", "right").css("position", "absolute").css("top", "0px").css("right", "0px").css("cursor", "pointer").css("font-size", ".8em").addClass("icon-cross").addClass("icon-general").addClass("skin- color").bind(g.START_EV, function(i) {
                g.toggleToc()
            });
            for (var h = 0; h < this.options.pages.length; h++) {
                if (this.options.pages[h].title == "") {
                    continue
                }
                if (typeof this.options.pages[h].title === "undefined") {
                    continue
                }
                var f = c(a.createElement("a")).attr("class", "flipbook-tocItem").addClass("skin-color-bg").addClass("skin-color").attr("title", String(h + 1)).appendTo(this.toc).bind(g.CLICK_EV, function(l) {
                    if (!g.tocScroll.moved) {
                        var i = Number(c(this).attr("title")) - 1;
                        if (g.Book.goingToPage != i) {
                            g.Book.goToPage(i)
                        }
                    }
                });
                c(a.createElement("span")).appendTo(f).text(this.options.pages[h].title);
                c(a.createElement("span")).appendTo(f).attr("class", "right").text(h + 1)
            }
            g.tocScroll.refresh()
        },
        toggleToc: function() {
            this.tocHolder.toggleClass("invisible");
            this.tocScroll.refresh()
        },
        updateCurrentPage: function() {
            if (typeof this.currentPage === "undefined") {
                return
            }
            var h, g = this.Book.rightIndex,
                f = this.webglMode ? this.Book.pages.length * 2 : this.Book.pages.length;
            if (g == 0) {
                h = "1 / " + String(f)
            } else {
                if (g == f) {
                    h = String(f) + " / " + String(f)
                } else {
                    h = String(g) + "," + String(g + 1) + " / " + String(f)
                }
            }
            if (this.p && this.options.pages.length != 24 && this.options.pages.length != 8) {
                this.Book.rightIndex = 0
            }
            this.currentPage.attr("value", h);
            this.currentPage.attr("size", this.currentPage.val().length)
        },
        turnPageComplete: function() {
            this.animating = false;
            this.updateCurrentPage()
        },
        resize: function() {
            var h = this.bookLayer.width(),
                l = this.bookLayer.height(),
                m = this.book.width(),
                k = this.book.height(),
                j = this.menuWrapper.width();
            var i = this;
            if (h == 0 || l == 0 || m == 0 || k == 0) {
                setTimeout(function() {
                    i.resize()
                }, 1000);
                return
            }
            if (h / l >= m / k) {
                this.fitToHeight(true)
            } else {
                this.fitToWidth(true)
            }
            if (this.options.btnShare) {
                var g = this.btnShare.offset().left;
                var f = this.bookLayer.offset().left;
                this.shareButtons.css("left", String(g - f) + "px")
            }
        },
        fitToHeight: function(g) {
            var f = this.bookLayer.height();
            var h = this.book.height();
            if (g) {
                this.ratio = f / h
            }
            this.fit(this.ratio, g);
            this.thumbsVertical()
        },
        fitToWidth: function(g) {
            var f = this.bookLayer.width();
            var h = this.book.width();
            if (g) {
                this.ratio = f / h
            }
            this.fit(this.ratio, g);
            this.thumbsVertical()
        },
        fit: function(g, f) {
            if (!this.webglMode) {
                g = f ? this.ratio : this.scroll.scale;
                if (f) {
                    this.scroll.options.zoomMin = g * this.options.zoomMin;
                    this.scroll.options.zoomMax = g * this.options.zoomMax
                }
                this.scroll.zoom(this.bookLayer.width() / 2, this.bookLayer.height() / 2, g * this.options.zoom, 0)
            }
        },
        createThumbs: function() {
            var h = this,
                l, k;
            h.thumbsCreated = true;
            h.thumbHolder = c(a.createElement("div")).addClass("flipbook-thumbHolder").addClass("invisible").appendTo(h.bookLayer).css("position", "absolute").css("display", "none");
            h.thumbsContainer = c(a.createElement("div")).appendTo(h.thumbHolder).addClass("flipbook-thumbContainer").css("margin", "0px").css("padding", "0px").css("position", "relative");
            h.thumbScroll = new iScroll(h.thumbHolder[0], {
                bounce: false
            });
            h.thumbs = [];
            for (var j = 0; j < h.options.pages.length; j++) {
                var m = h.options.pages[j].thumb;
                var f = 0;
                var g = new FLIPBOOK.Thumb(c, h.Book, m, h.options.thumbnailWidth, h.options.thumbnailHeight, j);
                g.image.style[h.transform] = "translateZ(0)";
                h.thumbs.push(g);
                c(g.image).attr("title", j + 1).appendTo(h.thumbsContainer).bind(h.CLICK_EV, function(n) {
                    if (!h.thumbScroll.moved) {
                        var i = Number(c(this).attr("title")) - 1;
                        if (h.Book.goingToPage != i) {
                            h.Book.goToPage(i)
                        }
                    }
                });
                g.loadImage()
            }
        },
        toggleThumbs: function() {
            if (!this.thumbsCreated) {
                this.createThumbs()
            }
            this.thumbHolder.css("display", "block");
            this.thumbHolder.toggleClass("invisible");
            var f = this;
            this.thumbsVertical()
        },
        thumbsVertical: function() {
            if (!this.thumbsCreated) {
                return
            }
            var f = this.options.thumbnailWidth,
                k = this.options.thumbnailHeight * this.thumbs.length;
            this.thumbHolder.css("width", String(f) + "px").css("height", "100%").css("bottom", "auto").css("left", "auto").css("top", "0px").css("right", "0px");
            this.thumbsContainer.css("height", String(k) + "px").css("width", String(f) + "px");
            for (var j = 0; j < this.thumbs.length; j++) {
                var g = this.thumbs[j].image;
                g.style.top = String(j * this.options.thumbnailHeight) + "px";
                g.style.left = "0px"
            }
            this.thumbScroll.hScroll = false;
            this.thumbScroll.vScroll = true;
            this.thumbScroll.refresh()
        },
        thumbsHorizontal: function() {
            if (!this.thumbsCreated) {
                return
            }
            var f = this.options.thumbnailWidth * this.thumbs.length,
                k = this.options.thumbnailHeight;
            this.thumbHolder.css("width", "100%").css("height", String(k) + "px").css("left", "0px").css("right", "auto").css("top", "auto").css("bottom", "0px");
            this.thumbsContainer.css("height", String(k) + "px").css("width", String(f) + "px");
            for (var j = 0; j < this.thumbs.length; j++) {
                var g = this.thumbs[j].image;
                g.style.top = "0px";
                g.style.left = String(j * this.options.thumbnailWidth) + "px"
            }
            this.thumbScroll.hScroll = true;
            this.thumbScroll.vScroll = false;
            this.thumbScroll.refresh()
        },
        toggleExpand: function() {
            if (THREEx.FullScreen.available()) {
                if (THREEx.FullScreen.activated()) {
                    THREEx.FullScreen.cancel()
                } else {
                    THREEx.FullScreen.request()
                }
            }
        },
        lightboxStart: function() {
            this.reloadCSS(this.options.css)
        },
        lightboxEnd: function() {
            if (THREEx.FullScreen.available()) {
                if (THREEx.FullScreen.activated()) {
                    THREEx.FullScreen.cancel()
                }
            }
        }
    };
    c.extend(c.easing, {
        def: "easeOutQuad",
        swing: function(g, h, f, j, i) {
            return c.easing[c.easing.def](g, h, f, j, i)
        },
        easeInQuad: function(g, h, f, j, i) {
            return j * (h /= i) * h + f
        },
        easeOutQuad: function(g, h, f, j, i) {
            return -j * (h /= i) * (h - 2) + f
        },
        easeInOutQuad: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f
        },
        easeInCubic: function(g, h, f, j, i) {
            return j * (h /= i) * h * h + f
        },
        easeOutCubic: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h + 1) + f
        },
        easeInOutCubic: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f
        },
        easeInQuart: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h + f
        },
        easeOutQuart: function(g, h, f, j, i) {
            return -j * ((h = h / i - 1) * h * h * h - 1) + f
        },
        easeInOutQuart: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f
        },
        easeInQuint: function(g, h, f, j, i) {
            return j * (h /= i) * h * h * h * h + f
        },
        easeOutQuint: function(g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f
        },
        easeInOutQuint: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f
        },
        easeInSine: function(g, h, f, j, i) {
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f
        },
        easeOutSine: function(g, h, f, j, i) {
            return j * Math.sin(h / i * (Math.PI / 2)) + f
        },
        easeInOutSine: function(g, h, f, j, i) {
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f
        },
        easeInExpo: function(g, h, f, j, i) {
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f
        },
        easeOutExpo: function(g, h, f, j, i) {
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f
        },
        easeInOutExpo: function(g, h, f, j, i) {
            if (h == 0) {
                return f
            }
            if (h == i) {
                return f + j
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f
        },
        easeInCirc: function(g, h, f, j, i) {
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f
        },
        easeOutCirc: function(g, h, f, j, i) {
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f
        },
        easeInOutCirc: function(g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f
        },
        easeInElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        },
        easeOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
        },
        easeInOutElastic: function(g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l / 2) == 2) {
                return f + m
            }
            if (!k) {
                k = l * (0.3 * 1.5)
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
        },
        easeInBack: function(g, h, f, k, j, i) {
            if (i == e) {
                i = 1.70158
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f
        },
        easeOutBack: function(g, h, f, k, j, i) {
            if (i == e) {
                i = 1.70158
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f
        },
        easeInOutBack: function(g, h, f, k, j, i) {
            if (i == e) {
                i = 1.70158
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f
        },
        easeInBounce: function(g, h, f, j, i) {
            return j - c.easing.easeOutBounce(g, i - h, 0, j, i) + f
        },
        easeOutBounce: function(g, h, f, j, i) {
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f
            } else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f
                } else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f
                    } else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f
                    }
                }
            }
        },
        easeInOutBounce: function(g, h, f, j, i) {
            if (h < i / 2) {
                return c.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f
            }
            return c.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f
        }
    })
})(jQuery, window, document);
FLIPBOOK.Page = function(j, a, g, e, b) {
    this.wrapper = document.createElement("div");
    jQuery(this.wrapper).addClass("flipbook-page");
    this.s = this.wrapper.style;
    this.s.width = String(a) + "px";
    this.s.height = String(g) + "px";
    this.index = e;
    this.book = b;
    this.width = a;
    this.height = g;
    this.invisible = false;
    this.image = new Image();
    this.image.src = b.options.assets.preloader;
    this.imageSrc = j.src;
    this.wrapper.appendChild(this.image);
    this.imageLoader = new Image();
    this.overlay = new Image();
    this.overlay.src = b.options.assets.overlay;
    this.wrapper.appendChild(this.overlay);
    this.overlay.style.opacity = "0";
    this.expanded = true;
    this.htmlContent = j.htmlContent;
    if (this.index % 2 == 0) {
        this.s.zIndex = String(100 - this.index);
        this.s.left = "50%";
        this.right(this.image);
        this.right(this.overlay)
    } else {
        this.shadow = new Image();
        this.wrapper.appendChild(this.shadow);
        this.shadow.src = b.options.assets.left;
        this.left(this.shadow);
        this.s.zIndex = String(100 + this.index);
        this.s.right = "50%";
        this.left(this.image);
        this.left(this.overlay)
    }
    if (typeof this.htmlContent !== "undefined") {
        this.htmlContainer = document.createElement("div");
        jQuery(this.htmlContainer).addClass("flipbook-page-htmlContainer");
        this.wrapper.appendChild(this.htmlContainer);
        this.index % 2 == 0 ? this.right(this.htmlContainer) : this.left(this.htmlContainer)
    }
    this.image.style[this.book.transform] = "translateZ(0)";
    this.overlay.style[this.book.transform] = "translateZ(0)";
    this.overlay.style["pointer-events"] = "none";
    if (this.shadow) {
        this.shadow.style[this.book.transform] = "translateZ(0)";
        this.shadow.style["pointer-events"] = "none"
    }
    this.s.top = "0px";
    if (this.book.flipType == "3d") {
        this.wrapper.style[this.book.transformOrigin] = (this.index % 2 != 0) ? "100% 50%" : "0% 50%"
    }
    if (j.links) {
        var h = this;
        for (var d = 0; d < j.links.length; d++) {
            var f = j.links[d];

            function c(k) {
                var i = document.createElement("div");
                h.wrapper.appendChild(i);
                i.classList.add("flipbook-page-link");
                i.style.position = "absolute";
                i.style.left = String(k.x) + "px";
                i.style.top = String(k.y) + "px";
                i.style.width = String(k.width) + "px";
                i.style.height = String(k.height) + "px";
                i.style.backgroundColor = k.color;
                i.style.opacity = k.alpha;
                i.style.cursor = "pointer";
                jQuery(i).click(function(l) {
                    if (Number(k.page) > 0) {
                        b.goToPage(Number(k.page))
                    } else {
                        if (String(k.url) != "") {
                            window.open(k.url)
                        }
                    }
                }).mouseenter(function() {
                    i.style.backgroundColor = k.hoverColor;
                    i.style.opacity = k.hoverAlpha
                }).mouseleave(function() {
                    i.style.backgroundColor = k.color;
                    i.style.opacity = k.alpha
                })
            }
            c(f)
        }
    }
};
FLIPBOOK.Page.prototype = {
    loadPage: function() {
        if (this.loaded == true) {
            return
        }
        this.loaded = true;
        var a = this;
        a.imageLoader.src = this.imageSrc;
        jQuery(a.imageLoader).load(function() {
            a.image.src = a.imageSrc
        });
        if (typeof this.htmlContent !== "undefined") {
            this.htmlContainer.innerHTML = this.htmlContent
        }
    },
    flipView: function() {},
    expand: function() {
        if (!this.expanded) {
            this.s.width = String(this.width) + "px"
        }
        this.expanded = true
    },
    contract: function() {
        if (this.expanded) {
            this.s.width = "0px"
        }
        this.expanded = false
    },
    show: function() {
        if (this.hidden) {
            this.s.display = "block"
        }
        this.hidden = false
    },
    hide: function() {
        if (!this.hidden) {
            this.s.display = "none"
        }
        this.hidden = true
    },
    hideVisibility: function() {
        if (!this.invisible) {
            this.s.visibility = "hidden"
        }
        this.invisible = true
    },
    left: function(b) {
        var a = b.style;
        a.width = String(this.width) + "px";
        a.height = String(this.height) + "px";
        a.position = "absolute";
        a.top = "0px";
        a.right = "0px"
    },
    right: function(b) {
        var a = b.style;
        a.width = String(this.width) + "px";
        a.height = String(this.height) + "px";
        a.position = "absolute";
        a.top = "0px";
        a.left = "0px"
    }
};
var THREEx = THREEx || {};
THREEx.FullScreen = THREEx.FullScreen || {};
THREEx.FullScreen.available = function() {
    return this._hasWebkitFullScreen || this._hasMozFullScreen
};
THREEx.FullScreen.activated = function() {
    if (this._hasWebkitFullScreen) {
        return document.webkitIsFullScreen
    } else {
        if (this._hasMozFullScreen) {
            return document.mozFullScreen
        } else {
            console.assert(false)
        }
    }
};
THREEx.FullScreen.request = function(a) {
    a = a || document.body;
    if (this._hasWebkitFullScreen) {
        a.webkitRequestFullScreen()
    } else {
        if (this._hasMozFullScreen) {
            a.mozRequestFullScreen()
        } else {
            console.assert(false)
        }
    }
};
THREEx.FullScreen.cancel = function() {
    if (this._hasWebkitFullScreen) {
        document.webkitCancelFullScreen()
    } else {
        if (this._hasMozFullScreen) {
            document.mozCancelFullScreen()
        } else {
            console.assert(false)
        }
    }
};
THREEx.FullScreen._hasWebkitFullScreen = "webkitCancelFullScreen" in document ? true : false;
THREEx.FullScreen._hasMozFullScreen = "mozCancelFullScreen" in document ? true : false;
FLIPBOOK.Thumb = function(e, c, f, d, a, b) {
    this.image = new Image();
    this.image.src = c.options.assets.preloader;
    this.image.style.width = String(d) + "px";
    this.image.style.height = String(a) + "px";
    this.imageSrc = f;
    this.index = b;
    this.image.style.position = "absolute";
    this.image.style.userSelect = "none";
    this.image.style.margin = "0px";
    this.image.style.padding = "0px";
    this.image.style.webkitUserSelect = "none";
    this.image.style.MozUserSelect = "none";
    this.image.setAttribute("unselectable", "on");
    this.width = d;
    this.height = a;
    this.$ = e;
    this.preloader = new Image()
};
FLIPBOOK.Thumb.prototype = {
    loadImage: function() {
        var a = this;
        this.preloader.src = this.imageSrc;
        this.$(this.preloader).load(function() {
            a.image.src = a.imageSrc
        })
    }
};
