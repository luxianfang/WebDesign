var list = []
var vue = new Vue({
	el: "#app",
	data: {
		list: list
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

	var el = {};

	if (data == 'div') {
		var div = document.createElement("div");
		div.id = data + "_" + list.length;
		div.className = 'control';
		div.style.width = '100%';
		div.style.minHeight = '100px';
		$(div).on("click",elClick);
		$(ev.target).append(div);

		el = {
			"type": data,
			"name": data + "_" + list.length,
			"id": data + "_" + list.length,
			"class": "control",
			"options": {
				"width": "100%",
				"height": "100px",
				"defaultValue": "",
				"required": false,
				"dataType": "string",
				"fun": ""
			},
			"childNodes": []
		}

	}
	if (data == 'label') {
		var el = document.createElement("label");
		el.innerHTML = '文本';
		el.id = data + "_" + list.length;
		el.className = 'control';
		$(div).on("click",elClick);
		$(ev.target).append(el);

		el = {
			"type": data,
			"name": data + "_" + list.length,
			"id": data + "_" + list.length,
			"class": "control",
			"options": {
				"width": "",
				"height": "",
				"defaultValue": "",
				"required": false,
				"dataType": "string",
				"fun": ""
			},
			"childNodes": []
		}

	}
	if (data == 'input') {
		el = document.createElement("input");
		el.id = data + "_" + list.length;
		el.className = 'control';
		$(div).on("click",elClick);
		$(ev.target).append(el);

		el = {
			"type": data,
			"name": data + "_" + list.length,
			"id": data + "_" + list.length,
			"class": "control",
			"options": {
				"width": "",
				"height": "",
				"defaultValue": "",
				"required": false,
				"dataType": "string",
				"fun": ""
			},
			"childNodes": []
		}
	}
	if (data == 'label_input') {

		var div = document.createElement("div");
		div.id = data + "_" + list.length;
		div.className = 'control';
		div.style.width = '100%';
		div.style.minHeight = '23px';
		$(div).on("click",elClick);

		var label = document.createElement("label");
		label.innerHTML = '文本';
		label.id = data + "_" + list.length;
		$(div).on("click",elClick);

		var input = document.createElement("input");
		input.id = data + "_" + list.length;
		$(div).on("click",elClick);

		$(div).append(label, input);
		$(ev.target).append(div);

		el = {
			"type": "div",
			"name": data + "_" + list.length,
			"id": data + "_" + list.length,
			"class": "control",
			"options": {
				"width": "",
				"height": "",
				"defaultValue": "",
				"required": false,
				"dataType": "string",
				"fun": ""
			},
			"childNodes": [{
					"type": "label",
					"name": "label" + "_" + list.length,
					"id": "label" + "_" + list.length,
					"class": "control",
					"options": {
						"width": "",
						"height": "",
						"defaultValue": "",
						"required": false,
						"dataType": "string",
						"fun": ""
					},
				},
				{
					"type": "input",
					"name": "input" + "_" + list.length,
					"id": "input" + "_" + list.length,
					"class": "control",
					"options": {
						"width": "",
						"height": "",
						"defaultValue": "",
						"required": false,
						"dataType": "string",
						"fun": ""
					}
				}
			]
		}
	}

	console.log(ev.target.id);

	var arr = $.grep(list, function(n, i) {
		return n.id == ev.target.id && ev.target.id != 'design';
	});

	console.log(arr);

	if (arr.length <= 0) {
		list.push(el)
	} else {
		// console.log(arr[0].childNodes);
		arr[0]["childNodes"].push(el);
	}


	//n["childNodes"].push(el);
	//list.push(el)

	console.log(list);
	localStorage.setItem("list", JSON.stringify(list));

}
// localStorage.clear();
var currEl;
function elClick(e) {
	console.log(e.target)
	if(currEl!=null){
		currEl.setAttribute("class","control")
	}
	currEl = e.target;
	// console.log(this)
	e.target.setAttribute("class","controlSelected")
}

