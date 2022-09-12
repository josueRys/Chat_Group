var interval;

class Chat{
    constructor(createdDate,user,space,message){
        this.createdDate = createdDate;
        this.user = user;
        this.space = space;
        this.message = message;
    }
}

class UI{
    getChat(space){
        var xhr = new XMLHttpRequest();
        xhr.open('GET','../model/chat-information.php');
        xhr.onload = function(){

            if(xhr.status === 200){
                var json = JSON.parse(xhr.response);
                var count_msg_bd = json.length;
                var count_msg_ui = document.getElementsByClassName('mess').length;
                
                if(count_msg_bd != count_msg_ui){
                    keepScrollbar();

                    document.getElementById('message').innerHTML = '';

                    for(var i = 0; i<json.length; i++){

                        if(json[i].space === space){    
                            var chat = new Chat();
                            chat.createdDate = json[i].createdDate;
                            chat.user = json[i].user;
                            chat.space = json[i].space;
                            chat.message = json[i].message;

                            var same_user = false;

                            if(i > 0 && json[i].user == json[i-1].user){
                                same_user = true;
                            }

                            var dateTime = new Date(chat.createdDate);
                            var daysSpanish = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];/* 
                            console.log(daysSpanish[dateTime.getDay()]+' '+dateTime.toLocaleTimeString()); */

                            chat.createdDate = dateTime.toLocaleTimeString();

                            var ui = new UI();                    
    
                            ui.insertChat(chat,same_user);

                        }
                    }
                }
            }else{
                console.log('EXISTE UN ERROR DE TIPO: '+xhr.status);
            }
        }   
        xhr.send();
    }

    insertChat(chat,same_user){
        var area_chat = document.getElementById('message');
        var element = document.createElement('div');
        element.setAttribute('class','section');

        if(chat.user == 'local'){
            chat.user = '> ' + chat.user;

            if(same_user == true){
                chat.user = '';
            }
            element.innerHTML = 
            `
            <div class="section_2">
                <div class="message_send">
                    <!--<span class="user">${chat.user}</span> -->
                    <span class="mess">${chat.message}</span>
                    <span class="date">${chat.createdDate}</span>
                </div>
            </div>
            `;
        }else{
            chat.user = '> ' + chat.user;

            if(same_user == true){
                chat.user = '';
            }
            element.innerHTML = 
            `
            <div class="message_received">
                <span class="user">${chat.user}</span>
                <span class="mess">${chat.message}</span>
                <span class="date">${chat.createdDate}</span>
            </div>
            `;
        }
        area_chat.appendChild(element);
    }
}
$("#message").animate({ scrollTop: $('#message').prop("scrollHeight")});

setInterval(function(){
    var first = new UI();
    var space = "sala_1";
    first.getChat(space);
},1000);

function scrollString(message){
    var valid = '';

    var length = message.length - 1;

    for(var i = 0; i<=length; i++){
        if(message.charAt(i) == ' ' && message.charAt(i-1) == ' '){
            valid = valid + '';
        }else{
            valid = valid + message.charAt(i);
        }
    }
    return valid;
}


document.getElementById('send').addEventListener('click',function(e){

    document.getElementById('text').style.height = '36px'; 

    var message = document.getElementById('text').value;
    
    message = message.replace(/(\r\n|\n|\r)/gm, ' ').trim();

    message = scrollString(message);
    console.log("["+ message+ "]");

    if(message != ''){
        $.post('send-message.php',{message:message});

        var get_chat = new UI();
        var space = "sala_1";

        get_chat.getChat(space);

        $("#message").animate({ scrollTop: $('#message').prop("scrollHeight")});

        document.getElementById('area_activity').reset();
    }
    e.preventDefault();
});

function keepScrollbar(){
    var scroll_top = document.getElementById('message').scrollTop;
    var scroll_height = document.getElementById('message').scrollHeight;
    var heig_message = document.getElementById('message').clientHeight;
    var valid = scroll_top + heig_message;

    if(valid == scroll_height){
        $("#message").animate({ scrollTop: $('#message').prop("scrollHeight")});
    }
}


var to;

to = setInterval(function(){
    var message = document.getElementById('text').value;
    
    message = message.replace(/(\r\n|\n|\r)/gm, '');

    /* message = scrollString(message); */

    if(message == ''){
        document.getElementById('area_activity').reset();
        document.getElementById('text').style.height = '36px';
    }else{
        var scroll_height = document.getElementById('text').scrollHeight;
        var med = scroll_height-10;
        var med = med + "px";
        document.getElementById('text').style.height = med;
    }
});
