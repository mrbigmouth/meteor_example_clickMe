//以下程式碼只會在client端執行
if (Meteor.isClient) {
  $(function() {
    //宣告一個reactive data source: counter，並給定初始值
    Session.setDefault('counter', 0);
    //宣告一個reactive data source: background，並給定初始值
    Session.setDefault('background', '#FFFFFF');
    //宣告一個reactive data source: firstClicked，並給定初始值
    Session.setDefault('firstClicked', false);

    //reactive computation: 在body上建立clickMe區塊，內容包含按鈕區域，底色為Session的background設定
    Tracker.autorun(function() {
      if (Session.get('firstClicked')) {
        console.log('根據現有的資料重新調整clickMe區塊的底色與顯示字串，但不進行重建。');
        $('#clickMe')
          //將#clickMe的背景顏色設定為background的值
          .css('background', Session.get('background'))
          //將#clickMe的span內容設定為counter的值
          .find('span')
            .text( Session.get('counter') );
      }
      else {
        console.log('在body中建立了clickMe區塊!');
        $('body').html('' +
          '<div id="clickMe" style="background: ' + Session.get('background') + ';">' +
            '<div>' +
              '<button type="button" id="clickButton">Click Me</button>' +
            '</div>' +
            'You have pressed the button <span>' + Session.get('counter') + '</span> times.' + 
          '</div>'
        );
      }
    });

    //當使用者點擊clickButton時，將counter的值+1
    $('body').on('click', '#clickButton', function() {
      var counter = Session.get('counter');
      Session.set('counter', counter + 1);
      Session.set('background', '#FF0000');
      Session.set('firstClicked', true);
    });
  });
}
