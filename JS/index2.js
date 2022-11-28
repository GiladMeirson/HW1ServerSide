
const oneDay=86400000;
const GenralAPI='https://proj.ruppin.ac.il/cgroup41/test2/tar1/api/'
const idFlat = sessionStorage.getItem("id");

// like on load event 
$(document).ready(function (){
     
    let span = document.getElementById('FlatIdSpan');
    span.innerHTML=idFlat;
    document.getElementById('startDateIN').min=FixStartDate();
    $('#PostOrder').click(POSTorder);
    $('#ShowOrders').click(GETorders)



})

//set the start date to today!!
function FixStartDate() {
    let strdate=''
    let date = new Date();
    strdate=date.getFullYear()+'-'+(parseInt(date.getMonth())+1)+'-'+date.getDate();
    return strdate
    
}
//valid the end date to be after start date
function ChangeEndDate(StartVal) {

    console.log(StartVal);

    var Mstr='';
    var Dstr='';
    pointerS=StartVal;
    let S = new Date(StartVal);
    let E = new Date()
    S.setDate(S.getDate()+10)
    Dstr=S.getDate();
    Mstr=parseInt(S.getMonth()+1);
    if (parseInt(S.getMonth()+1)<10) {
        Mstr='0'+parseInt(S.getMonth()+1);
    }
    if (S.getDate()<10) {
        Dstr='0'+S.getDate();
    } 
        
    
    let strEE=S.getFullYear()+'-'+Mstr+'-'+Dstr
    console.log(strEE)
    
    
    document.getElementById('EndDateIN').min=pointerS;
    document.getElementById('EndDateIN').max=strEE;
}
function GETorders() {
    let api=GenralAPI+'Orders';

    ajaxCall("GET",api,"",getOSCB,geOtECB);
    
}
function POSTorder() {
    let api=GenralAPI+'Orders';
    var obj={};
    obj.Id= $('#orderidIN').val();
    obj.UserId= $('#useridIN').val();
    obj.StartDate= $('#startDateIN').val();
    obj.EndDate= $('#EndDateIN').val();
    obj.FlatId=idFlat;

    
    if (obj.Id!='' && obj.UserId!=''&& obj.StartDate!='' && obj.EndDate!='') {
        obj.StartDate=new Date(obj.StartDate);
        obj.EndDate=new Date(obj.EndDate);
        console.log(obj);
        ajaxCall("POST",api,JSON.stringify(obj),postOSCB,postOECB);
        return false;
    }
}

function postOSCB(data) {
    //data false or true false=already have this vac
    console.log(data)
    if (data==false) {
        alert('Error----\n1)check the Id of the order must be unieq\n2)check the dates')
    }
    else{
        alert('Post succesfully to the server')
    }

}
function postOECB(err) {
    console.log(err)

}


function RenderOrders(Orders) {


    ph=document.getElementById("Order-PH");
    let str='';
    Orders.forEach(order => {
        let Sstr=order.startDate.slice(0,10);
        let Estr=order.endDate.slice(0,10);
        str+=`<div class="FlatCard orderCard">`;
        str+=`<img src="../img/—Pngtree—flat cartoon city illustration_5448418.png" alt="flatsPic">`;
        str+=`<table><tr><td>Order ID:</td><td style="text-align:center;">${order.id}</td></tr>`;
        str+=`<tr><td>User ID:</td><td style="text-align:center;">${order.userId}</td></tr>`;
        str+=`<tr><td>Flat ID:</td><td style="text-align:center;">${order.flatId}</td></tr>`;
        str+=`<tr><td>Start Date:</td><td style="text-align:center;">${Sstr}</td></tr>`;
        str+=`<tr><td>End Date:</td><td style="text-align:center;">${Estr}</td></tr>`;
        str+=`</table></div>`;

        
    });
    ph.innerHTML=str;
    $('.orderCard').fadeIn(2500);
    $('.orderCard').rotate({
        angle: 0,
      animateTo:360,
      duration:2048
    });


    //shablona!!!!********************
    // <div class="FlatCard orderCard">
    //             <img src="../img/—Pngtree—flat cartoon city illustration_5448418.png" alt="flatsPic">
    //             <table>
    //                 <tr>
    //                     <td>Order ID:</td>
    //                     <td style="text-align:center;">10</td>
                       
    //                 </tr>
    //                 <tr>
    //                     <td>User ID:</td>
    //                     <td style="text-align:center;">1220$</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Flat ID:</td>
    //                     <td style="text-align:center;">tel-aviv</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Start Date:</td>
    //                     <td style="text-align:center;">shmoel shmoel 3</td>
    //                 </tr>
    //                 <tr>
    //                     <td>End Date:</td>
    //                     <td style="text-align:center;">3</td>
    //                 </tr>
                  
    //             </table>
    //         </div>
}
function getOSCB(data) {
    console.log(data)
    RenderOrders(data);
}
function geOtECB(err) {
    console.log(err)
}