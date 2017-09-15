$(document).ready(function(){
    $('.calToggle').click(function(){
        $('body').append('<div id="calendarOverlay"></div>')
        $.get("calendar.html", function(data){
            $('#calendarOverlay').html(data);            
            fillCalendar();
            captureToggles();
        });
        $('input').removeClass('selCalToggle');
        $(this).addClass('selCalToggle');
    });
});

var d = new Date();
var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var row = ['.row-0', '.row-1', '.row-2', '.row-3', '.row-4', '.row-5', '.row-6', '.row-7'];
var col = ['.col-0', '.col-1', '.col-2', '.col-3', '.col-4', '.col-5', '.col-6', '.col-7'];

function getDate(j, k){
    i = new Date(d.getFullYear(), d.getMonth() + j, k)
    return i.getDate();
}
    
function fillPreviousMonth(k){
    for(var i = 0; i < k; i++){
        if(i != 0){
            $(row[2] + " > " + col[k - i]).addClass('nonCal prevMonth').text(getDate(0, 1 - i));
        }
    }
}
    
function fillMonth(){
    var j;
    var l = firstDay.getDay();
        
    if(firstDay.getDay() == 0){
        j = 1;
    } else {
        j = 2;
    }
    for(var i = 1; i < lastDay.getDate() + 1; i++) {
        if( $(row[j] + " > " + col[l]).addClass('monthDay').text() != "" && l < 7){
           l++;
        } else {
            l = 1;
            j++;
        }
        $(row[j] + " > " + col[l]).addClass('monthDay').text(i);
    }
}
    
function fillNextMonth(){
    var j;
    if(day[firstDay.getDay()] == "Saturday" || (day[firstDay.getDay()] == "Friday" && lastDay.getDate() == 31)){
        j = 7;
    } else {
        j = 6;
    }
    for(var i = 1; i < (7 - lastDay.getDay()); i++){
        $(row[j] + " > " + col[(lastDay.getDay() + 1) + i]).addClass('nonCal nextMonth').text(i);
    }
}
    
function fillCalendar(){
    $('.prevYear').text("<<");
    $('.prevMonth').text("<");
    $('.monthYear').text(month[d.getMonth()] + " " + d.getFullYear());
    $('.nextMonth').text(">");
    $('.nextYear').text(">>");
    fillPreviousMonth(firstDay.getDay() + 1);
    fillMonth();
    fillNextMonth();
}

function captureToggles(){
    $('.prevYear').click(function(){
        d.setFullYear(d.getFullYear() - 1);
        redrawCalendar();
    })
    $('.prevMonth').click(function(){
        d.setMonth(d.getMonth() - 1);
        redrawCalendar();   
    })
    $('.nextMonth').click(function(){
        d.setMonth(d.getMonth() + 1);
        redrawCalendar();
    });
    $('.nextYear').click(function(){
        d.setFullYear(d.getFullYear() + 1);
        redrawCalendar();  
    });
    $('.monthDay').click(function(){
        $('.monthDay').removeClass('selected');
        $(this).addClass('selected');
        $('.selCalToggle').val((d.getMonth() + 1) + "/" + $('.selected').text() + "/" + d.getFullYear());
    });
    $('.close').click(function(){
        $('#calendarOverlay').remove();
    })
}

function redrawCalendar(){
    firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    $('#calendarOverlay').empty();
    
    $.get("calendar.html", function(data){
        $('#calendarOverlay').html(data);
        fillCalendar();
        captureToggles();
    });   
}