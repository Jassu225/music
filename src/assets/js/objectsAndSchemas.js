import path from 'path';
import store from './../../store';
import mutationTypes from '../../store/mutationTypes';

const linvodb = window.require('linvodb3');
const leveljs = window.require('level-js');
const electron = window.require('electron');
const {app} = electron.remote;
const Promise = window.require("bluebird");
console.log(Promise);

linvodb.defaults.store = {
  db: leveljs
};
linvodb.path = app.getPath('userData');
let appDir = path.dirname(window.require.main.filename);
console.log(window.require.main.filename);

const Objects = {
  song: async function(filePath, metadata) {

    const parseBase64  = (format, data) => {
      return `data:image/${format};base64,${data}`;
    }
    let doc;
    let cover = path.join(appDir, './dist/assets/images/album.png');
    let title = (metadata && metadata.title && metadata.title.length > 0) ? metadata.title : path.basename(filePath);
    let defaultCover = true;
    if(!metadata) {

      doc = {
        album: 'unknown',
        albumartist: 'unknown',
        artist: ['unknown'],
        disk: {
          no: 0,
          of: 0
        },
        duration: 0,
        defaultCover: defaultCover,
        genre: 'unknown',
        path: filePath,
        playCount: 0,
        cover: cover,
        title: title,
        track: {
          no: 0,
          of: 0
        },
        year: "unknown"
      };

      await SongDB.insertAsync(doc)
      .then((newDoc) => {
        // success
      })
      .catch(err => console.log(err));

      return doc;
    }

    if( metadata.picture[0] && metadata.picture[0].data ) {
      cover = parseBase64(
        metadata.picture[0].format,
        metadata.picture[0].data.toString('base64')
      );
      defaultCover = false;
    }

    doc =  {
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

    await SongDB.insertAsync(doc)
    .then((newDoc) => {
      // success
    })
    .catch(err => console.log(err));

    return doc;
  },
  album: function(song) {
    return {
      artists: song.artist,
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
    let albums = [];
    await Promise.mapSeries(songs,async song => {
      console.log('parsing ' + song.path);
      let albumInfo = this.isAlbumPresent(song.album, albums);
      console.log(albumInfo);
      if( !albumInfo.isPresent ) {
        albums.push(this.album(song));
        console.log('album created');
      } else if ( !(this.isSongPresent(song, albums[albumInfo.index])) ) {
        albums[albumInfo.index].artists = albums[albumInfo.index].artists.concat(song.artist);
        albums[albumInfo.index].artists = albums[albumInfo.index].artists.filter(this.onlyUnique );
        albums[albumInfo.index].songsList.push(song.path);
        (albums[albumInfo.index].defaultCover && !song.defaultCover) ? 
          ( (albums[albumInfo.index].defaultCover = song.defaultCover) && (albums[albumInfo].cover = song.cover))
           : albums[albumInfo.index].defaultCover;
        albums[albumInfo.index].duration += song.duration;
        albums[albumInfo.index].tracks += 1;
        console.log('album updated');
      }
    });

    console.log('albums created');
    console.log(albums);

    await AlbumDB.insertAsync(albums)
    .then( newDocs =>{ console.log('docs created'); })
    .catch( err => console.log(err));

    return albums;
  },
  isAlbumPresent: function(albumTitle, albums) {
    console.log('checking for album presence');
    for(var i = 0; i < albums.length; i++) {
      if( albums[i].title === albumTitle) {
        console.log('album is present');
        return {
          isPresent: true,
          index: i
        };
      }
    }
    return {
      isPresent: false,
      index: -1
    };
  },
  isSongPresent: function(song, album) {
    for(var i = 0; i < album.songsList.length; i++) {
      if( album.songsList[i] === song.path)
        return true;
    }
    return false;
  },
  onlyUnique: function(value, index, self) { 
    return(self.indexOf(value) === index);
  },
  fetchAlbumsFromDB: async function() {
    let albums = await AlbumDB.findAsync({})
      .then(docs => docs)
      .catch(err => console.log(err));
    return albums;
  },
  fetchSongFromDB: async function(songPath) {
    let song = await SongDB.findOneAsync({ path: songPath });
      // .then(doc => console.log(doc))
      // .catch(err => console.log(err));
    return song;
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

let SongDB = new linvodb('song', Schemas.song());
SongDB.ensureIndex({
  fieldName: 'path',
  unique: true
});

let AlbumDB = new linvodb('album', Schemas.album());
AlbumDB.ensureIndex({
  fieldName: 'title',
  unique: true
});

SongDB = Promise.promisifyAll(SongDB);
AlbumDB = Promise.promisifyAll(AlbumDB);

SongDB.findAsync({})
.then(docs => {
  console.log(docs);
  store.commit({
    type: mutationTypes.ADD_SONGS,
    songs: docs
  });
})
.catch(err => console.log(err));

AlbumDB.findAsync({})
.then(docs => {
  store.commit({
    type: mutationTypes.ADD_ALBUMS,
    albums: docs
  });
})
.catch(err => console.log(err));

export {
  Objects,
  Schemas
};