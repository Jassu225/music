import index from "../../store/index";

const {dialog} = window.require('electron').remote;
const path = window.require('path');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(window.require('fs'));
const mm = Promise.promisify(require('musicmetadata'));

export default {
  addFolders: async function() {
    let folders = dialog.showOpenDialog({
      properties: ['openDirectory', 'multiSelections']
    });

    let files = await this.fetchSongsFromDirectories(folders);
    console.log('fetch songs completed');
    console.log(files);
    let songs = await Promise.all(files.map(async file => {
      return(await this.fetchMetaData(file));
    }));
    console.log('after fetching metadata');
    console.log(songs);
  },
  fetchSongsFromDirectories: async function(folders) {
    let files = [];
    console.log('before fetch process start');
    console.log(folders);
    files = await Promise.all(folders.map(async folder => {
      return( await this.fetchRecursivelyFrom(folder) );
    }));
    console.log('after fetching files recursively');
    console.log(files);
    if(files.length >= 1) {
      files = files.reduce((arr1,arr2) => {
          return [].concat(arr1, arr2)
      });
    }
    console.log('after reducing files');
    console.log(files);
    return files;
  },
  fetchRecursivelyFrom: async function(folder) {
    let filesAndFolders = await fs.readdirAsync(folder);
    filesAndFolders.forEach((element, index) => {
      filesAndFolders[index] = path.join(folder, element);
    });
    console.log('files and folders in a directory');
    console.log(filesAndFolders);
    filesAndFolders = await this.fetchStats(filesAndFolders);
    console.log('after fetching stats');
    console.log(filesAndFolders);
    let [files, folders] = await this.splitFilesAndFolders(filesAndFolders);
    console.log('after separating files and folders');
    console.log('files');
    console.log(files);
    console.log('folders');
    console.log(folders);
    files = files.filter(file => {
      return (path.extname(file) === '.mp3');
    });
    console.log('after filtering files');
    console.log(files);
    if(folders.length >= 1) {
      files = files.concat(await this.fetchSongsFromDirectories(folders));
    }
    console.log('after fetching from child directories');
    console.log(files);
    return files;
  },
  fetchStats: async function(filesAndFolders) {
    let statInfoFiles = [];
    statInfoFiles = await Promise.all(filesAndFolders.map(async (file) => {
      return({
        path: file,
        stats: await fs.statAsync(file)
      });
    }));
    return statInfoFiles;
  },
  splitFilesAndFolders: function(filesAndFolders) {
    let files = [];
    let folders = [];
    filesAndFolders.forEach(file => {
      file.stats.isDirectory() ? folders.push(file.path) : files.push(file.path);
    });
    return [files, folders];
  },
  fetchMetaData: async function(file) {
    console.log('fetching ' + file);
    let metaData;
    let stream = fs.createReadStream(file);
    stream.on('end', ()=>{
      stream.destroy();
    });
    await mm(stream)
    .then(meta_data => {
      metaData = meta_data;
    })
    .catch(err => {
      console.log(err);
    });
    // console.log(metaData);
    return metaData;
  }
}