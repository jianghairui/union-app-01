import config from 'config.js';
let functions= {
	src_replace : function(str) {
		str = str.replace(/\/ueditor\/php\/upload/g,config.image_url+'ueditor/php/upload');
		return str;
	} 
}

export default functions