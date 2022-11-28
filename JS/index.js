const GenralApi='https://proj.ruppin.ac.il/cgroup41/test2/tar1/api/'

$(document).ready(function() {

    GetFlats();
    $('#PostFlat').click(PostFlat)
    

});


//wire to onload jquery 
function GetFlats() {
    let api=GenralApi+'Flats';

    ajaxCall("GET",api,"",getSCB,getECB);

}
function PostFlat() {
    let api=GenralApi+'Flats';
    var obj={}
    obj.id=parseInt($('#idIN').val())
    obj.price=parseFloat($('#PriceIN').val())
    obj.city=$('#CityIN').val();
    obj.address=$('#AddressIN').val();
    obj.roomsN=parseFloat($('#roomsIN').val());


    
    if (obj.id!='' && obj.price!=''&& obj.city!='' && obj.address!='' && obj.roomsN!='' && obj.roomsN<='10'&&obj.roomsN>='1'&&obj.price>=0) {
        ajaxCall("POST",api,JSON.stringify(obj),postSCB,postECB);
        return false;
    }
    
    
}

//call back for POST flat
function postSCB(data) {
    console.log(data)
    if (data==false) {
        alert('There is already flat with this ID !')
    }
    GetFlats();
}
function postECB(err) {
    console.log(err)
}

//call backs for GET flats 
function getSCB(data) {
    console.log(data);
    RenderFlat(data);
}
function getECB(err){
    console.log(err);
}

//wire to order btn to click event replace the url to index2html
function OrderBTN(btn) {
    sessionStorage.setItem("id", btn.id);
    let XX = sessionStorage.getItem("id");
    console.log(XX);
    //REF to Order Page!
    window.location.assign("../pages/index2.html")
}

//render all the cards from flats array !
function RenderFlat(Flats) {
    ph=document.getElementById("Flats-PH");
    let str='';
    Flats.forEach(flat => {
        str+=`<div class="FlatCard">`;
        str+=`<img src="../img/—Pngtree—vector flat icon_4091872.png" alt="flatsPic">`;
        str+=`<table><tr><td>ID:</td><td style="text-align:center;">${flat.id}</td></tr>`;
        str+=`<tr><td>Price:</td><td style="text-align:center;">${flat.price}$</td></tr>`;
        str+=`<tr><td>City:</td><td style="text-align:center;">${flat.city}</td></tr>`;
        str+=`<tr><td>Adress:</td><td style="text-align:center;">${flat.address}</td></tr>`;
        str+=`<tr><td>Rooms number:</td><td style="text-align:center;">${flat.roomsN}</td></tr>`;
        str+=`<tr><td colspan="2"><button onClick="OrderBTN(this)" id="${flat.id}">Click to Order</button></td></tr>`;
        str+=`</table></div>`;

        
    });
    ph.innerHTML=str;



 

}