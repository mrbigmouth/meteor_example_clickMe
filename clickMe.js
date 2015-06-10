//以下程式碼只會在client端執行
if (Meteor.isClient) {
  $(function() {
    //宣告一個reactive data source: counter，並給定初始值
    Session.setDefault('counter', 0);
    //在body上插入作用區域
    $('body').append('<div id="clickMe"><button type="button">Click Me</button> You have pressed the button <span></span> times.</div>');

    //宣告一個reactive computation
    Tracker.autorun(function() {
      //將#clickMe的span內容設定為counter的值
      $('#clickMe').find('span').text( Session.get('counter') );
    });

    //當使用者點擊button時，將counter的值+1
    $('#clickMe').on('click', 'button', function() {
      var counter = Session.get('counter');
      Session.set('counter', counter + 1);
    });
  });
}
