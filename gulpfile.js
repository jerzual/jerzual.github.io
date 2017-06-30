const gulp = require("gulp");
const gutil = require("gulp-util");
const rename = require("gulp-rename");
const template = require("gulp-template");
const download = require("gulp-downloader");
const path = require("path");
const posts = require("./data.json");
const moment = require("moment");
const uuid = require("uuid");

const parsePost = post => merge.apply(this, posts.map(post));

const normalise = string => string.normalise().toLowerCase();

gulp.task("default", () => {
    
  posts.data.forEach(post => {
    const postId = post.id;
    const postUUID = uuid.v4();
    const postDate = moment(post.created_time);
    post.hash = postUUID.substring(0,8);
    post.prefix = postDate.utc().format('YYYY-MM-DD');
    post.fullDate = postDate.utc().format('YYYY-MM-DD HH:mm:ss');
    
    if (post.attachments && post.attachments.data) {
      // télécharge photo
      post.attachments.data
        // .filter(() => false)
        .filter(att => att.type.match(/photo/) && att.media.image)
        .map(att => {
          const imgId = uuid.v4().substr(0,8);
          post.imgId = imgId;
          //console.log("MEDIA", att.media);
          download({
            fileName: `${post.hash}.png`,
            request: {
              url: att.media.image.src
            }
          }).pipe(gulp.dest(`./img/fb/`));
        });
    }
    if (post.comments && post.comments.data) {
      // télécharge photo
      post.comments.data.map(media => {
        // console.log("COMMENT", media);
      });
    }
    //ecrit fichier de post
    gulp
      .src("./tpl/post.tpl")
      .pipe(
        template({
          post,
          uuid: postUUID
        }).on("error", gutil.log)
      )
      .pipe(rename(`${post.prefix}-${post.hash}.md`))
      .pipe(gulp.dest(`./_posts/`));
  });
});
