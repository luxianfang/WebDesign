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
			localStorage.setItem("html",$('#design')[0].innerHTML);
			// getChildren($('#design').children());
			// console.log(arr);
			window.open("preview.html");
		}
	}
});

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("Text");
	// ev.target.appendChild(document.getElementById(data));
	// $(ev.target.id).Tdrag({
	// 	scope: ".design"
	// })

	var html = "";
	if (data == 'div') {
		html = "<div style='width:100%;min-height: 100px;' class='control'></div>"
	}
	if (data == 'label') {
		html = "<label class='control'>文本</label>"
	}
	if (data == 'input') {
		html = "<input class='control' v-model='name'></input>"
	}
	if (data == 'label_input') {
		html = "<div style='width:100%;min-height: 23px;' class='control'><label>文本</label><input></input></div>"
	}

	$(ev.target).on("click", elClick);
	$(ev.target).append(html);
	console.log($('#design').children());
}

var arr = [];

function getChildren(el) {
	$.each(el, function(index, obj) {
		if (obj.children) {
			getChildren(obj.children);
		}
		arr.push(obj);
	})
}

// localStorage.clear();
var currEl;

function elClick(e) {
	console.log(e.target.id)
	if (e.target.id == 'design') return;
	if (currEl != null) {
		currEl.setAttribute("class", "control")
	}
	currEl = e.target;
	// console.log(this)
	e.target.setAttribute("class", "controlSelected")
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
