console.log("=====================================================================");
const testFolder = './ZoomCopy';
var fs = require('fs');
var path = require('path')
const del = require('del');

// del([testFolder]).then(paths => {
// 	console.log('Deleted files and folders:\n', paths.join('\n'));
// });

fs.readdir(testFolder, (err, AllFolders) => { //test folder 
    AllFolders.forEach(eachFolder=>{
        if(path.extname(eachFolder)){
            //console.log(eachFolder);
            const eachFolderPath = path.join(testFolder,eachFolder)
            //console.log('eachFolderPath',eachFolderPath);
            fs.readdir(eachFolderPath,(err,recordingFolder)=>{
                del(['tmp/*.js']).then(eachFilePath => {
                    console.log('Delete Success',eachFilePath);
                });
                recordingFolder.forEach(eachFile=>{
                                    const eachFilePath = path.join(eachFolderPath,eachFile)
                                    //console.log('eachFilePath',eachFilePath);
                                    fs.stat(eachFilePath, function(err, stats) {	 
                                        //console.log('size of '+ eachFilePath + ' is ' +autoFormatFilesize(stats["size"])); 
                                        //console.log(path.extname(eachFilePath))
                                        if(path.extname(eachFilePath) == '.zoom' || path.extname(eachFilePath) == '.mp4' ){
                                            console.log('File Path',eachFilePath);
                                            
                                            //console.log('Scanning folder  = = = =',recordingFolder);
                                            //console.log(' This is a zoom file of Size', path.extname(eachFilePath), autoFormatFilesize(stats["size"]));
                                            if(stats["size"] < 30000000) {
                                                console.log('File found to be less than 1mb deleting . . .');
                                                del([eachFolderPath]).then(eachFilePath => {
                                                        console.log('Delete Success',eachFilePath);
                                                });
                                            }else{
                                                console.log('Looks like you have something here, Not Deleting');
                                            }
                                        }
                                    });
                                    
                    // del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
                    //     console.log('Deleted files and folders:\n',eachFilePath);
                    // });
                })
                            
                            //console.log("Complete folder Size is", autoFormatFilesize(size))
            })
            }   
        })
	})


	function autoFormatFilesize(fileSize) {
    if (fileSize > 1000000000) {
        return (fileSize / 1000000000.0)
            .toPrecision(3) + " gigabytes";
    } else if (fileSize > 1000000) {
        return (fileSize / 1000000.0)
            .toPrecision(3) + " megabytes";
    } else if (fileSize > 1000) {
        return (fileSize / 1000.0)
            .toPrecision(3) + " kilobytes";
    } else {
        return fileSize + " bytes"
    }
}