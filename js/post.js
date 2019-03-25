$.ajaxSetup({
  url: '../formdata.php', // путь к php-обработчику
  type: 'POST', // метод передачи данных
  dataType: 'json', // тип ожидаемых данных в ответе
  beforeSend: function(){ // Функция вызывается перед отправкой запроса
    console.debug('Запрос отправлен. Ждите ответа.');
    $('.preloader').addClass('show');
  },
  error: function(jqXHR, exception){ // отслеживание ошибок во время выполнения ajax-запроса
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
  },
  complete: function(){ // функция вызывается по окончании запроса
    console.debug('Запрос полностью завершен!');
    // тут завершаем показ прелоадера, если вы его показывали
    $('.preloader').removeClass('show');
    $.magnificPopup.close({
        items: {
          src: '#write-us-modal'
        }
    });
    $.magnificPopup.open({
        items: {
          src: '#success-modal'
        },
        type: 'inline'
    });
  }
});

$(function(){
  $('#write_us_modal').on('submit', function(e){
    e.preventDefault();
    var $that = $(this),
    formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
    $.ajax({
      contentType: false, // важно - убираем форматирование данных по умолчанию
      processData: false, // важно - убираем преобразование строк по умолчанию
      data: formData,
      success: function(json){
        if(json){
          // тут что-то делаем с полученным результатом
        }
      }
    });
  });
});