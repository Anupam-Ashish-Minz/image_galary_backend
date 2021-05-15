import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/login", (_req, res) => {
    res.send("dummy login route");
});

router.post("/login", passport.authenticate('local', {failureRedirect: "/login"}), (_req, res) => {
    res.redirect("/profile");
});

router.get("/api/loggedin_user", (req, res) => {
    if (!req.user) {
        res.redirect("/login");
    }
    res.send(req.user);
});

router.get("/api/login_status", (req, res) => {
    res.send(req.isAuthenticated());
});

router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export { router };
