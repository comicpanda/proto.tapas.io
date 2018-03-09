$('.carousel').carousel({
  interval: false
});
const newUpdateMarkup = ['',
'<div class="item">',
'  <div class="wrap">',
'    <img src="{{src}}">',
'    <div class="desc">',
'      <h3 class="title">{{title}}</h3>',
'      <p class="author">{{author}}</p>',
'    </div>',
'  </div>',
'</div>'].join('');

const rankingMarkup = ['',
'<div class="arow">',
  '<span class="num">{{num}}</span>',
  '<img src="{{src}}" height="70">',
  '<div class="desc">',
    '<h3 class="title">{{title}}</h3>',
    '<p class="author">{{author}}</p>',
    '<p class="stats">',
      '<img src="/images/view.png" width="18" height="12">&nbsp;15.1k<img class="ml-3" src="/images/bookmarked.png" width="12" height="18">&nbsp;11k</p>',
  '</div>',
'</div>'].join('');


const $newUpdate = $('.js-new-update');
const $rankding = $('.js-ranking');
const templateCompile = (str, params) => {
  if(params === undefined || params === null) {
    return str;
  }

  if (typeof params === 'object') {
    params = params || {};
    const replaceFn = function (key, value) {
      str = str.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'gi'), value);
    };
    $.each(params, function (key, value) {
      if (value === undefined) {
        value = '';
      }
      if (value !== null && typeof value === 'object') {
        $.each(value, function (_key, _value) {
          replaceFn(key + '.' + _key, _value);
        });
      } else {
        replaceFn(key, value);
      }
    });
    return str.replace(/\{\{\w+\}\}/g, '');
  } else {
    return str.replace(/\{\{\w+\}\}/g, params);
  }
};

$.getJSON( "/javascripts/new-update.json", function( data ) {
  $newUpdate.append('<div class="item empty"/>');
  data.forEach(item => {
    $newUpdate.append(templateCompile(newUpdateMarkup, { src: item.book_cover_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}));
  });
  $newUpdate.append('<div class="item empty"/>');
});

$.getJSON( "/javascripts/trending.json", function( data ) {
  const first = data.slice(0, 5);
  const second = data.slice(5, 10);
  const $first = $rankding.find('.js-first');
  const $second = $rankding.find('.js-second');

  first.forEach((item, idx) => {
    $first.append(templateCompile(rankingMarkup, { num: idx + 1, src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}))
  });
  second.forEach((item, idx) => {
    $second.append(templateCompile(rankingMarkup, { num: idx + 6, src: item.thumb.file_url , title: item.title, author: item.creators.map(creator => creator.display_name).join(', ')}))
  });
});
