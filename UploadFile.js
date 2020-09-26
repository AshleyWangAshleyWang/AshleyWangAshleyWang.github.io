const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function () {
    realFileBtn.click();
    console.log("realBtnClicked");
});

realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
        console.log("getFile");
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
        console.log("noFileGot");
    }
});

//Read file and print original file on the web page
var fileInput = document.getElementById("real-file");
fileInput.addEventListener("change", function () {
    var reader = new FileReader();
    reader.onload = function () {
        var lines = this.result.split('\n'); //讀進去時把每行切成一小塊
        document.getElementById('output').innerHTML = reader.result;  //把文件內容放到output裡，所以他會在html是output的地方顯示出來
    };
    reader.readAsBinaryString(this.files[0], 'UTF-8');
});

// 挑選"藥品"相關行，並摘要文字成需要使用的內容
var responseArray = [];
for (var i = 0; i < lines.length; i++) {
    var linesWithoutDateAndTimeInfo = ""
    var objectResult = {}
    if (lines[i].includes("Parameter" && "outpatientPrescription")) {
        linesWithoutDateAndTimeInfo = lines[i]
            .substring(86)
            .replace("}]", "")
            .replace(/^/, "{")
            .concat("}")
            .replace("}], [NHI_REQUEST, 1.48 WritePrescriptionSign]", "")
            .replace(" [BasicData, {", "")
            .replace(/\s/g,"");
        try {
            objectResult = JSON.parse(linesWithoutDateAndTimeInfo); //將字串轉換成物件
            responseArray.push(objectResult);
        } catch (error) {
            console.log(linesWithoutDateAndTimeInfo);
            console.log('error');  //可不用寫，只是為了方便確認error內容
        }
    }
}

// 篩選出MedicalOrderCategory等於01的列 (此列包含藥品資訊)
var haveDrugs = responseArray.filter(function (a) {
    return a.MedicalOrderCategory == 01;
})

var onlyNames = haveDrugs.map(function (person) {
    return person.Name;
})

var dateTime = haveDrugs.map(function (date) {
    return date.DateTime;
})

// Transform MedicalOrderCategory into MedicineName, by drugList.js's content
var medicalItemCode = haveDrugs.map( (itemCode)=> {
    for (var k = 0; k < Object.keys(drugComparision).length; k++) {
        if (itemCode.MedicalItemCode == Object.keys(drugComparision)[k]) {
            medicineName = drugComparision[Object.keys(drugComparision)[k]]
            break;
        }else{
            medicineName = itemCode.MedicalItemCode;  // if drugList.js has no this drug, print original MedicalItemCode
        }
    }
    return medicineName;
})

var days = haveDrugs.map(function (day) {
    return day.Days;
})

var medicalPart = haveDrugs.map(function (part) {
    return part.MedicalPart;
})

var usage = haveDrugs.map(function (method) {
    return method.Usage;
})

var total = haveDrugs.map(function (sum) {
    return sum.Total;
})

// Define the format of output content
var out = ""
for (let a in medicalItemCode) {
    out += "number:  " + a + "\n"
        + "Patient Name: " + onlyNames[a] + ', '
        + "Date: " + dateTime[a] + ', ' + "\n"
        + "Medicine:  " + medicalItemCode[a] + ', ' + "\n"
        + "Days:  " + days[a] + ', '
        + "Medical Part:  " + medicalPart[a] + ', '
        + "Usage:  " + usage[a] + ', '
        + "Total:  " + total[a]  + "\n" 
        + "=================================================================="+ "\n" ;
}
console.log(out);

// If has no drugs, print "No drugs are given"
if (haveDrugs.length !== 0) {
  document.getElementById("medicineAbstract").innerHTML = out;
} else {
  document.getElementById("medicineAbstract").innerHTML =
    "No prescription drugs are given today!";
}