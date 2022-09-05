function onLoadFunctions() {
	count = 0;
	aux = document.getElementsByClassName("Selected");
	for (let i = 0; i < aux.length; i++) {
		count++;
		aux[i].addEventListener("click", toggleSel);
		aux[i].id = "toggle" + count;
	}
}
function changeFont(fontChoice) {
	var body = document.body;
	var button = document.getElementsByName("bodybutton");
	if (fontChoice === "reg-font") {
		body.className = "";
		button.forEach((element) => {
			element.id = "regbutton";
		});
	} else if (fontChoice === "dyslex-font") {
		body.className = "dyslex";
		button.forEach((element) => {
			element.id = "dysbutton";
		});
	}
}
function changeSelPaid(sel) {
	if (sel == 1) {
		aux = document.getElementsByClassName("notSelected");
		aux1 = aux.length;
		for (let i = 0; i < aux1; i++) {
			aux[0].className = "Selected";
		}
	}
	if (sel == 2) {
		aux1 = document.getElementsByClassName("Prem");
		for (let i = 0; i < aux1.length; i++) {
			aux2 = aux1[i].children;
			for (let j = 0; j < aux2.length; j++) {
				if (aux2[j].className === "Selected") {
					aux2[j].className = "notSelected";
				}
			}
		}
	}
	if (sel == 3) {
		aux2 = document.getElementById("Iconics").children;
		for (let j = 0; j < aux2.length; j++) {
			if (aux2[j].className === "Selected") {
				aux2[j].className = "notSelected";
			}
		}
	}
	document.getElementById("useHearth").className = "";
}
function toggleSel(clickInfo) {
	if (clickInfo.target.className == "Selected") {
		clickInfo.target.className = "notSelected";
	} else {
		clickInfo.target.className = "Selected";
	}
}
function getRaces() {
	aux = document.getElementById("race-sel");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i < aux2.length; i++) {
		aux3.push(aux2[i].alt);
	}
	return aux3;
}
function getIconics() {
	aux = document.getElementById("Iconics");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i < aux2.length; i++) {
		aux3.push(aux2[i].alt);
	}
	return aux3;
}
function getIconicClass(race) {
	switch (race) {
		case "Scourge":
			return { key: "Ranger", value: 6 };
		case "Bladeforged":
			return { key: "Paladin", value: 5 };
		case "Deep Gnome":
			return { key: "Wizard", value: 9 };
		case "PDK":
			return { key: "Fighter", value: 4 };
		case "Razorclaw":
			return { key: "Barbarian", value: 1 };
		case "Scoundrel":
			return { key: "Bard", value: 2 };
		case "Shadar-kai":
			return { key: "Rogue", value: 7 };
		case "Morninglord":
			return { key: "Cleric", value: 3 };
		case "Trailblazer":
			return { key: "Monk", value: 11 };
		default:
			return undefined;
	}
}
function getClasses() {
	aux = document.getElementById("class-sel");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i < aux2.length; i++) {
		aux3.push({
			key: aux2[i].alt.substring(0, aux2[i].alt.length - 2),
			value: parseInt(
				aux2[i].alt.substring(aux2[i].alt.length - 2, aux2[i].alt.length)
			),
		});
	}
	return aux3;
}
function getLevelOptions() {
	aux = document.getElementById("level-opts");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i < aux2.length; i++) {
		aux3.push(aux2[i].innerHTML);
	}
	if (aux3.length == 0) {
		aux3 = ["1"];
	}
	return aux3;
}
function sel_class(class_list, number) {
	aux = [];
	for (let i = 0; i < number; i++) {
		aux2 = randInt(0, class_list.length);
		aux = aux.concat(class_list[aux2]);
		class_list = get_new_class_list(aux, class_list);
	}
	return aux;
}
function get_new_class_list(randomized_choices, class_list) {
	class_list = class_list.filter(function (ele) {
		let result = true;
		randomized_choices.forEach((element) => {
			if (element.value === ele.value) {
				result = false;
			}
		});
		return result;
	});
	return class_list;
}
function sel_levels(number) {
	min_level = Math.abs(document.getElementById("min_level").value);
	max_level = Math.abs(document.getElementById("max_level").value);
	if (number == 1) {
		return [20];
	} else {
		if (number == 2) {
			aux = randInt(Math.max(min_level, 10), Math.min(max_level + 1, 20));
			return [aux, 20 - aux];
		} else {
			aux = randInt(min_level, Math.min(max_level + 1, 19));
			aux2 = randInt(
				Math.max(1, Math.ceil((20 - aux) / 2)),
				Math.min(aux, 20 - aux)
			);
			aux3 = 20 - aux - aux2;
			return [aux, aux2, aux3];
		}
	}
}
function ddoRandomizer() {
	race_list = getRaces();
	iconic_list = getIconics();
	class_list = getClasses();
	level_list = getLevelOptions();
	lvl_opts = level_list[randInt(0, level_list.length)];
	class_choices = sel_class(class_list, lvl_opts);
	level_choices = sel_levels(lvl_opts);
	race_choice = race_list[randInt(0, race_list.length)];
	if (
		iconic_list.indexOf(race_choice) != -1 &&
		!document.getElementById("useHearth").checked
	) {
		needed = getIconicClass(race_choice);
		if (class_choices.indexOf(needed) == -1) {
			index = -1;
			for (let x = 0; x < class_choices.length; x++) {
				if (class_choices[x].value === needed.value) {
					index = x;
				}
			}

			if (index != -1) class_choices[index] = needed;
			else class_choices[randInt(0, class_choices.length)] = needed;
		}
	}
	ans_text = "<tr>" + "<td>" + race_choice + "</td>";
	for (let i = 0; i < lvl_opts; i++) {
		ans_text +=
			"<td>" + class_choices[i].key + " " + level_choices[i] + "</td>";
	}

	ans_text += "</tr>";
	document.getElementById("rand_finished").innerHTML += ans_text;
}
function checkNum(el) {
	if (document.getElementById(el).value > 20) {
		document.getElementById(el).value = 20;
	} else if (document.getElementById(el).value < 7) {
		document.getElementById(el).value = 7;
	} else if (isNaN(document.getElementById(el).value)) {
		if (el == "min_level") document.getElementById(el).value = 7;
		else document.getElementById(el).value = 20;
	}
}
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function clearer() {
	document.getElementById("rand_finished").innerHTML =
		'<tr><th class="table_top">Race</th><th class="table_top">Class 1</th><th class="table_top">Class 2</th><th class="table_top">Class 3</th></tr>';
}
