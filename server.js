const connect = require('connect');
const url = require('url');
//configure app object which will enact like server 
const app = connect();
app.listen(3000);

console.log("Server is running on 3000");
//create the middleware functions
// exec this at all endpoint and very first one to exec
function logger(request, response, next){
    console.log(request.method, request.url);
    //this will exec next function
    next();

}
// This function will execute the suitable operations and make sure that outcome are validated as well.
function calculator(request, response, next){
    const path = url.parse(request.url, true);
    let searchParams = new URLSearchParams(path.search);
    var mathOperation = searchParams.get('method');
    var x = searchParams.get('x');
    var y = searchParams.get('y');
    var result;
    if(mathOperation == 'add'){
        result = parseInt(x) + parseInt(y);
    }
    else if(mathOperation == 'subtract'){
        result = parseInt(x) - parseInt(y);
    }
    else if(mathOperation == 'multiply'){
        result = parseInt(x) * parseInt(y);
    }
    else if(mathOperation == 'divide'){
        result = parseInt(x) / parseInt(y);
    }
    else{
        mathOperation = 'Error Unexpected Operation Inserted';
        result = 0;
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({"x": x, "y": y, "operation": mathOperation, "result": result}));
}
// running the middleware function in between the operations
app.use(logger);
// executing the expected route
app.use('/lab2', calculator);