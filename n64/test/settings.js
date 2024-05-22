var N64WASMSETTINGS = {
    CLOUDSAVEURL: "",
    SHOWADVANCED: false, //set this to true to enable importing of save files (eep, sra, fla)
    SHOWOPTIONS: false //set this to true to add options for reset and toggling fps
}

let referrer = document.referrer;
if(referrer==null || referrer=="")
	referrer = "NONE";
$.get('https://neilb.net/tetrisjsbackend/api/stuff/AddN64Wasm?referrer=' + referrer);