import path from 'path';

const linvodb = window.require('linvodb3');
const leveljs = window.require('level-js');
const electron = window.require('electron');
const {app} = electron.remote;

linvodb.defaults.store = {
  db: leveljs
};
linvodb.path = app.getPath('userData');
let appDir = path.dirname(window.require.main.filename);
console.log(window.require.main.filename);

const Objects = {
  song: function(filePath, metadata) {

    const parseBase64  = (format, data) => {
      return `data:image/${format};base64,${data}`;
    }

    let cover = path.join(appDir, './assets/images/album.png');
    let defaultCover = true;
    if( metadata.picture[0] && metadata.picture[0].data ) {
      cover = parseBase64(
        metadata.picture[0].format,
        metadata.picture[0].data.toString('base64')
      );
      defaultCover = false;
    }

    let title = (metadata.title && metadata.title.length > 0) ? metadata.title : path.basename(filePath);

    return {
      album: (metadata.album && metadata.album.length > 0)? metadata.album : 'unknown',
      albumartist: metadata.albumartist,
      artist: metadata.artist,
      disk: metadata.disk,
      duration: metadata.duration,
      defaultCover: defaultCover,
      genre: metadata.genre,
      path: filePath,
      playCount: 0,
      cover: cover,
      title: title,
      track: metadata.track,
      year: (metadata.year && metadata.year.length > 0)? metadata.year : 'unknown'
    };
  },
  album: function(song) {
    return {
      artists: song.artists,
      cover: song.cover,
      defaultCover: song.defaultCover,
      duration: song.duration,
      songsList: [song.path],
      title: song.album,
      tracks: 1,
      year: song.year
    };
  },
  albumsToDB: async function(songs) {
    let artists = await Promise.all(Promise.map(async song => {
      await AlbumDB.findOne({ title: song.album })
      .then(function (doc) {
        if(doc) {
          doc.artists.push(song.artists);
          doc.artists = doc.artists.filter( this.onlyUnique );
          doc.songsList.push(sonng.path);
          doc.defaultCover = (doc.defaultCover && !song.defaultCover) ? song.defaultCover : doc.defaultCover;
          doc.duration += song.duration;
          doc.tracks += 1; 
          doc.save(function(err) { /* we have updated the doc */ });
        } else {
          doc = this.album(song);
          await AlbumsDB.insert(doc)
          .then(function(newDoc) {
            // success
          }).catch(err => {
            console.log(err);
          });
        }
        return doc;
      })
      .catch(err => {
        console.log(err);
      });
    }));
    return artists;
  },
  onlyUnique: function(value, index, self) { 
    return self.indexOf(value) === index;
  }
};

const Schemas = {
  song: function() {
    return{
      album: String,
      albumartist: [String],
      artist: [String],
      cover: String,
      disk: {
          no: Number,
          of: Number
      },
      duration: Number,
      genre: [String],
      path: String,
      playCount: Number,
      title: String,
      track: {
          no: Number,
          of: Number
      },
      year: String
    }
  },
  album: function() {
    return {
      artists: [String],
      cover: String,
      duration: Number,
      songsList: [String],
      title: String,
      tracks: Number,
      year: String
    }
  },

};

const SongDB = new linvodb('song', Schemas.song());
SongDB.ensureIndex({
  fieldName: 'path',
  unique: true
});

const AlbumDB = new linvodb('album', Schemas.album());
AlbumDB.ensureIndex({
  fieldName: 'title',
  unique: true
});

AlbumDB = Promise.promisifyAll(AlbumDB);

export {
  Objects,
  Schemas
};