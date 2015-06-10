//以下程式碼只會在client端執行
if (Meteor.isClient) {
  $(function() {
    //宣告一個reactive data source: counter，並給定初始值
    Session.setDefault('counter', 0);
    //宣告一個reactive data source: background，並給定初始值
    Session.setDefault('background', '#FFFFFF');

    //reactive computation: 在body上建立clickMe區塊，內容包含按鈕區域，底色為Session的background設定
    Tracker.autorun(function() {
      //建立clickMe區塊
      console.log('在body中建立了clickMe區塊!');
      $('body').html('' +
        '<div id="clickMe" style="background: ' + Session.get('background') + ';">' +
          '<div>' +
            '<button type="button" id="toRed">Set Background To Red</button>' +
            '<button type="button" id="toGreen">Set Background To Green</button>' +
            '<button type="button" id="toBlue">Set Background To Blue</button>' +
            '<button type="button" id="clickButton">Click Me</button>' +
          '</div>' +
          'You have pressed the button <span></span> times.' + 
        '</div>'
      );

      //reactive computation: 讓counter資訊區域的spen顯示字串為Session的counter數值
      Tracker.autorun(function() {
        //將#clickMe的span內容設定為counter的值
        console.log('將#clickMe的span內容設定為counter的值');
        $('#clickMe').find('span').text( Session.get('counter') );
      });
    });

    //當使用者點擊clickButton時，將counter的值+1
    $('body').on('click', '#clickButton', function() {
      var counter = Session.get('counter');
      Session.set('counter', counter + 1);
    });
    //當使用者點擊toRed時，將background的值設為#FF0000
    $('body').on('click', '#toRed', function() {
      Session.set('background', '#FF0000');
    });
    //當使用者點擊toGreen時，將background的值設為#00FF00
    $('body').on('click', '#toGreen', function() {
      Session.set('background', '#00FF00');
    });
    //當使用者點擊toBlue時，將background的值設為#0000FF
    $('body').on('click', '#toBlue', function() {
      Session.set('background', '#0000FF');
    });
  });
}
