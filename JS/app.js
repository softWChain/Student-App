
var students = [];
$(document).ready(function(){
    
    //localStorage.allStudents = "";

});

$(document).on("pagecontainerbeforechange",function(ev,ui){
    if(ui.toPage[0].id === "login_screen"){
        console.log('Register Screen loaded');
        //$("#female").attr("checked",true).checkbox("refresh");
        //$('#male, #female').prop('checked', true).checkboxradio('refresh');
        if(sessionStorage.isLogin === "YES"){
            $.mobile.pageContainer.pagecontainer("change","student.html",{transition:"slide"});
            ev.preventDefault();
        }
        var isMale = $("#username").val("");
        var isFemale = $("#password").val("");  
    }
    else if(ui.toPage[0].id === "student_screen"){
        initList();
    }else if(ui.toPage[0].id === "student_register_screen"){
        var stuObj = ui.options.student;
        $("#stu_id").val(stuObj.stid);
        if(stuObj.stid !== -1){
            //restore values
            $("#firstname").val(stuObj.fname);
            $("#lastname").val(stuObj.lname);
            $("#rollnum").val(stuObj.rollnum);
            $("#subject").val(stuObj.subject).selectmenu("refresh");
            $("#stdaddedit").html("Edit");
            $("#deletestudent").show();
        }else{
            $("#stdaddedit").html("Add");
            $("#deletestudent").hide( );


        }
        
    } 
});

function registerUser(){
    var uname = $("#regusername").val();
    var pwd = $("#regpassword").val();
    if(uname !== "" && pwd !== ""){

        var isMale = $("#male").prop("checked");
        var isFemale = $("#female").prop("checked");
        var isBusiness = $("#business").prop("checked");
        var isTravel = $("#travel").prop("checked");
        var isOthers = $("#others").prop("checked");
        var isArts = $("#arts").prop("checked");

        //console.log("isMale " + isMale + "isFemale " + isFemale);

        var regObj = {uname:uname,pwd:pwd,isMale:isMale
                    ,isFemale:isFemale,isBusiness:isBusiness
                    ,isTravel:isTravel,isOthers:isOthers,isArts:isArts};
        localStorage.regData = JSON.stringify(regObj);

        $.mobile.back();
    }

}

function checkLogin(){

    var regObj = JSON.parse(localStorage.regData);
    var registeredUname = regObj.uname;
    var registeredPwd = regObj.pwd;

    if($("#username").val() ===registeredUname && $("#password").val() == registeredPwd ){
        $.mobile.pageContainer.pagecontainer("change","student.html",{transition:"slide"});
        //sessionStorage.isLogin = true;
        $("#username").val("");
        $("#password").val("");
        sessionStorage.isLogin = "YES";   
    }
    else{
        $("#pwdalert").popup("open");
        //sessionStorage.isLogin = false;
        sessionStorage.isLogin = "NO";

    }
}

function logout(){
    sessionStorage.isLogin = false;
    //$.mobile.pageContainer.pagecontainer("change","index.html",{transition:"slide"});
    
    var isMale = $("#username").val("");
    var isFemale = $("#password").val("");
    $.mobile.back();
    
}



function addStudent(){
    var stid  = $("#stu_id").val();
    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var rollnum = $("#rollnum").val();
    var subject = $("#subject").val();
    var stuObj = {};
    if(stid == -1){
        stuObj= {stid: students.length,fname:fname,lname:lname,rollnum:rollnum,subject:subject};
        students.push(stuObj);
    }else{
        stuObj = {stid:stid,fname:fname,lname:lname,rollnum:rollnum,subject:subject};
        students.splice(stid,1,stuObj);
    } 

    localStorage.allStudents = JSON.stringify(students);
    $.mobile.back();
    initList();

}

function initList(){
    if(localStorage.allStudents){
        $("#student_list").empty();
        students = JSON.parse(localStorage.allStudents);
        for(var i=0;i<students.length;i++){

            $("#student_list").append('<li><a href="javascript:adddEditDeleteStudent('+i+')" >' + students[i].fname +'</a></li>');/* 
            $("#student_list").append('<li><a href="">' + students[i].lname +'</a></li>');
            $("#student_list").append('<li><a href="">' + students[i].rollnum +'</a></li>');
            $("#student_list").append('<li><a href="">' + students[i].subject +'</a></li>'); */

        }
        //$("#student_list").listview("refresh");
        
    }
}

function adddEditDeleteStudent(index){
    var stuObj = {};
    if(index === -1){
        //for new student record
        stuObj = {stid:-1};
    }else{
        //edit//delete existing student record
        stuObj = students[index];
    }
    
    $.mobile.pageContainer.pagecontainer("change","regeditstudent.html",{student:stuObj,transition:"slide"});

}


function deleteStudent(){
    $("#deletealert").popup("open"); 
}

function deleteConfirm(){
    var sidString = $("#stu_id").val();
    var sidInt = parseInt(sidString);
    console.log(sidInt)

    students.splice(sidInt,1);
        //reindex objects
        for(var i=0;i<students.length;i++){
            var stdObj = students[i];
            stdObj.stid = i;
            students[i] = stdObj;
        }
    localStorage.allStudents = JSON.stringify(students);

    $.mobile.back();
    $.mobile.back();

}

