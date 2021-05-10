const express = require('express');
const{ graphqlHTTP }= require('express-graphql');
const schema = require('./typeDefs/schema');
const cors = require('cors')
const app = express();
app.use(cors()) 

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // ==> real live fetch + docs 
}));

app.listen(4002, () => {
    console.log('now listening for requests on port 4002');
});