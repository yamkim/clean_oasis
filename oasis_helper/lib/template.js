module.exports = {
    html: function(head, body, tail) {
      var ret = 
        `
        <!doctype html>
        <html>
        <head>
          ${head}
        </head>
        <body>
          ${body}
        </body>
        <tail>
          ${tail}
        </tail>
        </html>
        `;
      return (ret);
    },
    info: function(cssPath, img) {
      var ret = `
      <link rel="stylesheet" href=${cssPath}>
      <div class="wrapper">
        <div class="head">
          <div class="category">
              <div><a href="/">안내</a></div>
              <div><a href="beverage">음료</a></div>
              <div><a href="snack">간식</a></div>
              <div><a href="etc">비품</a></div>
          </div>
          <div class="category">
              <div></div>
          </div>
          <div class="category">
              <div>등록</div>
          </div>
        </div>
        <div>
          <img src=${img} width=700px height=250px>
        </div>
      </div>
      ` 
      return (ret);
    },
    grid: function(cssPath) {
      var ret = `
      <link rel="stylesheet" href=${cssPath}>
      <div class="wrapper">
          <div class="head">
              <div class="category">
                  <div><a href="/">안내</a></div>
                  <div><a href="beverage">음료</a></div>
                  <div><a href="snack">간식</a></div>
                  <div><a href="etc">비품</a></div>
              </div>
              <div class="category">
                  <div></div>
              </div>
              <div class="category">
                  <div>등록</div>
              </div>
          </div>
          <div class="body">
              <div class="box"></div>
              <div class="box">
                <div>
                  photo
                </div>
                <div>
                  <button type="button">
                    ${button}
                  </button>
                </div>
              </div>
              <div class="box"></div>
              <div class="box">
                  <div>select beverage</div>
                  <div></div>
                  <div>insert intraID</div>
                  <div></div>
                  <div>set alarm</div>
                  <div></div>
              </div>
              <div class="box"></div>
          </div>
          <div class="tail">
          </div>
      </div>
      ` 
      return (ret);
    }
}
