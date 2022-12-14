const actionContainer = document.getElementById("action-container");
const finderJoke = document.getElementById("finder");
const actionContainerHTML = `
<article id="id-number-container">
	<h1>ادخل رقم البطاقة</h1>
	<input type="text" id="id-digits">
	<button onclick="submit()">البيانات</button>
	<button onclick="generate_random_id()">عشوائي</button>
	</article>`
const governorates = {
	"01": "القاهرة",
	"02": "الإسكندرية",
	"03": "بورسعيد",
	"04": "السويس",
	11: "دمياط",
	12: "الدقهلية",
	13: "الشرقية",
	14: "القليوبية",
	15: "كفر الشيخ",
	16: "الغربية",
	17: "المنوفية",
	18: "البحيرة",
	19: "الإسماعيلية",
	21: "الجيزة",
	22: "بني سويف",
	23: "الفيوم",
	24: "المنيا",
	25: "أسيوط",
	26: "سوهاج",
	27: "قنا",
	28: "أسوان",
	29: "الأقصر",
	31: "البحر الأحمر",
	32: "الوادى الجديد",
	33: "محافظة مطروح",
	34: "شمال سيناء",
	35: "جنوب سيناء",
	88: "خارج الجمهورية",
};

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

function fillTemplate(data) {
	const template = `
	<button onclick="back()" id="back">العودة</button>
            <article id="output-container">
                <div class="data"><span class="title">تاريخ الميلاد</span><span>#DATEOFBIRTH</span></div>
                <div class="data"><span class="title">النوع</span><span>#GENDER</span></div>
                <div class="data"><span class="title">المحافظة</span><span>#GOVERNORATE</span></div>
                <div class="data"><span class="title">المولود رقم</span><span>#BIRTHNUMBER</span></div>
				<div class="data"><span class="title">العمر</span><span>#AGE</span></div>
				<div class="data"><span class="title">الرقم القومي</span><span>#ID</span></div>
				</article>
			`
		.replace("#DATEOFBIRTH", data.dayOfBirth)
		.replace("#GENDER", data.gender)
		.replace("#GOVERNORATE", data.governorate)
		.replace("#BIRTHNUMBER", data.special)
		.replace("#AGE", data.age)
		.replace("#ID", data.id);
	return template;
}

function submit(opt="get",id_input = false) {
	const input = document.getElementById("id-digits");
	const id = id_input || input.value;
	if (id.length !== 14) {
		alert("الرقم القومى غير صحيح");
		return;
	}
	input.value = "";

	const century = ((+id[0] - 2) * 100 + 1900).toString().substring(0, 2);
	const year = century + id[1] + id[2];
	const month = id[3] + id[4];
	const day = id[5] + id[6];
	
	const dayOfBirth = `${day}/${month}/${year}`;
	
	const governorate = governorates[id[7] + id[8]];
	const special = id[9] + id[10] + id[11] + id[12];
	const gender = id[12] % 2 === 0 ? "أنثى" : "ذكر";
	const secret = id[13];
	let years = currentYear - parseInt(year);
	let months = currentMonth - parseInt(month);
	let days = currentDay - parseInt(day);
	if (days < 0 && years > 0) {
		months--;
		days += 30;
	}
	if (months < 0 && years > 0) {
		years--;
		months += 12;
	} else if (years < 0) {
		months = -months;}

	const age = `${years} سنة و ${months} شهر و ${days} يوم`;
	console.table({
		dayOfBirth,
		governorate,
		gender,
		special,
		secret,
	});
	
	loading();
	setTimeout(() => {
		actionContainer.innerHTML = fillTemplate({
			dayOfBirth: dayOfBirth,
			gender: gender,
			governorate: governorate,
			special: special,
			secret: secret,
			id: opt === "get" ? "سر" : id,
			age: age
		});
		finderJoke.innerHTML = "بطاقة فايندر - بياناتك"
	}, 2000);
}

function back() {
	actionContainer.innerHTML = actionContainerHTML;
	finderJoke.innerHTML = "بطاقة فايندر - هات رقمك"
}

function generate_random_id() {
	let century = Math.floor(Math.random() * 2) + 2;
	century = century.toString();
	let year = Math.floor(Math.random() * 100);
	let month = Math.floor(Math.random() * 12) + 1;
	let day = Math.floor(Math.random() * 28) + 1;
	
	day = day < 10 ? "0" + day : day;
	month = month < 10 ? "0" + month : month;
	year = year < 10 ? "0" + year : year;
	
	//gov will be random from object keys governorates
	let gov = Object.keys(governorates)[Math.floor(Math.random() * Object.keys(governorates).length)].toString();
	let special = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
	let secret = Math.floor(Math.random() * 10).toString();
	let id = `${century}${year}${month}${day}${gov}${special}${secret}`;
	// console.table({
	// 	"id": id,
	// 	"length": id.length,
	// 	"century": century,
	// 	"year": year,
	// 	"month": month,
	// 	"day": day,
	// 	"gov": gov,
	// 	"special": special,
	// 	"secret": secret,
	// });
	submit(opt="random", id_input=id);
}

function loading() {
	actionContainer.innerHTML = `
	جارى التحميل
	<div class="lds-facebook"><div></div><div></div><div></div></div>
	`;
	
	finderJoke.innerHTML = "بطاقة فايندر - استنى شوية"
}
