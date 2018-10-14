console.log("=====================================================================");
const recordingsRootFolder = './ZoomCopy';
var fs = require('fs');
var path = require('path')
const del = require('del');

fs.readdir(recordingsRootFolder, (err, AllFolders) => {
	AllFolders.forEach(eachRecordingFolder => {
		if (path.extname(eachRecordingFolder)) { // Avoid system files like .DS_store or .git
			const eachFolderPath = path.join(recordingsRootFolder, eachRecordingFolder)
			fs.readdir(eachFolderPath, (err, recordingFolder) => {
				del(['tmp/*.js']).then(eachFilePath => {
					console.log('Delete Success', eachFilePath);
				});
				recordingFolder.forEach(eachFile => {
					const eachFilePath = path.join(eachFolderPath, eachFile)
					fs.stat(eachFilePath, function (err, stats) {
						if (path.extname(eachFilePath) == '.zoom' || path.extname(eachFilePath) == '.mp4') {
							if (stats["size"] < 30000000) {// Assuming less than 5 minutes is less than 30mb
								console.log('Deleting: File found to be less than 1mb deleting . . .');
								del([eachFolderPath]).then(eachFilePath => {
									console.log('\x1b[31m%s\x1b[0m','Deleted');
								});
							} else {
								console.log('\x1b[42m%s\x1b[0m','Not Deleting: Found More than 5 Minutes Recording');
							}
						}
					});

				})
			})
		}
	})
})
