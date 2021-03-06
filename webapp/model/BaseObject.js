sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("be.wl.fiori.news.model.BaseObject", {
		constructor: function (data) {
			if (data) {
				for (var field in data) {
					switch (typeof (data[field])) {
					case "object":
						if (data[field] && data[field]["results"]) {
							data[field] = data[field]["results"];
						} else if (data[field]) {
							this[field] = data[field];
						}
						break;
					default:
						this[field] = data[field];
					}

				}
			}
			if (this.isState) {
				this.getModel().attachPropertyChange(function (oProperty) {
					var fChangeFunction = this.getChangeFunction(oProperty.getParameter("path"));
					this.callChangeFunction(fChangeFunction, arguments);
					if (oProperty.getParameter("context")) {
						fChangeFunction = this.getChangeFunction(oProperty.getParameter("context").getPath() + "/" + oProperty.getParameter("path"));
						this.callChangeFunction(fChangeFunction, arguments);
					}
					//this.updateModel();
				}.bind(this), this);
			}
		},
		getChangeFunction: function (sPath) {
			return sPath.split("/").reduce(function (prev, curr, idx, array) {
				if (idx === array.length - 1) {
					return {
						obj: prev.obj,
						fn: prev.obj[curr + "Changed"]
					};
				}
				return {
					obj: curr && curr.length > 0 && prev.obj ? prev.obj[curr] : prev.obj
				};
			}, {
				obj: this,
				fn: this
			});
		},
		getUniqueEntries: function (aArray, sObject, sField) {
			var flags = {};
			return aArray.map(function (oItem) {
				return oItem[sObject];
			}).filter(function (oItem) {
				if (flags[oItem[sField]]) {
					return false;
				}
				flags[oItem[sField]] = true;
				return true;
			});
		},
		getUTCDate: function (oDate) {
			var now_utc = Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(),
				oDate.getHours(), oDate.getMinutes(), oDate.getSeconds());

			return new Date(now_utc);
		},
		callChangeFunction: function (fChangeFunction, args) {
			var aArgs = [this].concat([].slice.call(args));
			fChangeFunction && fChangeFunction.fn && fChangeFunction.fn.apply(fChangeFunction.obj || this, aArgs); // eslint-disable-line
		},
		getModel: function () {
			if (!this.model) {
				this.model = new JSONModel(this, true);
				//this.model.setData(this);
			}
			return this.model;
		},
		updateModel: function (bHardRefresh) {
			if (this.model) {
				this.model.refresh(bHardRefresh ? true : false);
			}
		},
		getData: function () {
			var req = jQuery.extend({}, this);
			delete req["model"];
			return req;
		},
		isEmpty: function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}
			return JSON.stringify(obj) === JSON.stringify({});
		}
	});
});