$gwx_XC_1 = function (_, _v, _n, _p, _s, _wp, _wl, $gwn, $gwl, $gwh, wh, $gstack, $gwrt, gra, grb, TestTest, wfor, _ca, _da, _r, _rz, _o, _oz, _1, _1z, _2, _2z, _m, _mz, nv_getDate, nv_getRegExp, nv_console, nv_parseInt, nv_parseFloat, nv_isNaN, nv_isFinite, nv_decodeURI, nv_decodeURIComponent, nv_encodeURI, nv_encodeURIComponent, $gdc, nv_JSON, _af, _gv, _ai, _grp, _gd, _gapi, $ixc, _ic, _w, _ev, _tsd) {
	return function (path, global) {
		if (typeof global === 'undefined') {
			if (typeof __GWX_GLOBAL__ === 'undefined') global = {};
			else global = __GWX_GLOBAL__;
		}
		if (typeof __WXML_GLOBAL__ === 'undefined') {
			__WXML_GLOBAL__ = {};
		}
		__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
		var e_ = {}
		if (typeof (global.entrys) === 'undefined') global.entrys = {};
		e_ = global.entrys;
		var d_ = {}
		if (typeof (global.defines) === 'undefined') global.defines = {};
		d_ = global.defines;
		var f_ = {}
		if (typeof (global.modules) === 'undefined') global.modules = {};
		f_ = global.modules || {};
		var p_ = {}
		__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
		__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
		__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
		var z = __WXML_GLOBAL__.ops_set.$gwx_XC_1 || [];

		function gz$gwx_XC_1_1() {
			if (__WXML_GLOBAL__.ops_cached.$gwx_XC_1_1) return __WXML_GLOBAL__.ops_cached.$gwx_XC_1_1
			__WXML_GLOBAL__.ops_cached.$gwx_XC_1_1 = [];
			(function (z) {
				var a = 11;

				function Z(ops) {
					z.push(ops)
				}
				Z([
					[7],
					[3, '$taroCompReady']
				])
				Z([
					[7],
					[3, '$compid__1523']
				])
				Z([3, 'ht-action-sheet'])
				Z([3, 'anonymousFunc1'])
				Z([3, 'anonymousFunc2'])
				Z([3, 'ht-action-sheet-space'])
				Z([3, 'ht-action-sheet-body'])
				Z([
					[7],
					[3, 'buttons']
				])
				Z([3, 'index'])
				Z([3, 'item'])
				Z([
					[7],
					[3, 'loopArray548']
				])
				Z([3, '$loopState__temp2'])
				Z([3, 'anonymousFunc3'])
				Z([3, 'ht-action-sheet-btn'])
				Z([
					[6],
					[
						[7],
						[3, 'item']
					],
					[3, '_$indexKey']
				])
				Z([3, 'this'])
				Z([a, [
					[6],
					[
						[7],
						[3, 'item']
					],
					[3, '$original']
				]])
				Z([3, 'ht-action-sheet-gap'])
				Z([3, 'anonymousFunc4'])
				Z(z[13])
				Z([a, [
					[7],
					[3, 'common_cancel']
				]])
			})(__WXML_GLOBAL__.ops_cached.$gwx_XC_1_1);
			return __WXML_GLOBAL__.ops_cached.$gwx_XC_1_1
		}
		__WXML_GLOBAL__.ops_set.$gwx_XC_1 = z;
		__WXML_GLOBAL__.ops_init.$gwx_XC_1 = true;
		var x = ['./components/action_sheet/index.wxml'];
		d_[x[0]] = {}
		var m0 = function (e, s, r, gg) {
			var z = gz$gwx_XC_1_1()
			var eN = _v()
			_(r, eN)
			if (_oz(z, 0, e, s, gg)) {
				eN.wxVkey = 1
				var bO = _n('ht-modal')
				_rz(z, bO, 'compid', 1, e, s, gg)
				var oP = _n('view')
				_rz(z, oP, 'class', 2, e, s, gg)
				var xQ = _mz(z, 'view', ['bindtap', 3, 'catchtouchmove', 1, 'class', 2], [], e, s, gg)
				_(oP, xQ)
				var oR = _n('view')
				_rz(z, oR, 'class', 6, e, s, gg)
				var fS = _v()
				_(oR, fS)
				if (_oz(z, 7, e, s, gg)) {
					fS.wxVkey = 1
					var cT = _v()
					_(fS, cT)
					var hU = function (cW, oV, oX, gg) {
						var aZ = _mz(z, 'view', ['bindtap', 12, 'class', 1, 'data-e-tap-a-a', 2, 'data-e-tap-so', 3], [], cW, oV, gg)
						var t1 = _n('text')
						var e2 = _oz(z, 16, cW, oV, gg)
						_(t1, e2)
						_(aZ, t1)
						_(oX, aZ)
						return oX
					}
					cT.wxXCkey = 2
					_2z(z, 10, hU, e, s, gg, cT, 'item', 'index', '$loopState__temp2')
				}
				var b3 = _n('view')
				_rz(z, b3, 'class', 17, e, s, gg)
				_(oR, b3)
				var o4 = _mz(z, 'view', ['bindtap', 18, 'class', 1], [], e, s, gg)
				var x5 = _n('text')
				var o6 = _oz(z, 20, e, s, gg)
				_(x5, o6)
				_(o4, x5)
				_(oR, o4)
				fS.wxXCkey = 1
				_(oP, oR)
				_(bO, oP)
				_(eN, bO)
			}
			eN.wxXCkey = 1
			eN.wxXCkey = 3
			return r
		}
		e_[x[0]] = {
			f: m0,
			j: [],
			i: [],
			ti: [],
			ic: []
		}
		if (path && e_[path]) {
			window.__wxml_comp_version__ = 0.02
			return function (env, dd, global) {
				$gwxc = 0;
				var root = {
					"tag": "wx-page"
				};
				root.children = [];
				g = "$gwx_XC_1";
				var main = e_[path].f
				if (typeof global === "undefined") global = {};
				global.f = $gdc(f_[path], "", 1);
				if (typeof (window.__webview_engine_version__) != 'undefined' && window.__webview_engine_version__ + 1e-6 >= 0.02 + 1e-6 && window.__mergeData__) {
					env = window.__mergeData__(env, dd);
				}
				try {
					main(env, {}, root, global);
					_tsd(root)
					if (typeof (window.__webview_engine_version__) == 'undefined' || window.__webview_engine_version__ + 1e-6 < 0.01 + 1e-6) {
						return _ev(root);
					}
				} catch (err) {
					console.log(err)
				};
				g = "";
				return root;
			}
		}
	}
}(__g.a, __g.b, __g.c, __g.d, __g.e, __g.f, __g.g, __g.h, __g.i, __g.j, __g.k, __g.l, __g.m, __g.n, __g.o, __g.p, __g.q, __g.r, __g.s, __g.t, __g.u, __g.v, __g.w, __g.x, __g.y, __g.z, __g.A, __g.B, __g.C, __g.D, __g.E, __g.F, __g.G, __g.H, __g.I, __g.J, __g.K, __g.L, __g.M, __g.N, __g.O, __g.P, __g.Q, __g.R, __g.S, __g.T, __g.U, __g.V, __g.W, __g.X, __g.Y, __g.Z, __g.aa);
if (__vd_version_info__.delayedGwx || false) $gwx_XC_1();
__wxAppCode__['components/action_sheet/index.wxss'] = setCssToHead([".", [1], "ht-action-sheet{height:100%;width:100%;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}\n.", [1], "ht-action-sheet-space{-webkit-flex:1;-ms-flex:1;flex:1;background-color:#00000000}\n.", [1], "ht-action-sheet-body{background-color:#fff}\n.", [1], "ht-action-sheet-btn{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:", [0, 88], ";border-bottom-width:", [0, 2], ";border-bottom-color:#fafafa;border-bottom-style:solid}\n.", [1], "ht-action-sheet-gap{height:", [0, 40], ";background-color:#e9e9e9}\n", ], undefined, {
	path: "./components/action_sheet/index.wxss"
});
if (__vd_version_info__.delayedGwx) __wxAppCode__['components/action_sheet/index.wxml'] = [$gwx_XC_1, './components/action_sheet/index.wxml'];
else __wxAppCode__['components/action_sheet/index.wxml'] = $gwx_XC_1('./components/action_sheet/index.wxml');