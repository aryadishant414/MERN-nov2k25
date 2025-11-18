const validate = (schema) => async (req, res, next) => {
    try {
        // console.log("INSIDE VALIDATEEEEEE");
        // console.log("VALUE OF req.body", req.body);
        
        const parseBody = await schema.parseAsync(req.body);  // this method in this line will check whether the information entered by the user in the frontend side is same as the Rules defined in our validators(zod) wala schema
        console.log("VALUE OF PARSE BODY : ");
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(err);
        // console.log("HI", Array.isArray(err)); // just to check that whether this err is an array or what
        
        // console.log(err.issues[0].message);
        const message = err.issues[0].message;
        console.log("MESSAGE IS : ", message);
        
        res.status(400).json({msg: message});
    }
}

module.exports = validate;