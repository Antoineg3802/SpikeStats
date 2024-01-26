import express from "express";
const app = express();
const port = 3000;

app.get('/api', function(req, res) {
    res.send('Welcome to FullStack API !');
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
