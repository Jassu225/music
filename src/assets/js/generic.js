import store from './../../store';
import mutationTypes from '../../store/mutationTypes';

document.onreadystatechange = () => {
  window.addEventListener("resize", () => {
    console.log('window resized');
    let width = document.body.getBoundingClientRect().width;

    if(width < 720 && store.state.section.albumSectionColumnCount != 3) {
      store.commit({
        type: mutationTypes.CHANGE_COLUMN_COUNT,
        albumSectionColumnCount: 3
      });
    } else if(width >= 720 && width < 930 && store.state.section.albumSectionColumnCount != 4) {
      store.commit({
        type: mutationTypes.CHANGE_COLUMN_COUNT,
        albumSectionColumnCount: 4
      });
    } else if ( width >= 930 && width < 1130 && store.state.section.albumSectionColumnCount != 5 ) {
      store.commit({
        type: mutationTypes.CHANGE_COLUMN_COUNT,
        albumSectionColumnCount: 5
      });
    } else if ( width >= 1130 && store.state.section.albumSectionColumnCount != 6 ) {
      store.commit({
        type: mutationTypes.CHANGE_COLUMN_COUNT,
        albumSectionColumnCount: 6
      });
    }
  });
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}