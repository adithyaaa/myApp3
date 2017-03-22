$('#formdiv').hide();
$('#subm').click(function() {
	$('#formdiv').slideDown();
	$("input[id^='up']").prop('disabled', true);
});
$('#formclose').click(function() {
	$('#formdiv').slideUp();
	$("input[id^='up']").prop('disabled', false);
});


$('#formdiv1').hide();

$('#closeupdate').click(function() {
	$('#formdiv1').slideUp();
	$("input[id^='up']").prop('disabled', false);
	$("input[id^='del']").prop('disabled', false);
	$("input[id^='show']").prop('disabled', false);
	$("#subm").prop('disabled', false);
	$('#formupdate').prop('disabled', false);
	$('#paraupdate').html('');
});
var localvalue = JSON.parse(localStorage.getItem("Dusername"));

var appendtable = function(upobj,flag1,i) {
	if(flag1==0) {
		var content= "<table id='myTable' style='width: 100%; text-align: center;margin-top:4px;'>" ;
			content += '<tr id="'+i+'"><td>' + upobj.username + '</td><td>'+upobj.email+'</td><td>'+upobj.ulocation+'</td><td>'+upobj.phno+'</td><td><input type="button"  id ="show'+i+'" value="Show" /><input type="button"  id ="del'+i+'" value="Delete" /><input type="button"  id ="up'+i+'" value="Update" /></td></tr>';
		content += "</table>"

		$('#updatetable').html(content);
	} else if(flag1 == 1) {
	var content;
		content += '<tr id="'+i+'"><td>' + upobj.username + '</td><td>'+upobj.email+'</td><td>'+upobj.ulocation+'</td><td>'+upobj.phno+'</td><td><input type="button"  id ="show'+i+'" value="Show" /><input type="button"  id ="del'+i+'" value="Delete" /><input type="button"  id ="up'+i+'" value="Update" /></td></tr>';
		
		$('#myTable').append(content);	
	}
}

 
var updatetable = function(dataobj) {
	var content= "<table id='myTable' style='width: 100%; text-align: center; margin-top:4px;'>" ;
	var len = dataobj.length;
	for(var i=0;i<len;i++){
		content += '<tr id="'+i+'"><td>' + dataobj[i].username + '</td><td>'+dataobj[i].email+'</td><td>'+dataobj[i].ulocation+'</td><td>'+dataobj[i].phno+'</td><td><input type="button"  id ="show'+i+'" value="Show" /><input type="button"  id ="del'+i+'" value="Delete" /><input type="button"  id ="up'+i+'" value="Update" /></td></tr>';
	}
	content += "</table>"

	$('#updatetable').html(content);
	localvalue = JSON.parse(localStorage.getItem("Dusername"));
}

var readlocal = function() {
	localvalue = JSON.parse(localStorage.getItem("Dusername"));
	var nvalue = JSON.parse(localStorage.getItem("Dusername"));
	updatetable(nvalue);
}

var ajreq = function() {
	jQuery.ajax({
		type:'GET',
		url:'dataj.json',
		dataType: "json",
		success: function(data) {
			localStorage.setItem("Dusername", JSON.stringify(data));
			updatetable(data);
		}
		
	});
}

$('#formsave').click(function() {
	
	if($('#uname').val()!="" &&$('#email').val()!="" &&$('#loca').val()!="" &&$('#pho').val()!="" ) {
	var obj1 = {
		username:$('#uname').val(),
		email:$('#email').val(),
		ulocation:$('#loca').val(),
		phno:$('#pho').val()
	};
	//appendtable(obj1);
	var nvalue = JSON.parse(localStorage.getItem("Dusername"));
	var len1 = nvalue.length;
	nvalue.push(obj1);
	localStorage.setItem("Dusername", JSON.stringify(nvalue));
	readlocal();
	localvalue = JSON.parse(localStorage.getItem("Dusername"));
	}
});

$('#formreset').click(function() {
	$('#uname').val('');
	$('#email').val('');
	$('#loca').val('');
	$('#pho').val('');
});

var serchobj = function(serstr) {
	var nvalue = JSON.parse(localStorage.getItem("Dusername"));
	var len = nvalue.length;
	var flag = 0;
	for(var i=0;i<len;i++){
		if(nvalue[i].username.search(serstr) != -1||nvalue[i].email.search(serstr) != -1||nvalue[i].ulocation.search(serstr) != -1||nvalue[i].phno.search(serstr) != -1) {
			if(flag == 1) {
				appendtable(nvalue[i],flag,i);
				
			} else if(flag == 0) {
				appendtable(nvalue[i],flag,i);
				
			}
			flag = 1;
			
		} 
	}
	if(flag!=1){
		$('#updatetable').html('');
	}
}

jQuery('#serval').on('input',function() {
	serchobj(jQuery('#serval').val());
});


if(localStorage.getItem("Dusername") != null)
	{
		
		readlocal();
	}
	else {
		
		ajreq();
		
}

var disablebtn = function(btnid) {
	$('#show'+btnid).prop('disabled', true);
	$('#del'+btnid).prop('disabled', true);
	$('#up'+btnid).prop('disabled', true);
}

var enablebtn = function(btnid) {
	$('#show'+btnid).prop('disabled', false);
	$('#del'+btnid).prop('disabled', false);
	$('#up'+btnid).prop('disabled', false);
}

jQuery(document).on("click","input[id^='show']",function() {
	var str = this.id;
	var res = str.substring(4);
	 var tr = '<tr id="view'+res+'"><th colspan="5" style="height:auto;border: 1px solid black;border-radius: 3px; background-color:aliceblue">'+localvalue[res].username+'</br>'+localvalue[res].email+'</br>'+localvalue[res].ulocation+'</br>'+localvalue[res].phno+'</br><input type="button"  id ="close'+res+'" value="close" /> '+'</th></tr>' 
	$('#'+res).after(tr);	
	disablebtn(res);
	
	
});

jQuery(document).on("click","input[id^='close']",function() {
	var str = this.id;
	var res = str.substring(5);
	$('table#myTable tr#view'+res).remove();
	enablebtn(res);
	
});

jQuery(document).on("click","input[id^='del']",function() {
	var str = this.id;
	var res = str.substring(3);
	
	localvalue.splice(res,1);
	
	localStorage.setItem("Dusername", JSON.stringify(localvalue));
	readlocal();
	localvalue = JSON.parse(localStorage.getItem("Dusername"));
});

var updateid = 0;
jQuery(document).on("click","input[id^='up']",function() {
	var str = this.id;
	var res = 0;
	res = str.substring(2);
	updateid = str.substring(2);
	$("input[id^='up']").prop('disabled', true);
	$("input[id^='del']").prop('disabled', true);
	$("input[id^='show']").prop('disabled', true);
	$("#subm").prop('disabled', true);
	$('#formdiv1').slideDown();
	$('#uname1').val(localvalue[res].username);
	$('#email1').val(localvalue[res].email);
	$('#loca1').val(localvalue[res].ulocation);
	$('#pho1').val(localvalue[res].phno);
	
});

$('#formupdate').click(function() {
		if($('#uname1').val()!="" &&$('#email1').val()!="" &&$('#loca1').val()!="" &&$('#pho1').val()!="" ) {
			
			localvalue[updateid].username = $('#uname1').val();
			localvalue[updateid].email = $('#email1').val();
			localvalue[updateid].ulocation = $('#loca1').val();
			localvalue[updateid].phno = $('#pho1').val();
			localStorage.setItem("Dusername", JSON.stringify(localvalue));
			readlocal();
			localvalue = JSON.parse(localStorage.getItem("Dusername"));
			var pa = '<p id="paraupdate">Row Updated</p>'
			$('#userdata1').append(pa);
			$('#formupdate').prop('disabled', true);
		}
		
	});