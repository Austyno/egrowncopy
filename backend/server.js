const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//setup express
const app = express();
const port = process.env.PORT || 5000;


//setup middleware
app.use(cors());
app.use(express.json());

//define your connection uri
const uri = process.env.URI;

//connect to mongoDB using mongoose
mongoose.connect(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const individualsRouter = require('./routes/individuals');
const corporatesRouter = require('./routes/corporates');
const subscriptioneasRouter = require('./routes/subscriptioneas');
const subscriptionefaRouter = require('./routes/subscriptionefa');
const subscriptionrmRouter = require('./routes/subscriptionrm');
const subscriptionlmRouter = require('./routes/subscriptionlm');
const excerciseRouter = require('./routes/excercise/excercise');
const questionRouter = require('./routes/question/question');
const answerRouter = require('./routes/answer/answer');
const serviceeasContentRouter = require('./routes/service-content/serviceconteneas');
const serviceefaContentRouter = require('./routes/service-content/servicecontentefa');
const servicelmContentRouter = require('./routes/service-content/servicecontentlm');
const servicermContentRouter = require('./routes/service-content/servicecontentrm');


//SUB_EAS Expose
// const easSubGetRouter = require('./routes/subscriptioneas');

app.use('/individuals', individualsRouter);
app.use('/corporates', corporatesRouter);
app.use('/subscriptioneas', subscriptioneasRouter);
app.use('/subscriptionefa', subscriptionefaRouter);
app.use('/subscriptionrm', subscriptionrmRouter);
app.use('/subscriptionlm', subscriptionlmRouter);
app.use('/excercise', excerciseRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/servicecontenteas', serviceeasContentRouter);
app.use('/servicecontentefa', serviceefaContentRouter);
app.use('/servicecontentlm', servicelmContentRouter);
app.use('/servicecontentrm', servicermContentRouter);



app.listen(port, () => {
    console.log(`App is running successfully on port ${port}`);
});