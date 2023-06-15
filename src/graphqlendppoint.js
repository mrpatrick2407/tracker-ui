const datereg = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsondatereviver(key,value){
    if(datereg.test(value)){
        return new Date(value);
    }
    return value
}
export async function graphqlendpoint(query, variables = {},showError=null) {
    try {
       console.log("urgent")
    const response = await fetch( '/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ query, variables })
    });
    
    const body = await response.text();
    const result = JSON.parse(body, jsondatereviver);

    if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        if (showError) showError(`${error.message}:\n ${details}`);
        } else {
            showError(`${error.extensions.code}: ${error.message}`);
        }
    }
    return result.data;
    } catch (e) {
        if (showError) showError(`Error in sending data to server: ${e.message}`);
        return e;
    }
}

