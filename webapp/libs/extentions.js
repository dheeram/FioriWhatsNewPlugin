//String extention
String.prototype.format = function () {
	var a = this;
	for (var k in arguments) {
		a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
	}
	return a;
};

// usage 
//=======
// --> console.log("Hello, {0}!".format("World"))

//----------------------------------------------------------------------------------

//add leading zero's to a number
function pad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}

// usage 
//=======
// selectedIndex = pad(selectedIndex, 2);

//----------------------------------------------------------------------------------

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
	for (var i = 0; i < this.length; i++) {
		if (comparer(this[i])) return true;
	}
	return false;
};

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
	if (!this.inArray(comparer)) {
		this.push(element);
	}
};

// usage 
//=======
// array.pushIfNotExist(element, function (e) {
// 	return e.name === element.name && e.text === element.text;
// });

//----------------------------------------------------------------------------------