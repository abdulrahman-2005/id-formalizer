const actionContainer = document.getElementById("action-container");
const actionContainerHTML = actionContainer.innerHTML;
const input = document.getElementById("id-digits");
const finderJoke = document.getElementById("finder");
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
                <div class="data"><span class="title">الرقم القومي</span><span>#ID</span></div>
            </article>
			`
		.replace("#DATEOFBIRTH", data.dayOfBirth)
		.replace("#GENDER", data.gender)
		.replace("#GOVERNORATE", data.governorate)
		.replace("#BIRTHNUMBER", data.special)
		.replace("#ID", data.id);
	return template;
}

function submit(id_input = "") {
	const id = id_input || input.value;
	if (id.length !== 14) {
		alert("الرقم القومى غير صحيح");
		return;
	}
	const century = ((+id[0] - 2) * 100 + 1900).toString().substring(0, 2);
	const year = century + id[1] + id[2];
	const month = id[3] + id[4];
	const day = id[5] + id[6];

	const dayOfBirth = `${day}/${month}/${year}`;

	const governorate = governorates[id[7] + id[8]];
	const special = id[9] + id[10] + id[11] + id[12];
	const gender = id[12] % 2 === 0 ? "أنثى" : "ذكر";
	const secret = id[13];
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
			id: id,
		});
		finderJoke.innerHTML = "بطاقة فايندر - بياناتك"
	}, 2000);
}

function back() {
	actionContainer.innerHTML = actionContainerHTML;
	finderJoke.innerHTML = "بطاقة فايندر - هات رقمك"
}

function loading() {
	actionContainer.innerHTML = `
	جارى التحميل
	<div class="lds-facebook"><div></div><div></div><div></div></div>
	`;
	
	finderJoke.innerHTML = "بطاقة فايندر - استنى شوية"
}
