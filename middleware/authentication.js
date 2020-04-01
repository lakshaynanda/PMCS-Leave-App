module.exports = {
    isLoggedIn: (req, res, next) => {
        console.log("tryna auth");
        console.log(req.user);

        if (req.isAuthenticated()) {
            console.log("yes, is authenticated.");
            return next();
        }
        console.log("auth failed");

        res.redirect("/");
    },

    isUser: (req, res, next) => {
        if (req.user && req.user.role === "public") return next();
        let error = new Error();
        error.message = "You were supposed to restore the force not destroy it.";
        error.status = 403;
        next(error);
    },

    isAdmin: (req, res, next) => {
        if (req.user && req.user.role === "admin") return next();
        let error = new Error();
        error.message = "You shall not pass.";
        error.status = 403;
        next(error);
    }
};