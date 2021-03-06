sap.ui.define([
	"./CoreService",
	"../model/model"
], function (CoreService, model) {
	"use strict";

	var NewsService = CoreService.extend("be.wl.fiori.news.service.NewsService", {
		constructor: function () {
			CoreService.apply(this, arguments);
		},
		getInfo: function () {
			if (!this.model) {
				return Promise.resolve(false);
			}
			return this.odata("/FolderSet('LATEST')").get().then(function (oResult) {
				if (oResult && oResult.data) {
					return oResult.data.Status;
				}
				return false;
			});
		},
		setShowNoMore: function (sFolderName) {
			if (!this.model) {
				return Promise.resolve(true);
			}
			return this.odata("/ShowNoMore").function({
				method: "POST",
				urlParameters: {
					FolderName: sFolderName
				}
			});
		},

		getFolders: function () {
			if (!this.model) {
				return Promise.resolve(model.getFolders());
			}
			var url = "/FolderSet";
			return this.odata(url).get();
		},

		getFolder: function (name) {
			if (!this.model) {
				return Promise.resolve(model.getFolder(name));
			}
			var url = "/FolderSet('" + name + "')";
			return this.odata(url).get({
				urlParameters: {
					$expand: 'FileInfo'
				}
			});
		},

		getVideoSafari: function (videoURL) {
			return this.http(videoURL).get({}, {
				responseType: "blob"
			}).then(function (response) {
				return window.URL.createObjectURL(response);
			});

		}
	});
	return NewsService;
});