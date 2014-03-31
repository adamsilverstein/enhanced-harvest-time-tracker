(function() {
    var e, t, n, i;
    return window.HarvestPlatform = {
        config: window._harvestPlatformConfig,
        initialize: function() {
            var e, t, n = this;
            return window.postMessage ? (this.getSubdomain(), this.setupHarvestXDM(), t = '.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.harvest-timer-icon,.harvest-timer.styled{border:0;font:inherit;font-size:0;line-height:1;margin:0;padding:0;vertical-align:top}.harvest-timer-icon{background:url(https://cache.harvestapp.com/assets/platform/timer-icon.png) no-repeat 0 0;display:inline-block;height:14px;width:12px}@media (min--moz-device-pixel-ratio: 1.3), (-o-min-device-pixel-ratio: 2.6 / 2), (-webkit-min-device-pixel-ratio: 1.3), (min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx){.harvest-timer-icon{background:url(https://cache.harvestapp.com/assets/platform/timer-icon-retina.png) no-repeat 0 0;background-size:24px 14px}}.harvest-timer.styled{background:#fafafa;background:-webkit-linear-gradient(top, #ffffff,#eeeeee);background:-moz-linear-gradient(top, #ffffff,#eeeeee);background:-o-linear-gradient(top, #ffffff,#eeeeee);background:linear-gradient(to bottom, #ffffff,#eeeeee);border:1px solid #bbb;border-radius:2px;cursor:pointer;display:inline-block;height:14px;padding:2px 3px;width:12px;-webkit-font-smoothing:antialiased}.harvest-timer.styled:hover{background:#f0f0f0;background:-webkit-linear-gradient(top, #f8f8f8,#e8e8e8);background:-moz-linear-gradient(top, #f8f8f8,#e8e8e8);background:-o-linear-gradient(top, #f8f8f8,#e8e8e8);background:linear-gradient(to bottom, #f8f8f8,#e8e8e8)}.harvest-timer.styled:active{background:#eee;box-shadow:inset 0 1px 4px rgba(0,0,0,0.1)}.harvest-timer.styled.running{background:#1385e5;background:-webkit-linear-gradient(top, #53b2fc,#1385e5);background:-moz-linear-gradient(top, #53b2fc,#1385e5);background:-o-linear-gradient(top, #53b2fc,#1385e5);background:linear-gradient(to bottom, #53b2fc,#1385e5);border-color:#075fa9}.harvest-timer.styled.running:hover{background:#0e7add;background:-webkit-linear-gradient(top, #49a4fd,#0e7add);background:-moz-linear-gradient(top, #49a4fd,#0e7add);background:-o-linear-gradient(top, #49a4fd,#0e7add);background:linear-gradient(to bottom, #49a4fd,#0e7add)}.harvest-timer.styled.running:active{background:#1385e5;box-shadow:inset 0 1px 5px rgba(0,0,0,0.2)}.harvest-timer.styled.running>.harvest-timer-icon{background-position:-12px 0px}.harvest-data{display:inline-block;font-weight:bold;margin:0 4px}#harvest-iframe-container{background:#fff;border-radius:6px;box-shadow:0 6px 12px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.1);height:300px;margin:0;overflow:hidden;padding:none;-webkit-transition:height 150ms ease;-moz-transition:height 150ms ease;-o-transition:height 150ms ease;transition:height 150ms ease}#harvest-iframe-container iframe{margin:0;overflow:hidden;padding:none;width:500px}.lb_overlay{width:100%;height:100%;background:rgba(0,0,0,0.2);background:-webkit-radial-gradient(50% 40%, 50% 80%, rgba(0,0,0,0.1),rgba(0,0,0,0.3));background:-moz-radial-gradient(50% 40%, 50% 80%, rgba(0,0,0,0.1),rgba(0,0,0,0.3));background:-o-radial-gradient(50% 40%, 50% 80%, rgba(0,0,0,0.1),rgba(0,0,0,0.3));background:radial-gradient(50% 40%, 50% 80%, rgba(0,0,0,0.1),rgba(0,0,0,0.3));opacity:1;filter:progid:DXImageTransform.Microsoft.Alpha(opacity = 20);background-color:#000 \\9}.uhb-large{border-radius:4px !important;height:24px !important;width:24px !important}.uhb-large .harvest-timer-icon{margin:3px 0 0 6px !important}#harvest-css-ready{color:#777}\n', e = document.createElement("style"), document.getElementsByTagName("head")[0].appendChild(e), e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t)), this.addEventListener(window, "message", function(e) {
                return new n.Message(e.data).handle()
            }), this.findTimers(), this.listenForNewTimers(), this.listenForNewChromeTimers(), this.listenForChromeTimerRequests(), this.harvestXDM().setAttribute("data-ready", !0), this.sendMessage({
                element: document.body,
                type: "ready"
            }), this.config.xdm_integration === "atlassian" && AP.require("events", function(e) {
                return e.on("harvest-message", function(e) {
                    return new n.Message(e).handle()
                })
            }), setInterval(function() {
                return n.runningTimerCheck()
            }, 3e4)) : ("undefined" != typeof console && null !== console && console.warn("Harvest Platform is disabled. To start and stop timers in Harvest, cross-domain messaging must be supported by your browser."), !1)
        },
        getSubdomain: function() {
            var e = this;
            return n(this.hpURL("/platform/subdomain.json"), function(t) {
                return t && t.subdomain ? (e.config.subdomain = t.subdomain, e.runningTimerCheck()) : void 0
            })
        },
        setupHarvestXDM: function() {
            var e, t;
            return t = this.hpNamespace("messaging"), e = this.harvestXDM(), e ? void 0 : (e = document.createElement("div"), e.id = t, e.style.display = "none", document.body.appendChild(e))
        },
        harvestXDM: function() {
            return document.getElementById(this.hpNamespace("messaging"))
        },
        listenForEvent: function(e, t) {
            var n;
            return n = this.harvestXDM(), window.jQuery != null ? window.jQuery(n).bind(this.hpEvent(e), t) : this.addEventListener(n, this.hpEvent(e), t)
        },
        listenForExtensionEvent: function(e, t) {
            return this.addEventListener(this.harvestXDM(), this.hpEvent(e), t)
        },
        listenForNewTimers: function() {
            var e = this;
            return this.listenForEvent("timers:add", function(t) {
                var n, i, r, a;
                return n = t.element || ((i = t.originalEvent) != null ? (r = i.detail) != null ? r.element : void 0 : void 0) || ((a = t.detail) != null ? a.element : void 0), n = (null != n ? n.jquery : void 0) != null ? n.get(0) : n, n ? (e.findTimer(n), e.runningTimerCheck()) : void 0
            })
        },
        listenForNewChromeTimers: function() {
            var e = this;
            return this.listenForExtensionEvent("timers:chrome:add", function() {
                var t, n, i, r, a;
                for (i = "." + e.hpNamespace("timer") + ":not([data-listening])", n = document.querySelectorAll(i), r = 0, a = n.length; a > r; r++) t = n[r], e.findTimer(t);
                return e.runningTimerCheck()
            })
        },
        listenForChromeTimerRequests: function() {
            var e = this;
            return this.listenForExtensionEvent("timer:request:chrome", function() {
                var t;
                return t = {
                    service: "chrome.google.com",
                    account: {
                        id: 1
                    },
                    project: {
                        id: 1
                    },
                    item: {
                        id: 1,
                        name: ""
                    }
                }, e.openIframe(null, t)
            })
        },
        findTimers: function() {
            var e, t, n, i, r;
            for (t = document.querySelectorAll("." + this.hpNamespace("timer")), r = [], n = 0, i = t.length; i > n; n++) e = t[n], r.push(this.findTimer(e));
            return r
        },
        findTimer: function(e) {
            var t, n, i, r = this;
            return i = e.getAttribute("data-skip-styling"), n = null != i ? i : this.config.skipStyling || !1, t = this.getData(e), n !== !1 && "false" !== n || e.className.match(/\bstyled\b/i) || (e.innerHTML = "<span class='harvest-timer-icon'></span>", e.className += " styled "), this.addEventListener(e, "click", function(n) {
                return typeof n.stopPropagation == "function" && n.stopPropagation(), n.cancelBubble = !0, r.openIframe(e, t)
            }), e.setAttribute("data-listening", !0)
        },
        getData: function(e) {
            var t, n, i, r, a, o, s, l, d;
            return n = e.getAttribute("data-account"), s = e.getAttribute("data-project"), a = e.getAttribute("data-item"), d = e.getAttribute("data-skip-styling"), null != n && (t = JSON.parse(n)), null != s && (o = JSON.parse(s)), null != a && (r = JSON.parse(a)), null != d && (l = JSON.parse(d)), i = {}, null != t && (t.id = String(t.id), i.account = t), null != o && (o.id = String(o.id), i.project = o), null != r && (r.id = String(r.id), i.item = r), null != l && (i["skip-styling"] = l), i
        },
        createPermalink: function(e, t) {
            return null != e && null != t && (t.account != null && (e = e.replace("%ACCOUNT_ID%", t.account.id)), t.project != null && (e = e.replace("%PROJECT_ID%", t.project.id)), t.item != null && (e = e.replace("%ITEM_ID%", t.item.id))), e
        },
        openIframe: function(e, t) {
            var n, r, a, o, s, l, d, u, m, c;
            alert ( 'ok' );
            return a = {
                app_name: this.config.applicationName,
                service: t.service || window.location.hostname,
                base_url: this.createPermalink(this.config.permalink, t),
                format: "platform",
                external_account_id: (l = t.account) != null ? l.id : void 0,
                external_group_id: (d = t.project) != null ? d.id : void 0,
                external_group_name: (u = t.project) != null ? u.name : void 0,
                external_item_id: (m = t.item) != null ? m.id : void 0,
                external_item_name: (c = t.item) != null ? c.name : void 0
            }, e && (e.className += " " + this.hpNamespace("iframe-open") + " "), s = "/platform/timer?" + i(a), this.config.xdm_integration ? this.config.xdm_integration === "atlassian" ? (s += "&xdm_integration=" + this.config.xdm_integration, AP.require("dialog", function(e) {
                return e.create({
                    url: s
                })
            })) : void 0 : (r = this.hpNamespace("iframe-container"), n = document.getElementById(r), n || (n = document.createElement("div"), n.id = r, document.body.appendChild(n)), o = document.createElement("iframe"), o.id = o.name = this.hpNamespace("iframe"), o.src = this.hpURL(s), o.setAttribute("frameborder", 0), o.setAttribute("width", 500), o.setAttribute("height", 300), n.appendChild(o), this.lightbox = new this.LightBox(n))
        },
        runningTimerCheck: function() {
            var t = this;
            if (this.config.subdomain != null) return this._debouncedRunningTimerCheck || (this._debouncedRunningTimerCheck = e(function() {
                return n(t.hpURL("/platform/running_timer.json"), function(e) {
                    var n;
                    return t.Timer.stopAll(), null != e ? (n = t.Timer.findRunning(e.group_id, e.id), null != n ? new t.Timer(n).start(e.day_entry_id) : void 0) : void 0
                })
            })), this._debouncedRunningTimerCheck()
        },
        sendMessage: function(e) {
            var t, n;
            return null == e && (e = {}), t = e.element || this.harvestXDM(), window.CustomEvent != null ? (n = document.createEvent("CustomEvent"), n.initCustomEvent(this.hpEvent(e.type), !0, !0, e.data), t.dispatchEvent(n)) : window.jQuery != null ? window.jQuery(t).trigger(this.hpEvent(e.type), e.data) : void 0
        },
        hpURL: function(e) {
            var t, n, i;
            return i = this.config.subdomain || "platform", t = this.config.environment || "", n = function() {
                if (t.match(/^staging/)) return "https://" + t + ".harvestapp.com";
                switch (t) {
                    case "test":
                        return "http://" + i + ".localhost.com:" + window.location.port;
                    case "development":
                        return "http://" + i + ".harvestapp.dev";
                    default:
                        return "https://" + i + ".harvestapp.com"
                }
            }(), "" + n + e
        },
        hpNamespace: function(e) {
            return "harvest-" + e
        },
        hpEvent: function(e) {
            return "" + this.hpNamespace("event") + ":" + e
        },
        isLocalEnvironment: function() {
            return ["test", "development"].indexOf(this.config.environment) !== -1
        },
        addEventListener: function(e, t, n) {
            return e.addEventListener != null ? e.addEventListener(t, n) : e.attachEvent != null ? e.attachEvent("on" + t, n) : void 0
        }
    }, i = function(e) {
        var t, n;
        return function() {
            var i;
            i = [];
            for (t in e) n = e[t], null != n && i.push("" + t + "=" + encodeURIComponent(n));
            return i
        }().join("&")
    }, t = function() {
        var e, t;
        return e = "jsonp_callback_", t = (new Date).getTime(),
        function() {
            return e + ++t
        }
    }(), n = function(e, n) {
        var i, r, a, o;
        return i = function(e) {
            var t, n;
            return t = e.indexOf("?") === -1 ? "?" : "&", n = (new Date).getTime(), "" + e + t + "_=" + n
        }, e = i(e), o = new XMLHttpRequest, null != o && o.hasOwnProperty("withCredentials") && window._harvestPlatformConfig.environment !== "test" ? (o.onload = function() {
            var e;
            if (o.status === 200) {
                e = o.responseText;
                try {
                    e = JSON.parse(e)
                } catch (t) {}
                return n(e)
            }
        }, o.withCredentials = !0, o.open("get", e), o.send()) : (r = t(), e += "&callback=" + r, window[r] = function(e) {
            return window[r] = void 0, document.body.removeChild(a), n(e)
        }, a = document.createElement("script"), a.src = e, document.body.appendChild(a))
    }, e = function(e) {
        var t, n, i;
        return i = 100, n = null, t = null,
        function() {
            var r;
            return t = (new Date).getTime(), r = function() {
                var e;
                return e = (new Date).getTime() - t, n = i > e ? setTimeout(r, i - e) : null
            }, n || e.apply(this, arguments), n || (n = setTimeout(r, i))
        }
    }
})(),
function() {
    var e;
    return e = function() {
        function e(e) {
            this.rawMessage = e, this.config = window._harvestPlatformConfig
        }
        return e.prototype.parse = function() {
            var e;
            return e = this.rawMessage.match(/\[project_id:(.*)\]:\[item_id:(.*)\]:([^\"]*)/), null != e ? (this.projectId = e[1], this.itemId = e[2], this.message = e[3], this.timer = HarvestPlatform.Timer.findRunning(this.projectId, this.itemId)) : this.message = this.rawMessage
        }, e.prototype.handle = function() {
            var e, t, n, i, r, a, o, s, l, d, u, m;
            if (this.parse(), HarvestPlatform.isLocalEnvironment && "undefined" != typeof console && null !== console && console.log("XDM message: " + this.message), this.message === "lightbox:close") {
                for (i = document.getElementById(HarvestPlatform.hpNamespace("iframe-container")), e = HarvestPlatform.hpNamespace("iframe-open"), o = new RegExp("\\b" + e + "\\b", "i"), a = document.querySelectorAll("." + HarvestPlatform.hpNamespace("iframe-open")), l = 0, d = a.length; d > l; l++) s = a[l], s.className = s.className.replace(o, "");
                (u = HarvestPlatform.lightbox) != null && u.close()
            }
            return (r = this.message.match(/height:([0-9]+)/)) && (n = r[1], (m = HarvestPlatform.lightbox) != null && m.adjustHeight(n), i = document.getElementById(HarvestPlatform.hpNamespace("iframe")), null != i && i.contentWindow.postMessage("height:done", "*")), (r = this.message.match(/timer:started:([0-9]+)/)) && (t = r[1], HarvestPlatform.Timer.stopAll(), new HarvestPlatform.Timer(this.timer).start(t)), (this.message === "timer:stopped" || this.message === "timer:stopped") && new HarvestPlatform.Timer(this.timer).stop(), (r = this.message.match(/subdomain:([^\"]*)/)) && (this.config.subdomain = r[1], HarvestPlatform.runningTimerCheck()), this.message === "error:timer:not_found" ? HarvestPlatform.Timer.stopAll() : void 0
        }, e
    }(), HarvestPlatform.Message = e
}(),
function() {
    var e;
    return e = function() {
        function e(e) {
            this.element = e
        }
        return e.prototype.start = function(e) {
            var t, n, i, r;
            for (this.dayEntryID = e, this.element.className += " running ", this.element.setAttribute("data-day-entry-id", this.dayEntryID), r = this.element.children, n = 0, i = r.length; i > n; n++) t = r[n], t.className += " running ";
            return HarvestPlatform.sendMessage({
                type: "timer:started"
            })
        }, e.prototype.stop = function() {
            var e, t, n, i;
            for (this.element.className = this.element.className.replace(/\brunning\b/i, ""), this.element.setAttribute("data-day-entry-id", null), i = this.element.children, t = 0, n = i.length; n > t; t++) e = i[t], e.className = e.className.replace(/\brunning\b/i, "");
            return HarvestPlatform.sendMessage({
                type: "timer:stopped"
            })
        }, e.stopAll = function() {
            var e, t, n, i, r;
            for (t = document.querySelectorAll("." + HarvestPlatform.hpNamespace("timer")), r = [], n = 0, i = t.length; i > n; n++) e = t[n], e.className.match(/\brunning\b/i) && r.push(new HarvestPlatform.Timer(e).stop());
            return r
        }, e.findRunning = function(e, t) {
            var n, i, r, a, o, s, l, d;
            for (e = String(e), t = String(t), a = document.querySelectorAll("." + HarvestPlatform.hpNamespace("timer")), l = 0, d = a.length; d > l; l++)
                if (r = a[l], i = r.getAttribute("data-project"), s = JSON.parse(i), s.id = String(s.id), n = r.getAttribute("data-item"), o = JSON.parse(n), o.id = String(o.id), s.id === e && o.id === t) return r
        }, e
    }(), HarvestPlatform.Timer = e
}(), HarvestPlatform.LightBox = function() {
    function e(e) {
        var t, n = this;
        this.el = e, this.iframe = this.el.getElementsByTagName("iframe")[0], this.width = this.iframe.offsetWidth, this.height = this.iframe.offsetWidth, this.el.style.position = "fixed", this.el.style.top = "25%", this.el.style.left = "50%", this.el.style.marginLeft = "-" + this.width / 2 + "px", this.el.style.zIndex = "9999", this.overlay = document.createElement("div"), this.overlay.className = "lb_overlay js_lb_overlay", this.overlay.style.zIndex = "9998", this.overlay.style.position = "fixed", this.overlay.style.top = "0", this.overlay.style.left = "0", this.overlay.style.right = "0", this.overlay.style.bottom = "0", this.overlay.style.height = "100%", this.overlay.style.width = "100%", this.overlay.style.display = "none", t = function() {
            return n.overlay.style.display = "block"
        }, window.setTimeout(t, 0), document.getElementsByTagName("body")[0].appendChild(this.overlay), HarvestPlatform.addEventListener(this.overlay, "click", function() {
            return n.close()
        }), HarvestPlatform.addEventListener(document, "keyup", function(e) {
            return e.which === 27 ? n.close() : void 0
        })
    }
    return e.prototype.adjustHeight = function(e) {
        return this.el.style.height = "" + e + "px", this.iframe.style.height = "" + e + "px"
    }, e.prototype.close = function() {
        return this.overlay ? (this.overlay.parentNode.removeChild(this.overlay), this.overlay = null, this.el.parentNode.removeChild(this.el)) : void 0
    }, e
}(), HarvestPlatform.initialize();
