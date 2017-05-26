var express = require('express')
var app = express();

require('./config')(app);


app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
})


