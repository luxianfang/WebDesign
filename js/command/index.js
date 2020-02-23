var list = []
var controlList = [{
		"name": "div",
		"text": "div",
		"html": "<div style='width:100%;min-height: 100px;' class='control'></div>"
	},
	{
		"name": "label",
		"text": "文本",
		"html": "<label class='control'>文本</label>"
	},
	{
		"name": "input",
		"text": "输入框",
		"html": "<input class='control'></input>"
	},
	{
		"name": "label_input",
		"text": "文本输入框",
		"html": "<div style='width:100%;min-height: 23px;' class='control'><label>文本</label><input></input></div>"
	},
]




var vue = new Vue({
	el: "#app",
	data: {
		list: list,
		controlList: controlList
	},

	methods: {
		addLable: function() {
			list.push({
				"type": "label",
				"text": "文本"
			})
		},
		addInput: function() {
			list.push({
				"type": "input",
			})
		},
		addLableInput: function() {
			list.push({
				"type": "label_input",
				"text": "文本"
			})
		},
		preView: function() {
			console.log($('#design'));
			console.log($('#design')[0].innerHTML);
			localStorage.setItem("html", $('#design')[0].innerHTML);
			window.open("preview.html");
		},
		drag: function(ev, index) {
			ev.dataTransfer.setData("id", ev.target.id);
			ev.dataTransfer.setData("html", this.$data.controlList[index].html);
		},
		drop: function(ev) {
			ev.preventDefault();
			var html = ev.dataTransfer.getData("html");
			$(ev.target).on("click", elClick);
			$(ev.target).append(html);
		},
		allowDrop: function(ev) {
			ev.preventDefault();
		},
		nameChange: function(ev) {
			if (currEl != undefined) {
				console.log(ev.target.value)
				console.log(currEl)
				currEl.setAttribute("name", ev.target.value)
				console.log(currEl)
			}

		},
		valueChange: function() {

		}
	}
});

var arr = [];

function getChildren(el) {
	$.each(el, function(index, obj) {
		if (obj.children) {
			getChildren(obj.children);
		}
		arr.push(obj);
	})
}

function setName(el) {
	var r;
	$.each(el, function(index, obj) {
		if (obj.children) {
			setName(obj.children);
		}
		obj.setAttribute("id", obj.localName + "_" + guid())
		obj.setAttribute("name", obj.localName + "_" + guid())
		r = obj;
	})
	return r;
}

var currEl;


function elClick(e) {
	console.log(e.target)
	if (e.target.id == 'design') return;
	if (currEl != null) {
		currEl.setAttribute("class", "control")
	}
	currEl = e.target;
	e.target.setAttribute("class", "controlSelected")
	if (!e.target.id) {
		e.target.setAttribute("id", e.target.localName + "_" + guid())
	}
	if (!e.target.name) {
		e.target.setAttribute("name", e.target.localName + "_" + guid())
	}
	$("#name").val(e.target.name)
	$("#value").val(e.target.value)
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
