var clickMeBackground = ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF'];
//Click Me物件
function ClickMe() {
  this.id = '' + Date.now();
  this.bgIndex = new ReactiveVar(0);
  this.count = new ReactiveVar(0);
  //建立HTML
  this.initializeHTML();
  //綁定button事件
  this.bindButtonEvents();
  //建立響應式運算自動更新背景顏色與count值
  this.startAutorun();
  //將HTML插入到body上
  this.$el.appendTo('body');
}
ClickMe.prototype.initializeHTML = function() {
  this.$el = $(
    $.parseHTML(
      '<div id="' + this.id + '">' +
        '<div>' +
          '<button type="button" data-action="addCount">Add Count</button>' +
          '<button type="button" data-action="changeBg">Change Background</button>' +
          '<button type="button" data-action="remove">Remove Me</button>' +
        '</div>' +
        'This count is <span>' + this.count.get() + '</span> times.' + 
      '</div>'
    )
  );
};
ClickMe.prototype.bindButtonEvents = function() {
  var _this = this;
  this.$el
    .on('click', 'button[data-action="addCount"]', function() {
      _this.count.set( _this.count.get() + 1 );
    })
    .on('click', 'button[data-action="changeBg"]', function() {
      if (_this.bgIndex.get() >= clickMeBackground.length) {
        _this.bgIndex.set(0);
      }
      else {
        _this.bgIndex.set( _this.bgIndex.get() + 1 );
      }
    })
    .on('click', 'button[data-action="remove"]', function() {
      _this.autorun.stop();
      _this.$el.remove();
    });
};
ClickMe.prototype.startAutorun = function() {
  var _this = this;
  this.autorun = Tracker.autorun(function() {
    var background = clickMeBackground[ _this.bgIndex.get() ];
    var count = _this.count.get();
    //更新背景顏色
    _this.$el.css('background', background);
    //更新count值
    _this.$el.find('span').text( count );
  });
};

//以下程式碼只會在client端執行
if (Meteor.isClient) {
  $(function() {
    //增加add click me按扭
    $('body').append('<button id="addClickMe">Add New Click Me Object</button>');
    $('#addClickMe').on('click', function() {
      new ClickMe();
    });
  });
}
