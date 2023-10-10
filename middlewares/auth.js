function Auth(){
    return function authRouter(req, res, next) {
        const authToken = req.headers["authorization"];
        if (authToken) {
            const BearerToken = authToken.split(" ");
            const token = BearerToken[1];
            console.log("Token extraído:", token);
            jwt.verify(token, jwtSecret, (error, data) => {
                if (error) {
                    res.status(401).json({
                        infoError: `Token está Inválido! devido ao error: ${error}`,
                    });
                } else {
                    req.token = token;
                    req.userLogger = { id: data.id, email: data.email };
                    //res.status(200).json({ infoData: data });
                    next();
                }
            });
        } else {
            res.status(401).json({ error: "Token Inválido" });
        }
    }
}
module.exports = Auth;