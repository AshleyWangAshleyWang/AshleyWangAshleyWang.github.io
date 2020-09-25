const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

// realFileBtn.addEventListener("Click", function(){
//     realFileBtn.click();
// });

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


var fileInput = document.getElementById("real-file");
fileInput.addEventListener("change", function () {
    var reader = new FileReader();
    reader.onload = function () {
        //document.getElementById('output').textContent=fr.result;
        document.getElementById('output').innerHTML = reader.result;  //把文件內容放到output裡，所以他會在html是output的地方顯示出來
    };
    //reader.readAsText(this.files[0]);
    reader.readAsBinaryString(fileInput.files[0]);
});

// print original file
var fileInput = document.getElementById("real-file");
fileInput.addEventListener("change", function () {
    var reader = new FileReader();
    reader.onload = function () {

        //READ EVERY LINE
        var lines = this.result.split('\n');


        // // GET ONLY RESPONSES
        // var responses = lines;
        // // GET RESPONSE LINE 
        // // ["2020/07/25 17:48:37 Response = [NHI_RESPONSE, {"ErrorCode":0,"SimpleResult":null,"Birthday":"1041122","CardNo":"000076521845","DeliverDate":"1060713","EmergencyPhoneNumber":"","Gender":"F","Name":"陳畇霏","PID":"A232637230","VoidFlag":"1"}]", "2012/01/12 [{}]"]
        // .filter(line => line.includes("Response"))
        // // .filter(line => {
        // //     console.log(line)
        // //     var isInclude = line.includes("Response")
        // //     console.log(isInclude)
        // //     return isInclude

        // // })
        // // SPLIT THE TIME
        // // [[NHI_RESPONSE, {"ErrorCode":0,"SimpleResult":"錯誤代碼：0"}], [NHI_RESPONSE, {"ErrorCode":0,"SimpleResult":"錯誤代碼：0"}]]
        // .map(line => line.substring())
        // // ["{}", "{}"]
        // .map(resArray => resArray[1])
        // // optional
        // // [{}, {}]
        // .map(data => JSON.parse(data))
        // .map(obj => {
        //     if(obj.SimpleResult === null) {
        //         writeline(`name is ${obj.name}`)
        //        writeline(`medicie name is ${obj.name}`)
        //        writeline(`name is ${obj.name}`)
        //     } else {

        //    } 

        // })
        var drugComparision = {
            "AB32312100": "Ibuprofen-400mg",
            "AC31557100": "Voren-50mg",
            "A022122100": "Acetaminophen(Paran) 500mg",
            "AC23239100": "Amoxicillin-500mg",
            "AC46259421": "口內膏",
            "AC13229100": "Amoxicillin-250mg",
            "A000106100": "Erythromycin-250mg",
            "AB08774100": "Potarlon-500mg",
            "AC56643100": "Clindamycin-150mg",
            "AC25279100": "Superzyml(Lysozyme)90mg",
            "A031837100": "Poro-80mg",
            "AC09654100": "Doxymycin-100mg",
            "AC36749100": "Soma",
            "AC09275100": "Vicomp",
            "A003703100": "Epilon",
            "A0490111T0": "Funnix-SR-Tablets-150mg輔寧持續性藥效錠150毫克",
            "A0550051T0": "Prewell-SR-Tablets-150mg-Macro-瑪科隆-複維藥持續性藥效錠150毫克",
            "B0220903EF": "Nicotinell-TTS-30克菸貼片30",
            "B022089396": "Nicotinell-TTS-20克菸貼片20",
            "B0220883EG": "Nicotinell-TTS-10克菸貼片10",
            "B024431100": "Nicotinell-Fruit-4mg-Chewing-Gum克菸-咀嚼錠-(水果口味)4毫克",
            "B024457100": "Nicotinell-Mint-2mg-Chewing-Gum克菸-咀嚼錠-(薄荷口味)2毫克",
            "B024458100": "Nicotinell-Fruit-2mg-Chewing-Gum克菸-咀嚼錠-(水果口味)2毫克",
            "B024499100": "Nicotinell Mint 4mg Chewing Gum克菸 咀嚼錠 (薄荷口味)4毫克",
            "A0386463EH": "Smokfree Nicotine TDDS 15淨菸 經皮戒菸貼片15號",
            "A0386463EJ": "Smokfree Nicotine TDDS 10淨菸 經皮戒菸貼片10號",
            "A0386463EK": "Smokfree Nicotine TDDS 5淨菸 經皮戒菸貼片5號",
            "A058046100": "Smokquit Mint Lozenges 2mg 信東_停菸戒菸薄荷片口含錠2毫克",
            "A058047100": "Smokquit Mint Lozenges 4mg 信東_停菸戒菸薄荷片口含錠4毫克",
            "A0567821T0": "Bupion SR Tablets 150mg 信東_布憂平持續藥效錠150毫克",
            "B024574100": "NiQuitin Mint Lozenges 2mg力抗菸戒菸薄荷片口含錠2毫克",
            "B024575100": "NiQuitin Mint Lozenges 4mg力抗菸戒菸薄荷片口含錠4毫克",
            "B0234281T0": "Wellbutrin Sustained-Release Tablets 150mg威博雋持續性藥效錠",
            "B024740100": "Nicorette Freshmint medicated chewing-gum 2mg 尼古清 薄荷咀嚼錠 2毫克",
            "B024741100": "Nicorette Freshmint medicated chewing-gum 4mg 尼古清 薄荷咀嚼錠 4毫克",
            "B024649100": "Champix film coated tablet 0.5mg戒必適 0.5毫克",
            "A022122100": "Acetaminophen-500mg",
            "AC46259421": "口內膏",
            "AC29172100": "KEFLEX",
            "A032499100": "sinwell200mg",
            "A0493221T0": "Buprotin sustained release F.C. Tablets 150mg Royal 皇佳 慮舒妥持續性藥效膜衣錠150毫克",
            "B024648100": "Champix film coated tablet 1mg戒必適 1毫克",
            "AC23239100": "Amoxicillin-500mg",
            "AC22223100": "Ibuprofen-400mg",
            "A040164151": "ANTI-PHEN",
            "AC29172100": "Cephalexin-500mg",
            "AB45438151": "IDOFEN",
            "AB26653100": "Diclofenac-25mg",
            "AB38019100": "Voren-100mg",
            "AC37603100": "Diclofenac sodium 50mg",
            "AC278491G0": "Lorazepam 0.5mg",
            "AC058131G0": "Solaxin-250mg",
            "BC23792100": "Xyzal",
            "AC03206100": "PASSTON 250mg",
            "AC36160110": "Amolin Powder",
            "AB38288321": "Deherp 5g",
            "AC41378100": "Preconin",
            "AC39867100": "ANZEN",
            "AC20112100": "Tricogyl",
            "AC293451G0": "Flagyl",
            "AB08774100": "Ponstan-500mg",
            "BC211401G0": "Xanax 0.5mg",
            "AC25279100": "Noflagma",
            "AC30557100": "Voren 50mg",
            "AB41378100": "prednisolone 5mg",
            "AC42770100": "Tramadol 100mg",
            "BC22612100": "Augmentin 1g"
        }

        // console.log(Object.keys(drugComparision).length);
        // console.log(Object.keys(drugComparision)[60]);   // select key
        // console.log(drugComparision[Object.keys(drugComparision)[0]]);  //select value

        // RESULT
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
                    .replace(" [BasicData, {", "");
                // console.log(linesWithoutDateAndTimeInfo);
                try {
                    objectResult = JSON.parse(linesWithoutDateAndTimeInfo); //將字串轉換成物件
                    responseArray.push(objectResult);
                } catch (error) {
                    console.log(linesWithoutDateAndTimeInfo);
                    console.log('error');  //可不用寫，只是為了方便確認error內容
                }
            }
        }

        // ------------------------------------
        // var namesArray = responseArray
        // .filter(res => res.ErrorCode)
        // .map(element => element.Name)
        // console.log(namesArray);
        // ------------------------------------   

        // ----------------------------------------------------------------
        // // 試著找試著找ErrorCode不等於0的列
        var haveDrugs = responseArray.filter(function (a) {
            return a.MedicalOrderCategory == 01;
        })
        var onlyNames = haveDrugs.map(function (person) {
            return person.Name;
        })

        var dateTime = haveDrugs.map(function (date) {
            return date.DateTime;
        })

        var medicalItemCode = haveDrugs.map(function (itemCode) {
            for (var k = 0; k < Object.keys(drugComparision).length; k++) {
                if (itemCode.MedicalItemCode == Object.keys(drugComparision)[k]) {
                    medicineName = drugComparision[Object.keys(drugComparision)[k]]
                }
                // else{
                //     medicineName = itemCode.MedicalItemCode;  
                // }
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
        document.getElementById("medicineAbstract").innerHTML = out;
        // ----------------------------------------------------------------

        // var onlyNames = responseArray.map(function(person)  {
        //       return person.Name
        //     })

        // console.log("onlyName:", onlyNames);

        // var allNameByLine = "" 
        // for(var j = 0; j< onlyNames.length;j++){        
        //     // 1. allNameByLine += `${onlyNames[j]}\n ` 
        //     // 2. allNameByLine = `${allNameByLine}${onlyNames[j]}\n`
        //     allNameByLine = allNameByLine + onlyNames[j]+ "\n"
        // }

        // console.log(allNameByLine)

        document.getElementById('output').innerHTML = reader.result;  //把文件內容放到output裡，所以他會在html是output的地方顯示出來
    };
    reader.readAsText(this.files[0], 'UTF-8');
});













// // print original file
// var fileInput = document.getElementById("real-file");

// fileInput.addEventListener("change", function(){
//     var reader=new FileReader();
//     reader.onload=function(){
//         //document.getElementById('output').textContent=fr.result;
//         document.getElementById('output').innerHTML=reader.result;  //把文件內容放到output裡，所以他會在html是output的地方顯示出來
//     };
//     //reader.readAsText(this.files[0]);
//     reader.readAsBinaryString(fileInput.files[0]);
// });