sap.ui.define([
	"./BaseObject",
	"./FileInfo",
], function (BaseObject, FileInfo) {
	"use strict";
	return BaseObject.extend("be.wl.fiori.news.model.Folder", {
		FileInfo: [],

		constructor: function (data) {
			var me = this;

			BaseObject.call(this, data);
			if (data) {
				//extra stuff
				me.FileInfo = [];
				if (data.FileInfo && Array.isArray(data.FileInfo)) {
					data.FileInfo.forEach(function (info) {
						me.addInfo(info);
					});
				}
			}
		},
		addInfo: function (info) {
			this.FileInfo.push(new FileInfo(info));
		},

		getJSON: function () {
			return {};
		}
	});
});